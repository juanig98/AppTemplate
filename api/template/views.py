import time
from django.contrib.auth.models import Permission
from django.db.models.expressions import F
from django.http.response import JsonResponse
from rest_framework import generics, viewsets, permissions, views
from rest_framework.response import Response
from rest_framework.views import status
from rest_framework.permissions import IsAuthenticated
from datetime import datetime, timedelta
from template.models import *
from template.serializers import *
from django.contrib.auth.decorators import permission_required


class UsersView(viewsets.ViewSet):

    permission_classes = [IsAuthenticated]

    queryset = User.objects.all()
    serializer_class = UserSerializer

    def list(self, request):
        """ Retorna una lista de usuarios """
        try:
            if not request.user.has_perm("auth.view_user"):
                return Response(status=status.HTTP_403_FORBIDDEN)

            return Response(self.serializer_class(User.objects.all(), many=True).data)
        except self.serializer_class.DoesNotExist:
            return Response(data={"detail": "No se encontraron registros"}, status=status.HTTP_404_NOT_FOUND)

    def retrieve(self, request, id):
        """ Retorna un usuario """
        try:
            return Response(self.serializer_class(self.queryset.get(id=id)).data)
        except self.serializer_class.DoesNotExist:
            return Response(data={"detail": "No se encontraron registros"}, status=status.HTTP_404_NOT_FOUND)

    def create(self, request):
        """ Creación/alta de usuario """
        try:
            if not request.user.has_perm("auth.add_user"):
                return Response(status=status.HTTP_403_FORBIDDEN)

            user = User.objects.create_user(
                username=request.data["username"],
                email=request.data["email"],
                first_name=request.data["first_name"],
                last_name=request.data["last_name"],
                password=request.data["password"],
            )
            if user:
                return Response(self.serializer_class(user).data)
            return Response(data={"detail": "Algo falló"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except:
            return Response(data={"detail": "Algo falló"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def update(self, request, id):
        """ Actualización de usuario """
        try:
            if not request.user.has_perm("auth.change_user"):
                return Response(status=status.HTTP_403_FORBIDDEN)

            user = User.objects.get(id=id)
            user.username = request.data["username"]
            user.email = request.data["email"]
            user.first_name = request.data["first_name"]
            user.last_name = request.data["last_name"]

            if request.data["resetPassword"]:
                user.set_password(request.data["password"])
            
            user.save()
            
            return Response(self.serializer_class(user).data)
        except:
            return Response(data={"detail": "Algo falló"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def disable(self, request, id):
        """ Deshabilita un usuario (is_active=False) """
        try:
            if not request.user.has_perm("auth.change_user"):
                return Response(status=status.HTTP_403_FORBIDDEN)

            user = User.objects.get(id=id)
            user.is_active = False
            user.save()

            return Response(status=status.HTTP_204_NO_CONTENT)
        except:
            return Response(data={"detail": "Algo falló"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def enable(self, request, id):
        """ Habilita un usuario (is_active=True) """
        try:
            if not request.user.has_perm("auth.change_user"):
                return Response(status=status.HTTP_403_FORBIDDEN)

            user = User.objects.get(id=id)
            user.is_active = True
            user.save()

            return Response(status=status.HTTP_204_NO_CONTENT)
        except:
            return Response(data={"detail": "Algo falló"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class PermissionsView(viewsets.ViewSet):
    def permissions(self, request, id):
        """ Retorna los permisos asignados y no asignados sobre un usuario """
        try:
            if not request.user.has_perm("auth.view_permission"):
                return Response(status=status.HTTP_403_FORBIDDEN)

            user = User.objects.get(id=id)

            permissions = Permission.objects.exclude(content_type_id__in=[1, 3, 5, 6, 7, 8])

            available = permissions.exclude(user=user).values()
            granted = permissions.filter(user=user).values()

            response = {"available": list(available), "granted": list(granted)}
            return JsonResponse(response, safe=False)

        except:
            return Response(data={"detail": "Algo falló"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def grant_permissions(self, request):
        """ Actualiza los permisos asignados y no asignados sobre un usuario """

        if not request.user.has_perm("auth.change_permission"):
            return Response(status=status.HTTP_403_FORBIDDEN)

        user = User.objects.get(id=request.data["user"]["id"])

        user.user_permissions.clear()

        for permission in request.data["granted"]:
            user.user_permissions.add(permission["id"])

        user.save()

        permissions = Permission.objects.exclude(content_type_id__in=[1, 3, 5, 6, 7, 8])

        available = permissions.exclude(user=user).values()
        granted = permissions.filter(user=user).values()

        response = {"available": list(available), "granted": list(granted)}
        return JsonResponse(response, safe=False)

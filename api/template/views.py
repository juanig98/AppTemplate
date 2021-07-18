import time
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


# @permission_required('auth.user.can_view_user')
class UsersView(viewsets.ViewSet):

    permission_classes = [IsAuthenticated]

    queryset = User.objects.all()
    serializer_class = UserSerializer

    def list(self, request):
        try:
            return Response(self.serializer_class(self.queryset, many=True).data)
        except self.serializer_class.DoesNotExist:
            return Response(data={"detail": "No se encontraron registros"}, status=status.HTTP_404_NOT_FOUND)

    def update(self, request, id):
        try:
            user = User.objects.get(id=id)
            user.username = request.data["username"]
            user.email = request.data["email"]
            user.first_name = request.data["first_name"]
            user.last_name = request.data["last_name"]
            user.save() 
            return Response(self.serializer_class(user).data)
        except:
            return Response(data={"detail": "Algo falló"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def create(self, request):
        try:
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

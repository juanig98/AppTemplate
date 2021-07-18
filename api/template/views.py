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
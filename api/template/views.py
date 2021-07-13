from django.shortcuts import render
from rest_framework import generics, viewsets, permissions, views
from rest_framework.response import Response
from rest_framework.views import status
from rest_framework.permissions import IsAuthenticated
from template.serializers import *
from template.models import *

class UsersView(viewsets.ViewSet):

    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def retrieve(self, request, id):
        try:
            if id:
                user = generics.get_object_or_404(self.queryset, id=id)
                return Response(UserSerializer(user).data)
            return Response(data={"detail": "No se estableció el identificador"}, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response(data={'detail': "No se encontraron registros"}, status=status.HTTP_404_NOT_FOUND)

    def list(self, request):
        try:
            return Response(UserSerializer(self.queryset, many=True).data)
        except:
            return Response(data={'detail': "No se encontraron registros"}, status=status.HTTP_404_NOT_FOUND)

    # def post(self, request):
    #     try:



import hashlib
import datetime
from typing import Any, Optional
from django.contrib.auth.base_user import AbstractBaseUser
from django.http.request import HttpRequest
from django.shortcuts import render
from django.contrib.auth.models import User
from django.contrib.auth.hashers import check_password
from django.contrib.sessions.models import Session
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from template.serializers import UserSerializer

# Superuser:
# juan lHTIW3taGmHA4m5j
class AuthRequest(ObtainAuthToken):

    permission_classes = [AllowAny]

    def login(self, request: HttpRequest, username: Optional[str], password: Optional[str], **kwargs: Any) -> Optional[AbstractBaseUser]:

        if username == None or password == None:
            return None

        try:
            user = User.objects.get(username=username)

        except User.DoesNotExist:
            return Response("Usuario inválido", status=status.HTTP_401_UNAUTHORIZED)

        pwd_valid = check_password(password, user.password)

        if not pwd_valid:
            return Response("Contraseña inválida", status=status.HTTP_401_UNAUTHORIZED)

        token, created = Token.objects.get_or_create(user=user)
        user_response = UserSerializer(user).data

        if created:
            return Response({"token": token.key, "user": user_response, "message": "Inicio de sesión exitoso"}, status=status.HTTP_201_CREATED)
        else:
            token = Token.objects.filter(user=user).update(created=datetime.now())
            token = Token.objects.get(user=user)
            return Response({"token": token.key, "user": user_response, "message": "Inicio de sesión exitoso."}, status=status.HTTP_200_OK)


class ValidateToken(APIView):

    # Authorization
    authentication_classes = [TokenAuthentication]

    def post(self, request, *args, **kwargs):
        try:
            token = Token.objects.get(key=request.headers.get("Authorization")[6:])

            if token:
                user = token.user
                return Response(data=UserSerializer(user).data, status=status.HTTP_200_OK)

            return Response({"message": "No se ha encontrado un usuario con estas credenciales."}, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({"message": "No se ha encontrado token en la petición."}, status=status.HTTP_409_CONFLICT)


class Logout(APIView):
    def post(self, request, *args, **kwargs):
        try:
            token = request.data["token"]
            token = Token.objects.filter(key=token).first()

            if token:
                user = token.user
                # delete all sessions for user
                all_sessions = Session.objects.filter(expire_date__gte=datetime.now())
                if all_sessions.exists():
                    for session in all_sessions:
                        session_data = session.get_decoded()
                        if user.id == int(session_data.get("_auth_user_id")):
                            session.delete()
                token.delete()

                session_message = "Sesiones de usuario eliminadas."
                token_message = "Token eliminado."
                return Response({"token_message": token_message, "session_message": session_message}, status=status.HTTP_200_OK)

            return Response({"message": "No se ha encontrado un usuario con estas credenciales."}, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({"message": "No se ha encontrado token en la petición."}, status=status.HTTP_409_CONFLICT)

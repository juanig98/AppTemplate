import hashlib
from typing import Any, Optional
from django.contrib.auth.backends import AllowAllUsersModelBackend
from django.contrib.auth.base_user import AbstractBaseUser
from django.http.request import HttpRequest
from rest_framework.response import Response
from django.contrib.sessions.models import Session
from datetime import datetime
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.permissions import IsAuthenticated
import time

from template.models import User
from template.serializers import UserSerializer


class AuthRequest(ObtainAuthToken):
    def authenticate(self, request: HttpRequest, username: Optional[str], password: Optional[str], **kwargs: Any) -> Optional[AbstractBaseUser]:

        if username == None or password == None:
            return None

        try:
            usuario = User.objects.get(email=username, clave=hashlib.md5(password.encode("utf-8")).hexdigest())

        except User.DoesNotExist:
            return None

        except Exception as e:
            return str(e)

        return User

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None

    def post(self, request, *args, **kwargs):

        login_serializer = self.serializer_class(data=request.data, context={"request": request})

        if login_serializer.is_valid():
            user = login_serializer.validated_data["user"]

            if user.is_active:
                token, created = Token.objects.get_or_create(user=user)
                user_serializer = UserSerializer(user)

                if created:
                    return Response({"token": token.key, "message": "Inicio de sesión exitoso"}, status=status.HTTP_201_CREATED)
                else:
                    token = Token.objects.filter(user=user).update(created=datetime.now())
                    token = Token.objects.get(user=user)
                    return Response({"token": token.key, "message": "Inicio de sesión exitoso."}, status=status.HTTP_200_OK)
            else:
                return Response({"message": "Este usuario no puede iniciar sesión."}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({"message": "Nombre de usuario o contraseña incorrectos"}, status=status.HTTP_401_UNAUTHORIZED)


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
                        # search auth_user_id, this field is primary_key's user on the session
                        if user.id == int(session_data.get("_auth_user_id")):
                            session.delete()
                # delete user token
                token.delete()

                session_message = "Sesiones de usuario eliminadas."
                token_message = "Token eliminado."
                return Response({"token_message": token_message, "session_message": session_message}, status=status.HTTP_200_OK)

            return Response({"message": "No se ha encontrado un usuario con estas credenciales."}, status=status.HTTP_401_UNAUTHORIZED)
        except:
            return Response({"message": "No se ha encontrado token en la petición."}, status=status.HTTP_409_CONFLICT)


class ValidateToken(APIView):

    # Authorization
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        try:
            token = request.data["token"]
            token = Token.objects.filter(key=token).first()

            if token:
                user = token.user
                user_serializer = UserSerializer(user).data
                return Response(data=user_serializer, status=status.HTTP_200_OK)

            return Response({"message": "No se ha encontrado un usuario con estas credenciales."}, status=status.HTTP_401_UNAUTHORIZED)
        except:
            return Response({"message": "No se ha encontrado token en la petición."}, status=status.HTTP_409_CONFLICT)

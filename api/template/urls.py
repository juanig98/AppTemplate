# from .auth.password import ChangePassword, ResetPassword
from template.auth.authenticate_request import AuthRequest, Logout, ValidateToken
from django.urls import path
from template.views import *

urlpatterns = [
    path("login/", AuthRequest.as_view(), name="login"),
    path("validate/", ValidateToken.as_view(), name="validate"),
    path("logout/", Logout.as_view(), name="logout"),

    # Usuarios
    path("users/", UsersView.as_view({"post": "create", "get": "list"}), name="users"),
    path("users/<int:id>", UsersView.as_view({"get": "retrieve", "put": "update"}), name="users"),
    path("users/enable/<int:id>", UsersView.as_view({"get": "enable"}), name="user-enable"),
    path("users/disable/<int:id>", UsersView.as_view({"get": "disable"}), name="user-disable"),

    # Permisos
    path("permissions-user/", PermissionsView.as_view({"post": "grant_permissions"}), name="user-disable"), 
    path("permissions-user/<int:id>", PermissionsView.as_view({"get": "permissions"}), name="user-disable"), 
]

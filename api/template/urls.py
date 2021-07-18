# from .auth.password import ChangePassword, ResetPassword
from template.auth.authenticate_request import AuthRequest, Logout, ValidateToken
from django.urls import path 
from template.views import *

urlpatterns = [ 
    path('login/', AuthRequest.as_view(), name="login"),
    path('validate/', ValidateToken.as_view(), name="validate"),
    path('logout/', Logout.as_view(), name="logout"),
    path('users/', UsersView.as_view({"get": "list"}), name="user-list"),
    # path('users/<int:id>/', UsersView.as_view({"get": "retrieve"}), name="user-retrieve"), 
]
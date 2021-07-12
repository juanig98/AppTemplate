# from .auth.password import ChangePassword, ResetPassword
from django.urls import path
from template.auth.authenticate_request import AuthRequest, Logout, ValidateToken
from template.views import *

urlpatterns = [
    path('login/', AuthRequest.as_view(), name="login"),
    path('validate-token/', ValidateToken.as_view(), name="token"),
    path('logout/', Logout.as_view(), name="logout"),
    # path('reset-password/', ResetPassword.as_view(), name="reset-password"),
    # path('change-password/', ChangePassword.as_view(), name="change-password"),
]
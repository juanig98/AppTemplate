from datetime import date, timedelta
from .base import *

# Quick-start development settings - unsuitable for production
SECRET_KEY = "django-insecure-iv+8e7xe7ctp@bk6r_6)=srr0j(imy&e*str_31-f@9ebagj02"

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['*']

CORS_ALLOW_METHODS = ["GET", "OPTIONS", "PATCH", "POST", "PUT", "DELETE"]

CORS_ALLOW_HEADERS = ["accept", "accept-encoding", "authorization", "content-type", "dnt", "origin", "user-agent", "x-csrftoken", "x-requested-with"]

CORS_ALLOWED_ORIGINS = [
    "http://localhost:4200",
]

# Database
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.mysql",
        "NAME": "template",
        "USER": "template",
        "PASSWORD": "templatE123**",
        "HOST": "127.0.0.1",
        "PORT": "3306",
    }
}
# AUTHENTICATION_BACKENDS = ["template.auth.authenticate_request.AuthRequest"]

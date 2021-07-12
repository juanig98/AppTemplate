from datetime import date, timedelta
from .base import *

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-ya#^#)vt68@@*^$f2!&p&wf(8irww(%1+#u&y0u_r8326mbw-^'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []

CORS_ALLOW_METHODS = ["GET", "OPTIONS", "PATCH", "POST", "PUT", "DELETE"]

CORS_ALLOWED_ORIGINS = [
    'http://localhost:4200',
    'http://192.168.1.16:4200'
]

# Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'template',
        'USER': 'template',
        'PASSWORD': 'templatE123**',
        'PORT': '3306',
        'HOST': 'localhost'
    }
}

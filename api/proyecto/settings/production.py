from datetime import date, timedelta
from .base import *

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-ya#^#)vt68@@*^$f2!&p&wf(8irww(%1+#u&y0u_r8326mbw-^'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['']

CORS_ALLOW_METHODS = ["GET", "OPTIONS", "PATCH", "POST", "PUT", "DELETE"]

CORS_ALLOWED_ORIGINS = ['']

# Database
DATABASES = {
    'default': {
        'ENGINE': 'mysqlclient',
        'NAME': 'template',
        'USER': 'template',
        'PASSWORD': 'templatE123**',
    }
}

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'console': {
            'format': '%(name)-12s %(levelname)-8s %(message)s'
        },
        'file': {
            'format': '%(asctime)s %(name)-12s %(levelname)-8s %(message)s'
        }
    },
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'formatter': 'console'
        },
        'file': {
            'level': 'DEBUG',
            'class': 'logging.FileHandler',
            'formatter': 'file',
            'filename': os.path.join(BASE_DIR, 'tmp/logs/log_' + str(date.today()) + '.log')
        }
    },
    'loggers': {
        '': {
            'level': 'DEBUG',
            'handlers': ['console', 'file']
        }
    }
}


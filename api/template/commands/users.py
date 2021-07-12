import hashlib
from django.db.models.aggregates import Max
from modoconcordia.models import *
from typing import Any, Optional
from django.core.management.base import BaseCommand
from faker import Faker
import faker.providers

class Command(BaseCommand):
    help = "Creacion de datos para la db"

    def handle(self, *args, **kwargs):

        password = hashlib.md5("abc.1234".encode("utf-8")).hexdigest()

        user = Usuario.objects.create( 
            email='juanigalarza@gmail.com',
            username='juanig',
            apellido='Galarza',
            nombres='Juan Ignacio',
            clave=password
        )

        print(str(user))


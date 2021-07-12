import hashlib
from django.db.models.aggregates import Max
from template.models import *
from typing import Any, Optional
from django.core.management.base import BaseCommand
from faker import Faker
import faker.providers

class Command(BaseCommand):
    help = "Creacion de datos para la db"

    def handle(self, *args, **kwargs):

        password = hashlib.md5("abc.1234".encode("utf-8")).hexdigest()

        user = User.objects.create( 
            username='juanig',
            email='juanig@gmail.com',
            first_name='Juan Ignacio',
            last_name='Galarza',
            password=password,
        )

        print(str(user))


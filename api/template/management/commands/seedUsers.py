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

        fake = Faker(["es_ES"])

        password = hashlib.md5("abc.1234".encode("utf-8")).hexdigest()

        # user = User.objects.create( 
        #     username='juanig',
        #     email='juanig@gmail.com',
        #     first_name='Juan Ignacio',
        #     last_name='Galarza',
        #     status='AC',
        #     password=password,
        # )

        # print(str(user))

        maxid = int(next(iter(User.objects.aggregate(Max("id")).values()))) 
        
        # print(str(maxid))
        for i in range(50):

            maxid = maxid + 1
            name = fake.name_nonbinary()
            last_name = fake.last_name_nonbinary()

            username = (name[0:1] + last_name)[0:49].lower()

            password = hashlib.md5(username.encode("utf-8")).hexdigest()

            User.objects.create(
                id=maxid,
                username=username[0:49],
                email=username[0:49]+"@email",
                first_name=name[0:24],
                last_name=last_name[0:19],
                status='AC',
                password=password,
            )
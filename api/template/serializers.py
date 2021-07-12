from django.db.models import fields
from rest_framework import serializers
from template.models import *


class UserSerializer(serializers.Serializer):
    class Meta:
        model = User
        exclude = ["password", "last_login"]

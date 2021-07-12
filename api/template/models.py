from django import db
from django.contrib.auth.base_user import AbstractBaseUser
from django.db import models

class User(AbstractBaseUser, models.Model):
    id = models.IntegerField(db_column="id", primary_key=True)
    username = models.TextField(db_column="username", max_length=50, null=False)
    email = models.TextField(db_column="email", max_length=100, null=False)
    first_name = models.CharField(db_column="first_name", max_length=25, null=False)
    last_name = models.CharField(db_column="last_name", max_length=20, null=False)
    password = models.TextField(db_column="password", max_length=100, null=False)
    last_login = models.DateTimeField(db_column='last_login', blank=True, null=True)

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"
        db_table = "users"

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["email", "first_name", "last_name", "password"]

    def id(self):
        return self.id

    def get_fullname(self):
        return f"{self.last_name}, {self.first_name}"

# class Permission(models.)
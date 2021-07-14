from django.db import models


class Client(models.Model):
    id = models.PositiveIntegerField(primary_key=True)
    name = models.TextField(unique=True, max_length=100, null=False)
    first_name = models.TextField(max_length=50, null=True)
    last_name = models.TextField(max_length=50, null=True)
    phone = models.CharField(max_length=25, null=True)
    telephone = models.CharField(max_length=25, null=True)
    address_name = models.TextField(max_length=50, null=True)
    address_number = models.SmallIntegerField(null=True)
    address_aclaration = models.CharField(max_length=10, null=True)

    class Meta:
        verbose_name = "Client"
        verbose_name_plural = "Clients"
        db_table = "clients"



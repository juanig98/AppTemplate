# Generated by Django 3.2.5 on 2021-07-11 23:56

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.TextField(db_column='username', max_length=50)),
                ('email', models.TextField(db_column='email', max_length=100)),
                ('first_name', models.CharField(db_column='first_name', max_length=25)),
                ('last_name', models.CharField(db_column='last_name', max_length=20)),
                ('password', models.TextField(db_column='password', max_length=100)),
                ('last_login', models.DateTimeField(blank=True, db_column='last_login', null=True)),
            ],
            options={
                'verbose_name': 'User',
                'verbose_name_plural': 'Users',
                'db_table': 'users',
            },
        ),
    ]
# Generated by Django 5.0.6 on 2024-06-13 04:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('debts', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='file',
            name='type',
            field=models.CharField(blank=True, max_length=55, null=True),
        ),
    ]
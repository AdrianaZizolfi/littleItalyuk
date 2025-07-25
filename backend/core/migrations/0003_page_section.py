# Generated by Django 5.2.4 on 2025-07-17 14:58

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_homesection'),
    ]

    operations = [
        migrations.CreateModel(
            name='Page',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Section',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('content_text', models.TextField(blank=True)),
                ('content_image', models.ImageField(blank=True, null=True, upload_to='section_images/')),
                ('order', models.PositiveIntegerField(default=0)),
                ('page', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sections', to='core.page')),
            ],
        ),
    ]

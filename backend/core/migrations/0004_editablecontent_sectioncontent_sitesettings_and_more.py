# Generated by Django 5.2.4 on 2025-07-17 17:16

import django.db.models.deletion
import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_page_section'),
    ]

    operations = [
        migrations.CreateModel(
            name='EditableContent',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content_key', models.CharField(max_length=100)),
                ('content_type', models.CharField(choices=[('text', 'Text'), ('html', 'HTML'), ('image', 'Image URL'), ('button_text', 'Button Text'), ('button_url', 'Button URL')], default='text', max_length=20)),
                ('content_value', models.TextField()),
                ('order', models.IntegerField(default=0)),
            ],
            options={
                'ordering': ['order'],
            },
        ),
        migrations.CreateModel(
            name='SectionContent',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('description', models.TextField(blank=True)),
                ('image_url', models.URLField(blank=True)),
                ('additional_info', models.TextField(blank=True)),
                ('button_text', models.CharField(blank=True, max_length=100)),
                ('button_url', models.URLField(blank=True)),
                ('order', models.IntegerField(default=0)),
                ('is_active', models.BooleanField(default=True)),
            ],
            options={
                'ordering': ['order'],
            },
        ),
        migrations.CreateModel(
            name='SiteSettings',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('site_name', models.CharField(default='Little Italy Events', max_length=200)),
                ('site_description', models.TextField(blank=True)),
                ('contact_email', models.EmailField(blank=True, max_length=254)),
                ('contact_phone', models.CharField(blank=True, max_length=20)),
                ('address', models.TextField(blank=True)),
                ('social_facebook', models.URLField(blank=True)),
                ('social_instagram', models.URLField(blank=True)),
                ('social_twitter', models.URLField(blank=True)),
            ],
            options={
                'verbose_name': 'Site Settings',
                'verbose_name_plural': 'Site Settings',
            },
        ),
        migrations.DeleteModel(
            name='HomeSection',
        ),
        migrations.AlterModelOptions(
            name='contactsubmission',
            options={'ordering': ['-submitted_at']},
        ),
        migrations.AlterModelOptions(
            name='page',
            options={'ordering': ['-created_at']},
        ),
        migrations.AlterModelOptions(
            name='section',
            options={'ordering': ['order']},
        ),
        migrations.RenameField(
            model_name='contactsubmission',
            old_name='created_at',
            new_name='submitted_at',
        ),
        migrations.RemoveField(
            model_name='page',
            name='name',
        ),
        migrations.RemoveField(
            model_name='section',
            name='content_image',
        ),
        migrations.RemoveField(
            model_name='section',
            name='content_text',
        ),
        migrations.AddField(
            model_name='contactsubmission',
            name='is_read',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='contactsubmission',
            name='topic',
            field=models.CharField(blank=True, max_length=50),
        ),
        migrations.AddField(
            model_name='page',
            name='created_at',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AddField(
            model_name='page',
            name='is_active',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='page',
            name='meta_description',
            field=models.TextField(blank=True),
        ),
        migrations.AddField(
            model_name='page',
            name='slug',
            field=models.SlugField(default='', unique=True),
        ),
        migrations.AddField(
            model_name='page',
            name='template',
            field=models.CharField(blank=True, choices=[('events', 'Events Page'), ('sangennaro', 'San Gennaro Page'), ('fashionshow', 'Fashion Show Page'), ('about', 'About Page')], max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='page',
            name='title',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AddField(
            model_name='section',
            name='created_at',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AddField(
            model_name='section',
            name='is_active',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='section',
            name='section_type',
            field=models.CharField(blank=True, choices=[('hero', 'Hero Section'), ('text_image', 'Text and Image'), ('cards_grid', 'Cards Grid'), ('vendors', 'Vendors Grid'), ('artists', 'Artists Grid'), ('contact', 'Contact Form')], max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='section',
            name='order',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='section',
            name='title',
            field=models.CharField(blank=True, max_length=200),
        ),
        migrations.AddField(
            model_name='editablecontent',
            name='page',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='content', to='core.page'),
        ),
        migrations.AddField(
            model_name='sectioncontent',
            name='section',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='items', to='core.section'),
        ),
        migrations.AlterUniqueTogether(
            name='editablecontent',
            unique_together={('page', 'content_key')},
        ),
    ]

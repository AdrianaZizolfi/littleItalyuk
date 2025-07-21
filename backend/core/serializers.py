# serializers.py
from rest_framework import serializers
from .models import Page, EditableContent, Section, SectionContent, ContactSubmission, SiteSettings

class EditableContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = EditableContent
        fields = ['id', 'content_key', 'content_type', 'content_value', 'order']

class SectionContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = SectionContent
        fields = ['id', 'title', 'description', 'image_url', 'additional_info', 
                 'button_text', 'button_url', 'order', 'is_active']

class SectionSerializer(serializers.ModelSerializer):
    items = SectionContentSerializer(many=True, read_only=True)
    
    class Meta:
        model = Section
        fields = ['id', 'section_type', 'title', 'is_active', 'order', 'items']

class PageSerializer(serializers.ModelSerializer):
    content = EditableContentSerializer(many=True, read_only=True)
    sections = SectionSerializer(many=True, read_only=True)
    
    class Meta:
        model = Page
        fields = ['id', 'title', 'slug', 'template', 'meta_description', 
                 'is_active', 'created_at', 'updated_at', 'content', 'sections']

class ContactSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactSubmission
        fields = ['id', 'name', 'email', 'subject', 'message', 
                 'submitted_at', 'is_read']

class SiteSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteSettings
        fields = ['id', 'site_name', 'site_description', 'contact_email', 
                 'contact_phone', 'address', 'social_facebook', 
                 'social_instagram', 'social_twitter']
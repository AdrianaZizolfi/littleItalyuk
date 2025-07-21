# admin.py
from django.contrib import admin
from .models import Page, EditableContent, Section, SectionContent, ContactSubmission, SiteSettings

@admin.register(Page)
class PageAdmin(admin.ModelAdmin):
    list_display = ['title', 'slug', 'template', 'is_active', 'created_at']
    list_filter = ['template', 'is_active', 'created_at']
    search_fields = ['title', 'slug']
    prepopulated_fields = {'slug': ('title',)}

@admin.register(EditableContent)
class EditableContentAdmin(admin.ModelAdmin):
    list_display = ['page', 'content_key', 'content_type', 'order']
    list_filter = ['page', 'content_type']
    search_fields = ['content_key', 'content_value']

@admin.register(Section)
class SectionAdmin(admin.ModelAdmin):
    list_display = ['page', 'title', 'section_type', 'is_active', 'order']
    list_filter = ['page', 'section_type', 'is_active']
    search_fields = ['title']

@admin.register(SectionContent)
class SectionContentAdmin(admin.ModelAdmin):
    list_display = ['section', 'title', 'order', 'is_active']
    list_filter = ['section', 'is_active']
    search_fields = ['title', 'description']

@admin.register(ContactSubmission)
class ContactSubmissionAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'subject', 'submitted_at', 'is_read']
    list_filter = ['is_read', 'submitted_at']
    search_fields = ['name', 'email', 'subject']
    readonly_fields = ['submitted_at']

@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    list_display = ['site_name', 'contact_email', 'contact_phone']
    
    def has_add_permission(self, request):
        # Only allow one SiteSettings instance
        return not SiteSettings.objects.exists()
    
    def has_delete_permission(self, request, obj=None):
        # Don't allow deletion of site settings
        return False
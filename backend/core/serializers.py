# serializers.py
from rest_framework import serializers
from .models import Page, EditableContent, Section, SectionContent, ContactSubmission, SiteSettings,Ticket, TicketScan

class TicketCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating new tickets"""
    
    class Meta:
        model = Ticket
        fields = [
            'ticket_id', 'full_name', 'email', 'phone_number', 
            'qr_code_url', 'event_name'
        ]
        extra_kwargs = {
            'ticket_id': {'required': True},
            'full_name': {'required': True},
            'email': {'required': True},
            'qr_code_url': {'required': True},
        }
    
    def validate_email(self, value):
        """Validate email format and check for duplicates"""
        if value:
            value = value.lower().strip()
            # Optional: Check for duplicate emails for the same event
            # if Ticket.objects.filter(email=value, event_name=self.initial_data.get('event_name', 'San Gennaro Fest 2025')).exists():
            #     raise serializers.ValidationError("This email has already been used for this event.")
        return value
    
    def validate_ticket_id(self, value):
        """Ensure ticket ID is unique"""
        if Ticket.objects.filter(ticket_id=value).exists():
            raise serializers.ValidationError("This ticket ID already exists.")
        return value


class TicketSerializer(serializers.ModelSerializer):
    """Serializer for reading ticket data"""
    
    class Meta:
        model = Ticket
        fields = [
            'id', 'ticket_id', 'full_name', 'email', 'phone_number',
            'qr_code_url', 'status', 'created_at', 'updated_at',
            'event_name', 'event_date', 'used_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at', 'used_at']


class TicketValidationSerializer(serializers.Serializer):
    """Serializer for validating tickets by QR scan"""
    ticket_id = serializers.CharField(max_length=100)
    location = serializers.CharField(max_length=100, required=False)
    scanned_by = serializers.CharField(max_length=100, required=False)


class TicketScanSerializer(serializers.ModelSerializer):
    """Serializer for ticket scan records"""
    ticket_info = TicketSerializer(source='ticket', read_only=True)
    
    class Meta:
        model = TicketScan
        fields = [
            'id', 'ticket', 'ticket_info', 'scanned_at', 
            'scanned_by', 'location', 'ip_address'
        ]
        read_only_fields = ['id', 'scanned_at']

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
        
#Frontend

class PagePublicSerializer(serializers.ModelSerializer):
    content = EditableContentSerializer(many=True, read_only=True)

    class Meta:
        model = Page
        fields = ['title', 'slug', 'content']
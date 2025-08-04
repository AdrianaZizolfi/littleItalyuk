# models.py
from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
import uuid

class Ticket(models.Model):
    STATUS_CHOICES = [
        ('valid', 'Valid'),
        ('used', 'Used'),
        ('cancelled', 'Cancelled'),
    ]
    
    # Basic ticket information
    ticket_id = models.CharField(max_length=100, unique=True, db_index=True)
    full_name = models.CharField(max_length=200)
    email = models.EmailField()
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    
    # QR Code and status
    qr_code_url = models.URLField(max_length=500)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='valid')
    
    # Timestamps
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    used_at = models.DateTimeField(null=True, blank=True)
    
    # Event information (optional - for future events)
    event_name = models.CharField(max_length=200, default='San Gennaro Fest 2025')
    event_date = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Ticket'
        verbose_name_plural = 'Tickets'
    
    def __str__(self):
        return f"{self.ticket_id} - {self.full_name}"
    
    def mark_as_used(self):
        """Mark ticket as used"""
        self.status = 'used'
        self.used_at = timezone.now()
        self.save()
    
    def is_valid(self):
        """Check if ticket is valid and not used"""
        return self.status == 'valid'


class TicketScan(models.Model):
    """Track ticket scans for analytics"""
    ticket = models.ForeignKey(Ticket, on_delete=models.CASCADE, related_name='scans')
    scanned_at = models.DateTimeField(default=timezone.now)
    scanned_by = models.CharField(max_length=100, blank=True)  # Staff member name
    location = models.CharField(max_length=100, blank=True)   # Entrance location
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    
    class Meta:
        ordering = ['-scanned_at']
    
    def __str__(self):
        return f"Scan of {self.ticket.ticket_id} at {self.scanned_at}"

class Page(models.Model):
    TEMPLATE_CHOICES = [
        ('events', 'Events Page'),
        ('sangennaro', 'San Gennaro Page'),
        ('fashionshow', 'Fashion Show Page'),
        ('about', 'About Page'),
    ]
    
    title = models.CharField(max_length=200, blank=True, null=True)
    slug = models.SlugField(unique=True, default="")
    template = models.CharField(max_length=50, choices=TEMPLATE_CHOICES, blank=True, null=True)
    meta_description = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return self.title

class EditableContent(models.Model):
    """Store editable text content for pages"""
    CONTENT_TYPES = [
        ('text', 'Text'),
        ('html', 'HTML'),
        ('image', 'Image URL'),
        ('button_text', 'Button Text'),
        ('button_url', 'Button URL'),
    ]
    
    page = models.ForeignKey(Page, on_delete=models.CASCADE, related_name='content')
    content_key = models.CharField(max_length=100)  # e.g., 'hero_title', 'hero_description'
    content_type = models.CharField(max_length=20, choices=CONTENT_TYPES, default='text')
    content_value = models.TextField()
    order = models.IntegerField(default=0)
    
    class Meta:
        unique_together = ['page', 'content_key']
        ordering = ['order']
    
    def __str__(self):
        return f"{self.page.title} - {self.content_key}"

class Section(models.Model):
    """Dynamic sections that can be added to pages"""
    SECTION_TYPES = [
        ('hero', 'Hero Section'),
        ('text_image', 'Text and Image'),
        ('cards_grid', 'Cards Grid'),
        ('vendors', 'Vendors Grid'),
        ('artists', 'Artists Grid'),
        ('contact', 'Contact Form'),
    ]
    
    page = models.ForeignKey(Page, on_delete=models.CASCADE, related_name='sections')
    section_type = models.CharField(max_length=50, choices=SECTION_TYPES, blank=True, null=True)
    title = models.CharField(max_length=200, blank=True)
    is_active = models.BooleanField(default=True)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(default=timezone.now)
    
    class Meta:
        ordering = ['order']
    
    def __str__(self):
        return f"{self.page.title} - {self.title} ({self.section_type})"

class SectionContent(models.Model):
    """Content within sections (like vendor cards, artist cards)"""
    section = models.ForeignKey(Section, on_delete=models.CASCADE, related_name='items')
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    image_url = models.URLField(blank=True)
    additional_info = models.TextField(blank=True)  # For performance times, etc.
    button_text = models.CharField(max_length=100, blank=True)
    button_url = models.URLField(blank=True)
    order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        ordering = ['order']
    
    def __str__(self):
        return f"{self.section.title} - {self.title}"

class ContactSubmission(models.Model):
    """Store contact form submissions"""
    name = models.CharField(max_length=100)
    email = models.EmailField()
    topic = models.CharField(max_length=50, blank=True)
    subject = models.CharField(max_length=200, blank=True)
    message = models.TextField()
    submitted_at = models.DateTimeField(default=timezone.now)
    is_read = models.BooleanField(default=False)
    
    class Meta:
        ordering = ['-submitted_at']
    
    def __str__(self):
        return f"Contact from {self.name} - {self.email}"

class SiteSettings(models.Model):
    """Global site settings"""
    site_name = models.CharField(max_length=200, default="Little Italy Events")
    site_description = models.TextField(blank=True)
    contact_email = models.EmailField(blank=True)
    contact_phone = models.CharField(max_length=20, blank=True)
    address = models.TextField(blank=True)
    social_facebook = models.URLField(blank=True)
    social_instagram = models.URLField(blank=True)
    social_twitter = models.URLField(blank=True)
    
    class Meta:
        verbose_name = "Site Settings"
        verbose_name_plural = "Site Settings"
    
    def __str__(self):
        return self.site_name
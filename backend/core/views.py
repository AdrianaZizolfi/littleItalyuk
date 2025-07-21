# views.py
from rest_framework import viewsets, status, permissions, status
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.db.models import Count
from django.utils import timezone
from django.core.mail import send_mail
from datetime import timedelta
from django.conf import settings
from .models import Page, EditableContent, Section, SectionContent, ContactSubmission, SiteSettings
from .serializers import (
    PageSerializer, EditableContentSerializer, SectionSerializer, 
    SectionContentSerializer, ContactSubmissionSerializer, SiteSettingsSerializer
)

class PageViewSet(viewsets.ModelViewSet):
    queryset = Page.objects.all()
    serializer_class = PageSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    lookup_field = 'slug'
    
    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]
    
    @action(detail=True, methods=['post'])
    def update_content(self, request, slug=None):
        """Update editable content for a page"""
        page = self.get_object()
        content_key = request.data.get('content_key')
        content_value = request.data.get('content_value')
        content_type = request.data.get('content_type', 'text')
        
        if not content_key or not content_value:
            return Response({'error': 'content_key and content_value are required'}, 
                          status=status.HTTP_400_BAD_REQUEST)
        
        content, created = EditableContent.objects.get_or_create(
            page=page,
            content_key=content_key,
            defaults={'content_type': content_type, 'content_value': content_value}
        )
        
        if not created:
            content.content_value = content_value
            content.content_type = content_type
            content.save()
        
        serializer = EditableContentSerializer(content)
        return Response(serializer.data)

class SectionViewSet(viewsets.ModelViewSet):
    queryset = Section.objects.all()
    serializer_class = SectionSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    @action(detail=True, methods=['post'])
    def add_item(self, request, pk=None):
        """Add an item to a section (like vendor, artist card)"""
        section = self.get_object()
        data = request.data.copy()
        data['section'] = section.id
        
        serializer = SectionContentSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['patch'])
    def reorder_items(self, request, pk=None):
        """Reorder items within a section"""
        section = self.get_object()
        item_orders = request.data.get('item_orders', [])
        
        for item_data in item_orders:
            try:
                item = SectionContent.objects.get(
                    id=item_data['id'], 
                    section=section
                )
                item.order = item_data['order']
                item.save()
            except SectionContent.DoesNotExist:
                continue
        
        serializer = self.get_serializer(section)
        return Response(serializer.data)

class ContactSubmissionViewSet(viewsets.ModelViewSet):
    queryset = ContactSubmission.objects.all()
    serializer_class = ContactSubmissionSerializer
    
    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]
    
    @action(detail=True, methods=['patch'])
    def mark_as_read(self, request, pk=None):
        """Mark a contact submission as read"""
        submission = self.get_object()
        submission.is_read = True
        submission.save()
        
        serializer = self.get_serializer(submission)
        return Response(serializer.data)
    
# @api_view(['POST'])
# @permission_classes([AllowAny])
# def submit_contact_form(request):
#     serializer = ContactSubmissionSerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response({"success": True}, status=status.HTTP_201_CREATED)
#     return Response({"success": False, "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def submit_contact_form(request):
    serializer = ContactSubmissionSerializer(data=request.data)
    if serializer.is_valid():
        submission = serializer.save()

        # Compose and send email
        subject = f"📬 New Contact Submission: {submission.topic}"
        message = (
            f"Name: {submission.name}\n"
            f"Email: {submission.email}\n"
            f"Type: {submission.topic}\n\n"
            f"Message:\n{submission.message}"
        )
        recipient = ['your-backoffice@email.com']  # Replace with your real address

        try:
            send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, recipient)
        except Exception as e:
            print("Email sending failed:", str(e))  # Or log it properly

        return Response({'success': True, 'message': 'Submission saved and email sent.'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SiteSettingsViewSet(viewsets.ModelViewSet):
    queryset = SiteSettings.objects.all()
    serializer_class = SiteSettingsSerializer
    permission_classes = [permissions.IsAuthenticated]

class AdminDashboardViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]
    
    @action(detail=False, methods=['get'])
    def stats(self, request):
        """Get dashboard statistics"""
        total_pages = Page.objects.count()
        active_pages = Page.objects.filter(is_active=True).count()
        
        # Contact submissions stats
        total_submissions = ContactSubmission.objects.count()
        unread_submissions = ContactSubmission.objects.filter(is_read=False).count()
        
        # Recent submissions (last 30 days)
        thirty_days_ago = timezone.now() - timedelta(days=30)
        recent_submissions = ContactSubmission.objects.filter(
            submitted_at__gte=thirty_days_ago
        ).count()
        
        # Recent activity
        recent_activity = []
        
        # Recent contact submissions
        recent_contacts = ContactSubmission.objects.filter(
            submitted_at__gte=timezone.now() - timedelta(days=7)
        ).order_by('-submitted_at')[:5]
        
        for contact in recent_contacts:
            recent_activity.append({
                'action': 'New contact submission',
                'description': f'From {contact.name}',
                'timestamp': contact.submitted_at
            })
        
        # Recent page updates
        recent_pages = Page.objects.filter(
            updated_at__gte=timezone.now() - timedelta(days=7)
        ).order_by('-updated_at')[:5]
        
        for page in recent_pages:
            recent_activity.append({
                'action': 'Page updated',
                'description': f'{page.title}',
                'timestamp': page.updated_at
            })
        
        # Sort recent activity by timestamp
        recent_activity.sort(key=lambda x: x['timestamp'], reverse=True)
        
        return Response({
            'total_pages': total_pages,
            'active_pages': active_pages,
            'total_submissions': total_submissions,
            'unread_submissions': unread_submissions,
            'recent_submissions': recent_submissions,
            'recent_activity': recent_activity[:10]
        })

# Authentication views
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny

@api_view(['POST'])
@permission_classes([AllowAny])
def admin_login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    
    if not username or not password:
        return Response({'error': 'Username and password required'}, 
                      status=status.HTTP_400_BAD_REQUEST)
    
    user = authenticate(username=username, password=password)
    
    if user and user.is_superuser:
        login(request, user)
        return Response({
            'success': True,
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'is_superuser': user.is_superuser
            }
        })
    else:
        return Response({'error': 'Invalid credentials or insufficient permissions'}, 
                      status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
def admin_logout(request):
    logout(request)
    return Response({'success': True})

@api_view(['GET'])
def check_auth(request):
    if request.user.is_authenticated and request.user.is_superuser:
        return Response({
            'authenticated': True,
            'user': {
                'id': request.user.id,
                'username': request.user.username,
                'email': request.user.email,
                'is_superuser': request.user.is_superuser
            }
        })
    return Response({'authenticated': False})
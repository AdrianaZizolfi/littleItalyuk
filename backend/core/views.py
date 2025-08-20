# views.py
from rest_framework import viewsets, status, permissions, generics
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
from django.shortcuts import get_object_or_404
from .models import Page, EditableContent, Section, SectionContent, ContactSubmission, SiteSettings, Ticket, TicketScan
from .serializers import (
    PageSerializer, EditableContentSerializer, SectionSerializer, 
    SectionContentSerializer, ContactSubmissionSerializer, SiteSettingsSerializer, PagePublicSerializer, TicketCreateSerializer, 
    TicketSerializer, 
    TicketValidationSerializer,
    TicketScanSerializer
)
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json
import logging

logger = logging.getLogger(__name__)
################################################################################
#
#  ADMIN DASHBOARD VIEWS
#
################################################################################
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

import requests
import json
import base64
from django.conf import settings

def send_email_office365_api(subject, message, recipient_email):
    """
    Send email using Office 365 REST API instead of SMTP
    """
    try:
        # Office 365 REST API endpoint
        url = "https://outlook.office365.com/api/v2.0/me/sendmail"
        
        # Create basic auth header
        credentials = f"{settings.EMAIL_HOST_USER}:{settings.EMAIL_HOST_PASSWORD}"
        encoded_credentials = base64.b64encode(credentials.encode('utf-8')).decode('utf-8')
        
        headers = {
            'Authorization': f'Basic {encoded_credentials}',
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
        
        # Email data structure
        email_data = {
            "Message": {
                "Subject": subject,
                "Body": {
                    "ContentType": "Text",
                    "Content": message
                },
                "ToRecipients": [
                    {
                        "EmailAddress": {
                            "Address": recipient_email
                        }
                    }
                ],
                "From": {
                    "EmailAddress": {
                        "Address": settings.EMAIL_HOST_USER
                    }
                }
            },
            "SaveToSentItems": "true"
        }
        
        # Make the API request
        response = requests.post(url, headers=headers, json=email_data, timeout=30)
        
        print(f"Office 365 API Response Status: {response.status_code}")
        print(f"Office 365 API Response: {response.text}")
        
        # Check if successful (202 = Accepted)
        if response.status_code == 202:
            return True
        else:
            print(f"Office 365 API Error: {response.status_code} - {response.text}")
            return False
            
    except Exception as e:
        print(f"Office 365 API Exception: {str(e)}")
        return False

# Enhanced main view with better debugging
@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def submit_contact_form(request):
    print("🚀 Contact form view called")
    
    serializer = ContactSubmissionSerializer(data=request.data)
    if serializer.is_valid():
        submission = serializer.save()

        # Compose email
        subject = f"📬 Nuova Richiesta di Contatto: {submission.topic}"
        message = (
            f"Nome: {submission.name}\n"
            f"Email: {submission.email}\n"
            f"Soggetto: {submission.topic}\n\n"
            f"Messaggio:\n{submission.message}"
        )
        
        recipient = 'adrianazizolfi0@gmail.com'
        
        # Debug info
        print(f"📧 EMAIL DEBUG INFO:")
        print(f"   From: {settings.EMAIL_HOST_USER}")
        print(f"   To: {recipient}")
        print(f"   Subject: {subject}")
        print(f"   Message preview: {message[:100]}...")
        
        email_sent = send_email_office365_api(subject, message, recipient)
        
        if not email_sent:
            print("Office 365 API failed, trying SMTP fallback...")
            try:
                from django.core.mail import send_mail
                
                # More explicit SMTP call with debugging
                print(f"🔄 Attempting SMTP with:")
                print(f"   Host: {settings.EMAIL_HOST}")
                print(f"   Port: {settings.EMAIL_PORT}")
                print(f"   User: {settings.EMAIL_HOST_USER}")
                print(f"   TLS: {settings.EMAIL_USE_TLS}")
                
                send_mail(
                    subject=subject,
                    message=message,
                    from_email=settings.EMAIL_HOST_USER,
                    recipient_list=[recipient],
                    fail_silently=False  # This will show any errors
                )
                email_sent = True
                print("✅ SMTP fallback successful")
                
            except Exception as e:
                print(f"❌ SMTP fallback failed: {str(e)}")
                print(f"   Exception type: {type(e).__name__}")
        
        if email_sent:
            print("🎉 Email sent successfully")
        else:
            print("💥 Email sending failed completely")

        return Response({
            'success': True, 
            'message': 'Submission saved and email sent.' if email_sent else 'Submission saved but email failed.'
        }, status=status.HTTP_201_CREATED)
    
    print("❌ Form validation errors:", serializer.errors)
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

###########################################################################
#
# FRONTEND VIEWS
#
###########################################################################

@api_view(['GET'])
@permission_classes([AllowAny])
def public_event_page(request):
    page = get_object_or_404(Page, slug='eventi', is_active=True)
    serializer = PagePublicSerializer(page)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def public_sangennaro_page(request):
    page = get_object_or_404(Page, slug='san-gennaro', is_active=True)
    serializer = PagePublicSerializer(page)
    return Response(serializer.data)

##############################################################################
#
# BOOKING SYSTEM
#
##############################################################################


@api_view(['POST'])
@permission_classes([AllowAny])
def create_ticket(request):
    """
    Create a new ticket
    """
    try:
        # Add this debugging line
        print(f"Received data: {request.data}")
        print(f"Content-Type: {request.content_type}")
        
        serializer = TicketCreateSerializer(data=request.data)
        
        if serializer.is_valid():
            ticket = serializer.save()
            logger.info(f"New ticket created: {ticket.ticket_id} for {ticket.email}")
            response_serializer = TicketSerializer(ticket)
            
            return Response({
                'success': True,
                'message': 'Biglietto creato con successo',
                'ticket': response_serializer.data
            }, status=status.HTTP_201_CREATED)
        
        else:
            # Add this debugging line
            print(f"Validation errors: {serializer.errors}")
            return Response({
                'success': False,
                'message': 'Dati non validi',
                'errors': serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)
    
    except Exception as e:
        print(f"Exception occurred: {str(e)}")
        logger.error(f"Error creating ticket: {str(e)}")
        return Response({
            'success': False,
            'message': 'Errore interno del server',
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([AllowAny])
def validate_ticket(request, ticket_id):
    """
    Validate a ticket by ticket_id (for QR code scanning)
    """
    try:
        ticket = get_object_or_404(Ticket, ticket_id=ticket_id)
        
        # Create scan record
        scan_data = {
            'ticket': ticket.id,
            'location': request.GET.get('location', ''),
            'scanned_by': request.GET.get('scanned_by', ''),
            'ip_address': get_client_ip(request)
        }
        
        scan_serializer = TicketScanSerializer(data=scan_data)
        if scan_serializer.is_valid():
            scan_serializer.save()
        
        ticket_serializer = TicketSerializer(ticket)
        
        return Response({
            'success': True,
            'valid': ticket.is_valid(),
            'ticket': ticket_serializer.data,
            'message': 'Biglietto valido' if ticket.is_valid() else 'Biglietto non valido o già utilizzato'
        })
    
    except Ticket.DoesNotExist:
        return Response({
            'success': False,
            'valid': False,
            'message': 'Biglietto non trovato'
        }, status=status.HTTP_404_NOT_FOUND)
    
    except Exception as e:
        logger.error(f"Error validating ticket {ticket_id}: {str(e)}")
        return Response({
            'success': False,
            'message': 'Errore nella validazione del biglietto',
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
@permission_classes([AllowAny])
def use_ticket(request, ticket_id):
    """
    Mark a ticket as used (for entry scanning)
    """
    try:
        ticket = get_object_or_404(Ticket, ticket_id=ticket_id)
        
        if not ticket.is_valid():
            return Response({
                'success': False,
                'message': 'Biglietto non valido o già utilizzato'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Mark as used
        ticket.mark_as_used()
        
        # Create scan record
        scan_data = {
            'ticket': ticket.id,
            'location': request.data.get('location', ''),
            'scanned_by': request.data.get('scanned_by', ''),
            'ip_address': get_client_ip(request)
        }
        
        scan_serializer = TicketScanSerializer(data=scan_data)
        if scan_serializer.is_valid():
            scan_serializer.save()
        
        logger.info(f"Ticket {ticket_id} marked as used")
        
        ticket_serializer = TicketSerializer(ticket)
        
        return Response({
            'success': True,
            'message': 'Biglietto utilizzato con successo',
            'ticket': ticket_serializer.data
        })
    
    except Ticket.DoesNotExist:
        return Response({
            'success': False,
            'message': 'Biglietto non trovato'
        }, status=status.HTTP_404_NOT_FOUND)
    
    except Exception as e:
        logger.error(f"Error using ticket {ticket_id}: {str(e)}")
        return Response({
            'success': False,
            'message': 'Errore nell\'utilizzo del biglietto',
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([AllowAny])
def ticket_stats(request):
    """
    Get ticket statistics (for admin dashboard)
    """
    try:
        total_tickets = Ticket.objects.count()
        valid_tickets = Ticket.objects.filter(status='valid').count()
        used_tickets = Ticket.objects.filter(status='used').count()
        cancelled_tickets = Ticket.objects.filter(status='cancelled').count()
        
        today_tickets = Ticket.objects.filter(
            created_at__date=timezone.now().date()
        ).count()
        
        return Response({
            'success': True,
            'stats': {
                'total': total_tickets,
                'valid': valid_tickets,
                'used': used_tickets,
                'cancelled': cancelled_tickets,
                'created_today': today_tickets
            }
        })
    
    except Exception as e:
        logger.error(f"Error getting ticket stats: {str(e)}")
        return Response({
            'success': False,
            'message': 'Errore nel recupero delle statistiche',
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


def get_client_ip(request):
    """Get client IP address"""
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip


# Alternative view using function-based view without DRF (if you prefer simpler approach)
@csrf_exempt
def create_ticket_simple(request):
    """
    Simple function-based view for creating tickets (without DRF)
    """
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            
            # Create ticket
            ticket = Ticket.objects.create(
                ticket_id=data['ticket_id'],
                full_name=data['full_name'],
                email=data['email'],
                phone_number=data.get('phone_number', ''),
                qr_code_url=data['qr_code_url'],
                event_name=data.get('event_name', 'San Gennaro Fest 2025')
            )
            
            return JsonResponse({
                'success': True,
                'message': 'Biglietto creato con successo',
                'ticket_id': ticket.ticket_id
            })
        
        except Exception as e:
            return JsonResponse({
                'success': False,
                'message': 'Errore nella creazione del biglietto',
                'error': str(e)
            }, status=400)
    
    return JsonResponse({'error': 'Method not allowed'}, status=405)
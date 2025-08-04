# from django.urls import path
# from . import views

# urlpatterns = [
#     path('contact/', views.submit_contact_form, name='submit_contact_form'),
# ]

# from django.urls import path, include
# from rest_framework.routers import DefaultRouter
# from .views import PageViewSet, SectionViewSet
# from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

# router = DefaultRouter()
# router.register(r'pages', PageViewSet, basename='page')
# router.register(r'sections', SectionViewSet, basename='section')

# urlpatterns = [
#     path('api/', include(router.urls)),
#     path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
#     path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
# ]

# urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    PageViewSet, SectionViewSet, ContactSubmissionViewSet, 
    SiteSettingsViewSet, AdminDashboardViewSet,
    admin_login, admin_logout, check_auth, submit_contact_form, public_event_page, public_sangennaro_page, create_ticket, create_ticket_simple, validate_ticket, use_ticket,
    ticket_stats
)

router = DefaultRouter()
router.register(r'pages', PageViewSet, basename='page')
router.register(r'sections', SectionViewSet, basename='section')
router.register(r'contact-submissions', ContactSubmissionViewSet, basename='contact-submission')
router.register(r'site-settings', SiteSettingsViewSet, basename='site-settings')
router.register(r'dashboard', AdminDashboardViewSet, basename='dashboard')

urlpatterns = [
    path('api/public/pages/eventi/', public_event_page, name='public_eventi'),
    path('api/public/pages/san-gennaro/', public_sangennaro_page, name='public_sangennaro'),
    path('api/', include(router.urls)),
    path('api/contact/', submit_contact_form, name='submit_contact_form'),
    path('api/auth/login/', admin_login, name='admin_login'),
    path('api/auth/logout/', admin_logout, name='admin_logout'),
    path('api/auth/check/', check_auth, name='check_auth'),
    ######################################################################
    # BOOKING
    ######################################################################
    # Ticket creation
    path('api/tickets/', create_ticket, name='create_ticket'),
    
    # Alternative simple endpoint (if you prefer non-DRF approach)
    path('api/tickets/simple/', create_ticket_simple, name='create_ticket_simple'),
    
    # Ticket validation and usage
    path('api/tickets/<str:ticket_id>/validate/', validate_ticket, name='validate_ticket'),
    path('api/tickets/<str:ticket_id>/use/', use_ticket, name='use_ticket'),
    
    # Statistics (for admin)
    path('api/tickets/stats/', ticket_stats, name='ticket_stats'),
]
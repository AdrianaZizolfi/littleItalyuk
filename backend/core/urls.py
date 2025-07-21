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
    admin_login, admin_logout, check_auth, submit_contact_form
)

router = DefaultRouter()
router.register(r'pages', PageViewSet, basename='page')
router.register(r'sections', SectionViewSet, basename='section')
router.register(r'contact-submissions', ContactSubmissionViewSet, basename='contact-submission')
router.register(r'site-settings', SiteSettingsViewSet, basename='site-settings')
router.register(r'dashboard', AdminDashboardViewSet, basename='dashboard')

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/contact/', submit_contact_form, name='submit_contact_form'),
    path('api/auth/login/', admin_login, name='admin_login'),
    path('api/auth/logout/', admin_logout, name='admin_logout'),
    path('api/auth/check/', check_auth, name='check_auth'),
]
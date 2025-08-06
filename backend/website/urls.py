# urlpatterns = [
#     path('admin/', admin.site.urls),
#     path('api/', include('core.urls')),
# ]

from django.urls import path, re_path, include
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.views.static import serve
import re
import os

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('core.urls')),
]

# Serve static files (for collectstatic files)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

# Serve media files
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# IMPORTANT: Add this to serve your Vite assets directly
# This handles /assets/* URLs that Vite generates
urlpatterns += [
    re_path(r'^assets/(?P<path>.*)$', serve, {
        'document_root': os.path.join(settings.BASE_DIR, 'client', 'dist', 'assets'),
    }),
]

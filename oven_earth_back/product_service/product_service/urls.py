"""
URL configuration for product_service project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from product_management.views import BakeryItemViewSet
from cart_management.views import CartItemViewSet
from order_management.views import OrderViewSet
from django.conf import settings                      
from django.conf.urls.static import static
from django.http import HttpResponse

router = routers.DefaultRouter()
router.register(r'items', BakeryItemViewSet)
router.register(r'cart', CartItemViewSet)
router.register(r'orders', OrderViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('', lambda request: HttpResponse('Hello')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

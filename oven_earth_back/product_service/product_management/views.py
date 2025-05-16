from rest_framework import viewsets
from .models import BakeryItem
from .serializers import BakeryItemSerializer
from django_filters.rest_framework import DjangoFilterBackend
# Create your views here.

class BakeryItemViewSet(viewsets.ModelViewSet):
    queryset = BakeryItem.objects.all().order_by('-id')
    serializer_class = BakeryItemSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['recommend']
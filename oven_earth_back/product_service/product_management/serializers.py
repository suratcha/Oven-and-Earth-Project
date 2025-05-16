from rest_framework import serializers
from .models import BakeryItem

class BakeryItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = BakeryItem
        fields = '__all__'
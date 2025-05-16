from rest_framework import serializers
from product_management.models import BakeryItem
from product_management.serializers import BakeryItemSerializer
from .models import CartItem
        
class CartItemSerializer(serializers.ModelSerializer):
    product = BakeryItemSerializer(read_only=True)
    
    class Meta:
        model = CartItem
        fields = '__all__'
from rest_framework import viewsets
from rest_framework.response import Response
from product_management.models import BakeryItem
from .models import CartItem
from .serializers import CartItemSerializer

# Create your views here.
class CartItemViewSet(viewsets.ModelViewSet):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer

    def create(self, request, *args, **kwargs):
        product_id = request.data.get("product")
        quantity = request.data.get("quantity", 1)

        try:
            product = BakeryItem.objects.get(id=product_id)
        except BakeryItem.DoesNotExist:
            return Response({"error": "Product not found"}, status=400)
        existing_item = CartItem.objects.filter(product=product).first()

        if existing_item:
            existing_item.quantity += quantity
            existing_item.save()
            serializer = self.get_serializer(existing_item)
            return Response(serializer.data, status=200)
        else:
            cart_item = CartItem.objects.create(product=product, quantity=quantity)
            serializer = self.get_serializer(cart_item)
            return Response(serializer.data, status=201)
        
    def get_serializer_context(self):
        return {'request': self.request}

    def perform_update(self, serializer):
        serializer.save()

    def perform_destroy(self, instance):
        instance.delete()
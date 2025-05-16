from rest_framework import serializers
from .models import Order, OrderItem
from product_management.models import BakeryItem

class OrderItemSerializer(serializers.ModelSerializer):
    product_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = OrderItem
        fields = ['product_id', 'product_name', 'quantity', 'price']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields =  '__all__'

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        order = Order.objects.create(**validated_data)

        for item in items_data:
            product_id = item.pop('product_id')
            product = BakeryItem.objects.get(id=product_id)

            OrderItem.objects.create(
                order=order,
                product=product,
                product_name=product.name,
                price=item['price'],
                quantity=item['quantity']
            )

        return order
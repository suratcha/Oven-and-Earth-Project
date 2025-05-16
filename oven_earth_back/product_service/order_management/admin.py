from django.contrib import admin
from .models import Order, OrderItem
# Register your models here.
class OrderItemInline(admin.TabularInline): 
    model = OrderItem
    extra = 0 
    readonly_fields = ['product_name', 'price', 'quantity']
    can_delete = False

class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'customer_name', 'phone', 'total', 'created_at']
    list_filter = ['created_at', 'delivery_method', 'payment_method']
    search_fields = ['customer_name', 'phone']
    inlines = [OrderItemInline] 

admin.site.register(Order, OrderAdmin)
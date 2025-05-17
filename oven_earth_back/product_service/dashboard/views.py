from django.shortcuts import render
from order_management.models import Order, OrderItem
from django.db.models import Sum, Count
from datetime import date

# Create your views here.
def admin_dashboard(request):
    today = date.today()
    today_orders = Order.objects.filter(created_at__date=today)
    delivered_today = today_orders.filter(status='delivered')

    total_sales = Order.objects.aggregate(total=Sum('total'))['total'] or 0

    best_sellers = (
        OrderItem.objects.values('product_name')
        .annotate(quantity=Sum('quantity'))
        .order_by('-quantity')[:5]
    )

    context = {
        'today_orders_count': today_orders.count(),
        'delivered_today_count': delivered_today.count(),
        'total_sales': total_sales,
        'best_sellers': best_sellers,
    }
    return render(request, 'dashboard/admin_dashboard.html', context)
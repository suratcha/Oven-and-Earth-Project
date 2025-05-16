from django.contrib import admin
from .models import BakeryItem

# Register your models here.
class BakeryAdmin(admin.ModelAdmin):
    list_display = ['title', 'price', 'recommend']
    search_fields = ['title']
    list_filter = ['recommend']

admin.site.register(BakeryItem)
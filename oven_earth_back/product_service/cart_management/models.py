from django.db import models
from product_management.models import BakeryItem

# Create your models here.
class CartItem(models.Model):
    product = models.ForeignKey(BakeryItem, on_delete=models.CASCADE, default=1)
    quantity = models.IntegerField(default=1)
    
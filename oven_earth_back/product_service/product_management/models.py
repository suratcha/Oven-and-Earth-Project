from django.db import models

# Create your models here.
class BakeryItem(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    recommend = models.BooleanField(default = False)
    food_allergy = models.CharField(max_length=100)
    description = models.TextField(null=True, blank=True)
    image = models.ImageField(upload_to='bakery_image/', blank=True, null=True)
    ingredients = models.TextField(blank=True)
from django.db import models

class DummyDashboard(models.Model):
    class Meta:
        managed = False 
        verbose_name = "Dashboard"
        verbose_name_plural = "Dashboard"
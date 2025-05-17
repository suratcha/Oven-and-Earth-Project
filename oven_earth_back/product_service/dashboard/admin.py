from django.contrib import admin
from django.urls import reverse
from django.http import HttpResponseRedirect
from .models import DummyDashboard

@admin.register(DummyDashboard)
class DashboardAdmin(admin.ModelAdmin):
    def changelist_view(self, request, extra_context=None):
        return HttpResponseRedirect(reverse('admin-dashboard'))

    def has_add_permission(self, request): return False
    def has_change_permission(self, request, obj=None): return False
    def has_delete_permission(self, request, obj=None): return False
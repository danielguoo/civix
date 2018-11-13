from django.urls import path
from core import views

urlpatterns = [
    path('core/', views.event_list),
    path('core/<int:pk>/', views.event_detail),
]
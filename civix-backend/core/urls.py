from django.urls import path
from core import views

urlpatterns = [
    path('core/all_events/', views.event_list),
    path('core/event/<int:pk>/', views.event_detail),
    path('core/items_in_event/<int:pk>/', views.item_list),
    path('core/item/<int:pk>/', views.item_detail),
]
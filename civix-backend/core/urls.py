from django.urls import path
from core import views

urlpatterns = [
    path('events/', views.EventList.as_view()),
    path('events/<int:pk>/', views.EventDetail.as_view()),
    path('items/', views.ItemList.as_view()),
    path('items/<int:pk>/', views.ItemDetail.as_view()),
    path('posts/', views.PostList.as_view()),
    path('posts/<int:pk>/', views.PostDetail.as_view()),
]
from django.urls import path
from core import views

urlpatterns = [
    path('users/', views.GetUsers.as_view()),
    path('users/<int:pk>/', views.GetUser.as_view()),
    path('profiles/', views.CreateOrGetProfiles.as_view()),
    path('profiles/<int:pk>/', views.GetUpdateDeleteProfile.as_view()),
    path('calendars/', views.CreateOrGetCalendars.as_view()),
    path('calendars/<int:pk>/', views.GetUpdateDeleteCalendar.as_view()),
    path('events/', views.CreateOrGetEvents.as_view()),
    path('events/<int:pk>/', views.GetUpdateDeleteEvent.as_view()),
    path('items/', views.CreateOrGetItems.as_view()),
    path('items/<int:pk>/', views.GetUpdateDeleteItem.as_view()),
    path('posts/', views.CreateOrGetPosts.as_view()),
    path('posts/<int:pk>/', views.GetUpdateDeletePost.as_view()),
]
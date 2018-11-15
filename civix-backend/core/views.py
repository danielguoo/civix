from rest_framework import generics
from django.contrib.auth.models import User
from core.models import Profile, Event, Item, Post
from core.serializers import ProfileSerializer, EventSerializer, ItemSerializer, PostSerializer

class EventList(generics.ListCreateAPIView):
    """
    Get all events or Create a new event.
    """
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class EventDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Get, Update, or Delete a specific event.
    """
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class ItemList(generics.ListCreateAPIView):
    """
    Get all events or Create a new item.
    """
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

class ItemDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Get, Update, or Delete a specific item.
    """
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

class PostList(generics.ListCreateAPIView):
    """
    Get all events or Create a new post.
    """
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Get, Update, or Delete a specific post.
    """
    queryset = Post.objects.all()
    serializer_class = PostSerializer
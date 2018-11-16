from rest_framework import generics
from django.contrib.auth.models import User
from core.models import Profile, Event, Item, Post
from core.serializers import ProfileSerializer, EventSerializer, ItemSerializer, PostSerializer

class EventList(generics.ListCreateAPIView):
    """
    get:
        Return a list of all events.
    post:
        Create a new event instance.
    """
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class EventDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    get:
        Return an event instance.
    put:
        Update an event instance.
    delete:
        Delete an event instance.
    """
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class ItemList(generics.ListCreateAPIView):
    """
    get:
        Return a list of all items.
    post:
        Create a new item instance.
    """
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

class ItemDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    get:
        Return an item instance.
    put:
        Update an item instance.
    delete:
        Delete an item instance.
    """
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

class PostList(generics.ListCreateAPIView):
    """
    get:
        Return a list of all posts.
    post:
        Create a new post instance.
    """
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    get:
        Return a post instance.
    put:
        Update a post instance.
    delete:
        Delete a post instance.
    """
    queryset = Post.objects.all()
    serializer_class = PostSerializer
from rest_framework import generics
from django.contrib.auth.models import User
from core.models import Profile, Event, Calendar, Item, Post
from core.serializers import UserSerializer, ProfileSerializer, EventSerializer, CalendarSerializer, ItemSerializer, PostSerializer

class GetUsers(generics.ListAPIView):
    """
    GET:
        Return a list of all users.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer


class GetUser(generics.RetrieveAPIView):
    """
    GET:
        Return a user instance.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer

class CreateOrGetProfiles(generics.ListCreateAPIView):
    """
    GET:
        Return a list of all profiles.
    POST:
        Create a new profile instance.
    """
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

class GetUpdateDeleteProfile(generics.RetrieveUpdateDestroyAPIView):
    """
    GET:
        Return a profile instance.
    PUT:
        Update a profile instance.
    DELETE:
        Delete a profile instance.
    """
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

class CreateOrGetCalendars(generics.ListCreateAPIView):
    """
    GET:
        Return a list of all calendars.
    POST:
        Create a new calendar instance.
    """
    queryset = Calendar.objects.all()
    serializer_class = CalendarSerializer

class GetUpdateDeleteCalendar(generics.RetrieveUpdateDestroyAPIView):
    """
    GET:
        Return a calendar instance.
    PUT:
        Update a calendar instance.
    DELETE:
        Delete a calendar instance.
    """
    queryset = Calendar.objects.all()
    serializer_class = CalendarSerializer

class CreateOrGetEvents(generics.ListCreateAPIView):
    """
    GET:
        Return a list of all events.
    POST:
        Create a new event instance.
    """
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class GetUpdateDeleteEvent(generics.RetrieveUpdateDestroyAPIView):
    """
    GET:
        Return an event instance.
    PUT:
        Update an event instance.
    DELETE:
        Delete an event instance.
    """
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class CreateOrGetItems(generics.ListCreateAPIView):
    """
    GET:
        Return a list of all items.
    POST:
        Create a new item instance.
    """
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

class GetUpdateDeleteItem(generics.RetrieveUpdateDestroyAPIView):
    """
    GET:
        Return an item instance.
    PUT:
        Update an item instance.
    DELETE:
        Delete an item instance.
    """
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

class CreateOrGetPosts(generics.ListCreateAPIView):
    """
    GET:
        Return a list of all posts.
    POST:
        Create a new post instance.
    """
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class GetUpdateDeletePost(generics.RetrieveUpdateDestroyAPIView):
    """
    GET:
        Return a post instance.
    PUT:
        Update a post instance.
    DELETE:
        Delete a post instance.
    """
    queryset = Post.objects.all()
    serializer_class = PostSerializer
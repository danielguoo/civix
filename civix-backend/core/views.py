from rest_framework import generics
from django.contrib.auth.models import User
from core.models import Profile, Event, Calendar, Item, Post
from core.serializers import UserSerializer, ProfileSerializer, EventSerializer, CalendarSerializer, ItemSerializer, PostSerializer
from django.core.mail import send_mail
from django.conf import settings
def email(request,user,password):
    subject = 'Forgot your password? Here it is'
    message = ' Dear user  ' + user + 'her is your password:  ' +  password
    email_from = settings.EMAIL_HOST_USER
    recipient_list = [user]
    send_mail( subject, message, email_from, recipient_list )
    # return redirect('redirect to a new page')
class UserList(generics.ListAPIView):
    """
    get:
        Return a list of all users.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveAPIView):
    """
    get:
        Return a user instance.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer

class ProfileList(generics.ListCreateAPIView):
    """
    get:
        Return a list of all profiles.
    post:
        Create a new profile instance.
    """
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

class ProfileDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    get:
        Return a profile instance.
    put:
        Update a profile instance.
    delete:
        Delete a profile instance.
    """
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

class CalendarList(generics.ListCreateAPIView):
    """
    get:
        Return a list of all calendars.
    post:
        Create a new calendar instance.
    """
    queryset = Calendar.objects.all()
    serializer_class = CalendarSerializer

class CalendarDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    get:
        Return a calendar instance.
    put:
        Update a calendar instance.
    delete:
        Delete a calendar instance.
    """
    queryset = Calendar.objects.all()
    serializer_class = CalendarSerializer

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

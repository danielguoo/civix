from rest_framework import serializers
from django.contrib.auth.models import User
from core.models import Profile, Event, Calendar, Item, Post

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('user', 'dob', 'poliID', 'streetAddress', 'city', 'zipcode', 'state')

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ('id', 'title', 'date', 'briefDescription', 'fullDescription', 'city', 'zipcode', 'state')

class CalendarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Calendar
        fields = ('user', 'events')

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ('id', 'title', 'description', 'event')

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('id', 'item', 'user', 'content', 'onRight', 'upvotes', 'downvotes')
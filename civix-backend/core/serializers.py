from rest_framework import serializers
from django.contrib.auth.models import User
from core.models import Event, Item, Post

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ('id', 'title', 'date', 'description')

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ('id', 'title', 'description', 'event')

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('id', 'item', 'user', 'content', 'onRight', 'upvotes', 'downvotes')
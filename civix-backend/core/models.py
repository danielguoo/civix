from django.db import models
from django.contrib.auth.models import User

class Event(models.Model):
    title = models.CharField(max_length=64, blank=True, default='')
    date = models.DateTimeField()
    description = models.CharField(max_length=280, blank=True, default='')

    def __str__(self):
        return self.title

class Item(models.Model):
    title = models.CharField(max_length=64, blank=True, default='')
    description = models.CharField(max_length=280, blank=True, default='')
    event = models.ForeignKey(Event, on_delete=models.CASCADE)

    def __str__(self):
        return self.title

class Post(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.CharField(max_length=280, blank=True, default='')
    onRight = models.BooleanField(default=False)
    upvotes = models.IntegerField(default=0)
    downvotes = models.IntegerField(default=0)
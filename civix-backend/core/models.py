from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    dob = models.DateField()
    poliID = models.CharField(max_length=32, blank=True, default='')
    streetAddress = models.CharField(max_length=32, blank=True, default='')
    city = models.CharField(max_length=32, blank=True, default='')
    zipcode = models.IntegerField(default=0)
    state = models.CharField(max_length=8, blank=True, default='')

    def __str__(self):
        return self.user.username

class Event(models.Model):
    title = models.CharField(max_length=64, blank=True, default='')
    date = models.DateTimeField()
    briefDescription = models.CharField(max_length=200, blank=True, default='')
    fullDescription = models.CharField(max_length=400, blank=True, default='')
    streetAddress = models.CharField(max_length=32, blank=True, default='')
    city = models.CharField(max_length=32, blank=True, default='')
    zipcode = models.IntegerField(default=0)
    state = models.CharField(max_length=8, blank=True, default='')

    def __str__(self):
        return self.title

class Calendar(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    events = models.ManyToManyField(Event, blank=True)

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
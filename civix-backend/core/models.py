from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    """
    Extend the User class to include date of birth, political identification, and
    place of residency.

    Attributes:
        * user (auth.User): the related user object which Profile extends
        * dob (datefield): the date of birth of the user
        * poliID (string): the political identification of the user
        * streetAddress (string): street address of user
        * city (string): city of residence for user
        * zipcode (int): zipcode of user
        * state (string): state of residence for user
    """
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
    """
    Elections and other political events that can be followed
    by users.

    Attributes:
        * title (string): title of event
        * date (string): date of event
        * briefDescription (string): short summary of event
        * fullDescription (string): complete summary of event
        * streetAddress (string): address of event location
        * city (string): city of event
        * zipcode (int): zipcode of event
        * state (string): state of event
    """
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
    """
    The saved events for a single user.

    Attributes:
        * user (auth.User): the owner of the calendar
        * events (Event): a collection of saved events
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    events = models.ManyToManyField(Event, blank=True)

class Item(models.Model):
    """
    A candidate, law, or proposition up for election.

    Attributes:
        * title (string): title of item
        * description (string): summary of item
        * event (Event): the event that contains this item
    """
    title = models.CharField(max_length=64, blank=True, default='')
    description = models.CharField(max_length=280, blank=True, default='')
    event = models.ForeignKey(Event, on_delete=models.CASCADE)

    def __str__(self):
        return self.title

class Post(models.Model):
    """
    A user's post on a single item.

    Attributes
        * item (Item): item that contains this post
        * user (auth.User): user that owns this post
        * content (string): text content
        * onRight (bool): whether the Post will be displayed on right
        * upvotes (int): number of upvotes for post
        * downvotes (int): number of downvotes for post
    """
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.CharField(max_length=280, blank=True, default='')
    onRight = models.BooleanField(default=False)
    upvotes = models.IntegerField(default=0)
    downvotes = models.IntegerField(default=0)
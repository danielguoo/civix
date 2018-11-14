from django.contrib import admin

from .models import Profile, Event, Item, Post

admin.site.register(Profile)
admin.site.register(Event)
admin.site.register(Item)
admin.site.register(Post)
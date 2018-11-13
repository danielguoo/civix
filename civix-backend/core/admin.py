from django.contrib import admin

from .models import Event, Item, Post

admin.site.register(Event)
admin.site.register(Item)
admin.site.register(Post)
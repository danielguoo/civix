from django.shortcuts import render

from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from core.models import Event, Item, Post
from core.serializers import EventSerializer, ItemSerializer, PostSerializer

def event_list(request):
    """
    Lists all events.
    """
    if request.method == 'GET':
        events = Event.objects.all()
        serializer = EventSerializer(events, many=True)
        return JsonResponse(serializer.data, safe=False)

@csrf_exempt
def event_detail(request, pk):
    """
    Retrieve an event by ID.
    """
    try:
        event = Event.objects.get(pk=pk)
    except Event.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = EventSerializer(event)
        return JsonResponse(serializer.data)

def item_list(request, pk):
    """
    List all items for an event.
    """
    if request.method == 'GET':
        event = Event.objects.get(pk=pk)
        items = event.item_set.all()
        serializer = ItemSerializer(items, many=True)
        return JsonResponse(serializer.data, safe=False)

def item_detail(request, pk):
    """
    Retrieve an Item by ID.
    """
    try:
        item = Event.objects.get(pk=pk)
    except Event.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = EventSerializer(event)
        return JsonResponse(serializer.data)

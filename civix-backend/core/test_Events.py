from django.test import TestCase, Client
from rest_framework.test import APIRequestFactory
from .models import Profile, Event, Item, Post

from django.utils import timezone
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

class CivixEventsTest(TestCase):
    '''
    We use the setUp() function to create the dummy database
    which shall be used to test our APIs. 
    '''
    def setUp(self):
        self.client = Client()

        e = Event.objects.create(title='Fire in the disco', date=timezone.now(), description='Outta control')
        Event.objects.create(title='CO2 at the fire', date=timezone.now(), description='In control')
        Event.objects.create(title='this is boring', date=timezone.now(), description='there is no control in this deterministic universe, alright?')

    '''
    Success Tests
    '''

    def test_Events_retrieve(self):
        res = self.client.get('/events/', follow=True)
        body = res.json()

        #Success indicates status code of 200, 3 objects in the reply and title of "Fire in the disco"
        #Anything else is failure
        self.assertEqual(res.status_code, 200)
        self.assertEqual(len(body), 3)
        self.assertEqual(body[0]["title"], 'Fire in the disco')

    def test_Events_create(self):
        newEvent = {'title': 'Prop 60', 'date':timezone.now(), 'description': 'Legalize ranch'}
        res = self.client.post('/events/', newEvent, content_type='application/json', follow=True)

        #Success indicates status code of 201, 4 objects in the DB, and title of "Prop 60" in the new object
        #Anything else is failure
        self.assertEqual(res.status_code, 201)
        self.assertEqual(self.getItemsInDB('/events/'), 4)
        res = self.client.get('/events/4/')
        body = res.json()
        self.assertEqual(body["title"],"Prop 60")

    def test_Events_delete(self):
        res = self.client.delete('/events/3/')

        #Success indicates status code of 204, 2 objects in the DB
        #Anything else is failure
        self.assertEqual(res.status_code, 204)
        self.assertEqual(self.getItemsInDB('/events/'), 2)

    def test_Events_update(self):
        updateEvent = {'title': 'No fire', 'date':timezone.now(), 'description': 'Meh'}
        res = self.client.put('/events/1/', updateEvent, content_type='application/json', follow=True)
        
        #Success indicates status code of 200, 3 objects in the DB, and title of "No fire"        
        #Anything else is failure
        self.assertEqual(res.status_code, 200)
        self.assertEqual(self.getItemsInDB('/events/'), 3)
        res = self.client.get('/events/1/')
        res = res.json()
        self.assertEqual(res["title"],"No fire")

    '''
    Failure Tests
    '''

    # 2 test cases
    # 1) Wrong URL - Results in 404
    # 2) Missing user - Results in 404
    def test_Events_retrieve_failure(self):
        res1 = self.client.get('/event/', follow=True)
        res2 = self.client.get('/events/5', follow=True)
        self.assertEqual(res1.status_code, 404)
        self.assertEqual(res2.status_code, 404)

    # 2 test cases
    # 1) Bad request body - missing non-nullable field - Results in 400
    # 2) Trying to push to an event to particular URL inaccessible to POST requests - Results in 404
    #Returns a bad request body and doesn't change the number of objects in the table
    def test_Events_create_failure(self):
        newEvent = {'title': 'Prop 60', 'description': 'Legalize ranch'}
        forceNewEvent = {'title': 'Prop 60', 'date':timezone.now(), 'description': 'Legalize ranch'}
        
        res1 = self.client.post('/events/', newEvent, content_type='application/json', follow=True)
        res2 = self.client.post('/events/666', forceNewEvent, content_type='application/json', follow=True)
        self.assertEqual(res1.status_code, 400)
        self.assertEqual(res2.status_code, 404)

        self.assertEqual(self.getItemsInDB('/events/'), 3)

    # 1) Inserting data into Post that doesn't exist - Results in 404
    # 2) Inserting data into wrong url - Results in 405
    def test_Events_delete_failure(self):
        res1 = self.client.delete('/events/333/')
        res2 = self.client.delete('/events/')
        self.assertEqual(res1.status_code, 404)
        self.assertEqual(res2.status_code, 405)
        self.assertEqual(self.getItemsInDB('/events/'), 3)

    # 2 test cases
    # 1) Inserting data into Event that doesn't exist - Results in 404
    # 2) Inserting data into wrong url - Results in 405
    def test_Events_update_failure(self):
        rightUpdateEvent = {'title': 'No fire', 'date':timezone.now(), 'description': 'Meh'}

        res1 = self.client.put('/events/666/', rightUpdateEvent, content_type='application/json', follow=True)
        res2 = self.client.put('/events/', rightUpdateEvent, content_type='application/json', follow=True)
        self.assertEqual(res1.status_code, 404)
        self.assertEqual(res2.status_code, 405)

        # Checks if it's the original data
        self.assertEqual(self.getItemsInDB('/events/'), 3)
        res = self.client.get('/events/1/')
        res = res.json()
        self.assertFalse(res["title"] == "No fire")
        

    def getItemsInDB(self, url):
        status = self.client.get(url, follow=True)
        status = status.json()
        return len(status)

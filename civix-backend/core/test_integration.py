from django.test import TestCase, Client
from rest_framework.test import APIRequestFactory
from .models import Profile, Event, Item, Post

from django.utils import timezone
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

class CivixIntegrationTest(TestCase):
    '''
    We use the setUp() function to create the dummy database
    which shall be used to test our APIs. 
    '''
    def setUp(self):
        User.objects.create_user("Bro", "no@homo.com", "Kill2Thrill")
        self.client = Client()

        self.e = Event.objects.create(title='Fire in the disco', date=timezone.now(), briefDescription='Outta control')

        self.i = Item.objects.create(title='Extinguish fire', description='Umm, ykno', event=self.e)
        self.i2 = Item.objects.create(title='Clean up', description='Char', event=self.e)
        self.i3 = Item.objects.create(title='No', description='No', event=self.e)

    '''
    Success Tests
    '''

    def test_Integration_registration_login(self):
        # First step - register a user
        #Success is status = 201
        #Anything else is failure        
        newuser = {
            "username": "LaddyC",
            "email": "no@yes.com",
            "password1": "Coming2Home!",
            "password2": "Coming2Home!"
        }
        newuser2 = {
            "username": "LaddyA",
            "email": "no1@yes.com",
            "password1": "Coming2Home!",
            "password2": "Coming2Home!"
        }
        res = self.client.post('/rest-auth/registration/', newuser, content_type='application/json', follow=True)
        res2 = self.client.post('/rest-auth/registration/', newuser2, content_type='application/json', follow=True)
        resget = self.client.get('/users/', follow=True)
        body = resget.json()

        self.assertEqual(res.status_code, 201)
        self.assertEqual(res2.status_code, 201)
        self.assertEqual(len(body), 3)

        loginuser = {
            "username": "LaddyA",
            "email": "no1@yes.com",
            "password": "Coming2Home!"
        }

        # Second step - login a user
        #Success is status != 401
        #Anything else is failure
        res = self.client.post('/rest-auth/login/', loginuser, content_type='application/json', confollow=True)
        body = res.json()
        self.assertFalse(res.status_code == 401)

    def test_Integration_newEvent_Item_Calendar(self):
        newEvent = {'title': 'Prop 60', 'date':timezone.now(), 'briefDescription': 'Legalize ranch'}
        newuser2 = {
            "username": "LaddyA",
            "email": "no1@yes.com",
            "password1": "Coming2Home!",
            "password2": "Coming2Home!"
        }        
        #First step - create an event
        #Success is status = 201
        #Anything else is failure
        res = self.client.post('/events/', newEvent, content_type='application/json', follow=True)
        res3 = self.client.get('/events/', follow=True)
        self.assertEqual(res.status_code, 201)
        self.assertEqual(len(res3.json()), 2)
        self.assertEqual(res.status_code, 201)
        
        #second step - register a user
        #Success is status = 201
        #Anything else is failure
        res = self.client.post('/rest-auth/registration/', newuser2, content_type='application/json', follow=True)
        self.assertEqual(res.status_code, 201)

        res = self.client.get('/users/', follow=True)
        self.assertEqual(len(res.json()), 2)

        #Third step - create a new calendar
        #Success is status = 201
        #Anything else is failure
        newcalendar = {"user":1, "events":[]}
        res = self.client.post('/calendars/', newcalendar, content_type="application/json", follow=True)
        self.assertEqual(res.status_code, 201)

        #Success indicates status code of 201, 4 objects in the DB, and title of "Prop 60" in the new object
        #Anything else is failure

    def test_Integration_newuser_profile(self):
        # First step - register a user
        #Success is status = 201
        #Anything else is failure
        newuser = {
            "username": "LaddyC",
            "email": "no@yes.com",
            "password1": "Coming2Home!",
            "password2": "Coming2Home!"
        }
        res = self.client.post('/rest-auth/registration/', newuser, content_type='application/json', follow=True)
        self.assertEqual(res.status_code, 201)        
        resget = self.client.get('/users/2/', follow=True)
        body = resget.json()
        self.assertEqual(body["username"], "LaddyC")

        newprofile = {
            "user": 1,
            "dob": "1996-10-08",
            "poliID": "Republican",
            "streetAddress" : "420 Fire dr",
            "city": "Los Angeles",
            "zipcode" : 90024,
            "state" : "CA"
        }
        #Success is status = 201
        #Anything else is failure
        res = self.client.post('/profiles/', newprofile, content_type="application/json", follow=True)
        self.assertEqual(res.status_code, 201)

    def test_Integration_create_update_calendar(self):
        # First step - create an event
        #Success is status = 201, number of events 2
        #Anything else is failure
        
        newEvent = {'title': 'Prop 60', 'date':timezone.now(), 'briefDescription': 'Legalize ranch'}
        res = self.client.post('/events/', newEvent, content_type='application/json', follow=True)
        res3 = self.client.get('/events/', follow=True)
        self.assertEqual(res.status_code, 201)
        self.assertEqual(len(res3.json()), 2)
        self.assertEqual(res.status_code, 201)

        #Second step - register a user
        #Success is status = 201, two users
        #Anything else is failure
        newuser2 = {
            "username": "LaddyA",
            "email": "no1@yes.com",
            "password1": "Coming2Home!",
            "password2": "Coming2Home!"
        }        
        res = self.client.post('/rest-auth/registration/', newuser2, content_type='application/json', follow=True)
        self.assertEqual(res.status_code, 201)
        res = self.client.get('/users/', follow=True)
        self.assertEqual(len(res.json()), 2)

        #Third Step - create calendar
        #Success is status = 201
        #Anything else is failure
        newcalendar = {"user":2, "events":[]}
        res = self.client.post('/calendars/', newcalendar, content_type="application/json", follow=True)
        self.assertEqual(res.status_code, 201)

        #Fourth step - update calendar
        #Success - 200 for the update, and confirm the first body element is 1 and second element is 2
        #Anything else is failure
        updatecalendar = {"user":2, "events":[1, 2]}
        res = self.client.put('/calendars/2/', updatecalendar, content_type="application/json", follow=True)
        self.assertEqual(res.status_code, 200)
        res = self.client.get('/calendars/2/', follow=True)
        body = res.json()
        self.assertEqual(body["events"][0], 1)
        self.assertEqual(body["events"][1], 2)

from django.test import TestCase, Client
from rest_framework.test import APIRequestFactory
from .models import Profile, Event, Item, Post

from django.utils import timezone
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

class CivixProfileTest(TestCase):
    '''
    We use the setUp() function to create the dummy database
    which shall be used to test our APIs. 
    '''
    def setUp(self):
        self.client = Client()
        self.usr = User.objects.create_user('theBurn', 'chaddy@gmail.com', 'banana')
        usr2 = User.objects.create_user('theWet', 'chaddy@gmail.com', 'fineapple')

        p = Profile.objects.create(user = self.usr, dob=timezone.now(), poliID = 1, 
        address="10 Downing St", city="NYC", zipcode = "90210", state="WY")

    # Login client return true if the profile logs in, false otherwise
    def test_Profile_login(self):
        self.assertEqual(self.client.login(username='theBurn', password='banana'), True)
    
    # Logout client returns None if successful else throws an error
    def test_Profile_logout(self):
        self.assertEqual(self.client.logout(), None)
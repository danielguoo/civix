from django.test import TestCase, Client
from rest_framework.test import APIRequestFactory
from .models import Profile, Event, Item, Post

from django.utils import timezone
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

class CivixPostTest(TestCase):
    '''
    We use the setUp() function to create the dummy database
    which shall be used to test our APIs. 
    '''
    def setUp(self):
        self.client = Client()
        usr = User.objects.create_user('theBurn', 'chaddy@gmail.com', 'banana')
        usr2 = User.objects.create_user('theWet', 'chaddy@gmail.com', 'fineapple')

        e = Event.objects.create(title='Fire in the disco', date=timezone.now(), briefDescription='Outta control')
        i = Item.objects.create(title='Extinguish fire', description='Umm, ykno', event=e)

        p = Post.objects.create(item=i, user=usr, content='coughcough', onRight=True, upvotes=4, downvotes=0)
        Post.objects.create(item=i, user=usr2, content='Chssss', onRight=True, upvotes=2, downvotes=0)
        Post.objects.create(item=i, user=usr, content='Ouch', onRight=True, upvotes=2, downvotes=-999)

    '''
    Success Tests
    '''

    def test_Posts_retrieve(self):
        res = self.client.get('/posts/', follow=True)
        body = res.json()

        #Success is status = 200, 3 objects in reply and content[0]=coughcough, content[2]=Ouch.
        #Anything else is failure
        self.assertEqual(res.status_code, 200)
        self.assertEqual(len(body), 3)
        self.assertEqual(body[0]["content"], 'coughcough')
        self.assertEqual(body[2]["content"], 'Ouch')

    def test_Posts_create(self):
        newPost = {'content': 'What dis', 'user':1, 'item':1}
        res = self.client.post('/posts/', newPost, content_type='application/json', follow=True)

        #Success indicates status code of 201, 4 objects in the DB, and title of "I disagree" in the new object
        #Anything else is failure
        self.assertEqual(res.status_code, 201)
        self.assertEqual(self.getpostsInDB('/posts/'), 4)
        res = self.client.get('/posts/4/')
        body = res.json()
        self.assertEqual(body["content"],"What dis")

    def test_Posts_delete(self):
        res = self.client.delete('/posts/3/')

        #Success indicates status code of 204, 2 objects in the DB
        #Anything else is failure
        self.assertEqual(res.status_code, 204)
        self.assertEqual(self.getpostsInDB('/posts/'), 2)

    def test_Posts_update(self):
        updateEvent = {'content': 'I disagree', 'item':1, 'user':1}
        res = self.client.put('/posts/1/', updateEvent, content_type='application/json', follow=True)

        #Success indicates status code of 200, 3 objects in the DB, and title of "I disagree"        
        #Anything else is failure
        self.assertEqual(res.status_code, 200)
        self.assertEqual(self.getpostsInDB('/posts/'), 3)
        res = self.client.get('/posts/1/')
        body = res.json()
        self.assertEqual(body["content"],"I disagree")

    '''
    Failure Tests
    '''

    # 2 test cases
    # 1) Wrong URL
    # 2) Missing Post
    def test_Posts_retrieve_failure(self):
        res1 = self.client.get('/post/', follow=True)
        res2 = self.client.get('/posts/5', follow=True)
        self.assertEqual(res1.status_code, 404)
        self.assertEqual(res2.status_code, 404)

    # 3 test cases
    # 1) Bad request body - missing non-nullable field - Results in 400
    # 2) Bad request body - foreign key error - Results in 400
    # 3) Trying to push to an event to particular URL inaccessible to POST requests - Results in 404
    # Returns a bad request body and doesn't change the number of objects in the table
    def test_Posts_create_failure(self):
        newMissingPost = {'content': 'I disagree'}
        newFKPost = {'content': 'I disagree', 'item':2, 'user':2}
        forcenewPost = {'content': 'I disagree', 'item':1, 'user':1}
                
        res1 = self.client.post('/posts/', newMissingPost, content_type='application/json', follow=True)
        res2 = self.client.post('/posts/', newFKPost, content_type='application/json', follow=True)
        res3 = self.client.post('/posts/666', forcenewPost, content_type='application/json', follow=True)

        self.assertEqual(res1.status_code, 400)
        self.assertEqual(res2.status_code, 400)
        self.assertEqual(res3.status_code, 404)
        self.assertEqual(self.getpostsInDB('/posts/'), 3)

    # 1) Inserting data into Post that doesn't exist - Results in 404
    # 2) Inserting data into wrong url - Results in 405
    def test_Posts_delete_failure(self):
        res1 = self.client.delete('/posts/333/')
        res2 = self.client.delete('/posts/')
        self.assertEqual(res1.status_code, 404)
        self.assertEqual(res2.status_code, 405)
        self.assertEqual(self.getpostsInDB('/posts/'), 3)

    # 3 test cases
    # 1) Inserting data into Post that doesn't exist - Results in 404
    # 2) Inserting data into wrong url - Results in 405
    def test_Posts_update_failure(self):
        rightUpdatePost = {'content': 'what am i doin', 'item':1, 'user':1}

        res1 = self.client.put('/posts/666/', rightUpdatePost, content_type='application/json', follow=True)
        res2 = self.client.put('/posts/', rightUpdatePost, content_type='application/json', follow=True)
        self.assertEqual(res1.status_code, 404)
        self.assertEqual(res2.status_code, 405)

        # Checks if it's the original data
        self.assertEqual(self.getpostsInDB('/posts/'), 3)
        res = self.client.get('/posts/1/')
        body = res.json()
        self.assertFalse(body["content"] == "what am i doin")
        

    def getpostsInDB(self, url):
        status = self.client.get(url, follow=True)
        status = status.json()
        return len(status)

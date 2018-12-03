# from django.test import TestCase, Client
# from rest_framework.test import APIRequestFactory
# from .models import Profile, Event, Item, Post

# from django.utils import timezone
# from django.contrib.auth.models import User
# from django.contrib.auth import authenticate

# class CivixItemTest(TestCase):
#     '''
#     We use the setUp() function to create the dummy database
#     which shall be used to test our APIs. 
#     '''
#     def setUp(self):
#         self.client = Client() 

#         self.e = Event.objects.create(title='Fire in the disco', date=timezone.now(), briefDescription='Outta control')

#         self.i = Item.objects.create(title='Extinguish fire', description='Umm, ykno', event=self.e)
#         self.i2 = Item.objects.create(title='Clean up', description='Char', event=self.e)
#         self.i3 = Item.objects.create(title='No', description='No', event=self.e)

#     '''
#     Success Tests
#     '''

#     def test_Items_retrieve(self):
#         res = self.client.get('/items/', follow=True)
#         body = res.json()

#         #Success is status = 200, 3 objects in reply and the respective titles below.
#         #Anything else is failure
#         self.assertEqual(res.status_code, 200)
#         self.assertEqual(len(body), 3)
#         self.assertEqual(body[0]["title"], 'Extinguish fire')
#         self.assertEqual(body[2]["title"], 'No')

#     def test_Items_create(self):
#         newItem = {'title': 'Prop 60', 'description': 'Legalize ranch', 'event':1}
#         res = self.client.post('/items/', newItem, content_type='application/json', follow=True)

#         #Success indicates status code of 201, 4 objects in the DB, and title of "Prop 60" in the new object
#         #Anything else is failure
#         self.assertEqual(res.status_code, 201)
#         self.assertEqual(self.getItemsInDB('/items/'), 4)
#         res = self.client.get('/items/4/')
#         body = res.json()
#         self.assertEqual(body["title"],"Prop 60")

#     def test_Items_delete(self):
#         res = self.client.delete('/items/3/')

#         #Success indicates status code of 204, 2 objects in the DB
#         #Anything else is failure
#         self.assertEqual(res.status_code, 204)
#         self.assertEqual(self.getItemsInDB('/items/'), 2)

#     def test_Items_update(self):
#         updateEvent = {'title': 'No fire', 'event':1}
#         res = self.client.put('/items/1/', updateEvent, content_type='application/json', follow=True)

#         #Success indicates status code of 200, 3 objects in the DB, and title of "No fire"        
#         #Anything else is failure
#         self.assertEqual(res.status_code, 200)
#         self.assertEqual(self.getItemsInDB('/items/'), 3)
#         res = self.client.get('/items/1/')
#         body = res.json()
#         self.assertEqual(body["title"],"No fire")

#     '''
#     Failure Tests
#     '''

#     # 2 test cases
#     # 1) Wrong URL - Results in 404
#     # 2) Missing item - Results in 404
#     def test_Items_retrieve_failure(self):
#         res1 = self.client.get('/item/', follow=True)
#         res2 = self.client.get('/items/5', follow=True)
#         self.assertEqual(res1.status_code, 404)
#         self.assertEqual(res2.status_code, 404)

#     # 3 test cases
#     # 1) Bad request body - missing non-nullable field - Results in 400
#     # 2) Bad request body - foreign key error - Results in 400
#     # 3) Trying to push to an event to particular URL inaccessible to POST requests - Results in 404
#     def test_Items_create_failure(self):
#         newMissingItem = {'title': 'Prop 60', 'description': 'Legalize ranch'}
#         newFKItem = {'title': 'Prop 60', 'description': 'Legalize ranch', 'event':2}
#         forcenewItem = {'title': 'Prop 60', 'description': 'Legalize ranch', 'event':1}
                
#         res1 = self.client.post('/items/', newMissingItem, content_type='application/json', follow=True)
#         res2 = self.client.post('/items/', newFKItem, content_type='application/json', follow=True)
#         res3 = self.client.post('/items/666', forcenewItem, content_type='application/json', follow=True)

#         self.assertEqual(res1.status_code, 400)
#         self.assertEqual(res2.status_code, 400)
#         self.assertEqual(res3.status_code, 404)
#         self.assertEqual(self.getItemsInDB('/items/'), 3)

#     # 2 test cases
#     # 1) Post doesn't exist - Results in 404
#     # 2) Put sent to wrong url - Results in 405
#     # Returns a missing request message/doesn't accept that HTTP method and doesn't change the number of objects in the table
#     def test_Items_delete_failure(self):
#         res1 = self.client.delete('/items/333/')
#         res2 = self.client.delete('/items/')
#         self.assertEqual(res1.status_code, 404)
#         self.assertEqual(res2.status_code, 405)
#         self.assertEqual(self.getItemsInDB('/items/'), 3)

#     # 2 test cases
#     # 1) Inserting data into Item that doesn't exist - Results in 404
#     # 2) Inserting data into wrong url - Results in 405
#     def test_Items_update_failure(self):
#         rightUpdateItem = {'title': 'No fire', 'description': 'Meh'}

#         res1 = self.client.put('/items/666/', rightUpdateItem, content_type='application/json', follow=True)
#         res2 = self.client.put('/items/', rightUpdateItem, content_type='application/json', follow=True)
#         self.assertEqual(res1.status_code, 404)
#         self.assertEqual(res2.status_code, 405)

#         # Checks if it's the original data
#         self.assertEqual(self.getItemsInDB('/items/'), 3)
#         res = self.client.get('/items/1/')
#         body = res.json()
#         self.assertFalse(body["title"] == "No fire")
        

#     def getItemsInDB(self, url):
#         status = self.client.get(url, follow=True)
#         status = status.json()
#         return len(status)

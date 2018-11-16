#### Civix - Voting Awareness App

Team Members:

Daniel Guo 

Michael Grieve 

Michelle Duan

Deven Agrawal

Kunjan Patel

#### Civix-Backend Directory Structure

civix-backend/
* manage.py -> manages database and server

* backend/settings.py -> contains the settings and list of installed apps for the project
* backend/urls.py -> main entry points for API, urls for admin, authentication, and core

* core/urls.py -> endpoints for CRUD operations on database models
* core/views.py -> methods for handling HTTP requests, serializes JSON data to retrieve and alter objects in database
* core/models.py -> defines database models for project
* core/serializers.py -> serializes data for models to be received and sent as JSON

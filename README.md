#### Civix - Voting Awareness App

Team Members:

Daniel Guo

Michael Grieve 

Michelle Duan

Deven Agrawal

Kunjan Patel


#### Civix-Backend Directory Structure

civix-backend/

* manage.py -> manages database and used to start server
* db.sqlite3 -> database
---
* backend/settings.py -> contains the settings and installed apps for the project
* backend/urls.py -> main entry points for API: urls for admin, authentication, and core app
---
* core/urls.py -> endpoints for CRUD operations on database models
* core/views.py -> methods for handling HTTP requests
* core/models.py -> defines database models for project
* core/serializers.py -> serializes data for models to be received and sent as JSON
* core/ -> contains tests for each database model
---
* /docs/_build/html/modules/views.html -> documentation for endpoint methods
* /docs/_build/html/modules/models.html -> documentation for database classes

#### Civix- Frontend Structure
civix-client/src
* index.js - main entry point for frontend, where React is initialized
* components/ - contains a seperate folder for each component. Each folder contains a Javascript file for the component
* and its corresponding CSS file
* components/App - entry component for App, encompasses everything else
* components/NavigationBar - navigation bar component
* components/Account - profile page component
* components/Contact - Representatives Hub component
* components/Issues - Ballot Board component
* components/Issue - Ballot Board thread component
* components/Login - login page component
* components/Signup - registration page component
* components/Calendar - calendar dashboard component

civix-client/docs 
* index.html - HTML frontend documentation, auto-generated using DocumentationJS 

To regenerate documentation for all frontend components in src directory, run commands: 

#### Install command

```
npm install -g documentation 
```
#### Regenerate documentation with returned path 

```
/returned/path/to/command build src/** -f html -o docs 
```

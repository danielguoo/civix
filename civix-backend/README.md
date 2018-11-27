# Setting up the Django Backend

### Requirements

* Python version 3 or greater

### Set up a virtual environment

#### Create a virtual environment 

```
/civix/civix-backend$ virtualenv env
```

#### Activates the virtual environment

```
source env/bin/activate
```

#### Install dependencies

```
pip install django
pip install djangorestframework
pip install django-rest-swagger
pip install django-rest-auth
```

#### Setup database

```
python3 manage.py migrate
```

#### Start the server

```
python3 manage.py runserver
```

#### Create a superuser

```
python3 manage.py createsuperuser
```

### Special Endpoints

* http://localhost:8000/admin/ - Manage objects in the database
* http://localhost:8000/docs/ - Generated documentation for API, lists all API endpoints



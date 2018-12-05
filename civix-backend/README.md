# Django Backend

## Documentation

Documentation located in /civix-backend/docs/_build/html/modules/

See instruction below to generate documentation files

## Setting up the backend

### Requirements

* Python version 3 or greater

#### Make sure you are in the /civix-backend/ directory

#### Create a virtual environment

```
virtualenv env
```

#### Activate the virtual environment

```
source env/bin/activate
```

#### Install dependencies

```
pip install django
pip install djangorestframework
pip install django-rest-swagger
pip install django-rest-auth
pip install django-allauth
pip install django-cors-headers
pip install sphinx
```

#### Setup the database

```
python3 manage.py migrate
```

#### Start the server

```
python3 manage.py runserver
```

#### Create a superuser (needed to access http://localhost:8000/admin/)

```
python3 manage.py createsuperuser
```

### Generate documentation for models.py and views.py

Change directory to /civix-backend/docs

```
make html
```

#### The generated docs will be in /civix-backend/docs/_build/html/modules/

### Special Endpoints

* http://localhost:8000/admin/ - Manage objects in the database
* http://localhost:8000/docs/ - Documentation for client-side endpoints



# Setting up the Django Backend

### Requirements

* Python version 3 or greater

#### Make sure you are in the /civix-backend/ directory

#### Activate the virtual environment

```
source env/bin/activate
```

#### Start the server

```
python3 manage.py runserver
```

#### Create a superuser (needed to access http://localhost:8000/admin/)

```
python3 manage.py createsuperuser
```

### Special Endpoints

* http://localhost:8000/admin/ - Manage objects in the database
* http://localhost:8000/docs/ - Generated documentation for API, lists all API endpoints



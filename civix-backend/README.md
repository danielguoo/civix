Setting up the Django Backend

Make sure you are in the cixix-backend directory

Make sure you have Python version 3 or greater

//set up your virtual environment

//creates your virtual environment
virtualenv env
//activates your virtual environment
source env/bin/activate

//install dependencies
pip install django
pip install djangorestframework
pip install django-rest-swagger
pip install django-rest-auth

//setup your database
python3 manage.py migrate

//start the server
python3 manage.py runserver


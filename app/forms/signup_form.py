from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, Length, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def password_match(form, field):
    repeat_password = field.data
    original_password = form.data['password']
    if(repeat_password != original_password):
        raise ValidationError('Password Must Match')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(message='Please provide your username'), username_exists, Length(max=20, message='Username must be under 20 characters')])
    email = StringField('email', validators=[DataRequired(message='Please provide your email'), user_exists, Email(message="Please provide correct email address"), Length(max=50, message='Email address must be under 50 characters')])
    password = StringField('password', validators=[DataRequired(message='Password must be provided')])
    repeatPassword = StringField('repeat', validators=[password_match])

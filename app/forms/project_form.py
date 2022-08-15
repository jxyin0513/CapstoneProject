from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField
from wtforms.validators import DataRequired, Email, Length, ValidationError
from datetime import date

def date_check(form, field):
    if(field.data < date.today()):
        raise ValidationError('Please provide proper deadline.')

class ProjectForm(FlaskForm):

    userId = IntegerField('userId', validators=[DataRequired(message="Please provide user ID")])
    name = StringField('name', validators=[DataRequired(message='Please provide name of your project'), Length(min=1, max=30, message="Project name must be less than 30 characters")])
    description = StringField('description', validators=[DataRequired('Please briefly describe your project'), Length(min=1, max=255, message="Please provide your description under 255 characters.")])
    startdate = DateField('startdate', validators=[DataRequired(message='Start date must be provided')])
    deadline = DateField('deadline', validators=[DataRequired(message='Deadline must be provided'), date_check])

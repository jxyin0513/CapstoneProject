from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField, DateTimeField
from wtforms.validators import DataRequired, Length, ValidationError
from datetime import datetime, date
from app.models import Project

def date_check(form, field):
    project=Project.query.get(form.data['projectId'])
    print(field.data)
    if(field.data < date.today()):
        raise ValidationError('Task deadline must be before project deadline.')
    # if(field.data >= project.deadline):
    #     raise ValidationError('Task deadline must be before project deadline')
    print(form.data['projectId'])

    print(field.data)

class TaskForm(FlaskForm):
    projectId = IntegerField('projectId', validators=[DataRequired(message="Please provide the project Id.")])
    userId = IntegerField('userId', validators=[DataRequired(message='Please provide your user Id.')])
    assignee = StringField('assignee', validators=[DataRequired(message='Please provide name of the assignee.'), Length(min=1, max=20, message='Message should be contrained to 20 characters.')])
    taskName = StringField('name', validators=[DataRequired(message='Please provide your task name.'), Length(max=30, message='Please restrain your task name to 30 characters.')])
    status = StringField('status', validators=[DataRequired(message='Please provide current status of your task')])
    startdate = DateField('startdate', validators=[DataRequired(message='Start date must be provided')])
    deadline = DateField('deadline', validators=[DataRequired(message='Deadline must be provided'), date_check])
    # priority = StringField('priority', validators=[DataRequired(message='Please provide your priority')])

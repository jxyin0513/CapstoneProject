from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField
from wtforms.validators import DataRequired, Email, ValidationError

class TaskForm(FlaskForm):
    projectId = IntegerField('projectId', validators=[DataRequired()])
    userId = IntegerField('userId', validators=[DataRequired()])
    assignee = StringField('assignee', validators=[DataRequired()])
    taskName = StringField('name', validators=[DataRequired()])
    status = StringField('status', validators=[DataRequired()])
    deadline = DateField('deadline', validators=[DataRequired()])
    priority = StringField('priority', validators=[DataRequired()])

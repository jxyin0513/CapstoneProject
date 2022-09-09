from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField
from wtforms.validators import DataRequired, Email, Length, ValidationError
from datetime import date

class SectionForm(FlaskForm):

    projectId = IntegerField('projectId', validators=[DataRequired(message="Please provide the project Id.")])
    name = StringField('name', validators=[DataRequired(message='Please provide section name.')])

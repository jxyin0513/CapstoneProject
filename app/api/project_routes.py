from flask import Blueprint
from app.forms import ProjectForm
from app.models import Project

project_routes = Blueprint('projects', __name__)

from flask import Blueprint, request
from app.forms import ProjectForm
from app.models import Project, db

project_routes = Blueprint('projects', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages

@project_routes.route('/all')
def get_all_projects():
    projects = Project.query.all()
    return {'projects': [project.to_dict() for project in projects]}

@project_routes.route('/<id>')
def get_project(id):
    project = Project.query.get(id)
    return {'project': project.to_dict()}

@project_routes.route('/new', methods=['POST'])
def create_project():
    data = request.json
    print(data)
    form = ProjectForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if(form.validate_on_submit()):
        new_project = Project(**data)
        db.session.add(new_project)
        db.session.commit()
        return {'project': new_project.to_dict()}

    if(form.errors):
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@project_routes.route('/<id>/edit', methods=['PUT'])
def edit_project(id):
    form = ProjectForm()
    project = Project.query.get(id)
    form['csrf_token'].data = request.cookies['csrf_token']
    if(form.validate_on_submit()):
        project.userId = form.data['userId']
        project.name = form.data['name']
        project.description = form.data['description']
        db.session.commit()
        return {'project': project.to_dict()}

    if(form.errors):
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@project_routes.route('/<id>/delete', methods=['DELETE'])
def delete_project(id):
    project = Project.query.get(id)
    db.session.delete(project)
    db.session.commit()
    return {'project': project.to_dict()}

from flask import Blueprint, request
from app.forms import TaskForm
from app.models import Task, db

task_routes = Blueprint('tasks', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages

@task_routes.route('/all/<id>')
def get_tasks(id):
    tasks = Task.query.filter_by(userId=id).all()
    # print([task.to_dict() for task in tasks])
    return {'tasks': [task.to_dict() for task in tasks]}

@task_routes.route('/each/<id>')
def get_individual_tasks(id):
    tasks = Task.query.filter_by(userId=id).all()
    return {'tasks': [task.to_dict() for task in tasks]}

@task_routes.route('/<id>')
def get_task(id):
    task = Task.query.get(id)
    print(task)
    return {'task': task.to_dict()}

@task_routes.route('/new', methods=['POST'])
def create_task():
    data = request.json
    form = TaskForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if(form.validate_on_submit()):
        new_task = Task(**data)
        db.session.add(new_task)
        db.session.commit()
        return {'task': new_task.to_dict()}
    if(form.errors):
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@task_routes.route('/<id>/edit', methods=['PUT'])
def update_task(id):
    form = TaskForm()
    print(form.data)
    task = Task.query.get(id)
    form['csrf_token'].data = request.cookies['csrf_token']
    if(form.validate_on_submit()):
        print('val')
        task.assignee = form.data['assignee']
        task.taskName = form.data['taskName']
        task.status = form.data['status']
        task.deadline = form.data['deadline']
        # task.priority = form.data['priority']
        db.session.commit()
        return {'task': task.to_dict()}
    if(form.errors):
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@task_routes.route('/<id>/update', methods=['PUT'])
def update_status(id):
    data = request.json

    task = Task.query.get(id)
    if(data.get('priority')):
        task.priority = data['priority']
    if(data.get('sectionId')):
        task.sectionId = data['sectionId']
    db.session.commit()
    return {'task': task.to_dict()}

@task_routes.route('/<id>/delete', methods=['DELETE'])
def delete_task(id):
    task = Task.query.get(id)
    db.session.delete(task)
    db.session.commit()
    return {'task': task.to_dict()}

@task_routes.route('/<id>/delete/relate', methods=['DELETE'])
def delete_task_related(id):
    tasks = Task.query.filter_by(projectId = id).all()
    print(tasks)
    for task in tasks:
        db.session.delete(task)
    db.session.commit()
    return {'tasks': [task.to_dict() for task in tasks]}

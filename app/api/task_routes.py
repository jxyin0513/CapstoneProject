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
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@task_routes.route('/all')
def get_tasks():
    tasks = Task.query.all()
    print([task.to_dict() for task in tasks])
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
        print(form.data['deadline'])
        new_task = Task(**data)
        db.session.add(new_task)
        db.session.commit()
        return {'task': new_task.to_dict()}
    if(form.errors):
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@task_routes.route('/<id>/edit', methods=['PUT'])
def update_task(id):
    form = TaskForm()
    task = Task.query.get(id)
    print(task)
    form['csrf_token'].data = request.cookies['csrf_token']
    if(form.validate_on_submit()):
        print('val')
        task.assignee = form.data['assignee']
        task.taskName = form.data['taskName']
        task.status = form.data['status']
        task.deadline = form.data['deadline']
        task.priority = form.data['priority']
        db.session.commit()
        return {'task': task.to_dict()}
    if(form.errors):
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@task_routes.route('/<id>/delete', methods=['DELETE'])
def delete_task(id):
    task = Task.query.get(id)
    print(task)
    db.session.delete(task)
    db.session.commit()
    return {'task': task.to_dict()}

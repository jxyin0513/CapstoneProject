from flask import Blueprint, request
from app.forms import SectionForm
from app.models import Section, Project, db

section_routes = Blueprint('sections', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages

@section_routes.route('/<id>', methods=['GET'])
def all_sections(id):
    sections = Section.query.filter_by(projectId=id).all()
    print(sections)
    return {'sections': [section.to_dict() for section in sections]}

@section_routes.route('/new', methods=['POST'])
def new_section():
    data = request.json
    form = SectionForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if(form.validate_on_submit()):
        print(form.data['projectId'])
        new_section = Section(**data)
        db.session.add(new_section)
        db.session.commit()
        return {'section': new_section.to_dict()}
    if(form.errors):
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@section_routes.route('/<id>/edit', methods=['PUT'])
def edit_section(id):
    section = Section.query.get(id)
    form = SectionForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if(form.validate_on_submit()):
        section.projectId = form.date['projectId']
        section.name = form.date['name']
        db.session.commit()
        return {'section': section.to_dict()}
    if(form.errors):
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@section_routes.route('/<id>/delete', methods=['DELETE'])
def delete_section(id):
    section = Section.query.get(id)
    db.session.delete(task)
    db.session.commit()
    return {'section': section.to_dict()}

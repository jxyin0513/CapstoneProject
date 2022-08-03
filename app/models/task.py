from .db import db

class Task(db.Model):
    __tablename__ = 'tasks'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    projectId = db.Column(db.Integer, db.ForeignKey('projects.id'), nullable=False)
    assignee = db.Column(db.String, nullable=False)
    taskName = db.Column(db.String, nullable=False)
    status = db.Column(db.String, nullable=False)
    deadline = db.Column(db.Date, nullable=False)
    priority = db.Column(db.String)

    user = db.relationship('User', back_populates='tasks')
    project = db.relationship('Project', back_populates='tasks')

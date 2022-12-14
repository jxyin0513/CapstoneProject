from .db import db

class Section(db.Model):
    __tablename__ = 'sections'

    id = db.Column(db.Integer, primary_key=True)
    projectId = db.Column(db.Integer, db.ForeignKey('projects.id'), nullable=False)
    name = db.Column(db.String, nullable=False)

    # user = db.relationship('User', back_populates='tasks')
    project = db.relationship('Project', lazy='subquery',  back_populates='sections')
    tasks = db.relationship('Task', back_populates='section', cascade= 'all, delete')

    def to_dict(self):
        return {
            'id': self.id,
            'projectId': self.projectId,
            'name': self.name,
            'tasks': [task.to_dict() for task in self.tasks]
        }

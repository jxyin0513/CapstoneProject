from .db import db

class Task(db.Model):
    __tablename__ = 'tasks'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    projectId = db.Column(db.Integer, db.ForeignKey('projects.id', ondelete="CASCADE"), nullable=False)
    assignee = db.Column(db.String, nullable=False)
    taskName = db.Column(db.String, nullable=False)
    status = db.Column(db.String, nullable=False)
    startdate = db.Column(db.Date, nullable=False)
    deadline = db.Column(db.Date, nullable=False)

    user = db.relationship('User', back_populates='tasks')
    project = db.relationship('Project', lazy='subquery', back_populates='tasks')

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'projectId': self.projectId,
            'assignee': self.assignee,
            'taskName': self.taskName,
            'status': self.status,
            'startdate': str(self.startdate),
            'deadline': str(self.deadline),
            'project': self.project.to_dict()
        }

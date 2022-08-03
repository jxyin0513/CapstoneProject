from .db import db

members = db.Table('members',
  db.Model.metadata,
  db.Column('projectId', db.Integer, db.ForeignKey('projects.id'), primary_key=True),
  db.Column('userId', db.Integer, db.ForeignKey('users.id'), primary_key=True))

class Project(db.Model):
    __tablename__ = 'projects'

    id = db.Column(db.Integer, primary_key = True)
    userId = db.Column(db.Integer,db.ForeignKey('users.id'), nullable = False)
    name = db.Column(db.String, nullable = False)
    description = db.Column(db.String, nullable=False)

    user = db.relationship('User', back_populates='projects', cascade='all, delete')
    tasks = db.relationship('Task', back_populates='project', cascade='all, delete')
    project_member = db.relationship('User', secondary=members, back_populates='user_member', cascade='all, delete')


    def to_dict(self):
      return {
        'id': self.id,
        'userId': self.userId,
        'name': self.name,
        'description': self.description
      }

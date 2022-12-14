from app.models import db, Project
from datetime import datetime, date

def seed_projects():

    demo_a = Project(userId=1, name='App Academy', description="It's about building program",deadline=datetime(2022, 12, 20), startdate=date.today())
    demo_b = Project(userId=1, name='Building Products', description="It's about building a new app", deadline=datetime(2022, 12, 15), startdate=date.today())
    demo_c = Project(userId=1, name='Management Consulting', description="Group project about new ideas",deadline=datetime(2022, 12, 13),  startdate=date.today())
    demo_d = Project(userId=1, name='Software Development', description="It's about fixing bugs", deadline=datetime(2022, 12, 13), startdate=date.today())
    demo_e = Project(userId=2, name='App Academy', description="It's about new program", deadline=datetime(2022, 12, 30), startdate=date.today())

    db.session.add(demo_a)
    db.session.add(demo_b)
    db.session.add(demo_c)
    db.session.add(demo_d)
    db.session.add(demo_e)

    db.session.commit()

def undo_projects():
    db.session.execute('TRUNCATE projects RESTART IDENTITY CASCADE;')
    db.session.commit()

from app.models import db, Project
from datetime import date

def seed_projects():

    demo_a = Project(userId=1, name='App Academy', description="It's about building program",deadline=date(2022, 8, 29), startdate=date.today())
    demo_b = Project(userId=1, name='Building Products', description="It's about building a new app", deadline=date(2022, 8, 25), startdate=date.today())
    demo_c = Project(userId=1, name='Management Consulting', description="Group project about new ideas",deadline=date(2022, 8, 29),  startdate=date.today())
    demo_d = Project(userId=1, name='Software Development', description="It's about fixing bugs", deadline=date(2022, 8, 31), startdate=date.today())
    demo_e = Project(userId=2, name='App Academy', description="It's about new program", deadline=date(2022, 8, 30), startdate=date.today())

    db.session.add(demo_a)
    db.session.add(demo_b)
    db.session.add(demo_c)
    db.session.add(demo_d)
    db.session.add(demo_e)

    db.session.commit()

def undo_projects():
    db.session.execute('TRUNCATE projects RESTART IDENTITY CASCADE;')
    db.session.commit()

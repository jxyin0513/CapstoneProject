from app.models import db, Task
from datetime import datetime, date

def seed_tasks():

    demo_a = Task(userId=1, projectId=1, assignee='Charlie', taskName='Sorting names', status='incomplete',startdate=datetime(2022, 8, 15),deadline=date(2022, 8, 20), sectionId=1, priority='Medium')
    demo_b = Task(userId=1, projectId=2,assignee='Munger',taskName='Analyze Market', status='incomplete', startdate=datetime(2022, 8, 15), deadline=date(2022, 8, 19), sectionId=3, priority='High')
    demo_c = Task(userId=1, projectId=3,assignee='NewTee',taskName='Customer needs', status='incomplete', startdate=datetime(2022, 8, 15),  deadline=date(2022, 8, 25), sectionId=6, priority='Medium')
    demo_d = Task(userId=1, projectId=4,assignee='Alice',taskName='fixing bugs', status='incomplete', startdate=datetime(2022, 8, 15), deadline=date(2022, 8, 19), sectionId=7, priority='Medium')
    demo_e = Task(userId=2, projectId=5,assignee='Bill', taskName='start new feature', status='incomplete', startdate=datetime.now(), deadline=date(2022, 8, 31), sectionId=1, priority='Low')
    demo_f = Task(userId=1, projectId=1,assignee='Luis', taskName='Grading', status='incomplete', startdate=datetime.now(), deadline=date(2022, 9, 3), sectionId=2, priority='High')
    demo_g = Task(userId=1, projectId=1,assignee='Yin', taskName='Making a new exam', status='incomplete', startdate=datetime.now(), deadline=date(2022, 9, 1), sectionId=2, priority='Medium')
    demo_h = Task(userId=1, projectId=1,assignee='Billy', taskName='Make a new schedule', status='incomplete', startdate=datetime.now(), deadline=date(2022, 9, 21), sectionId=1, priority='High')
    demo_i = Task(userId=1, projectId=1,assignee='Ash', taskName='Welcome new students', status='incomplete', startdate=datetime.now(), deadline=date(2022, 9, 15), sectionId=2, priority='Low')
    demo_j = Task(userId=1, projectId=2,assignee='Martin', taskName='Meeting with customer', status='incomplete', startdate=datetime.now(), deadline=date(2022, 9, 19), sectionId=4, priority='High')
    demo_k = Task(userId=1, projectId=3,assignee='Markie', taskName='start new feature', status='incomplete', startdate=datetime.now(), deadline=date(2022, 9, 2), sectionId=5, priority='Medium')
    demo_l = Task(userId=1, projectId=1, assignee='Jocob', taskName='Invite friends', status='incomplete',startdate=datetime(2022, 8, 10),deadline=date(2022, 8, 11), sectionId=2, priority='Low')
    demo_m = Task(userId=1, projectId=2, assignee='dEgrom', taskName='Show pitching', status='incomplete',startdate=datetime(2022, 8, 13),deadline=date(2022, 8, 13), sectionId=3, priority='Medium')

    db.session.add(demo_a)
    db.session.add(demo_b)
    db.session.add(demo_c)
    db.session.add(demo_d)
    db.session.add(demo_e)
    db.session.add(demo_f)
    db.session.add(demo_g)
    db.session.add(demo_h)
    db.session.add(demo_i)
    db.session.add(demo_j)
    db.session.add(demo_k)
    db.session.add(demo_l)
    db.session.add(demo_m)


    db.session.commit()

def undo_tasks():
    db.session.execute('TRUNCATE tasks RESTART IDENTITY CASCADE;')
    db.session.commit()

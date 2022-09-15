from app.models import db, Section

def seed_sections():

    demo_a = Section(projectId=1, name='Todo Lists')
    demo_b = Section(projectId=1, name='Done Lists')
    demo_c = Section(projectId=2, name='Todo Lists')
    demo_d = Section(projectId=2, name='Done Lists')
    demo_e = Section(projectId=3, name='Todo Lists')
    demo_f = Section(projectId=3, name='Done Lists')
    demo_g = Section(projectId=4, name='Todo Lists')
    demo_h = Section(projectId=4, name='Done Lists')

    db.session.add(demo_a)
    db.session.add(demo_b)
    db.session.add(demo_c)
    db.session.add(demo_d)
    db.session.add(demo_e)
    db.session.add(demo_f)
    db.session.add(demo_g)
    db.session.add(demo_h)
    db.session.commit()

def undo_sections():
    db.session.execute('TRUNCATE sections RESTART IDENTITY CASCADE;')
    db.session.commit()

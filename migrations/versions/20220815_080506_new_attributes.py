"""new attributes

Revision ID: d189c955d584
Revises: 19b498b15cef
Create Date: 2022-08-15 08:05:06.459966

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd189c955d584'
down_revision = '19b498b15cef'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('projects', sa.Column('startdate', sa.Date(), nullable=False))
    op.add_column('projects', sa.Column('deadline', sa.Date(), nullable=False))
    op.add_column('tasks', sa.Column('startdate', sa.Date(), nullable=False))
    op.drop_column('tasks', 'priority')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('tasks', sa.Column('priority', sa.VARCHAR(), autoincrement=False, nullable=True))
    op.drop_column('tasks', 'startdate')
    op.drop_column('projects', 'deadline')
    op.drop_column('projects', 'startdate')
    # ### end Alembic commands ###

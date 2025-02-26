"""Add RoleRequest, User Role updates

Revision ID: 4f0acc8b239c
Revises: 62aefc76bfce
Create Date: 2025-01-30 14:25:36.087916

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4f0acc8b239c'
down_revision = '62aefc76bfce'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('role', schema=None) as batch_op:
        batch_op.drop_constraint('fk_role_request', type_='foreignkey')
        batch_op.drop_column('role_request_id')

    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.drop_constraint('fk_user_role_request', type_='foreignkey')
        batch_op.drop_column('role_request_id')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('role_request_id', sa.INTEGER(), nullable=True))
        batch_op.create_foreign_key('fk_user_role_request', 'role_requests', ['role_request_id'], ['id'])

    with op.batch_alter_table('role', schema=None) as batch_op:
        batch_op.add_column(sa.Column('role_request_id', sa.INTEGER(), nullable=True))
        batch_op.create_foreign_key('fk_role_request', 'role_requests', ['role_request_id'], ['id'])

    # ### end Alembic commands ###

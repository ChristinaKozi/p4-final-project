"""update Order attribute

Revision ID: 7f8b51cef457
Revises: d4c2f8e1218d
Create Date: 2024-04-11 14:59:32.957863

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7f8b51cef457'
down_revision = 'd4c2f8e1218d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('orders', schema=None) as batch_op:
        batch_op.add_column(sa.Column('quantity', sa.String(), nullable=True))
        batch_op.drop_column('total_price')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('orders', schema=None) as batch_op:
        batch_op.add_column(sa.Column('total_price', sa.FLOAT(), nullable=True))
        batch_op.drop_column('quantity')

    # ### end Alembic commands ###

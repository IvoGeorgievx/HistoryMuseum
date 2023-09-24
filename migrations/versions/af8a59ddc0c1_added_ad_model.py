"""added ad model

Revision ID: af8a59ddc0c1
Revises: 53d850fdf7c2
Create Date: 2023-09-24 14:05:04.664323

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "af8a59ddc0c1"
down_revision = "53d850fdf7c2"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "ads",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("title", sa.String(), nullable=False),
        sa.Column("description", sa.String(), nullable=False),
        sa.Column("salary", sa.Integer(), nullable=False),
        sa.Column("location", sa.String(), nullable=False),
        sa.Column("company_id", sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(
            ["company_id"],
            ["company.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table("ads")
    # ### end Alembic commands ###

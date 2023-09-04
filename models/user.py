from db import db

from models.enums import UserRole


class User(db.Model):
    __tablename__ = "user"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False, unique=True)
    password = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String, nullable=False, unique=True)
    role = db.Column(db.Enum(UserRole), nullable=False)


class JobApplicant(User):
    __tablename__ = "job_applicant"
    id = db.Column(db.Integer, db.ForeignKey("user.id"), primary_key=True)


class Company(User):
    __tablename__ = "company"
    id = db.Column(db.Integer, db.ForeignKey("user.id"), primary_key=True)

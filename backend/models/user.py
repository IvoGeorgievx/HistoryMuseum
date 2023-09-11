from db import db

from backend.models.enums import UserRole


class User(db.Model):
    __tablename__ = "user"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False, unique=True)
    password = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String, nullable=False, unique=True)
    role = db.Column(db.Enum(UserRole), nullable=False)


class JobApplicant(db.Model):
    __tablename__ = "job_applicant"
    id = db.Column(db.Integer, db.ForeignKey("user.id"), primary_key=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    phone_number = db.Column(db.String, nullable=False)
    age = db.Column(db.Integer, nullable=False)


class Company(db.Model):
    __tablename__ = "company"
    id = db.Column(db.Integer, db.ForeignKey("user.id"), primary_key=True)
    company_name = db.Column(db.String, nullable=False)
    company_address = db.Column(db.String, nullable=False)
    company_phone_number = db.Column(db.String, nullable=False)
    company_description = db.Column(db.String, nullable=False)

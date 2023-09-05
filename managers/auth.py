from werkzeug.exceptions import Unauthorized
from werkzeug.security import check_password_hash, generate_password_hash

from db import db
from models import User, JobApplicant, Company


class AuthManager:

    @staticmethod
    def register_user(data):
        data['password'] = generate_password_hash(data['password'], method='sha256')
        user = User(username=data['username'], password=data['password'], email=data['email'], role=data['role'])
        db.session.add(user)
        db.session.commit()
        return user

    @staticmethod
    def register_job_applicant(data, user):
        job_applicant = JobApplicant(id=user.id, first_name=data['first_name'], last_name=data['last_name'],
                                     phone_number=data['phone_number'], age=data['age'])
        db.session.add(job_applicant)
        db.session.commit()
        return job_applicant

    @staticmethod
    def register_company(data, user):
        company = Company(id=user.id, company_name=data['company_name'], company_address=data['company_address'],
                          company_phone_number=data['company_phone_number'],
                          company_description=data['company_description'])
        db.session.add(company)
        db.session.commit()
        return company

    @staticmethod
    def login(data):
        user = User.query.filter_by(username=data["username"]).first()
        if not user:
            raise Unauthorized("Invalid username or password")
        if not check_password_hash(user.password, data["password"]):
            raise Unauthorized("Invalid username or password")
        return user

from datetime import timedelta, datetime

import jwt
from decouple import config
from flask_httpauth import HTTPTokenAuth
from werkzeug.exceptions import Unauthorized, BadRequest
from werkzeug.security import check_password_hash, generate_password_hash

from db import db
from backend.models import User, JobApplicant, Company


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

    @staticmethod
    def encode_token(user):
        payload = {"sub": user.id, "exp": datetime.utcnow() + timedelta(days=15)}
        return jwt.encode(payload, key=config("JWT_SECRET_KEY"), algorithm="HS256")

    @staticmethod
    def decode_token(token):
        try:
            return jwt.decode(token, key=config("JWT_SECRET_KEY"), algorithms=["HS256"])
        except Exception as ex:
            raise BadRequest("Invalid or missing JWT token")


auth = HTTPTokenAuth(scheme="Bearer")


@auth.verify_token
def verify_token(token):
    try:
        payload = AuthManager.decode_token(token)
        user = User.query.filter_by(id=payload["sub"]).first()
        if not user:
            raise Unauthorized("Invalid or missing JWT token")
        return user
    except Exception as ex:
        raise Unauthorized("Invalid or missing JWT token")

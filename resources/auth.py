from flask import Flask, request, render_template, make_response
from flask_restful import Resource

from managers.auth import AuthManager
from schemas.request.user import UserRegisterSchema
from schemas.response.user import UserResponseSchema, JobApplicantResponseSchema, CompanyResponseSchema
from utilities.decorators import validate_schema


class Register(Resource):
    @validate_schema(UserRegisterSchema)
    def post(self):
        data = request.get_json()
        user = AuthManager.register_user(data)
        if data['role'] == 'job_applicant':
            job_applicant = AuthManager.register_job_applicant(data, user)
            response_data = {
                'user': UserResponseSchema().dump(user),
                'job_applicant': JobApplicantResponseSchema().dump(job_applicant)
            }
        else:
            company = AuthManager.register_company(data, user)
            response_data = {
                'user': UserResponseSchema().dump(user),
                'company': CompanyResponseSchema().dump(company)
            }

        return response_data, 201

    def get(self):
        return make_response(render_template('register.html'))


class Login(Resource):
    def post(self):
        data = request.get_json()
        user = AuthManager.login(data)
        return UserResponseSchema().dump(user), 200

    def get(self):
        return make_response(render_template('login.html'))


class Home(Resource):
    def get(self):
        return make_response(render_template('index.html'))

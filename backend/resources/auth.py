from flask import request, render_template, make_response
from flask_restful import Resource

from backend.managers.auth import AuthManager, auth
from backend.schemas.request.user import (
    UserRegisterSchema,
    UserLoginSchema,
    UserEditProfileSchema,
)
from backend.schemas.response.user import (
    UserResponseSchema,
    JobApplicantResponseSchema,
    CompanyResponseSchema,
)
from backend.utilities.decorators import validate_schema


class Register(Resource):
    @validate_schema(UserRegisterSchema)
    def post(self):
        data = request.get_json()
        user = AuthManager.register_user(data)
        token = AuthManager.encode_token(user)
        if data["role"] == "job_applicant":
            job_applicant = AuthManager.register_job_applicant(data, user)
            response_data = {
                "user": UserResponseSchema().dump(user),
                "job_applicant": JobApplicantResponseSchema().dump(job_applicant),
                "token": token,
            }
        else:
            company = AuthManager.register_company(data, user)
            response_data = {
                "user": UserResponseSchema().dump(user),
                "company": CompanyResponseSchema().dump(company),
                "token": token,
            }

        return response_data, 201

    def get(self):
        return make_response(render_template("register.html"))


class Login(Resource):
    @validate_schema(UserLoginSchema)
    def post(self):
        data = request.get_json()
        user = AuthManager.login(data)
        token = AuthManager.encode_token(user)
        return UserResponseSchema().dump({"token": token}), 200

    def get(self):
        return make_response(render_template("login.html"))


class EditProfile(Resource):
    @auth.login_required
    @validate_schema(UserEditProfileSchema)
    def put(self):
        user = auth.current_user()
        data = request.get_json()
        user, schema = AuthManager.edit_profile(user, data)
        response_json = {"message": "Profile updated successfully"}
        return schema().dump(response_json), 200

    def get(self):
        return make_response(render_template("edit_profile.html"))

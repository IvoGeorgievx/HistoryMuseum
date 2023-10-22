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
    UserRoleResponseSchema,
)
from backend.utilities.decorators import validate_schema


class Register(Resource):
    @validate_schema(UserRegisterSchema)
    def post(self):
        data = request.get_json()
        user = AuthManager.register_user(data)
        token = AuthManager.encode_token(user)
        if data["role"] == "job_applicant":
            AuthManager.register_job_applicant(data, user)
        else:
            AuthManager.register_company(data, user)

        response_data = {
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


class GetProfileRole(Resource):
    @auth.login_required
    def get(self):
        user = auth.current_user()
        if user.role == "job_applicant":
            return UserRoleResponseSchema().dump({"role": "job_applicant"}), 200
        return UserRoleResponseSchema().dump({"role": "job_applicant"}), 200


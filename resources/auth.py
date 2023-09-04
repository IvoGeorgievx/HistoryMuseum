from flask import Flask, request, render_template, make_response
from flask_restful import Resource

from managers.auth import AuthManager
from schemas.response.user import UserResponseSchema


class Register(Resource):
    def post(self):
        data = request.get_json()
        user = AuthManager.register(data)
        return UserResponseSchema().dump(user), 201

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

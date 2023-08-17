from werkzeug.exceptions import Unauthorized
from werkzeug.security import check_password_hash, generate_password_hash

from db import db
from models import User


class AuthManager:

    @staticmethod
    def register(data):
        data['password'] = generate_password_hash(data['password'], method='sha256')
        user = User(**data)
        db.session.add(user)
        db.session.commit()
        return user

    @staticmethod
    def login(data):
        user = User.query.filter_by(username=data["username"]).first()
        if not user:
            raise Unauthorized("Invalid username or password")
        if not check_password_hash(user.password, data["password"]):
            raise Unauthorized("Invalid username or password")
        return user

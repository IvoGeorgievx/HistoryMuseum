from flask import request
from werkzeug.exceptions import BadRequest, Forbidden

from backend.managers.auth import auth


def validate_schema(schema_name):
    def decorated_func(func):
        def wrapper(*args, **kwargs):
            data = request.get_json()
            schema = schema_name()
            errors = schema.validate(data)
            if errors:
                raise BadRequest(errors)
            return func(*args, **kwargs)

        return wrapper

    return decorated_func


def permission_required(permission_role):
    def decorated_func(func):
        def wrapper(*args, **kwargs):
            current_user = auth.current_user()
            if current_user.role == permission_role:
                return func(*args, **kwargs)
            raise Forbidden("You do not have permission to do that")

        return wrapper

    return decorated_func

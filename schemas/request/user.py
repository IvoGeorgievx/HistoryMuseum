from marshmallow import Schema, fields

from schemas.validators import UserValidator


class UserRegisterSchema(Schema):
    username = fields.String(required=True, unique=True, validate=UserValidator.validate_unique_username)
    password = fields.String(required=True)
    email = fields.String(required=True, validate=UserValidator.validate_unique_email)
    role = fields.String(required=True)
    first_name = fields.String(required=False)
    last_name = fields.String(required=False)
    phone_number = fields.String(required=False, validate=UserValidator.validate_unique_phone_number)
    age = fields.Integer(required=False)
    company_name = fields.String(required=False, validate=UserValidator.validate_unique_company_name)
    company_address = fields.String(required=False)
    company_phone = fields.String(required=False)
    company_description = fields.String(required=False)


class UserLoginSchema(Schema):
    username = fields.String(required=True)
    password = fields.String(required=True)

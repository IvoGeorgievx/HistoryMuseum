from marshmallow import Schema, fields


class UserRegisterSchema(Schema):
    username = fields.String(required=True)
    password = fields.String(required=True)
    first_name = fields.String(required=True)
    last_name = fields.String(required=True)
    email = fields.String(required=True)


class UserLoginSchema(Schema):
    username = fields.String(required=True)
    password = fields.String(required=True)

from marshmallow import Schema, fields


class UserResponseSchema(Schema):
    id = fields.Integer(required=True)
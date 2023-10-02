from marshmallow import Schema, fields


class BaseEditProfileResponseSchema(Schema):
    message = fields.String(required=True)

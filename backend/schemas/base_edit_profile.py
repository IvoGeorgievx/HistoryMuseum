from marshmallow import Schema, fields


class EditProfileResponseSchema(Schema):
    message = fields.String(required=True)

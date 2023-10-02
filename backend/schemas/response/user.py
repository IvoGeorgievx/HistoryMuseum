from marshmallow import Schema, fields

from backend.schemas.base_edit_profile import BaseEditProfileResponseSchema


class UserResponseSchema(Schema):
    token = fields.String(required=True)


class UserEditProfileResponseSchema(BaseEditProfileResponseSchema):
    pass

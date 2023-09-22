from marshmallow import Schema, fields

from backend.schemas.base_edit_profile import EditProfileResponseSchema


class UserResponseSchema(Schema):
    token = fields.String(required=True)


class JobApplicantResponseSchema(EditProfileResponseSchema):
    pass


class CompanyResponseSchema(EditProfileResponseSchema):
    pass

from marshmallow import Schema, fields


class UserResponseSchema(Schema):
    id = fields.Integer(required=True)


class JobApplicantResponseSchema(Schema):
    first_name = fields.String(required=True)
    last_name = fields.String(required=True)


class CompanyResponseSchema(Schema):
    company_name = fields.String(required=True)
    company_address = fields.String(required=True)
    company_phone_number = fields.String(required=True)
    company_description = fields.String(required=True)

from marshmallow import Schema, fields


class BaseAdSchema(Schema):
    title = fields.String(required=True)
    description = fields.String(required=True)
    salary = fields.Integer(required=False)
    location = fields.String(required=True)


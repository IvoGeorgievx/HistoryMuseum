from marshmallow import ValidationError

from models import User, Company, JobApplicant


class UserValidator:

    @staticmethod
    def validate_unique_username(value):
        if User.query.filter_by(username=value).first():
            raise ValidationError('Username already exists.')

    @staticmethod
    def validate_unique_email(value):
        if User.query.filter_by(email=value).first():
            raise ValidationError('Email already exists.')

    @staticmethod
    def validate_unique_phone_number(value):
        if JobApplicant.query.filter_by(phone_number=value).first():
            raise ValidationError('Phone number already exists.')

    @staticmethod
    def validate_unique_company_name(value):
        if Company.query.filter_by(company_name=value).first():
            raise ValidationError('Company name already exists.')

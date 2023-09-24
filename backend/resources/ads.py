from flask import request
from flask_restful import Resource

from backend.managers.ads import AdManager
from backend.managers.auth import auth
from backend.models import UserRole
from backend.schemas.request.ad import CreateAdSchema
from backend.utilities.decorators import permission_required, validate_schema


class CreateAd(Resource):
    @auth.login_required
    @validate_schema(CreateAdSchema)
    @permission_required(UserRole.company)
    def post(self):
        data = request.get_json()
        user = auth.current_user()
        AdManager.create_ad(data, user)
        return {"message": "Ad created successfully"}, 201

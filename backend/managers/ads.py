from backend.models import Ads
from db import db


class AdManager:
    @staticmethod
    def create_ad(data, user):
        if "salary" not in data:
            data["salary"] = None
        ad = Ads(
            title=data["title"],
            description=data["description"],
            salary=data["salary"],
            location=data["location"],
            company_id=user.id,
        )
        db.session.add(ad)
        db.session.commit()
        return ad

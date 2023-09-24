from db import db


class Ads(db.Model):
    __tablename__ = "ads"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    salary = db.Column(db.Integer, nullable=True)
    location = db.Column(db.String, nullable=False)
    company_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    company = db.relationship("User", backref="ads")

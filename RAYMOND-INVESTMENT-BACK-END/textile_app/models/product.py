from textile_app.extensions import db
from datetime import datetime

class Product(db.Model):
    __tablename__ = 'products'
    id = db.Column(db.Integer, primary_key=True)
    material = db.Column(db.String(50), nullable=False)
    size = db.Column(db.Integer, nullable=False)
    color = db.Column(db.String(200), nullable=False)
    thumbnail = db.Column(db.String(255), nullable=True)  # Changed from image to thumbnail
    price = db.Column(db.Integer(), nullable=False)
    price_unit = db.Column(db.String(500), nullable=False, default='UGX')
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    user = db.relationship('User', backref='products')

    def __init__(self, material, size, color, thumbnail, price, price_unit, user_id):
        self.material = material
        self.size = size
        self.color = color
        self.thumbnail = thumbnail
        self.price = price
        self.price_unit = price_unit
        self.user_id = user_id

    def __repr__(self) -> str:
        return f"{self.material} {self.size} {self.price}"

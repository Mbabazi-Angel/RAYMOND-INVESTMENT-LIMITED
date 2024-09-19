from datetime import datetime
from textile_app import db

class Order(db.Model):
    __tablename__ = 'orders'

    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    total_price = db.Column(db.Float, nullable=False)  #  total_price is stored as a float
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, onupdate=datetime.now)
    

    # Define relationships if needed (e.g., product and user relationships)
    product = db.relationship('Product', backref='orders')
    user = db.relationship('User', backref='orders')

    def __repr__(self):
        return f"Order('{self.id}', '{self.product_id}', '{self.quantity}', '{self.total_price}', '{self.user_id}')"

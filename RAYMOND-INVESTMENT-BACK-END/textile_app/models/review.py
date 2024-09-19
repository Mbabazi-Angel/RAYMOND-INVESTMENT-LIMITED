from textile_app import db 
from datetime import datetime
 

from textile_app import bcrypt

class Review(db.Model):
    __tablename__ = 'reviews'
    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.String(500))

    #Relationship with users
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    #Relationship with products
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)

   

    def __init__(self,rating,comment,user_id,product_id):
        super(Review,self).__init__()
        self.rating = rating
        self.comment = comment 
        self.user_id = user_id
        self.product_id = product_id
    pass 

    def __repr__(self):
        return f"<Review(name='{self.rating}', product_id='{self.product_id}')>"
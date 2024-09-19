from datetime import datetime
from textile_app.extensions import db, bcrypt  

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False, unique=True)
    contact = db.Column(db.String(100), nullable=False, unique=True)
    password = db.Column(db.String(128), nullable=False)  # Store the hashed password
    address = db.Column(db.String(255), nullable=False)
      # Store the hashed password

    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, onupdate=datetime.now)

    def __init__(self, first_name, last_name, email, contact, password, address):
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.contact = contact
        self.password = password
        self.address = address

    def get_full_name(self):
        return f"{self.last_name} {self.first_name}"

 
    def set_password(self,password):
        self._password = bcrypt.generate_password_hash(password).decode('url')  # Update password hash

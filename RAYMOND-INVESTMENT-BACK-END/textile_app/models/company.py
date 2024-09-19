from textile_app.extensions import db 
from datetime import datetime




class Company(db.Model):
    __tablename__ = 'companies'
    id = db.Column(db.Integer,primary_key=True)
    name = db.Column(db.String(50),nullable=False,unique=True)
    industry = db.Column(db.String(100))
    description = db.Column(db.Text(),nullable=False)
    location = db.Column(db.Text(),nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    #relationship bettween user and company 
    user = db.relationship('User', backref='companies')
    

    created_at = db.Column(db.DateTime,default=datetime.now())
    updated_at = db.Column(db.DateTime,onupdate=datetime.now())

    def __init__(self,name,industry,description,location,user_id):
        super(Company,self).__init__()
        #self.id = id 
        self.name = name 
        self.industry = industry
        self.description = description
        self.location = location
        self.user_id = user_id
    pass 

    def __repr__(self):
        return f"<Company(name='{self.name}', location='{self.location}')>"
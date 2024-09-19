import os

class Config:
    SQLALCHEMY_DATABASE_URI='mysql+pymysql://root:@localhost/textiles'
    JWT_SECRET_KEY = 'textiles'
    UPLOAD_FOLDER = os.path.join(os.getcwd(), 'uploads')
from flask import Flask, jsonify, send_from_directory
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_swagger_ui import get_swaggerui_blueprint
from textile_app.extensions import bcrypt, jwt, db, migrate
from flasgger import Swagger
import os
from flask_cors import CORS  # Import CORS class from flask_cors

from textile_app.controllers.auth_controller import auth
from textile_app.controllers.company_controller import company
from textile_app.controllers.order_controller import order
from textile_app.controllers.product_controller import product
from textile_app.controllers.review_controller import review

from textile_app import uploads

def create_app():
    app = Flask(__name__)

    # Initialize CORS with default options (allow all origins, all methods, etc.)
    CORS(app)
    
    # Load configuration from config.py
    app.config.from_object('config.Config')


    if not os.path.exists(app.config['UPLOAD_FOLDER']):
        os.makedirs(app.config['UPLOAD_FOLDER'])

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)
    jwt.init_app(app)


    # Import and register models
    from textile_app.models.user import User
    from textile_app.models.company import Company
    from textile_app.models.order import Order
    from textile_app.models.product import Product
    from textile_app.models.review import Review

    # Define a simple home route
    @app.route('/')
    def home():
        return "Hello, world!"

    # Registering the blueprints
    app.register_blueprint(auth)
    app.register_blueprint(company)
    app.register_blueprint(product)
    app.register_blueprint(order)
    app.register_blueprint(review)

    @app.route('/uploads/<uploads>')
    def uploaded_file(uploads):
        return send_from_directory(app.config['UPLOAD_FOLDER'], uploads)

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)



# if the app is not ruuning;
# $env:FLASK_APP = "textile_app"
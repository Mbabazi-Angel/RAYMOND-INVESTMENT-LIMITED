from flask import Blueprint, request, jsonify
from textile_app.models.product import Product
from textile_app.extensions import db
from flask_jwt_extended import jwt_required, get_jwt_identity
from textile_app.status_codes import HTTP_400_BAD_REQUEST, HTTP_201_CREATED, HTTP_500_INTERNAL_SERVER_ERROR, HTTP_200_OK

product = Blueprint('product', __name__, url_prefix='/api/v1/products')

@product.route('/create', methods=['POST'])
@jwt_required()
def create_product():
    try:
        # Extracting request data
        material = request.json.get('material')
        size = request.json.get('size')
        color = request.json.get('color')
        thumbnail = request.json.get('thumbnail')
        price = request.json.get('price')
        price_unit = request.json.get('price_unit')
        user_id = get_jwt_identity()

        # Basic input validation
        if not material:
            return jsonify({"error": 'Your textile material is required'}), HTTP_400_BAD_REQUEST
        if not size:
            return jsonify({"error": 'Your textile size is required'}), HTTP_400_BAD_REQUEST
        if not color:
            return jsonify({"error": 'The color is required'}), HTTP_400_BAD_REQUEST
        if not thumbnail:
            return jsonify({"error": 'Your textile thumbnail is required'}), HTTP_400_BAD_REQUEST
        if not price:
            return jsonify({"error": 'The price is required'}), HTTP_400_BAD_REQUEST
        if not price_unit:
            return jsonify({"error": 'The price_unit is required'}), HTTP_400_BAD_REQUEST
        

        # Creating a new product
        new_product = Product(
            material=material,
            size=size,
            color=color,
            thumbnail=thumbnail,
            price=price,
            price_unit=price_unit,
            user_id=user_id
        )

        # Adding and committing to the database
        db.session.add(new_product)
        db.session.commit()

        # Building a response message
        return jsonify({
            "message": f"Product '{new_product.material}', ID '{new_product.id}' has been created",
            'textile': {
                'id': new_product.id,
                'material': new_product.material,
                'size': new_product.size,
                'color': new_product.color,
                'thumbnail': new_product.thumbnail,
                'price': new_product.price,
                'price_unit': new_product.price_unit,
                'user_id': new_product.user_id
            }
        }), HTTP_201_CREATED

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), HTTP_500_INTERNAL_SERVER_ERROR

    
@product.route('/delete/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_product(id):
    user = get_jwt_identity()
    try:
        product_id = Product.query.filter_by(id=id).first()
        if not product_id:
            return jsonify({'error': 'Product does not exist'}), HTTP_400_BAD_REQUEST
        else:
            db.session.delete(product_id)
            db.session.commit()
            return jsonify({'message': 'Product has been deleted successfully'})
    
    except Exception as e:
        db.session.rollback() 
        return jsonify({"error": str(e)}), HTTP_500_INTERNAL_SERVER_ERROR

@product.route('/update/<int:id>', methods=['PATCH'])
def update_product(id):
    try:
        product = Product.query.get_or_404(id)
        data = request.json

        # Update product attributes based on provided data
        for key, value in data.items():
            setattr(product, key, value)

        db.session.commit()

        return jsonify({'message': 'Product updated successfully'}), HTTP_200_OK

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), HTTP_500_INTERNAL_SERVER_ERROR



@product.route('/<int:id>', methods=['GET'])
@jwt_required()
def get_product(id):
    try:
        product = Product.query.get_or_404(id)
        return jsonify({
            'id': product.id,
            'material': product.material,
            'size': product.size,
            'color': product.color,
            'thumbnail': product.thumbnail,
            'price': product.price,
            'price_unit': product.price_unit,
            'user_id': product.user_id
        }), HTTP_200_OK
    except Exception as e:
        return jsonify({'error': str(e)}), HTTP_500_INTERNAL_SERVER_ERROR
    



@product.route('/', methods=['GET'])
@jwt_required()
def get_all_products():
    try:
        products = Product.query.all()
        return jsonify([{
            'id': product.id,
            'material': product.material,
            'size': product.size,
            'color': product.color,
            'thumbnail': product.thumbnail,
            'price': product.price,
            'price_unit': product.price_unit,
            'user_id': product.user_id
        } for product in products]), HTTP_200_OK
    except Exception as e:
        return jsonify({'error': str(e)}), HTTP_500_INTERNAL_SERVER_ERROR
    

@product.route('/thumbnails', methods=['GET'])
@jwt_required()
def get_all_thumbnails():
    try:
        products = Product.query.all()
        thumbnails = [{
            'thumbnail': product.thumbnail,
            'material': product.material,
            'price': product.price,
            'price_unit': product.price_unit
        } for product in products]
        return jsonify(thumbnails), HTTP_200_OK
    except Exception as e:
        return jsonify({'error': str(e)}), HTTP_500_INTERNAL_SERVER_ERROR




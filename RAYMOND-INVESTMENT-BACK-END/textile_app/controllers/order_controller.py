from flask import Blueprint, request, jsonify
from textile_app.models.order import Order
from textile_app.models.product import Product  # Import Product model
from textile_app import db
from flask_jwt_extended import jwt_required, get_jwt_identity
from textile_app.status_codes import HTTP_400_BAD_REQUEST, HTTP_201_CREATED, HTTP_500_INTERNAL_SERVER_ERROR, HTTP_200_OK
from datetime import datetime

order = Blueprint('order', __name__, url_prefix='/api/v1/orders')

@order.route('/create', methods=['POST'])
@jwt_required()
def make_order():
    try:
        current_user = get_jwt_identity()

        # Extracting request data
        product_id = request.json.get('product_id')
        quantity = request.json.get('quantity')

        # Basic input validation
        if not product_id:
            return jsonify({"error": 'Product ID is required'}), HTTP_400_BAD_REQUEST

        if not quantity or quantity <= 0:
            return jsonify({"error": 'Quantity must be greater than zero'}), HTTP_400_BAD_REQUEST

        # Fetch product price based on product_id from database
        product = Product.query.filter_by(id=product_id).first()

        if not product:
            return jsonify({"error": 'Product not found'}), HTTP_400_BAD_REQUEST

        product_price = product.price

        # Calculate total_price
        total_price = product_price * quantity

        # Making new order
        new_order = Order(
            product_id=product_id,
            quantity=quantity,
            total_price=total_price,
            user_id=current_user,  # Use current_user from JWT
            created_at=datetime.now()
        )

        # Adding and committing to the database
        db.session.add(new_order)
        db.session.commit()

        # Building a response message
        return jsonify({
            "message": f"Order '{new_order.id}', Product ID '{new_order.product_id}' has been created",
            'order': {
                'id': new_order.id,
                'product_id': new_order.product_id,
                'quantity': new_order.quantity,
                'total_price': new_order.total_price,
                'user_id': new_order.user_id
            }
        }), HTTP_201_CREATED

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), HTTP_500_INTERNAL_SERVER_ERROR



@order.route('/', methods=['GET'])
@jwt_required()
def get_all_orders():
    try:
        orders = Order.query.all()
        order_list = [
            {
                'id': order.id,
                'product_id': order.product_id,
                'quantity': order.quantity,
                'total_price': order.total_price,
                'user_id': order.user_id
            } for order in orders
        ]
        return jsonify({'orders': order_list}), HTTP_200_OK

    except Exception as e:
        return jsonify({'error': str(e)}), HTTP_500_INTERNAL_SERVER_ERROR


@order.route('/order/<int:id>', methods=['GET'])
@jwt_required()
def get_order(id):
    try:
        order = Order.query.get_or_404(id)
        order_data = {
            'id': order.id,
            'product_id': order.product_id,
            'quantity': order.quantity,
            'total_price': order.total_price,
            'user_id': order.user_id
        }
        return jsonify({'order': order_data}), HTTP_200_OK

    except Exception as e:
        return jsonify({'error': str(e)}), HTTP_500_INTERNAL_SERVER_ERROR
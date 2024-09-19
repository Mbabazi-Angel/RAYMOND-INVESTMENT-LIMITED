from flask import Blueprint, request, jsonify
from textile_app.models.review import Review
from textile_app import db
from flask_jwt_extended import jwt_required, get_jwt_identity
from textile_app.status_codes import HTTP_400_BAD_REQUEST, HTTP_201_CREATED, HTTP_500_INTERNAL_SERVER_ERROR,HTTP_200_OK

review = Blueprint('review', __name__, url_prefix='/api/v1/reviews')

@review.route('/create', methods=['POST'])
@jwt_required()
def write_review():
    try:
        # Extracting request data
        rating = request.json.get('rating')
        comment = request.json.get('comment')
        user_id = get_jwt_identity()
        product_id = get_jwt_identity()

        # Basic input validation
        if not rating:
            return jsonify({"error": 'Rating is required'}), HTTP_400_BAD_REQUEST

        if not comment:
            return jsonify({"error": 'Comment is required'}), HTTP_400_BAD_REQUEST
        
        if not product_id:
            return jsonify({"error": 'Product ID is required'}), HTTP_400_BAD_REQUEST

        # Creating a new review
        new_review = Review(
            rating=rating,
            comment=comment,
            user_id=user_id,
            product_id=product_id
        )

        # Adding and committing to the database
        db.session.add(new_review)
        db.session.commit()

        # Building a response message
        return jsonify({
            "message": f"Review '{new_review.id}' has been created for product '{new_review.product_id}'",
            'review': {
                'id': new_review.id,
                'rating': new_review.rating,
                'comment': new_review.comment,
                'user_id': new_review.user_id,
                'product_id': new_review.product_id
            }
        }), HTTP_201_CREATED

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), HTTP_500_INTERNAL_SERVER_ERROR
    
@review.route('/delete/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_review(id):
    user_id = get_jwt_identity()
    try:
        review_to_delete = Review.query.filter_by(id=id, user_id=user_id).first()
        if not review_to_delete:
            return jsonify({'error': 'Review does not exist'}), HTTP_400_BAD_REQUEST
        else:
            db.session.delete(review_to_delete)
            db.session.commit()
            return jsonify({'message': 'Review has been deleted successfully'})
    
    except Exception as e:
        db.session.rollback() 
        return jsonify({"error": str(e)}), HTTP_500_INTERNAL_SERVER_ERROR


@review.route('/update/<int:id>', methods=['PATCH'])
def update_review(id):
    try:
        review = Review.query.get_or_404(id)
        data = request.json

        # Update review attributes based on provided data
        for key, value in data.items():
            setattr(review, key, value)

        db.session.commit()

        return jsonify({'message': 'Review updated successfully'}), HTTP_200_OK

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), HTTP_500_INTERNAL_SERVER_ERROR


@review.route('/', methods=['GET'])
def get_all_reviews():
    try:
        reviews = Review.query.all()
        response = [
            {
                'id': review.id,
                'rating': review.rating,
                'comment': review.comment,
                'user_id': review.user_id,
                'product_id': review.product_id
            }
            for review in reviews
        ]
        return jsonify({'reviews': response}), HTTP_200_OK
    except Exception as e:
        return jsonify({'error': str(e)}), HTTP_500_INTERNAL_SERVER_ERROR
    

@review.route('/<int:id>', methods=['GET'])
def get_review(id):
    try:
        review = Review.query.get_or_404(id)
        response = {
            'id': review.id,
            'rating': review.rating,
            'comment': review.comment,
            'user_id': review.user_id,
            'product_id': review.product_id
        }
        return jsonify({'review': response}), HTTP_200_OK
    except Exception as e:
        return jsonify({'error': str(e)}), HTTP_500_INTERNAL_SERVER_ERROR
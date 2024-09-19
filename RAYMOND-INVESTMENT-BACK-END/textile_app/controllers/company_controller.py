from flask import Blueprint, request, jsonify
from textile_app.models.company import Company 
from textile_app.extensions import db
from flask_jwt_extended import jwt_required, get_jwt_identity
from textile_app.status_codes import HTTP_400_BAD_REQUEST, HTTP_201_CREATED, HTTP_500_INTERNAL_SERVER_ERROR,HTTP_200_OK

company = Blueprint('company', __name__, url_prefix='/api/v1/companies')

@company.route('/create', methods=['POST'])
@jwt_required()
def create_company():
    try:
        # Extracting request data
        name = request.json.get('name')
        industry = request.json.get('industry')
        description = request.json.get('description')
        location = request.json.get('location')
        user_id = get_jwt_identity()

        # Basic input validation
        if not name:
            return jsonify({"error": 'Your company name is required'}), HTTP_400_BAD_REQUEST

        if not industry:
            return jsonify({"error": 'Your company industry is required'}), HTTP_400_BAD_REQUEST

        if not description:
            return jsonify({"error": 'Please add a description of your company'}), HTTP_400_BAD_REQUEST

        if not location:
            return jsonify({"error": 'Please add a location of your company'}), HTTP_400_BAD_REQUEST

        if Company.query.filter_by(name=name).first():
            return jsonify({"error": 'Company name already exists'}), HTTP_400_BAD_REQUEST

        # Creating a new company
        new_company = Company(
            name=name,
            industry=industry,
            description=description,
            location=location,
            user_id=user_id
        )

        db.session.add(new_company)
        db.session.commit()

        # Building a response message
        message = f"{new_company.name} has been successfully added"
        return jsonify({
            "message": message,
            'company': {
                'id': new_company.id,
                'name': new_company.name,
                'industry': new_company.industry,
                'description': new_company.description,
                'location': new_company.location,
                'user_id': new_company.user_id 
            }
        }), HTTP_201_CREATED

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), HTTP_500_INTERNAL_SERVER_ERROR

@company.route('/delete/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_company(id):
    user_id = get_jwt_identity()
    try:
        company_to_delete = Company.query.filter_by(id=id, user_id=user_id).first()
        if not company_to_delete:
            return jsonify({'error': 'Company does not exist'}), HTTP_400_BAD_REQUEST

        db.session.delete(company_to_delete)
        db.session.commit()
        return jsonify({'message': 'Company has been deleted successfully'}),HTTP_200_OK

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), HTTP_500_INTERNAL_SERVER_ERROR

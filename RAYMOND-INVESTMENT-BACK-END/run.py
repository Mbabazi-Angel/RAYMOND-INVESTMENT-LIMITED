from textile_app import create_app  # Assuming create_app function is used to create Flask app instance
from textile_app.extensions import db 

app = create_app()  # Creating the Flask app instance

if __name__ == "__main__":
    app.run(debug=True)  # Running the Flask application in debug mode


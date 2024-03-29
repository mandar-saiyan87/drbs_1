from flask import Flask
from config import AppConfig
from flask_cors import CORS
from routes.members_routes import member_routes
from routes.hallbookings_routes import hallbooking_routes

app = Flask(__name__)
CORS(app)
app.config.from_object(AppConfig)
app.register_blueprint(member_routes)
app.register_blueprint(hallbooking_routes)

if __name__ == '__main__':
    app.run()

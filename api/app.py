from flask import Flask
from config import AppConfig
from flask_cors import CORS
from routes.members_routes import member_routes

app = Flask(__name__)
app.config.from_object(AppConfig)
CORS(app)
app.register_blueprint(member_routes)

if __name__ == '__main__':
    app.run()

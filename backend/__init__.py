from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from .config import Config
from flask_mail import Mail
import os

db=SQLAlchemy()
login_manager = LoginManager()
mail=Mail()

def create_app():
    app =Flask(__name__)
    app.config.from_object(Config)
    UPLOAD_FOLDER = "upload"
    ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif", "bmp"}

    app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
    app.config["ALLOWED_EXTENSIONS"] = ALLOWED_EXTENSIONS

    os.makedirs(UPLOAD_FOLDER, exist_ok=True)

    db.init_app(app)
    login_manager.init_app(app)
    mail.init_app(app)

    from .auth import auth as auth_blueprint
    app.register_blueprint(auth_blueprint)


    return app

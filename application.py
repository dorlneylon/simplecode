from flask import Flask
import os

application = app = Flask(__name__)

from app_config import *
from routes import *
from models import db

if __name__ == "__main__":
    os.system('cls')
    app.run(
        host=HOST,
        debug=DEBUG,
        port=PORT
    )
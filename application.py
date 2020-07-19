from flask import Flask
import os

application = app = Flask(__name__)

from app_config import HOST, PORT, DEBUG, POSTS_LIMIT, SQLALCHEMY_TRACK_MODS

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = SQLALCHEMY_TRACK_MODS

from routes import *

if __name__ == "__main__":
    os.system('cls')
    app.run(
        host=HOST,
        debug=DEBUG,
        port=PORT
    )
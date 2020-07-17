from flask import Flask
import os
from app_config import POSTS_LIMIT, HOST, DEBUG, PORT

application = app = Flask(__name__)
from routes import *

if __name__ == "__main__":
    os.system('cls')
    app.run(
        host=HOST,
        debug=DEBUG,
        port=PORT
    )
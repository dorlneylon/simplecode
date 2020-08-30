from flask import Flask
from werkzeug import SharedDataMiddleware
import os

application = app = Flask(__name__)

from .app_config import *

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = SQLALCHEMY_TRACK_MODS
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.wsgi_app = SharedDataMiddleware(app.wsgi_app, { '/uploads' : app.config['UPLOAD_FOLDER']})

def gen_filename(filename):
    if not os.path.exists(os.path.join(app.config['UPLOAD_FOLDER'], filename)):
        return filename
    else:
        extension, image = filename.rsplit(".")[1], filename.rsplit(".")[0]
        for i in range(1, 101):
            file = os.path.join(app.config['UPLOAD_FOLDER'], f"{image}_{i}.{extension}")
            if not os.path.exists(file):
                return f"{image}_{i}.{extension}"

from .routes import *
from .generate_docs import *
from .models import Page, db
from .middleware import posts_limiter

def init_routes():
    for route in Routes:
        app.add_url_rule(
            rule=route.path,
            endpoint=route.path.replace("/", "").replace("<", "").replace(">", ""),
            view_func=route.function,
            methods=route.methods
        )
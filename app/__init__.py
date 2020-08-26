from flask import Flask

application = app = Flask(__name__)

from .app_config import *

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = SQLALCHEMY_TRACK_MODS

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
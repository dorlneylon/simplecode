import configparser
from application import app

config = configparser.ConfigParser()
config.read('config.cfg')
PORT = config.get("server", "port")
DEBUG = config.get("main", "debug")
HOST = config.get("server", "host")
POSTS_LIMIT = config.get("other", "max-posts-available")
SQLALCHEMY_TRACK_MODS = config.get("other", "sqlalchemy-track-modifications")
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = SQLALCHEMY_TRACK_MODS

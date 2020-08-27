import configparser

config = configparser.ConfigParser()
config.read('config.cfg')
THREADED = config.getboolean("main", "threading")
UPLOAD_FOLDER = config.get("other", "images-saving-folder")
PORT = config.getint("server", "port")
DEBUG = config.getboolean("main", "debug")
HOST = config.get("server", "host")
SQLALCHEMY_TRACK_MODS = config.getboolean("other", "sqlalchemy-track-modifications")
POSTS_LIMIT = config.getint("other", "max-posts-available")
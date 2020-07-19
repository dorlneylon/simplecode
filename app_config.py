import configparser

config = configparser.ConfigParser()
config.read('config.cfg')
PORT = config.get("server", "port")
DEBUG = config.get("main", "debug")
HOST = config.get("server", "host")
SQLALCHEMY_TRACK_MODS = config.get("other", "sqlalchemy-track-modifications")
POSTS_LIMIT = int(config.get("other", "max-posts-available"))
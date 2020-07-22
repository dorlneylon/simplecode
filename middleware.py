from models import Page, db
from application import POSTS_LIMIT

def posts_limiter(f):
    def wrapper():
        rows = db.session.query(Page).count()
        if rows > POSTS_LIMIT:
            Page.query.delete()
        func = f()
        return func
    return wrapper
from models import Page, db
from application import POSTS_LIMIT

def posts_limiter(f):
    """
    Description: this decorator was created to check if there's more posts at once than needed. If so, it'll clean the query. You can change max-posts-available number in config.cfg.
    """
    def wrapper(*args, **kwargs):
        rows = db.session.query(Page).count()
        if rows > POSTS_LIMIT:
            Page.query.delete()
        return f(*args, **kwargs)
    
    wrapper.__name__ = f.__name__
    wrapper.__doc__ = f.__doc__
    
    return wrapper
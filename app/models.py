from flask_sqlalchemy import SQLAlchemy
from app import app
import datetime

db = SQLAlchemy(app)

class Page(db.Model):
    """
    Description: table for saving data users insert. Being used to get and insert data.
    Columns: id(primary key), title, author's name, token(link), content, date(inserts automatically).
    """
    id = db.Column(db.Integer, primary_key=True)
    cyrtitle = db.Column(db.String, nullable=False)
    cyrauthor = db.Column(db.String)
    token = db.Column(db.String, nullable=False)
    text = db.Column(db.String, nullable=False)
    date = db.Column(db.DateTime, default=datetime.datetime.now)

    def __repr__(self):
        return f'<Paste {self.id}>'

class Unpublished(db.Model):
    """
    Description: a table for loading unpublished stuff. Being edited every 5 seconds.
    Columns: id(primary key), ip, title, author's name, content.
    """
    id = db.Column(db.Integer, primary_key=True)
    ip = db.Column(db.String)
    title = db.Column(db.String)
    author = db.Column(db.String)
    content = db.Column(db.String)

if __name__ == "__main__":
    db.create_all()
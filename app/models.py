from flask_sqlalchemy import SQLAlchemy
from app import app
import datetime

db = SQLAlchemy(app)

class Page(db.Model):
    """
    Description: table for saving data users insert. Being used to get and insert data.
    Columns: id(inserts automatically), cyrtitle, cyrauthor, token, text, date(inserts automatically).
    """
    id = db.Column(db.Integer, primary_key=True)
    cyrtitle = db.Column(db.String, nullable=False)
    cyrauthor = db.Column(db.String)
    token = db.Column(db.String, nullable=False)
    text = db.Column(db.String, nullable=False)
    date = db.Column(db.DateTime, default=datetime.datetime.now)

    def __repr__(self):
        return f'<Paste {self.id}>'

if __name__ == "__main__":
    db.create_all()
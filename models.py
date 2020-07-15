from flask_sqlalchemy import SQLAlchemy
from application import app
import datetime

db = SQLAlchemy(app)

class Page(db.Model):
    """
    Description: table for saving data users insert. Being used to get and insert data.
    Columns: id(inserts automatically), cyrtitle, cyrauthor, urltitle, urlauthor, text, date(inserts automatically).
    """
    id = db.Column(db.Integer, primary_key=True)
    cyrtitle = db.Column(db.String, nullable=False)
    cyrauthor = db.Column(db.String)
    urltitle = db.Column(db.String, nullable=False)
    urlauthor = db.Column(db.String)
    text = db.Column(db.String, nullable=False)
    date = db.Column(db.DateTime, default=datetime.datetime.now)

    def __repr__(self):
        return f'<Paste {self.id}>'

if __name__ == "__main__":
    db.create_all()
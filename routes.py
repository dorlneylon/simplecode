from application import app
from flask import render_template, request, jsonify, redirect
from models import Page, db
from sqlalchemy.exc import IntegrityError
import json
from delta import html
from html2text import html2text
from transliterate import translit

@app.route('/<Author>-<Title>', methods=['GET', 'POST'])
def get_lel(Author, Title):
    """Here you can see what have you or somebody published recently. Make sure, that more than 29 posts at once are not allowed on this site."""
    if request.method == 'POST':
        global content
        global cyrauthor
        global cyrheadline
        try:
            cyrheadline = request.form['cyrheadline']
            cyrauthor = request.form['cyrauthor']
            content = request.form['content']
            return content
        except KeyError:
            return jsonify({ "message" : "Seems like you are trying to get the data from the post, but you can't do it like that." })
    elif request.method == 'GET':
        rows = db.session.query(Page).count()
        if rows >= 51:
            Page.query.delete()
        data = Page.query.filter_by(urlauthor=Author, urltitle=Title).first()
        if data is not None:
            authorname = str(data.cyrauthor).replace("_", " ").replace("+question+", "?")
            headlinename = str(data.cyrtitle).replace("_", " ").replace("+question+", "?")
            contentname = data.text
            datevalue = str(data.date)[:10]
            content = None
            return render_template('view.html', author=authorname, title=headlinename, content=contentname, date=datevalue)
        elif data is None and content is None:
            return render_template('404.html')
        else:
            try:
                data = Page(urltitle=Title, urlauthor=Author, cyrauthor=cyrauthor, cyrtitle=cyrheadline, text=content)
                db.session.add(data)
                db.session.commit()
            except IntegrityError:
                data = Page.query.filter_by(urlauthor=Author, urltitle=Title).first()
                db.session.delete(data)
                data = Page(urltitle=Title, urlauthor=Author, cyrauthor=cyrauthor, cyrtitle=cyrheadline, text=content)
                db.session.add(data)
                db.session.commit()
            authorname = str(data.cyrauthor).replace("_", " ").replace("+question+", "?")
            headlinename = str(data.cyrtitle).replace("_", " ").replace("+question+", "?")
            contentname = data.text
            datevalue = str(data.date)[:10]
            content = None
            return render_template('view.html', author=authorname, title=headlinename, content=contentname, date=datevalue)

@app.route('/', methods=['GET', 'POST'])
def home():
    """Home page where you're able to create a post or to check how to use API."""
    global content
    content = None
    if request.method == "GET":
        return render_template('home.html')
    elif request.method == "POST":
        return jsonify({ "message": "To create a post simply go on /createpost with POST method with 'author', 'title' and the 'content' fields. If you want to check any post then just go on /checkpost with 'author' and 'title' fields fulfilled." })

@app.route('/createpost', methods=['POST'])
def createOne():
    """Page where you can create a post if it doesn't exist yet. Make sure that you can't use Rich Text Editor with this thing."""
    try:
        json = request.get_json('author')
        an = json['author']
        ti = json['title']
        ct = json['content']
    except KeyError:
        return jsonify({ "message" : "Something went wrong. You've probably missed a row. Try again." })
    data = Page.query.filter_by(cyrauthor=an, cyrtitle=ti).first()
    if data is not None:
        content = None
        return jsonify({ "message" : "This post already exists!" })
    else:
        try:
            content = None
            data = Page(cyrtitle=ti, cyrauthor=an, urltitle=translit(str(ti).replace(" ", "_"), 'ru', reversed=True), urlauthor=translit(str(an).replace(" ", "_"), 'ru', reversed=True), text=ct)
            db.session.add(data)
            db.session.commit()
        except:
            return jsonify({ "message" : "Something went wrong! Try again." })
    authorname = str(data.cyrauthor)
    headlinename = str(data.cyrtitle)
    urlheadline = str(data.urltitle)
    urlauthor = str(data.urlauthor)
    contentname = data.text
    datevalue = str(data.date)[:10]
    content = None
    return jsonify({ "link" : f"/{urlauthor}-{urlheadline}", "author" : authorname, "title" : headlinename, "content" : contentname, "publish date" : datevalue })

@app.route('/checkpost', methods=["POST"])
def checkpost():
    """You can check if post exists and if it exists then you'll be able to get it's author, title, publish date and content information."""
    try:
        js = request.get_json('author')
        author = js['author']
        title = js['title']
    except:
        return jsonify({ "message" : "Something went wrong. You've probably missed a row. Try again." })
    data = Page.query.filter_by(cyrauthor=author, cyrtitle=title).first()
    if data is not None:
        try:
            ct = json.loads(data.text)['ops']
            output = html.render(ct)
            output = html2text(output)
            date = data.date
        except:
            output = data.text
            date = data.date
    else:
        return jsonify({ "message" : "This post doesn't exist. Create one on /createpost page." })
    urlheadline = data.urltitle
    urlauthor = data.urlauthor
    return jsonify({ "title" : title, "link": f"/{urlauthor}-{urlheadline}","author" : author, "publish date" : date, "content" : output })

@app.route('/-', methods=['GET', 'POST'])
def getback():
    """This page was created just to make sure people are not trying to publish empty fields. In the newer version of this site JS already checks that, though."""
    return redirect('/')

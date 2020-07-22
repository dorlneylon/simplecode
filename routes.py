from application import app, POSTS_LIMIT
from flask import render_template, request, jsonify, redirect
from models import Page, db
from middleware import posts_limiter
import uuid
from sqlalchemy.exc import IntegrityError
import json
from delta import html
from html2text import html2text

@posts_limiter
@app.route('/<token>', methods=['GET', 'POST'])
def get_lel(token):
    """
    Description: Here you can see what you or somebody has published recently. Make sure, that more than max-posts-available(check config.cfg and edit it if you want) posts at once are not allowed on this site.
    Possible errors: 404.
    Output example: page with data.
    """
    if request.method == 'POST':
        return jsonify({ "message" : "To get data from post using POST method go to /checkpost page with author and title fields." })
    elif request.method == 'GET':
        data = Page.query.filter_by(token=token).first()
        if data is not None:
            authorname = str(data.cyrauthor)
            headlinename = str(data.cyrtitle)
            contentname = data.text
            datevalue = str(data.date)[:10]
            return render_template('view.html', author=authorname, title=headlinename, content=contentname, date=datevalue)
        else:
            return render_template('404.html')

@posts_limiter
@app.route('/', methods=['GET', 'POST'])
def home():
    """
    Description: Home page where you're able to create a post or to check how to use API.
    """
    if request.method == "GET":
        return render_template('home.html')
    elif request.method == "POST":
        return jsonify({ "message": "To create a post simply go on /createpost with POST method with 'author', 'title' and the 'content' fields. If you want to check any post then just go on /checkpost with 'author' and 'title' fields fulfilled." })

@posts_limiter
@app.route('/createpost', methods=['POST'])
def createOne():
    """
    Requires: author, title, content.
    Description: Page where you can create a post if it doesn't exist yet. To make text formatted use markdown syntax. MARKDOWN BARELY WORKS.
    Possible errors: KeyError, IntegrityError.
    Output example: { "link" : "/token", "author" : testauthor, "title" : testtitle, "content" : testcontent, "publish date" : testdate }.
    """
    try:
        json = request.get_json('author')
        an = json['author']
        ti = json['title']
        ct = json['content']
    except KeyError:
        return jsonify({ "message" : "Something went wrong. You've probably missed a row. Try again." })
    data = Page.query.filter_by(cyrauthor=an, cyrtitle=ti).first()
    if data is not None:
        return jsonify({ "message" : "This post already exists!" })
    else:
        try:
            Token = str(uuid.uuid4())[:5]
            data = Page(cyrtitle=ti, cyrauthor=an, token=Token, text=ct)
            db.session.add(data)
            db.session.commit()
        except:
            return jsonify({ "message" : "Something went wrong! Try again." })
    data = Page.query.filter_by(token=Token).first()
    authorname = str(data.cyrauthor)
    headlinename = str(data.cyrtitle)
    token = data.token
    contentname = data.text
    datevalue = str(data.date)[:10]
    return jsonify({ "link" : f"/{token}", "author" : authorname, "title" : headlinename, "content" : contentname, "publish date" : datevalue })

@posts_limiter
@app.route('/cpapi', methods=["POST"])
def cpapi():
    """
    Requires: author's name, title, token, content.
    Description: cpapi - create post using api. There's no need to go on that page, cuz it is being used only create a post by "submit" button.
    Possible errors: KeyError, IntegrityError.
    Output: 200.
    """
    cyrtitle = request.form['cyrheadline']
    cyrauthor = request.form['cyrauthor']
    token = request.form['token']
    text = request.form['content']
    try:
        data = Page(cyrtitle=cyrtitle, cyrauthor=cyrauthor, token=token, text=text)
        db.session.add(data)
        db.session.commit()
    except:
        return "<h1> Something went wrong! </h1>"
    return "200"

@app.route('/checkpost', methods=["POST"])
def checkpost():
    """
    Requires: link.
    Description: You can check if post exists and if it exists then you'll be able to get it's author, title, publish date and content information.
    Possible errors: IntegrityError, KeyError.
    Output example: { "link" : "/token", "author" : testauthor, "title" : testtitle, "content" : testcontent, "publish date" : testdate }.
    """
    try:
        js = request.get_json('author')
        token = js['link']
    except:
        return jsonify({ "message" : "Something went wrong. You've probably missed a row. Try again." })
    data = Page.query.filter_by(token=token).first()
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
    token = data.token
    title = data.cyrtitle
    author = data.cyrauthor
    return jsonify({ "title" : title, "link": f"/{token}", "author" : author, "publish date" : date, "content" : output })

@app.route('/-', methods=['GET', 'POST'])
def getback():
    """
    Description: This page was created just to make sure people are not trying to publish empty fields. In the newest version of this site JS creates tokens instead, though.
    """
    return redirect('/')

@app.route('/index', methods=["POST", "GET"])
def index():
    """
    Description: simple redirect if you want to use /index.
    """
    return redirect("/")
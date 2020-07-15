from application import app
from flask import render_template, request, jsonify, redirect, Markup
from models import Page, db
from sqlalchemy.exc import IntegrityError
import json
from delta import html
from html2text import html2text
from transliterate import translit

@app.route('/<Author>-<Title>', methods=['GET', 'POST'])
def get_lel(Author, Title):
    """
    Description: Here you can see what have you or somebody published recently. Make sure, that more than 29 posts at once are not allowed on this site.
    Possible errors: 404.
    Output example: page with data.
    """
    if request.method == 'POST':
        return jsonify({ "message" : "To get data from post using POST method go to /checkpost page with author and title fields." })
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
            return render_template('view.html', author=authorname, title=headlinename, content=contentname, date=datevalue)
        else:
            return render_template('404.html')

@app.route('/', methods=['GET', 'POST'])
def home():
    """
    Description: Home page where you're able to create a post or to check how to use API.
    """
    global content
    content = None
    if request.method == "GET":
        return render_template('home.html')
    elif request.method == "POST":
        return jsonify({ "message": "To create a post simply go on /createpost with POST method with 'author', 'title' and the 'content' fields. If you want to check any post then just go on /checkpost with 'author' and 'title' fields fulfilled." })

@app.route('/createpost', methods=['POST'])
def createOne():
    """
    Description: Page where you can create a post if it doesn't exist yet. Make sure that you can't use Rich Text Editor with this thing.
    Possible errors: KeyError, IntegrityError.
    Output example: { "link" : "/testauthor-testtitle", "author" : testauthor, "title" : testtitle, "content" : testcontent, "publish date" : testdate }.
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

@app.route('/cpapi', methods=["POST"])
def cpapi():
    """
    Description: cpapi - create post using api. There's no need to go on that page, cuz it is being used only create a post by "submit" button.
    Possible errors: KeyError, IntegrityError.
    Output: 200.
    """
    cyrtitle = request.form['cyrheadline']
    cyrauthor = request.form['cyrauthor']
    urltitle = request.form['urltitle']
    urlauthor = request.form['urlauthor']
    text = request.form['content']
    try:
        data = Page(cyrtitle=cyrtitle, cyrauthor=cyrauthor, urltitle=urltitle, urlauthor=urlauthor, text=text)
        db.session.add(data)
        db.session.commit()
    except:
        return "</h1> Something went wrong! </h1>"
    return 200

@app.route('/checkpost', methods=["POST"])
def checkpost():
    """
    Description: You can check if post exists and if it exists then you'll be able to get it's author, title, publish date and content information.
    Possible errors: IntegrityError, KeyError.
    Output example: { "link" : "/testauthor-testtitle", "author" : testauthor, "title" : testtitle, "content" : testcontent, "publish date" : testdate }.
    """
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
    return jsonify({ "title" : title, "link": f"/{urlauthor}-{urlheadline}", "author" : author, "publish date" : date, "content" : output })

@app.route('/-', methods=['GET', 'POST'])
def getback():
    """
    Description: This page was created just to make sure people are not trying to publish empty fields. In the newer version of this site JS already checks that, though.
    """
    return redirect('/')

@app.route('/index', methods=["POST", "GET"])
def index():
    """
    Description: simple redirect if you want to use /index.
    """
    return redirect("/")
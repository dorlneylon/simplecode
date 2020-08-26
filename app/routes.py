from flask import render_template, request, jsonify, redirect, Markup, send_file
from .models import Page, Unpublished, db
from .middleware import posts_limiter
import uuid
from sqlalchemy.exc import IntegrityError
import json
from html2text import html2text
from .app_config import POSTS_LIMIT


@posts_limiter
def get_lel(token):
    """
    Description: Here you can see what you or somebody has published recently.
    Possible errors: 404.
    Output example: page with data.
    """
    if request.method == 'POST':
        return jsonify({ "message" : "To get data from post using POST method go to /checkpost page with post's link." })
    elif request.method == 'GET':
        data = Page.query.filter_by(token=token).first()
        if data is not None:
            authorname = Markup(str(data.cyrauthor))
            headlinename = Markup(str(data.cyrtitle))
            contentname = data.text
            datevalue = str(data.date)[:10]
            return render_template('view.html', author=authorname, title=headlinename, content=contentname, date=datevalue)
        else:
            return render_template('404.html')


@posts_limiter
def home():
    """
    Description: Home page where you're able to create a post or to check how to use API.
    """
    if request.method == "GET":
        return render_template('home.html')
    elif request.method == "POST":
        return jsonify({ "message": "To create a post simply go on /createpost with POST method with 'author', 'title' and the 'content' fields. If you want to check any post then just go on /checkpost with the link to the post you want to get info about." })


def icons():
    """
    Description: Shows icons for CSS.
    Output: icons png.
    """
    return send_file("static/images/icons.png")

@posts_limiter
def createOne():
    """
    Requires: author, title, content.
    Description: Page where you can create a post if it doesn't exist yet.
    Possible errors: KeyError, IntegrityError.
    Output example: { "link" : "/token", "author" : testauthor, "title" : testtitle, "content" : testcontent, "publish date" : testdate }.
    """
    try:
        json = request.get_json('author')
        an = json['author']
        ti = json['title']
        ct = json['content']
        Token = str(uuid.uuid4())[:5]
    except KeyError:
        return jsonify({ "message" : "Something went wrong. You've probably missed a row. Try again." })
    input = ct.replace("[NEWLINE]", "<p class=\"\">").replace("[ENDLINE]", "</p>").replace("[EMPTYLINE]", "<br>").replace("[BOLD]", "<b>").replace("[/BOLD]", "</b>").replace("[ITALIC]", "<i>").replace("[/ITALIC]", "</i>").replace("[QUOTE]", "<blockquote>").replace("[/QUOTE]", "</blockquote>").replace("[H2]", "<h2>").replace("[/H2]", "</h2>").replace("[H3]", "<h3>").replace("[/H3]", "</h3>").replace("[CODE]", "<pre>").replace("[/CODE]", "</pre>\n").replace("[TABLE]", "<table class=\"medium-editor-table\" width=\"100%\"><tbody>").replace("[/TABLE]", "</tbody></table>").replace("[TR]", "<tr>").replace("[/TR]", "</tr>\n").replace("[TD]", "<td>\n").replace("[/TD]", "</td>\n")
    try:
        data = Page(cyrtitle=ti, cyrauthor=an, token=Token, text=input)
        db.session.add(data)
        db.session.commit()
    except:
        return "409"

    return jsonify({ "link" : f"/{data.token}", "author" : data.cyrauthor, "title" : data.cyrtitle, "content" : str(html2text(data.text)), "publish date" : str(data.date)[:10] })
    # return insert(author=an, title=ti, content=ct)

@posts_limiter
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
    ipaddress = request.form['ip']
    up = Unpublished.query.filter_by(ip=ipaddress).all()
    if up is not None:
        for field in up:
            db.session.delete(field)
    fields = Page.query.filter_by(token=token).all()
    if fields is not None:
        for field in fields:
            db.session.delete(field)
    try:
        data = Page(cyrtitle=cyrtitle, cyrauthor=cyrauthor, token=token, text=text)
        db.session.add(data)
        db.session.commit()
    except:
        return "409"
    return "201"

def api():
    return render_template("api.html")

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
        content = data.text
        output = html2text(content)
        date = data.date
    else:
        return jsonify({ "message" : "This post doesn't exist. Create one on /createpost page." })
    token = data.token
    title = data.cyrtitle
    author = data.cyrauthor
    return jsonify({ "title" : title, "link": f"/{token}", "author" : author, "publish date" : date, "content" : output })

def getback():
    """
    Description: This page was created just to make sure people are not trying to publish empty fields. In the newest version of this site JS creates tokens instead, though.
    """
    return redirect('/')

def index():
    """
    Description: simple redirect if you want to use /index.
    """
    return redirect("/")

def unpublished():
    """
    Requires: ip address, title, author, content, inserts.
    Description: send temporary user's inserts so if he reopens the window it'll automatically restore his lost data.
    Output: 201.
    """
    ipaddress = request.form['ip']
    title = request.form['title']
    author = request.form['author']
    text = request.form['text']
    data = Unpublished.query.filter_by(ip=ipaddress).all()
    if data is not None:
        for field in data:
            db.session.delete(field)
        data = Unpublished(ip=ipaddress, title=title, author=author, content=text)
        db.session.add(data)
        db.session.commit()
    else:
        data = Unpublished(ip=ipaddress, title=title, author=author, content=text)
        db.session.add(data)
        db.session.commit()
    return "201"

def checkunpub():
    """
    Requires: ip address.
    Description: if users reopens the window this route'll restore his lost data.
    Ouput example: { "author" : author, "title" : title, "text" : content }.
    """
    ipaddress = request.form['ip']
    try:
        data = Unpublished.query.filter_by(ip=ipaddress).all()[-1]
    except IndexError:
        data = Unpublished.query.filter_by(ip=ipaddress).first()
    if data is not None:
        return jsonify({ "author" : data.author if data.author else "<p><br></p>", "title" : data.title if data.title else "<p><br></p>", "text" : data.content })
    else:
        return None

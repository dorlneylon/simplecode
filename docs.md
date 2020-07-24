# Routes and info about them.

| Route | function | methods | Is working? |
| ------------- | -------- | -------- | -------- |
| / | home | ['GET', 'POST'] | True |
| /- | getback | ['GET', 'POST'] | True |
| /\<token\> | get_lel | ['GET', 'POST'] | True |
| /createpost | createOne | ['POST'] | True |
| /checkpost | checkpost | ['POST'] | True |
| /cpapi | cpapi | ['POST'] | True |
| /index | index | ['GET', 'POST'] | True |

## home's docs:

Description: Home page where you're able to create a post or to check how to use API.


## getback's docs:

Description: This page was created just to make sure people are not trying to publish empty fields. In the newest version of this site JS creates tokens instead, though.


## get_lel's docs:

Description: Here you can see what you or somebody has published recently.

Possible errors: 404.

Output example: page with data.


## createOne's docs:

Requires: author, title, content.

Description: Page where you can create a post if it doesn't exist yet. To make text formatted use markdown syntax. MARKDOWN BARELY WORKS.

Possible errors: KeyError, IntegrityError.

Output example: { "link" : "/token", "author" : testauthor, "title" : testtitle, "content" : testcontent, "publish date" : testdate }.


## checkpost's docs:

Requires: link.

Description: You can check if post exists and if it exists then you'll be able to get it's author, title, publish date and content information.

Possible errors: IntegrityError, KeyError.

Output example: { "link" : "/token", "author" : testauthor, "title" : testtitle, "content" : testcontent, "publish date" : testdate }.


## cpapi's docs:

Requires: author's name, title, token, content.

Description: cpapi - create post using api. There's no need to go on that page, cuz it is being used only create a post by "submit" button.

Possible errors: KeyError, IntegrityError.

Output: 200.


## index's docs:

Description: simple redirect if you want to use /index.



# Models.

## Page's docs:

Description: table for saving data users insert. Being used to get and insert data.

Columns: id(inserts automatically), cyrtitle, cyrauthor, token, text, date(inserts automatically).


# Decorators.


## posts_limiter's docs:

Description: this decorator was created to check if there's more posts at once than needed. If so, it'll clean the query. You can change max-posts-available number in config.cfg.


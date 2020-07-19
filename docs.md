# Routes and info about them.

| Route | function | methods | Is working? |
| ------------- | -------- | -------- | -------- |
| / | home | ['GET', 'POST'] | True |
| /- | getback | ['GET', 'POST'] | True |
| /\<token\> | get_lel | ['GET', 'POST'] | True |
| /createpost | createOne | ['POST'] | True |
| /checkpost | checkpost | ['POST'] | True |
| /cpapi | cpapi | ['POST'] | True |
| /index | index | ['POST'] | True |

## home's docs:

Description: Home page where you're able to create a post or to check how to use API.


## getback's docs:

Description: This page was created just to make sure people are not trying to publish empty fields. In the newer version of this site JS already checks that, though.


## get_lel's docs:

Description: Here you can see what have you or somebody published recently. Make sure, that more than max-posts-available(check config.cfg and edit it if you want) posts at once are not allowed on this site.

Possible errors: 404.

Output example: page with data.


## createOne's docs:

Requires: author, title, content.

Description: Page where you can create a post if it doesn't exist yet. Make sure that you can't use Rich Text Editor with this thing.

Possible errors: KeyError, IntegrityError.

Output example: { "link" : "/token", "author" : testauthor, "title" : testtitle, "content" : testcontent, "publish date" : testdate }.


## checkpost's docs:

Requires: link.

Description: You can check if post exists and if it exists then you'll be able to get it's author, title, publish date and content information.

Possible errors: IntegrityError, KeyError.

Output example: { "link" : "/token", "author" : testauthor, "title" : testtitle, "content" : testcontent, "publish date" : testdate }.


## cpapi's docs:

Requires: cyryllic author's name, cyryllic title, token, content.

Description: cpapi - create post using api. There's no need to go on that page, cuz it is being used only create a post by "submit" button.

Possible errors: KeyError, IntegrityError.

Output: 200.


## index's docs:

Description: simple redirect if you want to use /index.



# Models.

## Page's docs:

Description: table for saving data users insert. Being used to get and insert data.

Columns: id(inserts automatically), cyrtitle, cyrauthor, token, text, date(inserts automatically).


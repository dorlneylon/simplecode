# Routes and info about them.

| Route | function | methods | Is working? |
| ------------- | -------- | -------- | -------- |
| / | home | ['GET', 'POST'] | True |
| /- | getback | ['GET', 'POST'] | True |
| /\<token\> | get_lel | ['GET', 'POST'] | True |
| /createpost | createOne | ['POST'] | True |
| /checkpost | checkpost | ['POST'] | True |
| /icons | icons | ['GET', 'POST'] | True |
| /api | api | ['GET'] | True |
| /cpapi | cpapi | ['POST'] | True |
| /upload | img_upload | ['GET', 'POST'] | True |
| /uploads/\<string:filename\> | get_img | ['GET'] | True |
| /delete | delete_file | ['DELETE'] | True |
| /index | index | ['GET', 'POST'] | True |
| /unpublished | unpublished | ['POST'] | True |
| /checkunpub | checkunpub | ['POST'] | True |

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

Description: Page where you can create a post if it doesn't exist yet.

Possible errors: KeyError, IntegrityError.

Output example: { "link" : "/token", "author" : testauthor, "title" : testtitle, "content" : testcontent, "publish date" : testdate }.


## checkpost's docs:

Requires: link.

Description: You can check if post exists and if it exists then you'll be able to get it's author, title, publish date and content information.

Possible errors: IntegrityError, KeyError.

Output example: { "link" : "/token", "author" : testauthor, "title" : testtitle, "content" : testcontent, "publish date" : testdate }.


## icons's docs:

Description: Shows icons for CSS.

Output: icons png.


## api's docs:

Description: Here you can see how to use our API system even with text formats.


## cpapi's docs:

Requires: author's name, title, token, content.

Description: cpapi - create post using api. There's no need to go on that page, cuz it is being used only create a post by "submit" button.

Possible errors: KeyError, IntegrityError.

Output: 200.


## img_upload's docs:

Description: file uploading by jQuery File Upload.

Output example: {"files" : [{"name" : "filename", "url" : "http://127.0.0.1:5000/uploads/filename"}]}.


## get_img's docs:

Description: a way to check the uploads. Mostly being used by jQuery File Upload.

Output: file.


## delete_file's docs:

Description: file delete by jQuery File Upload.

Output example: { 'filename' : 'True' } or { 'filename' : 'False' }.


## index's docs:

Description: simple redirect if you want to use /index.


## unpublished's docs:

Requires: ip address, title, author, content, inserts.

Description: send temporary user's inserts so if he reopens the window it'll automatically restore his lost data.

Output: 201.


## checkunpub's docs:

Requires: ip address.

Description: if users reopens the window this route'll restore his lost data.

Ouput example: { "author" : author, "title" : title, "text" : content }.



# Models.

## Page's docs:

Description: table for saving data users insert. Being used to get and insert data.

Columns: id(primary key), title, author's name, token(link), content, date(inserts automatically).


## Unpublished's docs:

Description: a table for loading unpublished stuff. Being edited every 5 seconds.

Columns: id(primary key), ip, title, author's name, content.


# Decorators.


## posts_limiter's docs:

Description: this decorator was created to check if there's more posts at once than needed. If so, it'll clean the query. You can change max-posts-available number in config.cfg.


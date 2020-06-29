# Routes and info about them.

| Route | function | methods | Is working? | Info |
| ------------- | -------- | -------- | -------- | ------------ |
| / | home | [GET, POST] | True | Home page where youre able to create a post or to check how to use API. |
| /- | getback | [GET, POST] | True | This page was created just to make sure people are not trying to publish empty fields. In the newer version of this site JS already checks that, though. |
| /{Author}-{Title} | get_lel | [GET, POST] | True | Here you can see what have you or somebody published recently. Make sure, that more than 29 posts at once are not allowed on this site. |
| /createpost | createOne | [POST] | True | Page where you can create a post if it doesnt exist yet. Make sure that you cant use Rich Text Editor with this thing. |
| /checkpost | checkpost | [POST] | True | You can check if post exists and if it exists than youll be able to get its author, title, publish date and content information. |

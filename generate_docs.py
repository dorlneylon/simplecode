from routes import *
from middleware import posts_limiter
from models import Page
from dataclasses import dataclass

@dataclass
class Route:
    path: str
    function: str
    methods: str
    working: bool
    info: str

@dataclass
class Model:
    name: str
    info: str

@dataclass
class Decorator:
    function: str
    info: str

Models = [
    Model("Page", Page.__doc__)
]

Decorators = [
    Decorator("posts_limiter", posts_limiter.__doc__)
]

Routes = [
    Route("/", "home", ["GET", "POST"], True, home.__doc__),
    Route("/-", "getback", ["GET", "POST"], True, getback.__doc__),
    Route("/<token>", "get_lel", ["GET", "POST"], True, get_lel.__doc__),
    Route("/createpost", "createOne", ["POST"], True, createOne.__doc__),
    Route("/checkpost", "checkpost", ["POST"], True, checkpost.__doc__),
    Route("/cpapi", "cpapi", ["POST"], True, cpapi.__doc__),
    Route("/index", "index", ["GET", "POST"], True, index.__doc__)
]

def generate_docs():
    with open("docs.md", "w") as docs:
        docs.writelines(["# Routes and info about them.\n\n", "| Route | function | methods | Is working? |\n", "| ------------- | -------- | -------- | -------- |\n"])
        for route in Routes:
            path = route.path.replace("<", "\<").replace(">", "\>")
            docs.writelines(f"| {path} | {route.function} | {route.methods} | {route.working} |\n")
        for route in Routes:
            docs.writelines([f"\n## {route.function}'s docs:", f"{route.info}".replace("\n    ", "\n\n")])
        docs.writelines("\n\n# Models.\n")
        for model in Models:
            docs.writelines([f"\n## {model.name}'s docs:", f"{model.info}".replace("\n    ", "\n\n")])
        docs.writelines("\n# Decorators.\n\n")
        for decorator in Decorators:
            docs.writelines([f"\n## {decorator.function}'s docs:", f"{decorator.info}".replace("\n    ", "\n\n")])
    with open("README.md", "w") as rm:
        rm.writelines(["# SimpleCode.\n", "### SimpleCode was created for coders who want to use something like Pastebin but Pastebin is not simple in using(I mean various posts, Outstanding API, etc.).\n", "SimpleCode does look like Telegra.ph, because I wanted it to look beautiful.\n", "SimpleCode uses QuillJS and Markdown so you can easily get your text formatted.\n", "Markdown doesn't work nice yet, though =)\n", "# Usage.\n", "### Firstly, install requirements.\n", "``` pip install -r requirements.txt ```\n", "### Now we want to generate the newest version of documentation.\n", "``` python generate_docs.py ```\n", "### From this moment we have to read docs =) and we wanna create our database.\n", "``` python models.py ```\n", "### Well, now just use this :)\n"])

if __name__ == "__main__":
    generate_docs()
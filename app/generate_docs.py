from .middleware import posts_limiter
from .models import Page, Unpublished
from dataclasses import dataclass
from .routes import *

@dataclass
class Route:
    path: str
    funcname: str
    function: callable
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
    Model("Page", Page.__doc__),
    Model("Unpublished", Unpublished.__doc__)
]

Decorators = [
    Decorator("posts_limiter", posts_limiter.__doc__)
]

Routes = [
    Route("/", "home", home, ["GET", "POST"], True, home.__doc__),
    Route("/-", "getback", getback, ["GET", "POST"], True, getback.__doc__),
    Route("/<token>", "get_lel", get_lel, ["GET", "POST"], True, get_lel.__doc__),
    Route("/createpost", "createOne", createOne, ["POST"], True, createOne.__doc__),
    Route("/checkpost", "checkpost", checkpost, ["POST"], True, checkpost.__doc__),
    Route("/cpapi", "cpapi", cpapi, ["POST"], True, cpapi.__doc__),
    Route("/index", "index", index, ["GET", "POST"], True, index.__doc__),
    Route("/unpublished", "unpublished", unpublished, ["POST"], True, unpublished.__doc__),
    Route("/checkunpub", "checkunpub", checkunpub, ["POST"], True, checkunpub.__doc__)
]

def generate_docs():
    with open("docs.md", "w") as docs:
        docs.writelines(["# Routes and info about them.\n\n", "| Route | function | methods | Is working? |\n", "| ------------- | -------- | -------- | -------- |\n"])
        for route in Routes:
            path = route.path.replace("<", "\<").replace(">", "\>")
            docs.writelines(f"| {path} | {route.funcname} | {route.methods} | {route.working} |\n")
        for route in Routes:
            docs.writelines([f"\n## {route.funcname}'s docs:", f"{route.info}".replace("\n    ", "\n\n")])
        docs.writelines("\n\n# Models.\n")
        for model in Models:
            docs.writelines([f"\n## {model.name}'s docs:", f"{model.info}".replace("\n    ", "\n\n")])
        docs.writelines("\n# Decorators.\n\n")
        for decorator in Decorators:
            docs.writelines([f"\n## {decorator.function}'s docs:", f"{decorator.info}".replace("\n    ", "\n\n")])
    with open("README.md", "w") as rm:
        rm.writelines(["# SimpleCode.\n", "### SimpleCode was created for coders who want to use something like Pastebin but Pastebin is not simple in using(I mean various posts, Outstanding API, etc.).\n", "SimpleCode does look like Telegra.ph, because I wanted it to look beautiful.\n", "SimpleCode uses Medium Editor so you can easily get your text formatted.\n", "And yeah, you can't format text using API. Selenium only =)\n", "We **DO** have tables!\n", "# Usage.\n", "### Firstly, install requirements.\n", "``` pip install -r requirements.txt ```\n", "### Now we want to generate the newest version of documentation.\n", "``` python docs_creator.py ```\n", "### From this moment we have to read docs =)\n", "### Well, now just use this :)\n", "```python start.py```"])

if __name__ == "__main__":
    generate_docs()
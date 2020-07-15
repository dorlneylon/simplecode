from routes import *
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

Models = [
    Model("Page", Page.__doc__)
]

Routes = [
    Route("/", "home", ["GET", "POST"], True, home.__doc__),
    Route("/-", "getback", ["GET", "POST"], True, getback.__doc__),
    Route("/{Author}-{Title}", "get_lel", ["GET", "POST"], True, get_lel.__doc__),
    Route("/createpost", "createOne", ["POST"], True, createOne.__doc__),
    Route("/checkpost", "checkpost", ["POST"], True, checkpost.__doc__),
    Route("/cpapi", "cpapi", ["POST"], True, cpapi.__doc__)
]

def generate_docs():
    with open("docs.md", "w") as docs:
        docs.writelines("# Routes and info about them.\n\n")
        docs.writelines("| Route | function | methods | Is working? |\n")
        docs.writelines("| ------------- | -------- | -------- | -------- |\n")
        for route in Routes:
            docs.writelines(f"| {route.path} | {route.function} | {route.methods} | {route.working} |\n")
        for route in Routes:
            docs.writelines([f"\n## {route.function}'s docs:", f"{route.info}".replace("\n    ", "\n\n")])
        docs.writelines("\n\n# Models.\n")
        for model in Models:
            docs.writelines([f"\n## {model.name}'s docs:", f"{model.info}".replace("\n    ", "\n\n")])

if __name__ == "__main__":
    generate_docs()
from routes import *
from dataclasses import dataclass

@dataclass
class Route:
    path: str
    function: callable
    methods: str
    working: bool
    info: str

Routes = [
    Route("/", "home", ["GET", "POST"], True, home.__doc__),
    Route("/-", "getback", ["GET", "POST"], True, getback.__doc__),
    Route("/<Author>-<Title>", "get_lel", ["GET", "POST"], True, get_lel.__doc__),
    Route("/createpost", "createOne", ["POST"], True, createOne.__doc__),
    Route("/checkpost", "checkpost", ["POST"], True, checkpost.__doc__)
]

def generate_docs():
    with open("docs.md", "w") as docs:
        docs.writelines("# Routes and info about them.\n\n")
        docs.writelines("| Route | function | methods | Is working? | Info |\n")
        docs.writelines("| ------------- | -------- | -------- | -------- | ------------ |\n")
        for route in Routes:
            docs.writelines(f"| {route.path} | {route.function} | {route.methods} | {route.working} | {route.info} |\n")

if __name__ == "__main__":
    generate_docs()
from routes import *

Routes = [
    ["/ |", "home |", '["GET", "POST"] |', "True |", f'{str(home.__doc__)} |'],
    ["/- |", "getback |", '["GET", "POST"] |', "True |", f'{str(getback.__doc__)} |'],
    ["/{Author}-{Title} |", "get_lel |", '["GET", "POST"] |', "True |", f'{str(get_lel.__doc__)} |'],
    ["/createpost |", "createOne |", "['POST'] |", "True |", f'{str(createOne.__doc__)} |'],
    ["/checkpost |", "checkpost |", "['POST'] |", "True |", f'{str(checkpost.__doc__)} |']
]

def generate_docs():
    with open("docs.md", "w") as docs:
        docs.writelines("# Routes and info about them.\n\n")
        docs.writelines("| Route | function | methods | Is working? | Info |\n")
        docs.writelines("| ------------- | -------- | -------- | -------- | ------------ |\n")
        for i in range(0, len(Routes)):
            k = str(Routes[i]).lstrip("[").rstrip("],").replace("'", "").replace('"', '').replace("|,", "|")
            docs.writelines(f"| {k}\n")

if __name__ == "__main__":
    generate_docs()
hljs.configure({
    languages: ["javascript", "ruby", "python", "cpp", "c", "cs", "php", "html", "css", "postgres"],
    tabReplace: "    "
});
var tiquill = new Quill("#TITLETEXT", {
    modules: {
        syntax: false,
        toolbar: false
    },
    placeholder: "Your title..",
    theme: "bubble"
    });
tiquill.root.setAttribute("spellcheck", false);
var aquill = new Quill("#AUTHORNAME", {
    modules: { 
        syntax: false, 
        toolbar: false 
    }, 
    placeholder: "Your name..",
    theme: "bubble"
});
aquill.root.setAttribute("spellcheck", false);

let toolbarOptions = {
    container: [
        ["bold", "italic", "underline", { header: 1 }, { header: 2 }],
        ["blockquote", "code-block"],
    ],
};

var quill = new Quill("#INPUTTEXT", {
    modules: {
        syntax: true,
        toolbar: toolbarOptions
    },
    placeholder: "Your content..",
    theme: "bubble"
});
quill.root.setAttribute("spellcheck", false);

function func1() {
    const rand=()=>Math.random(0).toString(36).substr(2);
    const token=(length)=>(rand()+rand()+rand()+rand()).substr(0,length);
    var link = token(5);
    var title = tiquill.root.innerText;
    var author = aquill.root.innerText;
    var delta = quill.getContents();
    if (author.length > 2) {
        if (title.length > 2) {
            if (delta != '{"ops":[{"insert":"n"}]}') {
                if (delta != '{"ops":[{"insert":""}]}') {
                            $.post("/cpapi", { token: link, cyrauthor: author, cyrheadline: title, content: JSON.stringify(delta) });
                            setTimeout(() => {
                                window.location.href = "/" + link;
                            }, 1000);
                }
            }
        }
    }
}

document.getElementById("SUBMIT").addEventListener("click", function () {
    try {
        document.querySelector(".ql-syntax").innerHTML = document.querySelector(".ql-syntax").innerHTML.split("                                        ").join("&#9;&#9;&#9;&#9;&#9;&#9;&#9;&#9;&#9;&#9;").split("                                    ").join("&#9;&#9;&#9;&#9;&#9;&#9;&#9;&#9;&#9;").split("                                ").join("&#9;&#9;&#9;&#9;&#9;&#9;&#9;&#9;").split("                            ").join("&#9;&#9;&#9;&#9;&#9;&#9;&#9;").split("                        ").join("&#9;&#9;&#9;&#9;&#9;&#9;").split("                    ").join("&#9;&#9;&#9;&#9;&#9;").split("                ").join("&#9;&#9;&#9;&#9;").split("            ").join("&#9;&#9;&#9;").split("        ").join("&#9;&#9;").split("    ").join("&#9;");
    } catch (e) {
        return e;
    }
});
document.getElementById("SUBMIT").addEventListener("click", func1);

Quill.register("modules/tables", function (quill, options) {
    var button = document.querySelector(".ql-tables");
    button.addEventListener("click", function () {
        if (button.classList.contains("ql-active") === true) {
            button.classList.remove("ql-active");
            quill.root.dataset.placeholder = "Your content..";
            $(".ql-editor").empty();
            document.querySelector(".fa-table").classList.remove("ql-active");
            if (window.innerWidth < 993) {
                $('#SUBMIT').css({ 'margin-top': '5%' });
                $('#INPUTTEXT').css({ 'font-size': '20px' });
            } else {
                $('#SUBMIT').css({ 'margin-top': '0%' });
            };
        } else {
            button.classList.add("ql-active");
            document.querySelector(".fa-table").classList.add("ql-active");
            $(".ql-editor").empty();
            quill.root.dataset.placeholder = "Example:\n| tables | should be | the only thing |\n| ------ | ---- | ----- |\n| in the post | or, at least, | the last |";
            if (window.innerWidth < 993) {
                $('#SUBMIT').css({ 'margin-top': '20%' });
                $('#INPUTTEXT').css({ 'font-size': 'large' });
            } else {
                $('#SUBMIT').css({ 'margin-top': '3%' });
            };
    };
    });

    quill.on("editor-change", function () {
        var bold = document.querySelector(".ql-bold");
        var italic = document.querySelector(".ql-italic");
        var underline = document.querySelector(".ql-underline");
        var header = document.querySelector(".ql-header");
        if (bold.classList.contains("ql-active") === true || italic.classList.contains("ql-active") === true || underline.classList.contains("ql-active") === true || header.classList.contains("ql-active") === true) {
            button.classList.remove("ql-active");
            quill.root.dataset.placeholder = "Your content..";
            $(".ql-editor").empty();
            document.querySelector(".fa-table").classList.remove("ql-active");
            if (window.innerWidth < 993) {
                $('#SUBMIT').css({ 'margin-top': '5%' });
                $('#INPUTTEXT').css({ 'font-size': '20px' });
            } else {
                $('#SUBMIT').css({ 'margin-top': '0%' });
            };
        };
    })
});

let icons = Quill.import("ui/icons");
icons['tables'] = '<i class="fa fa-table" aria-hidden="true"></i>';

hljs.configure({
    languages: ["javascript", "ruby", "python", "cpp", "c", "cs", "php", "html", "css", "postgres"],
    tabReplace: "    "
});
var tiquill = new Quill("#TITLETEXT", {
    modules: {
        syntax: false,
        toolbar: false
    },
    formats: ['size'],
    placeholder: "Your title..",
    theme: "bubble"
    });
tiquill.root.setAttribute("spellcheck", false);
var aquill = new Quill("#AUTHORNAME", {
    modules: { 
        syntax: false, 
        toolbar: false 
    },
    formats: ['size'],
    placeholder: "Your name..",
    theme: "bubble"
});
aquill.root.setAttribute("spellcheck", false);

let toolbarOptions = {
    container: [
        ["bold", "italic", "underline", { header: 1 }, { header: 2 }],
        ["blockquote", "tables", "code-block"],
    ],
};

var quill = new Quill("#INPUTTEXT", {
    modules: {
        tables: true,
        syntax: true,
        toolbar: toolbarOptions
    },
    formats: ['size'],
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

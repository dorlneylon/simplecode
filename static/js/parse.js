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
    var title = tiquill.root.innerText;
    var stripedtitle = title.split(" ").join("_").split("?").join("+question+");
    var author = aquill.root.innerText;
    var stripedauthor = author.split(" ").join("_").split("?").join("+question+");
    var isCyrillic = function (text) {
        return /[а-я]/i.test(text);
    };
    var delta = quill.getContents();
    if (author != "") {
        if (title != "") {
            if (delta != '{"ops":[{"insert":"n"}]}') {
                if (delta != '{"ops":[{"insert":""}]}') {
                    if (isCyrillic(title) === false) {
                        if (isCyrillic(author) === false) {
                            $.post("/cpapi", { cyrauthor: stripedauthor, cyrheadline: stripedtitle, urltitle: stripedtitle, urlauthor: stripedauthor, content: JSON.stringify(delta) });
                            setTimeout(() => {
                                window.location.href = "/" + stripedauthor + "-" + stripedtitle;
                            }, 1500);
                        } else {
                            var transedtitle = transliterate(stripedtitle);
                            var transedauthor = transliterate(stripedauthor);
                            $.post("/cpapi", { cyrauthor: stripedauthor, cyrheadline: stripedtitle, urlauthor: transedauthor, urltitle: transedtitle, content: JSON.stringify(delta) });
                            setTimeout(() => {
                                window.location.href = "/" + transedauthor + "-" + transedtitle;
                            }, 1500);
                        }
                    } else {
                        var transedtitle = transliterate(stripedtitle);
                        var transedauthor = transliterate(stripedauthor);
                        $.post("/cpapi", { cyrauthor: stripedauthor, cyrheadline: stripedtitle, urlauthor: transedauthor, urltitle: transedtitle, content: JSON.stringify(delta) });
                        setTimeout(() => {
                            window.location.href = "/" + transedauthor + "-" + transedtitle;
                        }, 1500);
                    }
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
let el = document.getElementById("TITLETEXT");
let el2 = document.getElementById("AUTHORNAME");
el.onkeypress = function (e) {
    var prohibited = "-#<>_";
    var key = String.fromCharCode(e.which);
    if (prohibited.indexOf(key) >= 0) {
        return false;
    }
    return true;
};
el2.onkeypress = function (e) {
    var prohibited = "-#<>_";
    var key = String.fromCharCode(e.which);
    if (prohibited.indexOf(key) >= 0) {
        return false;
    }
    return true;
};

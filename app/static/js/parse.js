hljs.configure({
    languages: ["javascript", "ruby", "python", "cpp", "c", "cs", "php", "html", "css", "postgres"],
    tabReplace: "    ",
    useBR: true
});

const rand=()=>Math.random(0).toString(36).substr(2);
const token=(length)=>(rand()+rand()+rand()+rand()).substr(0,length);
var link = token(5);

let authorfield = document.getElementById("AUTHORNAME");
let titlefield = document.getElementById("TITLETEXT");
let contentfield = document.getElementById("INPUTTEXT");

var contenteditor = new MediumEditor(contentfield, {
    buttonLabels: 'fontawesome',
    autoLink: true,
    extensions: {
        'pre' : new MediumButton({label:'<i class="fa fa-code", style="-webkit-text-stroke: 1px white; color: white"></i>', start:"<pre>", end:"</pre>",
        action: function (html) {
            if ($(window).width() < 993) {
                $(".warnpre").css({"margin-top" : "-10%"});
                setTimeout(() => {$(".warn-pre").css({"margin-top" : "-60%"})}, 2000);
             } else {
                $(".warn-pre").css({"margin-top" : "-3%"});
                setTimeout(() => {$(".warn-pre").css({"margin-top" : "-20%"})}, 2000);
             };
             return html;
        }
        }),
        table: new MediumEditorTable(),
    },
    toolbar: {
      buttons: [
        {
            name: 'bold',
            tagNames: ['b'],
            useQueryState: true,
            contentDefault: '<b>&bull;</b>',
            contentFA: "<div class='boldmb'></i>"
        },
        {
            name: 'italic',
            tagNames: ['i'],
            useQueryState: true,
            contentDefault: '<b>&bull;</b>',
            contentFA: "<div class='italicmb'></i>"
        },
        {
            name: 'quote',
            tagNames: ['quote'],
            useQueryState: true,
            contentDefault: '<b>&ldquo;</b>',
            contentFA: "<div class='quotemb'></i>"
        },
        {
            name: 'h2',
            tagNames: ['h2'],
            useQueryState: true,
            contentDefault: '<b>&bull;</b>',
            contentFA: "<div class='h2mb'></i>"
        },
        {
            name: 'h3',
            tagNames: ['h3'],
            useQueryState: true,
            contentDefault: '<b>&bull;</b>',
            contentFA: "<div class='h3mb'></i>"
        },
        'pre',
        'table'
      ]
    },
    placeholder: {
        text: 'Content'
    },
    spellcheck: false
});

$(function () {
    $('#INPUTTEXT').mediumInsert({
        editor: contenteditor,
    });
});

var authoreditor = new MediumEditor(authorfield, {
    toolbar: false,
    placeholder: {
        text: 'Author'
    },
    autoLink: true,
    spellcheck: false
});

var titleeditor = new MediumEditor(titlefield, {
    toolbar: false,
    placeholder: {
        text: 'Title'
    },
    spellcheck: false
});

contenteditor.subscribe("editableKeyup", function () {
    let allContents1 = contenteditor.serialize();
    let allContents2 = authoreditor.serialize();
    let allContents3 = titleeditor.serialize();
    let ccontent = allContents1["INPUTTEXT"].value;
    let acontent = allContents2["AUTHORNAME"].value;
    let tcontent = allContents3["TITLETEXT"].value;
    if (!ccontent) {
        contenteditor.setContent("<p><br></p>")
    } else if (!acontent) {
        authoreditor.setContent("<p><br></p>")
    } else if (!tcontent) {
        titleeditor.setContent("<p><br></p>")
    }
});

authoreditor.subscribe("editableKeyup", function () {
    let allContents1 = contenteditor.serialize();
    let allContents2 = authoreditor.serialize();
    let allContents3 = titleeditor.serialize();
    let ccontent = allContents1["INPUTTEXT"].value;
    let acontent = allContents2["AUTHORNAME"].value;
    let tcontent = allContents3["TITLETEXT"].value;
    if (!ccontent) {
        contenteditor.setContent("<p><br></p>")
    } else if (!acontent) {
        authoreditor.setContent("<p><br></p>")
    } else if (!tcontent) {
        titleeditor.setContent("<p><br></p>")
    }
});

titleeditor.subscribe("editableKeyup", function () {
    let allContents1 = contenteditor.serialize();
    let allContents2 = authoreditor.serialize();
    let allContents3 = titleeditor.serialize();
    let ccontent = allContents1["INPUTTEXT"].value;
    let acontent = allContents2["AUTHORNAME"].value;
    let tcontent = allContents3["TITLETEXT"].value;
    if (!ccontent) {
        contenteditor.setContent("<p><br></p>")
    } else if (!acontent) {
        authoreditor.setContent("<p><br></p>")
    } else if (!tcontent) {
        titleeditor.setContent("<p><br></p>")
    }
});

$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
        var ipaddress = data["ip"];
        $.post("/checkunpub", { ip: ipaddress }, function (output) {
            if (output != null) {
                document.getElementById("TITLETEXT").innerHTML = output["title"];
                document.getElementById("AUTHORNAME").innerHTML = output["author"];
                document.getElementById("INPUTTEXT").innerHTML = output["text"];
            };
        }
)});

setInterval(function () {
    $.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
        var ipaddress = data["ip"];
        var title = document.getElementById("TITLETEXT").innerHTML;
        var author = document.getElementById("AUTHORNAME").innerHTML;
        var text = document.getElementById("INPUTTEXT").innerHTML;
        // var delta = contenteditor.serialize();
        // console.log(delta["INPUTTEXT"].value);
        $.post("/unpublished", {ip: ipaddress, author: author, title: title, text: text })
    });
}, 5000);


function func1() {
    $.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
        var ipaddress = data["ip"];
        var title = document.getElementById("TITLETEXT").innerHTML;
        var author = document.getElementById("AUTHORNAME").innerHTML;
        var delta = document.getElementById("INPUTTEXT").innerHTML;
        // var delta = contenteditor.serialize();
        if (document.getElementById("AUTHORNAME").textContent.length > 2) {
            if (document.getElementById("TITLETEXT").textContent.length > 2) {
                if (delta != null) {
                    if (delta != '<p><br></p>') {
                                $.post("/cpapi", { ip: ipaddress, token: link, cyrauthor: author, cyrheadline: title, content: delta });
                                setTimeout(() => {
                                    window.location.href = "/" + link;
                                }, 5000);
                    }
                }
            } else {
                if ($(window).width() < 993) {
                    $(".warn").css({"margin-top" : "-10%"});
                    setTimeout(() => {$(".warn").css({"margin-top" : "-60%"})}, 2000);
                 } else {
                    $(".warn").css({"margin-top" : "-3%"});
                    setTimeout(() => {$(".warn").css({"margin-top" : "-20%"})}, 2000);
                 }
            }
        } else {
            if ($(window).width() < 993) {
                $(".warn").css({"margin-top" : "-10%"});
                setTimeout(() => {$(".warn").css({"margin-top" : "-60%"})}, 2000);
             } else {
                $(".warn").css({"margin-top" : "-3%"});
                setTimeout(() => {$(".warn").css({"margin-top" : "-20%"})}, 2000);
             }
    }});
};

document.getElementById("SUBMIT").addEventListener("click", func1);
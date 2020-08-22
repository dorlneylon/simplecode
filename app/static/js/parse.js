hljs.configure({
    languages: ["javascript", "ruby", "python", "cpp", "c", "cs", "php", "html", "css", "postgres"],
    tabReplace: "    "
});

const rand=()=>Math.random(0).toString(36).substr(2);
const token=(length)=>(rand()+rand()+rand()+rand()).substr(0,length);
var link = token(5);

let authorfield = document.getElementById("AUTHORNAME");
let titlefield = document.getElementById("TITLETEXT");
let contentfield = document.getElementById("INPUTTEXT");

var contenteditor = new MediumEditor(contentfield, {
    buttonLabels: 'fontawesome',
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
        // 'bold' : new MediumButton({label:"<div class='boldmb'></div>", start:"<b>", end:"</b>"}),
        // 'italic' : new MediumButton({label:"<div class='italicmb'></div>", start:"<i>", end:"</i>"}),
        // 'quote' : new MediumButton({label:"<div class='quotemb'></div>", action: function (html, parent) {if (html.includes("<blockquote>") === false && parent === false) {return "<blockquote><i>" + html + "</i></blockquote>"} else {return html.split("<blockquote><i>").join("").split("</blockquote></i>").join("")}}}),
        // 'h2' : new MediumButton({label:'<div class="h2mb"></div>', action: function (html, parent) {if (html.includes("<h2>")) {return html.split("<h2><b>").join("").split("</h2></b>").join("")} else {return "<h2><b>" + html + "</h2></b>"}}}),
        // 'h3' : new MediumButton({label:'<div class="h3mb"></div>', action: function (html, parent) {if (html.includes("<h3>")) {return html.split("<h3><b>").join("").split("</h3></b>").join("")} else {return "<h3><b>" + html + "</h3></b>"}}}),
        table: new MediumEditorTable(),
    },
    toolbar: {
      buttons: [
        {
            name: 'bold',
            tagNames: ['b'],
            useQueryState: true,
            contentDefault: '<i class="boldmb"></i>',
            contentFA: '<div class="boldmb"></div>'
        },
        {
            name: 'italic',
            tagNames: ['i'],
            useQueryState: true,
            contentDefault: '<i class="italicmb"></i>',
            contentFA: '<div class="italicmb"></div>'
        },
        {
            name: 'quote',
            tagNames: ['blockquote'],
            useQueryState: true,
            contentDefault: '<i class="quotemb"></i>',
            contentFA: '<div class="quotemb"></div>'
        },
        {
            name: 'h2',
            tagNames: ['h2'],
            useQueryState: true,
            contentDefault: '<i class="h2mb"></i>',
            contentFA: '<div class="h2mb"></div>'
        },
        {
            name: 'h3',
            tagNames: ['h3'],
            useQueryState: true,
            contentDefault: '<i class="h3mb"></i>',
            contentFA: '<div class="h3mb"></div>'
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


var authoreditor = new MediumEditor(authorfield, {
    toolbar: false,
    placeholder: {
        text: 'Author'
    },
    spellcheck: false
});

var titleeditor = new MediumEditor(titlefield, {
    toolbar: false,
    placeholder: {
        text: 'Title'
    },
    spellcheck: false
});

contenteditor.subscribe('editableKeyup', function () {
    try {$("pre").html().split("<p>").join("").split("</p>").join("\n");} catch (e) {};
    // $("#INPUTTEXT").html().split("<blockquote>").join("<blockquote><i>").split("</blockquote>").join("</blockquote></i>")
});

$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
        var ipaddress = data["ip"];
        $.post("/checkunpub", { ip: ipaddress }, function (output) {
            if (output != null) {
                authoreditor.setContent(output["author"]);
                titleeditor.setContent(output["title"]);
                contenteditor.setContent(output["text"]);
            };
        }
        )});

setInterval(function () {
    $.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
        var ipaddress = data["ip"];
        var title = titleeditor.getContent();
        var author = authoreditor.getContent();
        var text = contenteditor.getContent();
        $.post("/unpublished", {ip: ipaddress, author: author, title: title, text: text })
    });
}, 2000);


function func1() {
    $.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
        var ipaddress = data["ip"];
        var title = titleeditor.getContent();
        var author = authoreditor.getContent();
        var delta = contenteditor.getContent();
        if (author.length > 10) {
            if (title.length > 10) {
                if (delta != null) {
                    if (delta != '<p></p>') {
                                $.post("/cpapi", { ip: ipaddress, token: link, cyrauthor: author, cyrheadline: title, content: delta });
                                setTimeout(() => {
                                    window.location.href = "/" + link;
                                }, 1000);
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
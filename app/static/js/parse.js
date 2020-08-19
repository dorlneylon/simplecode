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
        'pre' : new MediumButton({label:'<i class="fa fa-code"></i>', start:"<pre>", end:"</pre>"}),
        'autolist': new AutoList(),
        table: new MediumEditorTable()
    },
    toolbar: {
      buttons: [
        'bold',
        'italic',
        'underline',
        'quote',
        'h2',
        'h3',
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

document.querySelectorAll(".medium-editor-action")[6].addEventListener("click", function () {
    if (document.querySelectorAll(".medium-editor-action")[6].classList.contains("medium-editor-button-active") != true) {
        if ($(window).width() < 993) {
            $(".warn-pre").css({"margin-top" : "-10%"});
            setTimeout(() => {$(".warn-pre").css({"margin-top" : "-60%"})}, 2000);
         } else {
            $(".warn-pre").css({"margin-top":"-3%"});
            setTimeout(() => {$(".warn-pre").css({"margin-top":"-25%"})}, 2000);
         }
    };
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

document.querySelectorAll(".btn-align-center-full")[1].remove();

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

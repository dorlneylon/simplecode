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
        'pre' : new MediumButton({label:'<i class="fa fa-code", style="-webkit-text-stroke: 1px white; color: white"></i>',
        action: function (html) {
            if (html.includes("<pre>") != true && document.querySelector("button > .fa-code").classList.contains("block") != true) {
                if ($(window).width() < 993) {
                    $(".warnpre").css({"margin-top" : "-10%"});
                    setTimeout(() => {$(".warn-pre").css({"margin-top" : "-60%"})}, 2000);
                 } else {
                    $(".warn-pre").css({"margin-top" : "-3%"});
                    setTimeout(() => {$(".warn-pre").css({"margin-top" : "-20%"})}, 2000);
                 };
                 return "<pre>" + html + "</pre>";
            } else if (html.includes("<pre>")) {
                return html.replace("<pre>", "").replace("</pre>", "");
            } else if (document.querySelector("button > .fa-code").classList.contains("block")) {
                return html;
            }
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
        addons: {
            images: {
                label: '<span class="fa fa-camera"></span>',
                uploadScript: null,
                deleteScript: '/delete',
                deleteMethod: 'DELETE',
                fileDeleteOptions: {},
                preview: true,
                captions: true,
                captionPlaceholder: 'Caption(optional)',
                autoGrid: 3,
                formData: {},
                fileUploadOptions: {
                    url: '/upload',
                    type: 'post',
                    acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i
                },
                styles: {
                    wide: {
                        label: '<span class="fa fa-align-justify"></span>',
                        added: function ($el) {},
                        removed: function ($el) {}
                    },
                    left: {
                        label: '<span class="fa fa-align-left"></span>'
                    },
                    right: {
                        label: '<span class="fa fa-align-right"></span>'
                    },
                    grid: {
                        label: '<span class="fa fa-th"></span>'
                    }
                },
                actions: {
                    remove: {
                        label: '<span class="fa fa-times"></span>',
                        clicked: function ($el) {
                            var $event = $.Event('keydown');
                            
                            $event.which = 8;
                            $(document).trigger($event);   
                        }
                    }
                },
                messages: {
                    acceptFileTypesError: 'This file is not in a supported format: ',
                    maxFileSizeError: 'This file is too big: '
                },
                uploadCompleted: function ($el, data) {},
                uploadFailed: function (uploadErrors, data) {}
            },
            embeds: { // (object) Embeds addon configuration
                label: '<span class="fa fa-youtube-play"></span>', // (string) A label for an embeds addon
                placeholder: 'Paste a Gist, Github, Youtube, Twitter etc. link and press Enter', // (string) Placeholder displayed when entering URL to embed
                captions: true, // (boolean) Enable captions
                captionPlaceholder: 'Caption(optional)', // (string) Caption placeholder
                oembedProxy: 'http://medium.iframe.ly/api/oembed?iframe=1', // (string/null) URL to oEmbed proxy endpoint, such as Iframely, Embedly or your own. You are welcome to use "http://medium.iframe.ly/api/oembed?iframe=1" for your dev and testing needs, courtesy of Iframely. *Null* will make the plugin use pre-defined set of embed rules without making server calls.
                styles: { // (object) Available embeds styles configuration
                    wide: { // (object) Embed style configuration. Key is used as a class name added to an embed, when the style is selected (.medium-insert-embeds-wide)
                        label: '<span class="fa fa-align-justify"></span>', // (string) A label for a style
                        added: function ($el) {}, // (function) Callback function called after the style was selected. A parameter $el is a current active paragraph (.medium-insert-active)
                        removed: function ($el) {} // (function) Callback function called after a different style was selected and this one was removed. A parameter $el is a current active paragraph (.medium-insert-active)
                    },
                    left: {
                        label: '<span class="fa fa-align-left"></span>'
                    },
                    right: {
                        label: '<span class="fa fa-align-right"></span>'
                    }
                },
                actions: { // (object) Actions for an optional second toolbar
                    remove: { // (object) Remove action configuration
                        label: '<span class="fa fa-times"></span>', // (string) Label for an action
                        clicked: function ($el) { // (function) Callback function called when an action is selected
                            var $event = $.Event('keydown');
                            
                            $event.which = 8;
                            $(document).trigger($event);   
                        }
                    }
                }
            }
    }});
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

try {
    $.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
        var ipaddress = data["ip"];
        $.post("/checkunpub", { ip: ipaddress }, function (output) {
            if (output != null) {
                titleeditor.setContent(output["title"]);
                authoreditor.setContent(output["author"]);
                contenteditor.setContent(output["text"]);
            };
        }
    )});
} catch (e) {};

setInterval(function () {
    $.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
        var ipaddress = data["ip"];
        var title = document.getElementById("TITLETEXT").innerHTML;
        var author = document.getElementById("AUTHORNAME").innerHTML;
        var text = document.getElementById("INPUTTEXT").innerHTML;
        $.post("/unpublished", {ip: ipaddress, author: author, title: title, text: text })
    });
}, 5000);


function func1() {
    $.getJSON('https://api.ipify.org?format=jsonp&callback=?', function (data) {
        var ipaddress = data["ip"];
        var title = document.getElementById("TITLETEXT").innerHTML;
        var author = document.getElementById("AUTHORNAME").innerHTML;
        var delta = document.getElementById("INPUTTEXT").innerHTML;
        if (document.getElementById("AUTHORNAME").textContent.split(" ").join("").length > 2) {
            if (document.getElementById("TITLETEXT").textContent.split(" ").join("").length > 2) {
                if (delta != null) {
                    if (delta != '<p><br></p>') {
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
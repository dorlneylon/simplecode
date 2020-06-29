hljs.configure({
    languages: ['javascript', 'ruby', 'python', 'cpp', 'c', 'cs', 'php', 'html', 'css', 'postgres'],
});

var tiquill = new Quill('#TITLETEXT', {
    modules: {
        syntax: false,
        toolbar: false,
    },
    placeholder: 'Your title..',
    theme: 'bubble'
});
tiquill.root.setAttribute('spellcheck', false);

var aquill = new Quill('#AUTHORNAME', {
    modules: {
        syntax: false,
        toolbar: false,
    },
    placeholder: 'Your name..',
    theme: 'bubble'
});
aquill.root.setAttribute('spellcheck', false);
var quill = new Quill('#INPUTTEXT', {
    modules: {
        syntax: true,
        toolbar: [['bold', 'italic', 'underline', 'strike', { 'header': 1 }, { 'header': 2 }],['blockquote', 'code-block']]
    },
    placeholder: 'Your content..',
    theme: 'bubble'
});
quill.root.setAttribute('spellcheck', false);

function func1 () {
    var delta = quill.getContents();
    var title = tiquill.root.innerText;
    var stripedtitle = title.split(" ").join("_");
    var author = aquill.root.innerText;
    var stripedauthor = author.split(" ").join("_");
    var isCyrillic = function (text) {
        return /[а-я]/i.test(text);
    };
    if (author != '') {
        if (title != '') {
            if (delta != '{"ops":[{"insert":"\n"}]}') {
                if (delta != '{"ops":[{"insert":""}]}') {
                if (isCyrillic(title) === false) {
                    if (isCyrillic(author) === false) {
                        $.post("/"+stripedauthor+"-"+stripedtitle, {
                            cyrauthor: stripedauthor,
                            cyrheadline: stripedtitle,
                            content: JSON.stringify(delta)
                        });
                        setTimeout(() => { window.location.href = "/"+stripedauthor+"-"+stripedtitle; }, 2000);
            } else {
                var transedtitle = transliterate(stripedtitle);
                var transedauthor = transliterate(stripedauthor);
                $.post("/"+transedauthor+"-"+transedtitle, {
                    cyrauthor: stripedauthor,
                    cyrheadline: stripedtitle,
                    content: JSON.stringify(delta)
                });
                setTimeout(() => { window.location.href = "/"+transedauthor+"-"+transedtitle; }, 2000);
            };
        } else {
            var transedtitle = transliterate(stripedtitle);
            var transedauthor = transliterate(stripedauthor);
            $.post("/"+transedauthor+"-"+transedtitle, {
                cyrauthor: stripedauthor,
                cyrheadline: stripedtitle,
                content: JSON.stringify(delta)
            });
            setTimeout(() => { window.location.href = "/"+transedauthor+"-"+transedtitle; }, 2000);
        };
        };
        };
        };
    };
};

document.getElementById("SUBMIT").addEventListener('click', func1);

let el = document.getElementById("TITLETEXT");
let el2 = document.getElementById("AUTHORNAME");
el.onkeypress = function(e) {
  var prohibited = "-#<>_?";
	var key = String.fromCharCode(e.which);    
  if(prohibited.indexOf(key) >= 0){
   	return false;
  }
  return true;    
};
el2.onkeypress = function(e) {
    var prohibited = "-#<>_?";
      var key = String.fromCharCode(e.which);
    if(prohibited.indexOf(key) >= 0){
         return false;
    }
    return true;    
  };

hljs.configure({
    languages: ["javascript", "ruby", "python", "cpp", "c", "cs", "css"],
    tabReplace: "    "
});
var quill = new Quill("#INPUTTEXT", {
    modules: {
        syntax: true,
        toolbar: [
            [{ header: [1, 2, false] }],
             ["bold", "italic", "underline", "strike"],
              ["blockquote", "image", "code-block"]
        ] },
        theme: "bubble",
        readOnly: true 
    });
try {
    var html = JSON.parse(document.querySelector(".ql-editor").textContent);
    quill.setContents(html, "api");
} catch (e) {};
var converter = new showdown.Converter({tables: true, underline: true});
let mdhtml = document.querySelector(".ql-editor").innerHTML.split("<pre");
if (mdhtml[1] != null) {
    document.querySelector("#INPUTTEXT").innerHTML = converter.makeHtml(mdhtml[0].split("|</p>").join("|\n").split("<p>|").join("|").split("<p></p>").join("")) + "<pre" + mdhtml[1];
} else {
    document.querySelector("#INPUTTEXT").innerHTML = converter.makeHtml(mdhtml[0].split("|</p>").join("|\n").split("<p>|").join("|").split("<p></p>").join(""));
};
document.querySelectorAll('pre').forEach((block) => {
    hljs.highlightBlock(block);
});

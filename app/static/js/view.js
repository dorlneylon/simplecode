hljs.configure({
    languages: ["javascript", "ruby", "python", "cpp", "c", "cs", "css"],
    tabReplace: "    "
});
var quill = new Quill("#INPUTTEXT", {
    modules: {
        syntax: true,
        // table: true,
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
document.querySelector("#INPUTTEXT").innerHTML = converter.makeHtml(quill.root.innerHTML.split("<p><br></p>").join("").split("</p>").join("<br>").split("<p>|").join("|").split("|<br>|").join("|\n|").split("|<br></p>").join("|"));

document.querySelectorAll('pre').forEach((block) => {
    hljs.highlightBlock(block);
});
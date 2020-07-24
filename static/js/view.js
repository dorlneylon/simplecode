hljs.configure({
    languages: ["javascript", "ruby", "python", "cpp", "c", "cs", "css"],
    tabReplace: "    "
});
var quill = new Quill("#INPUTTEXT", {
    modules: {
        syntax: true,
        table: true,
        toolbar: [
            [{ header: [1, 2, false] }],
             ["bold", "italic", "underline", "strike"],
              ["blockquote", "image", "code-block"]
        ] },
        theme: "bubble",
        readOnly: true 
    });

var html = JSON.parse(document.querySelector(".ql-editor").textContent);
quill.setContents(html, "api");
console.log(quill.root.innerHTML);
console.log(quill.root.innerHTML.split("<p><br></p>").join("").split("<p>").join("").split("</p>").join("\n"));
var converter = new showdown.Converter({tables: true, underline: true});
document.querySelector("#INPUTTEXT").innerHTML = converter.makeHtml(quill.root.innerHTML.split("<p><br></p>").join("").split("<p>").join("").split("</p>").join("\n").split("</em>").join("</em>\n").split("</strong>").join("</strong>\n").split("</u>").join("</u>\n"));
document.querySelectorAll('pre').forEach((block) => {
    hljs.highlightBlock(block);
});
if (document.querySelector("tbody").lastElementChild.innerHTML === "\n<td><br></td>\n<td style=\"text-align:center;\"></td>\n<td style=\"text-align:right;\"></td>\n") {
    document.querySelector("tbody").removeChild(document.querySelector("tbody").lastElementChild);
};
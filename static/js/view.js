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
        readOnly: true });

var html = JSON.parse(document.querySelector(".ql-editor").textContent);
quill.setContents(html, "api");
var converter = new showdown.Converter({tables: true});
console.log(document.querySelector(".ql-editor:not(.ql-syntax)").innerHTML);
console.log(quill.root.innerText);
document.getElementById("INPUTTEXT").innerHTML = converter.makeHtml(document.querySelector(".ql-editor").innerHTML.split("<p>").join("").split("</p>").join("\n").split("&nbsp;").join(" ").split("||").join("|\n|")).split("\n,").join("\n")
console.log(document.getElementById("INPUTTEXT").innerHTML);
document.querySelectorAll('pre').forEach((block) => {
    hljs.highlightBlock(block);
});
if (document.querySelector("tbody").lastElementChild.innerHTML === "\n<td><br></td>\n<td style=\"text-align:center;\"></td>\n<td style=\"text-align:right;\"></td>\n") {
    document.querySelector("tbody").removeChild(document.querySelector("tbody").lastElementChild);
};
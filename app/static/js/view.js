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
console.log(quill.root.innerHTML);
// document.querySelector("#INPUTTEXT").innerHTML;
// var turndownService = new TurndownService();
// var md = turndownService.turndown(document.querySelector("#INPUTTEXT"));
// console.log(md);
document.querySelector("#INPUTTEXT").innerHTML = converter.makeHtml(quill.root.innerHTML.split("<p><br></p>").join("").split("<p>").join("").split("</p>").join("\n")).split("</em>").join("</em><br>").split("</strong>").join("</strong><br>").split("</u>").join("</u><br>").split("</h1>").join("</h1><br>").split("</h2>").join("</h2><br>").split("</blockquote>").join("</blockquote><br>").split("</pre>").join("</pre><br>").split("</h4>").join("</h4><br>").split("</h5>").join("</h5><br>").split("</h6>").join("</h6><br>");
// .split("<p><br></p>").join("").split("<p>").join("").split("</p>").join("\n")
// .split("</em>").join("</em><br>").split("</strong>").join("</strong><br>").split("</u>").join("</u><br>").split("</h1>").join("</h1><br>").split("</h2>").join("</h2><br>").split("</blockquote>").join("</blockquote><br>").split("</pre>").join("</pre><br>").split("</h4>").join("</h4><br>").split("</h5>").join("</h5><br>").split("</h6>").join("</h6><br>")
document.querySelectorAll('pre').forEach((block) => {
    hljs.highlightBlock(block);
});
if (document.querySelector("tbody").lastElementChild.innerHTML === "\n<td><br></td>\n<td style=\"text-align:center;\"></td>\n<td style=\"text-align:right;\"></td>\n") {
    document.querySelector("tbody").removeChild(document.querySelector("tbody").lastElementChild);
};
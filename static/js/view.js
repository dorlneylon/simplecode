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

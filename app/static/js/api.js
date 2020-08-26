hljs.configure({
    languages: ["javascript", "ruby", "python", "cpp", "c", "cs", "php", "html", "css", "postgres"],
    tabReplace: "    ",
    useBR: true
});

let authorfield = document.getElementById("AUTHORNAME");
let titlefield = document.getElementById("TITLETEXT");
let contentfield = document.getElementById("INPUTTEXT");

document.querySelectorAll('pre').forEach((block) => {
    hljs.highlightBlock(block);
});
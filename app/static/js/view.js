hljs.configure({
    languages: ["javascript", "ruby", "python", "cpp", "c", "cs", "php", "html", "css", "postgres"],
    tabReplace: "    ",
    useBR: true
});

document.getElementById("AUTHORNAME").innerHTML = document.getElementById("AUTHORNAME").innerHTML.split("<br>").join("");
document.getElementById("TITLETEXT").innerHTML = document.getElementById("TITLETEXT").innerHTML.split("<br>").join("");

document.querySelector("#INPUTTEXT").innerHTML = document.querySelector("#INPUTTEXT").textContent;

document.querySelectorAll('pre').forEach((block) => {
    hljs.highlightBlock(block);
});

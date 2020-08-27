hljs.configure({
    languages: ["javascript", "ruby", "python", "cpp", "c", "cs", "php", "html", "css", "postgres"],
    tabReplace: "    ",
    useBR: true
});

document.getElementById("AUTHORNAME").innerHTML = document.getElementById("AUTHORNAME").innerHTML.split("<br>").join("");
document.getElementById("TITLETEXT").innerHTML = document.getElementById("TITLETEXT").innerHTML.split("<br>").join("");
document.querySelector("#INPUTTEXT").innerHTML = document.querySelector("#INPUTTEXT").textContent;
// document.querySelector("#INPUTTEXT").innerHTML = JSON.parse(document.querySelector("#INPUTTEXT").textContent)["INPUTTEXT"].value;
document.querySelectorAll("pre").forEach((element) => {
    element.innerHTML = element.innerHTML.split("<p>").join("").split('<p class="">').join("").split("</p>").join("\n<br>")
});

$('.medium-insert-embeds-overlay').remove()

// var contenteditor = new MediumEditor("#INPUTTEXT", {
//     toolbar: false,
//     placeholder: {
//         text: 'Content'
//     },
//     spellcheck: false,
//     disableEditing: true
// });

// // contenteditor.serialize(document.querySelector("#INPUTTEXT").textContent);

// document.querySelector("#INPUTTEXT").innerHTML = document.querySelector("#INPUTTEXT").textContent;

// let value = contenteditor.serialize(document.querySelector("#INPUTTEXT").innerHTML);
// let output = JSON.stringify(value);
// document.querySelector("#INPUTTEXT").innerHTML = JSON.parse(output)["INPUTTEXT"].value;

// $(function () {
//     $('#INPUTTEXT').mediumInsert({
//         editor: contenteditor,
//         enable: false
//     });
// });

document.querySelectorAll('pre').forEach((block) => {
    hljs.highlightBlock(block);
});

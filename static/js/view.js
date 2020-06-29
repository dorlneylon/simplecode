hljs.configure({
    languages: ['javascript', 'ruby', 'python', 'cpp', 'c', 'cs', 'css'],
    tabReplace: '    ',
});
var quill = new Quill('#INPUTTEXT', {
    modules: {
        syntax: true,
        toolbar: [[{ header: [1, 2, false] }],['bold', 'italic', 'underline', 'strike'],['blockquote', 'image', 'code-block']]
    },
    theme: 'bubble',
    readOnly: true,
});

var html = JSON.parse(document.querySelector(".ql-editor").textContent);
quill.setContents(html, 'api');
// let converter = new showdown.Converter({tables: true});
// let output = converter.makeHtml(document.querySelector(".ql-editor").innerHTML.split("</p><br></p>").join("").split("<p>").join("").split("</p>").join("\n"));
// // console.log(converter.makeHtml(document.querySelector(".ql-editor").innerHTML.split("</p><br></p>").join("").split("<p>").join("").split("</p>").join("\n")));
// if (output.includes("<table>")) {
//     document.querySelector("#INPUTTEXT").innerHTML = converter.makeHtml(document.querySelector(".ql-editor").innerHTML.split("</p><br></p>").join("").split("<p>").join("").split("</p>").join("\n"));
// };
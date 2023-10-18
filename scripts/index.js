// =================================================================
// = index.js
// =  Description   : builds index.html
// =  Author        : jtpeller
// =  Date          : September 19, 2022
// =================================================================

window.onload = function () {
    let subtitle = document.getElementById('subtitle');
    var subtitles = [
        "Now asbestos-free!",
        "monospace font!",
        "!important",
        "Rotated text!",
        "<!DOCTYPE html>",
        "Stack Overflow!",
        `delete ptr;`,
        "chmod +x virus",
        "whoami",
        `{:)+<`,
        `Clicky buttons!`,
        `React.createElement`,
        `ReactDOM.createRoot`,
        `falsy!`
    ];

    var rng = Math.floor(Math.random() * subtitles.length);
    chosen = subtitles[rng];
    subtitle.innerText = chosen;
}

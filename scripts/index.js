// =================================================================
// = index.js
// =  Description   : builds index.html
// =  Author        : jtpeller
// =  Date          : September 19, 2022
// =================================================================
"use strict";

/**
 * event listener to populate the page.
 */
document.addEventListener('DOMContentLoaded', function () {
    let subtitle = document.querySelector('#subtitle');
    let subtitles = [
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
        `falsy!`,
        `WebP or PNG???`,
        `WebGL?!`,
        `var(--bg-color)`,
        `System32`,
        `/bin/sh`,
        `You've got mail!`,
    ];

    let rng = Math.floor(Math.random() * subtitles.length);
    let chosen = subtitles[rng];
    subtitle.innerText = chosen;
})

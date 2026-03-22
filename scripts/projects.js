// =================================================================
// = projects.js
// =  Description   : builds projects.html
// =  Author        : jtpeller
// =  Date          : September 19, 2022
// =================================================================
"use strict";

document.addEventListener("DOMContentLoaded", () => {
    // Start with navbar
    Utils.initNavbar(Utils.select('#header'));

    // Load data for page
    Promise.all([fetch('data/projects.json')]).then(function (responses) {
        return Promise.all(responses.map(function (response) {
            return response.json();
        }));
    }).then(function (values) {
        // Initialize the Project object
        let pp = new ProjectPage(values[0]);
        pp.buildPage("#featured", "#all");
    });
});

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

        // Convert all the values to Project Cards
        //initPage(projects, Utils.select('#main'));
    });

    function initPage(projects, loc) {
        // Create the main project div which holds the project cards
        let proj_div = Utils.create('div', { id: `project-cards-div` })

        // Create all the project cards in a new div
        let row_div = Utils.create('div', { classList: 'row', });
        for (let i = 0; i < projects.length; i++) {
            // Create the column this project card will exist in.
            let col = Utils.create('div', { classList: 'col-sm-12 col-lg-6' });

            // Build the project card in this column.
            projects[i].buildCardDOM(col);

            // Add the column to the row.
            row_div.append(col);
        }

        // Append everything
        proj_div.append(row_div)    // Append cards to projects div
        loc.append(proj_div);       // Append this projects div to the provided location
    }
})

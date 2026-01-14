// =================================================================
// = project-page.js
// =  Description   : Implementation for ProjectPage class
// =  Author        : jtpeller
// =  Date          : January 13, 2026
// =================================================================
"use strict";

class PathRoots {
    constructor(web, git, logo, proj) {
        this.web = web
        this.git = git
        this.logo = logo
        this.proj = proj
    }
}

class ProjectPage {
    constructor(data) {
        // Define the paths that will be used.
        this.paths = new PathRoots(
            'https://jtpeller.github.io/',  /* web */
            'https://github.com/jtpeller/', /* git */
            'resources/logos/',             /* logo */
            `resources/projects`,           /* proj */
        );

        // Define the projects from the provided data array.
        // This builds both the filtered and all-projects lists.
        this.extractProjects(data);
    }

    buildPage(featured_id = "#featured", all_id = "#all") {
        // Extract DOM elements
        this.f_elem = document.querySelector(featured_id);
        this.a_elem = document.querySelector(all_id);

        // Build Featured Selection.
        if (this.f_elem) {
            this.buildFeatured();
        } else {
            console.error(`Featured Element is not found at ${featured_id}`);
        }

        // Build Filtered section.
        if (this.a_elem) {
            this.buildFiltered();
        } else {
            console.error(`Filtered Element is not found at ${all_id}`);
        }

        // Enable tooltips everywhere 
        // ref: https://getbootstrap.com/docs/5.3/components/tooltips/#enable-tooltips
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
        const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
    }

    /**
     * Builds the Featured section of projects.
     * 
     * Featured consists of a grid of projects that are "medium" sized.
     */
    buildFeatured() {
        // Ensure that Featured Element is defined first.
        if (this.f_elem === undefined) {
            console.error("Featured Element is undefined.");
            return;
        }

        // Build the grid
        let grid_div = Utils.create('div', { id: `featured-cards-div` });

        // The grid needs to contain a row + columns
        let row_div = Utils.create('div', { classList: 'row', });
        
        // Build all the featured classes.
        for (let i = 0; i < this.featured.length; i++) {
            // Create the column for this project list.
            let col = Utils.create('div', { classList: 'col-sm-12 col-md-6 col-lg-4', });

            // Build the project card in this col.
            this.featured[i].buildCardDOM(col);

            // Add this column to the row.
            row_div.append(col);
        }

        // Append everything to the featured element.
        grid_div.append(row_div);
        this.f_elem.append(grid_div);
    }

    /**
     * Builds the filtered section of projects.
     */
    buildFiltered() {
        // Grid of projects on the right (or below, if small screen) and the 
        // filter form is on the left (or above, if small screen).

        // Ensure that All-Projects Element is defined first.
        if (this.a_elem === undefined) {
            console.error("Filtered Element is undefined.");
            return;
        }

        // Build the grid
        let grid_div = Utils.create('div', { id: `filtered-cards-div` });

        // The grid needs to contain a row + columns
        let row_div = Utils.create('div', { classList: 'row', });

        // Build all the featured classes.
        for (let i = 0; i < this.projects.length; i++) {
            // Create the column for this project list.
            let col = Utils.create('div', { classList: 'col-sm-12 col-md-6 col-lg-4', });

            // Build the project card in this col.
            this.projects[i].buildCardDOM(col);

            // Add this column to the row.
            row_div.append(col);
        }

        // Append everything to the all-projects element.
        grid_div.append(row_div);
        this.a_elem.append(grid_div);
    }

    /**
     * Builds the Filtered form of the projects, which controls
     * the different filters applied to the Filtered Projects section.
     */
    buildFilteredForm() {
        // TODO: Build the filtering behavior.
    }

    /**
     * Retrieves the Filters selected by the user. These are later
     * applied to the projects.
     */
    getFilters() {
        // TODO: implement me.
    }

    /**
     * Converts the raw project data to Project Objects
     * @returns {Project[]} List of all projects
     */
    extractProjects(data) {
        // Define the project lists.
        this.projects = [];
        this.featured = [];

        // Loop through the data.
        for (let i = 0; i < data.length; i++) {
            // Build the project object.
            let proj = new Project(
                data[i].name,   /* title */
                data[i].link,   /* link */
                data[i].desc,   /* desc */
                data[i].tags,   /* tags */
                data[i].lang,   /* lang */
                data[i].long,   /* long */
                this.paths,     /* paths */
                data[i].site,   /* site */
                data[i].imgs,   /* imgs */
                data[i].imgn,   /* imgn */
                data[i].caps    /* caps */
            );

            // Add this to the "featured" list if that tag exists.
            if (proj.tags.includes("featured")) {
                this.featured.push(proj);
            }

            // Regardless, add it to the projects list.
            this.projects.push(proj);
        }
    }
}
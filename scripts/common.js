// =================================================================
// = common.js
// =  Description   : utility functions
// =  Author        : jtpeller
// =  Date          : September 19, 2022
// =================================================================

let ll = [
    {
        html: 'projects.html',
        link: 'Projects'
    },
    {
        html: 'about.html',
        link: 'About'
    }
]

/**
 * initNavbar() -- initializes the navbar for navigating the site
 * @param header  The d3 element to place this in.
 */
 function initNavbar(header) {
    let nav = d3.create('nav')
        .classed('navbar navbar-expand-lg fixed-top navbar-dark', true)

    let navdiv = nav.append('div')
        .classed('container-fluid', true);
    
    navdiv.append('a')
        .classed('navbar-brand link d-lg-none', true)
        .attr('href', 'index.html')
        .text('jtpeller');
    
    //
    // add the hamburger menu button for mobile/thin
    //
    let menu = navdiv.append('button')
        .classed('navbar-toggler', true)
        .attr('type', 'button')
        .attr('data-bs-toggle', 'collapse')
        .attr('data-bs-target', '#navbar-content')
        .attr('aria-controls', 'navbar-content')
        .attr('aria-expanded', 'false')
        .attr('aria-label', 'Toggle navigation');

    menu.append('span')
        .classed('navbar-toggler-icon', true);

    //
    // build the links
    //

    // build the title
    let linkdiv = navdiv.append('div')
        .classed('collapse navbar-collapse', true)
        .attr('id', 'navbar-content');

    let ul = linkdiv.append('ul')
        .classed('navbar-nav mx-auto mb-2 mb-lg-0', true);
    
    ul.append('a')
        .classed('navbar-brand link d-none d-lg-block', true)
        .attr('href', 'index.html')
        .text('jtpeller');

    // build the projects link
    ul.append('li')
        .classed('nav-item', true)
        .append('a')
        .classed('link active', true)
        .attr('aria-current', 'page')
        .attr('href', 'projects.html')
        .text('> Projects');

    // build the about link
    ul.append('li')
        .classed('nav-item', true)
        .append('a')
        .classed('link active', true)
        .attr('aria-current', 'page')
        .attr('href', 'about.html')
        .text('> About Me');

    header.append(() => nav.node());
}

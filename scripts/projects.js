// =================================================================
// = projects.js
// =  Description   : builds projects.html
// =  Author        : jtpeller
// =  Date          : September 19, 2022
// =================================================================

//
// global vars
// 
let header,
    content,
    footer;

window.onload = function () {
    // define variables
    header = d3.select('#header');
    content = d3.select('#content');
    footer = d3.select('#footer');

    // start with navbar
    initNavbar(header);

    // load data for page
    Promise.all([
        d3.json('data/projects.json')
    ]).then(function(values) {
        initPage(values[0].proj);
    });
}

function initPage(proj) {
    //
    // initialize content
    //
    content.classed('container', true);

    let rowdiv = content.append('div')
        .classed('row', true);

    // left side contains the main content
    let left = rowdiv.append('div')
        .classed('col', true);

    // right side contains the scrollspy list
    let right = rowdiv.append('div')
        .classed('col-2', true);

    var listdiv = right.append('div')
        .classed('list-group list-group-flush fixed-nav', true);

    // title
    let title = left.append('h2')
        .classed('text-center title', true)
        .text('Desktop + Console Applications');

    listdiv.append('h4')
        .classed('my-h4', true)
        .text('Contents');

    //
    // add each project
    //
    var link_root = 'https://github.com/jtpeller/';
    var img_root = 'resources/';


    for (var i = 0; i < proj.length; i++) {
        var div = left.append('div');

        // title and link
        var h4 = div.append('h4')
            .classed('my-h4', true);

        h4.append('a')
            .html(proj[i].name + '&#128279;')
            .attr('href', link_root + proj[i].link)
            .attr('id', 'project-' + i)
            .classed('my-link', true);

        for (var j = 0; j < proj[i].lang.length; j++) {
            h4.append('img')
                .attr('src', img_root + proj[i].lang[j])
                .attr('alt', proj[i].lang[j].replaceAll('.png', ''))
                .classed('lang-logo', true);
        }

        // quick grabber description
        div.append('p')
            .classed('text-center grabber', true)
            .append('i')
            .text(proj[i].desc);

        // there'll be two columns: left is description, right is skills involved
        var row = div.append('div')
            .classed('row', true);

        // add the description
        var long = row.append('div')
            .classed('col', true);

        long.append('h5')
            .classed('my-h4', true)
            .text('Description');
            
        long.append('p').text(proj[i].long);

        // add the skills
        var skills = row.append('div')
            .classed('col', true);

        skills.append('h5')
            .classed('my-h4', true)
            .text('Skills');

        proj[i].skil.sort();
        var ul = skills.append('ul')
            .classed('list-group list-group-flush', true)
        
        for (var j = 0; j < proj[i].skil.length; j++) {
            ul.append('li')
                .classed('list-group-item dark-item', true)
                .text(proj[i].skil[j]);
        }

        // add the list items
        listdiv.append('a')
            .classed('list-group-item list-group-item-action dark-item', true)
            .attr('href', '#project-' + i)
            .text(proj[i].name);
    }
}
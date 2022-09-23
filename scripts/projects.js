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
        .text('Other Work');

    listdiv.append('h4')
        .classed('my-h4', true)
        .text('Contents');

    //
    // add each project
    //
    var link_root = 'https://github.com/jtpeller/';
    var img_root = 'resources/';

    sites = [
        {
            name: "OEIS",
            link: "OEIS",
            desc: 'The ongoing quest to program every sequence in the OEIS database (using Golang)',
            long: `
            This is a console program that contains hundreds of algorithms to generate the sequences
            found in the OEIS database. While some are trivial, such as all 0s, others are more 
            complicated and involve more complex algorithms.
            `,
            lang: ['Golang'],
            skil: ['Algorithms', 'Arbitrary Precision', 'Complex Mathematical Operations', 'Recursion']
        },
        {
            name: "num2words",
            link: "num2words",
            desc: 'A console program that converts a number to its English representation.',
            long: `
            While it might not seem that complicated, this actually allows a number of any size.
            Arbitrary precision in Golang allowed me to convert a number of any size into English.
            `,
            lang: ['Golang'],
            skil: ['String Manipulation', 'Recursion', 'Arbitrary Precision', 'Console Output']
        },
        {
            name: "gobig",
            link: "gobig",
            desc: 'A simple Go package to make using arbitrary precision in Golang a bit easier',
            long: `
            Golang's arbitrary precision is painful to use when performing mathematical operations
            on numbers. I made it easier for myself. I wrote this package primarily to use in
            my OEIS repo.
            `,
            lang: ['Golang'],
            skil: ['Developing a Go package', 'Arbitrary Precision']
        },
        {
            name: "Rosalind",
            link: "rosalind",
            desc: 'Algorithms for problems from Rosalind, a bioinformatics programming platform.',
            long: `
            Rosalind is a site that has problems to write algorithms or solutions for. This repo
            contains a few solutions to those problems.
            `,
            lang: ['Golang'],
            skil: ['Algorithms', 'String Manipulation', 'Recursion']
        },
    ]


    for (var i = 0; i < sites.length; i++) {
        var div = left.append('div');

        // title and link
        div.append('h4')
            .classed('my-h4', true)
            .append('a')
            .html(sites[i].name + '&#128279;')
            .attr('href', link_root + sites[i].link)
            .attr('id', 'project-' + i);

        // quick grabber description
        div.append('p')
            .classed('text-center grabber', true)
            .append('i')
            .text(sites[i].desc);

        // there'll be two columns: left is description, right is skills involved
        var row = div.append('div')
            .classed('row', true);

        // add the description
        var long = row.append('div')
            .classed('col', true);

        long.append('h5')
            .classed('my-h4', true)
            .text('Description');
            
        long.append('p').text(sites[i].long);

        // add the skills
        var skills = row.append('div')
            .classed('col', true);

        skills.append('h5')
            .classed('my-h4', true)
            .text('Skills');

        sites[i].skil.sort();
        var ul = skills.append('ul')
            .classed('list-group list-group-flush', true)
        
        for (var j = 0; j < sites[i].skil.length; j++) {
            ul.append('li')
                .classed('list-group-item dark-item', true)
                .text(sites[i].skil[j]);
        }

        // add the list items
        listdiv.append('a')
            .classed('list-group-item list-group-item-action dark-item', true)
            .attr('href', '#project-' + i)
            .text(sites[i].name);
    }
}
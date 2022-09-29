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

    let proj = [
        {
            name: "OEIS",
            link: "OEIS",
            desc: 'The ongoing quest to program every sequence in the OEIS database (using Golang)',
            long: `
            This is a console program that contains hundreds of algorithms to generate the sequences
            found in the OEIS database. While some are trivial, such as all 0s, others are more 
            complicated and involve more complex algorithms.
            `,
            lang: ['golang.png'],
            skil: ['Algorithms', 'Arbitrary Precision', 'Complex Mathematical Operations', 'Recursion']
        },
        {
            name: "Java Tic-Tac-Toe",
            link: "TicTacToeJava",
            desc: 'An implementation of tic-tac-toe in Java',
            long: `
            A desktop Java application I wrote shortly after my Sudoku game. I wrote this to teach
            myself AWT/Swing in Java. It has an AI computer, implemented based of the minimax algorithm.
            Difficulties are based on modifying this algorithm to make mistakes every once in a while.
            `,
            lang: ['java.png'],
            skil: ['AWT/Swing', 'GUI', 'Object-Oriented Programming']
        },
        {
            name: "Java Sudoku",
            link: "SudokuJava",
            desc: 'An implementation of sudoku in Java',
            long: `
            A desktop Java application I wrote in 2019 to teach myself AWT/Swing (along with the Tic-Tac-Toe Java program).
            `,
            lang: ['java.png'],
            skil: ['AWT/Swing', 'GUI', 'Object-Oriented Programming']

        },
        {
            name: "num2words",
            link: "num2words",
            desc: 'A Golang package that converts a number to its English representation.',
            long: `
            While it might not seem that complicated, this actually allows a number of any size.
            Arbitrary precision in Golang allowed me to convert a number of any size into English.
            `,
            lang: ['golang.png'],
            skil: ['String Manipulation', 'Recursion', 'Arbitrary Precision']
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
            lang: ['golang.png'],
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
            lang: ['golang.png'],
            skil: ['Algorithms', 'String Manipulation', 'Recursion']
        },
        {
            name: "csort",
            link: "csort",
            desc: 'Sorting algorithms written in C++',
            long: `
            Those crazy cool sorting algorithms, but they're written in C++.
            `,
            lang: ['c++.png'],
            skil: ['Algorithms', 'Sorting', 'Recursion', 'Iteration']
        },
        {
            name: "gosort",
            link: "gosort",
            desc: 'Sorting algorithms written in Golang',
            long: `
            Those crazy cool sorting algorithms, but they're written in golang.
            `,
            lang: ['golang.png'],
            skil: ['Algorithms', 'Sorting', 'Recursion', 'Iteration']
        },
    ]


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
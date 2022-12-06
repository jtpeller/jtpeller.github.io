// =================================================================
// = about.js
// =  Description   : builds about.html
// =  Author        : jtpeller
// =  Date          : September 28, 2022
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

    let left = rowdiv.append('div')
        .classed('col', true);

    let right = rowdiv.append('div')
        .classed('col-2', true);

    var listdiv = right.append('div')
        .classed('list-group list-group-flush fixed-nav', true);

    left.append('h2')
        .classed('text-center title', true)
        .text('About me');

    listdiv.append('h4')
        .classed('my-h4', true)
        .text('Contents');

    let a = [
        {
            title: 'whoami',
            arr: [`I am a compsci major who graduated from Arizona State University in 
                May of 2022. I have experience writing desktop, web, and console applications.
                I have a passion for writing applications that solve problems or make life easier
                for people. I believe that programming isn't an assembly line; it is a creative
                process that requires an imaginative, problem solving mind.  
            `]
        },
        {
            title: 'Programming Languages',
            arr: ['HTML/CSS/JavaScript','Golang','C/C++','Java', 'MATLAB','Python']
        },
        {
            title: 'Skills',
            arr: [
                'D3.js', 'ReactJS', 'Object Oriented Programming', 'Bootstrap', 
                'Algorithms', 'Networks', 'Parsing', 'File I/O', 'String Manipulation',
                'Data Structures', 'Linux', 'Operating Systems', 'AWT/Swing',
            ]
        },
        {
            title: 'Development Environments',
            arr: [
                'Visual Studio', 'Visual Studio Code', 'Eclipse'
            ]
        }
    ]

    for (i in a) {
        var div = left.append('div');

        // section title
        div.append('h4')
            .classed('my-h4', true)
            .attr('id', 'section-'+i)
            .text(a[i].title);

        // section list
        var b = i == 1 ? a[i].arr.sort() : a[i].arr;
        var chunks = chunkify(b, 2, true);
        console.log(b, chunks);

        // columns
        var row = div.append('div')
            .classed('row', true);

        for (var j = 0; j < chunks.length; j++) {
            var col = row.append('div')
                .classed('col', true);

            var ul = col.append('ul').classed('list-group list-group-flush', true);
            var temp = chunks[j];
            for (var k = 0; k < temp.length; k++) {
                ul.append('li')
                    .classed('list-group-item dark-item', true)
                    .text(temp[k]);
            }
        }

        // add this section title to the contents sidebar
        listdiv.append('a')
            .classed('list-group-item list-group-item-action dark-item', true)
            .attr('href', '#section-'+i)
            .text(a[i].title);
    }
}
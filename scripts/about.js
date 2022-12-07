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

    // load data for page
    Promise.all([
        d3.json('data/about.json')
    ]).then(function(values) {
        initPage(values[0].about);
        console.log(values[0].about);
    });
}

function initPage(a) {
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

    for (let i = 0; i < a.length; i++) {
        var div = left.append('div');

        // section title
        div.append('h4')
            .classed('my-h4', true)
            .attr('id', 'section-'+i)
            .text(a[i].title);

        // check how to handle a.arr
        if (typeof a[i].arr[0] === 'object') {
            buildVisualList(div, a[i].arr);
        } else {
            buildList(div, a[i].arr);
        }

        // add this section title to the contents sidebar
        listdiv.append('a')
            .classed('list-group-item list-group-item-action dark-item', true)
            .attr('href', '#section-'+i)
            .text(a[i].title);
    }
}

function buildList(loc, arr) {
    // section list
    var chunks = chunkify(arr, 2, true);

    // columns
    var row = loc.append('div')
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
}

function buildVisualList(loc, arr) {
    // each row contains a name and a chart of its proficiency (scale of 1-4)
    for (var j = 0; j < arr.length; j++) {
        var row = loc.append('div')
            .classed('row', true);

        // first col is a.name
        var col1 = row.append('div')
            .classed('col-4', true);

        col1.append('p')
            .classed('text-end', true)
            .text(arr[j].name);

        var col2 = row.append('div')
            .classed('col', true);

        buildChart(col2, [0, 6], arr[j].val);
    }
}

function buildChart(loc, range, val) {
    var svg = loc.append('svg')
        .classed('my-svg', true);

    let margin = {top: 5, left: 50, bottom: 5, right: 50};
    const width = svg.style('width').replaceAll('px', '');
    let innerWidth = width - margin.left - margin.right;
    
    const height = 20;

    const x_scale = d3.scaleLinear()
        .domain(range)
        .range([0, innerWidth]);

    const g = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)
        .attr('id', 'g-bar');

    g.append('rect')
        .classed('bar-blank', true)
        .attr('height', height)
        .attr('width', innerWidth);

    g.append('rect')
        .classed('bar', true)
        .attr('height', height)
        .attr('width', x_scale(val));

    let labels = ['Beginner', 'Intermediate', 'Advanced', 'Master'];

    let xgen = d3.axisBottom(x_scale)
        .ticks(3)
        .tickFormat( (d, i) => labels[i]);

    let xaxis = g.append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(xgen);
}
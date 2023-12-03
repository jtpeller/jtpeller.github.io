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
    main;

window.onload = function () {
    // define variables
    header = d3.select('#header');
    main = d3.select('#main');

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

function initPage(data) {
    let content = d3.create('div');

    // handle arr[0], the 'whoami' section
    content.append('h2')
        .classed('section-header', true)
        .text(data[0].title);
    content.append('p').text(data[0].arr[0]);
    
    // create the skills cards
    content.append('h2')
        .classed('section-header', true)
        .text('Skills');
    
    let rowdiv = content.append('div')
        .classed('row', true);
    for (let i = 1; i < data.length; i++) {
        var col = rowdiv.append('div')
            .classed('col-sm-12 col-lg-6', true);

        var card = col.append('div')
            .classed('card card-dark', true);

        // create the SVG charts
        let svgdiv = card.append('div')
            .classed('card-img-top', true);
        let svg = svgdiv.append('svg');

        buildChart(svg, data[i].arr);

        // section title
        card.append('h2')
            .classed('section-header', true)
            .text(data[i].title);

        card.append('p').text(data[i].desc);
    }
    content.append('br');

    main.append(() => content.node());
}

function buildChart(svg, data) {
    // constant SVG values
    const margin = {top: 10, left: 200, bottom: 125, right: 50};
    const width = 1000;
    const height = 600;

    // dimensions for inner chart (the g element)
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // ensure SVG is proper dims
    svg.attr('viewBox', `0 0 ${width} ${height}`)

    // set up x & y scale functions to transform data
    const x_scale = d3.scaleBand()
        .range([0, innerWidth])
        .domain(data.map( d => d.name))
        .padding(0.25);

    const y_scale = d3.scaleLinear()
        .domain([0, 4])
        .range([innerHeight, 0]);

    // set up bar chart thingy
    const g = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)
        .attr('id', 'g-bar');

    g.selectAll('rect')
        .data(data)
        .join('rect')
        .classed('bar', true)
        .attr('x', d => x_scale(d.name))
        .attr('y', d => y_scale(0))
        .attr('width', x_scale.bandwidth())
        .transition().duration(750)
        .attr('height', d => innerHeight - y_scale(0))

    svg.selectAll('rect')
        .transition()
        .duration(750)
        .attr('y', d => y_scale(d.val))
        .attr('height', d => innerHeight - y_scale(d.val))
        .delay((d,  i) => i*100)

    let xgen = d3.axisBottom(x_scale);

    // add x & y axes
    g.append('g')
        .attr('transform', `translate(0, ${innerHeight})`)
        .call(xgen)
        .selectAll('text')
        .style('text-anchor', 'end')
        .attr('transform', 'rotate(-25)')

    g.append('g')
        .attr('transform', `translate(0, 0)`)
        .call(d3.axisLeft(y_scale));

    // add axes labels
    svg.append('text')
        .attr('class', 'axis-label')
        .attr('text-anchor', 'center')
        .attr('transform', 'rotate(-90)scale(1.25)')
        .attr('x', -height/2)
        .attr('y', margin.left/2-15)
        .text('Years of Experience')
}
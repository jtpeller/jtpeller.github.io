// =================================================================
// = about.js
// =  Description   : builds about.html
// =  Author        : jtpeller
// =  Date          : September 28, 2022
// =================================================================
"use strict";

document.addEventListener('DOMContentLoaded', function () {
    // init header & utils
    const utils = new Utils();
    utils.initNavbar(utils.select('#header'));

    // load data for page
    Promise.all([d3.json('data/about.json')]).then(function(values) {
        initPage(values[0].about, utils.select('#main'))
    });

    function initPage(data, elem) {
        // whoami section
        elem.append(utils.create('h2', {
            classList: 'section-header',
            textContent: data[0].title,
        }))
        elem.append(utils.create('p', {textContent: data[0].arr[0]}))

        // skills header
        elem.append(utils.create('h2', {
            classList: 'section-header',
            textContent: 'Skills',
        }))

        // skills cards
        let rowdiv = utils.create('div', {classList: 'row'})
        for (let i = 1; i < data.length; i++) {
            let col = utils.create('div', {classList: 'col-sm-12 col-lg-6'});
            let card = utils.create('div', {classList: 'card card-dark'});

            // SVG charts!
            let svgdiv = utils.create('div', {classList: 'card-img-top'});
            let svg = d3.create('svg')
            buildChart(svg, data[i].arr)

            // append SVG chart to card
            svgdiv.append(svg.node());
            card.append(svgdiv);

            // section title
            card.append(utils.create('h2', {
                classList: 'section-header',
                textContent: data[i].title,
            }))
            card.append(utils.create('p', {textContent: data[i].desc}));

            col.append(card);
            rowdiv.append(col);
        }
        elem.append(rowdiv);
        elem.append(utils.create('br'));
    }
    
    function buildChart(svg, data) {
        // constant SVG values
        const margin = {top: 50, left: 200, bottom: 125, right: 50};
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
            .domain([0, 6])
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

        // add bar labels
        g.selectAll('.text')
            .data(data)
            .join('text')
            .classed('bar-label', true)
            .attr('x', (d) => x_scale(d.name))
            .attr('y', (d) => y_scale(d.val))
            .attr('dx', x_scale.bandwidth() / 2)
            .attr('dy', '-15px')
            .attr('dominant-baseline', 'middle')
            .attr('opacity', 0)
            .transition()
                .delay(750)
                .duration(750)
                .attr('opacity', 1)
            .text((d) => d.val);
    
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
            .attr('class', 'y-axis-label')
            .attr('dominant-baseline', 'middle')
            .attr('dx', -height/2+35)
            .attr('dy', margin.left/2)
            .text('Years of Experience')
    }
})

// =================================================================
// = index.js
// =  Description   : builds index.html
// =  Author        : jtpeller
// =  Date          : September 19, 2022
// =================================================================

//
// global vars
// 
let content;
let footer;

window.onload = function () {
    // define variables for use
    content = d3.select('#content');
    footer = d3.select('#footer');

    // start with footer
    initFooter(footer, true);

    // initialize title
    let banner = content.append('div')
        .classed('banner', true)

    let span = banner.append('span')
        .classed('title-box', true);
    
    let title = span.append('h1')
        .classed('title-card', true)
        .text('jtpeller');

    // initialize links
    let links = content.append('div')
        .classed('d-flex justify-content-center link-card', true);

    let ul = links.append('ul')
        .classed('link-list', true);


    for (var i = 0; i < ll.length; i++) {
        ul.append('li')
            .append('a')
            .classed('my-link', true)
            .attr('href', ll[i].html)
            .text(ll[i].link);
    }

    // add the subtitles
    var rng = Math.floor(Math.random() * subtitles.length);
    chosen = subtitles[rng];

    content.append('div')
        .classed('subtitle', true)
        .text(chosen);
}

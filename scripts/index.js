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
        .classed('banner', true);

    let span = banner.append('span')
        .classed('title-box', true);

    let subtitle = span.append('div')
        .classed('subtitle', true);
    
    let title = span.append('h1')
        .classed('title-card', true)
        .text('jtpeller');

    let nav = content.append('div');

    initNavbar(nav, false);

    // add the subtitles
    var rng = Math.floor(Math.random() * subtitles.length);
    chosen = subtitles[rng];

    subtitle.text(chosen);
}

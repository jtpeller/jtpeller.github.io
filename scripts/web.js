// =================================================================
// = web.js
// =  Description   : builds web.html
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
        d3.json('data/web.json')
    ]).then(function(values) {
        initPage(values[0].web);
    });
}

function initPage(sites) {
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
        .text('My Websites');

    listdiv.append('h4')
        .classed('my-h4', true)
        .text('Contents');

    //
    // add each site
    //
    var link_root = 'https://jtpeller.github.io/';
    var img_root = 'resources/';

    for (var i = 0; i < sites.length; i++) {
        var div = left.append('div');

        // title and link
        var h4 = div.append('h4')
            .classed('my-h4', true);

        h4.append('a')
            .html(sites[i].name + '&#128279;')
            .attr('href', link_root + sites[i].link)
            .attr('id', 'site-' + i)
            .classed('my-link', true);

        for (var j = 0; j < sites[i].lang.length; j++) {
            h4.append('img')
                .attr('src', img_root + sites[i].lang[j])
                .attr('alt', sites[i].lang[j].replaceAll('.png', '').replaceAll('.svg', ''))
                .attr('title', sites[i].lang[j].replaceAll('.png', '').replaceAll('.svg', ''))
                .classed('lang-logo', true);
        }

        // quick grabber description
        div.append('p')
            .classed('text-center grabber', true)
            .append('i')
            .text(sites[i].desc);

        // there'll be an image carousel to the left, and a longer description to the right
        if (sites[i].imgs.length > 0) {
            var carousel_parent = div.append('div')
                .classed('w-75 mx-auto', true);

            var carouselid = sites[i].name.replaceAll(' ', '-');

            var carousel = carousel_parent.append('div')
                .classed('carousel slide carousel-fade carousel-shadow', true)
                .attr('id', carouselid)
                .attr('data-bs-ride', 'carousel')

            // add ordered list for indicators
            var indicators = carousel.append('div')
                .classed('carousel-indicators', true)

            // inner carousel
            var innerdiv = carousel.append('div')
                .classed('carousel-inner', true);

            for (var j = 0; j < sites[i].imgs.length; j++) {
                // add indicators for imgs.length
                indicators.append('button')
                    .attr('type', 'button')
                    .attr('data-bs-target', '#' + carouselid)
                    .attr('data-bs-slide-to', j)
                    .attr('aria-label', 'Slide ' + j);

                // add inner slides & imgs
                var imgid = sites[i].name.replaceAll(' ', '-') + '-img-' + j;
                var imgdiv = innerdiv.append('div')
                    .classed('carousel-item', true)
                    .attr('id', imgid)

                imgdiv.append('img')
                    .classed('d-block w-100', true)
                    .attr('src', img_root + sites[i].imgs[j])
                    .attr('alt', sites[i].imgs[j])
            }

            // make sure first is active for inner and indicators
            indicators.select('button')
                .classed('active', true)
                .attr('aria-current', true)
            innerdiv.select('#' + sites[i].name.replaceAll(' ', '-') + '-img-' + 0).classed('active', true);

            // the indicators
            var prev = carousel.append('button')
                .classed('carousel-control-prev', true)
                .attr('type', 'button')
                .attr('data-bs-target', '#' + carouselid)
                .attr('data-bs-slide', 'prev');

            prev.append('span')
                .classed('carousel-control-prev-icon', true)
                .attr('aria-hidden', true);

            prev.append('span')
                .classed('visually-hidden', true)
                .text('Previous');

            var next = carousel.append('button')
                .classed('carousel-control-next', true)
                .attr('type', 'button')
                .attr('data-bs-target', '#' + carouselid)
                .attr('data-bs-slide', 'next');

            next.append('span')
                .classed('carousel-control-next-icon', true)
                .attr('aria-hidden', true);

            next.append('span')
                .classed('visually-hidden', true)
                .text('Next');
        }

        // now, add the description
        var long = div.append('div')
            .classed('col', true);

        long.append('br');

        long.append('p').html(sites[i].long);

        // add the list items
        listdiv.append('a')
            .classed('list-group-item list-group-item-action dark-item', true)
            .attr('href', '#site-' + i)
            .text(sites[i].name);
    }
}

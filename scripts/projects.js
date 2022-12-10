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

let lang = "";

window.onload = function () {
    // define variables
    header = d3.select('#header');
    content = d3.select('#content');
    footer = d3.select('#footer');

    // start with navbar
    initNavbar(header);

    // figure out which was the desired project type
    let type = window.location.search.split('=')
    lang = type[1];

    if (!langs.includes(lang)) {
        window.location.search = '?proj=web'
        //window.reload();
    }

    // load data for page
    Promise.all([
        d3.json('data/projects.json')
    ]).then(function (values) {
        initPage(values[0][type[1]]);
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
        .text(`${wordCase(lang)} Projects`);

    listdiv.append('h4')
        .classed('my-h4', true)
        .text('Contents');

    //
    // add each project
    //
    var link_root = lang == 'web' ? 'https://jtpeller.github.io/' : 'https://github.com/jtpeller/';
    var logo_root = 'resources/logos/';
    var proj_root = `resources/${lang}/`

    for (var i = 0; i < proj.length; i++) {
        var div = left.append('div');

        // title and link
        var h4 = div.append('h4')
            .classed('my-h4', true);

        h4.append('a')
            .html(proj[i].name + '&#128279;')
            .attr('href', link_root + proj[i].link)
            .attr('id', 'proj-' + i)
            .classed('my-link', true);

        for (var j = 0; j < proj[i].lang.length; j++) {
            var name = proj[i].lang[j].replaceAll('.png', '').replaceAll('.svg', '')
    
            h4.append('img')
                .attr('src', logo_root + proj[i].lang[j])
                .attr('alt', name)
                .attr('title', name)
                .classed('lang-logo', true);
        }

        // quick grabber description
        div.append('p')
            .classed('text-center grabber', true)
            .append('i')
            .text(proj[i].desc);

        // image carousel
        if (proj[i].imgs && proj[i].imgn > 0) {
            var carousel_parent = div.append('div')
                .classed('w-75 mx-auto', true);

            var carouselid = proj[i].name.replaceAll(' ', '-');

            var carousel = carousel_parent.append('div')
                .classed('carousel slide carousel-shadow', true)
                .attr('id', carouselid)
                .attr('data-bs-ride', 'carousel')

            // add ordered list for indicators
            var indicators = carousel.append('div')
                .classed('carousel-indicators', true)

            // inner carousel
            var innerdiv = carousel.append('div')
                .classed('carousel-inner', true);

            for (var j = 0; j < proj[i].imgn; j++) {
                // add indicators for imgs.length
                indicators.append('button')
                    .attr('type', 'button')
                    .attr('data-bs-target', '#' + carouselid)
                    .attr('data-bs-slide-to', j)
                    .attr('aria-label', 'Slide ' + j);

                // add inner slides & imgs
                var imgid = proj[i].name.replaceAll(' ', '-') + '-img-' + j;
                var itemdiv = innerdiv.append('div')
                    .classed('carousel-item', true)
                    .attr('id', imgid)
                    .attr('data-bs-interval', 5000)

                var imgname = proj[i].imgs.replace('&d', j+1)

                itemdiv.append('img')
                    .classed('d-block w-100', true)
                    .attr('src', proj_root + imgname)
                    .attr('alt', imgname)

                if (proj[i].caps && proj[i].caps.length > 0) {
                    var capdiv = itemdiv.append('div')
                        .classed('carousel-caption d-none d-md-block', true);

                    capdiv.append('h5')
                        .classed('text-shadow', true)
                        .text(proj[i].caps[j]);
                }
            }

            // make sure first is active for inner and indicators
            indicators.select('button')
                .classed('active', true)
                .attr('aria-current', true)
            innerdiv.select('#' + proj[i].name.replaceAll(' ', '-') + '-img-' + 0).classed('active', true);

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

            // start the carousel
            d3.selectAll(`button[data-bs-slide-to='0']`).dispatch('click');
        }

        // now, add the description
        var long = div.append('div')
            .classed('col', true);

        long.append('br');

        long.append('p').html(proj[i].long);

        // add the list items
        listdiv.append('a')
            .classed('list-group-item list-group-item-action dark-item', true)
            .attr('href', '#proj-' + i)
            .text(proj[i].name);
    }

    // add the "back to top" item in the contents list
    listdiv.append('a')
        .classed('list-group-item list-group-item-action dark-item', true)
        .attr('href', '#')
        .text('Back to Top')
}
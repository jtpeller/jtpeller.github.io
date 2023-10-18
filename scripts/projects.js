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
    main;

let lang = "";
const langs = ["Web", "Go", "Other"];
const MAX_PER_ROW = 3;

window.onload = function () {
    // define variables
    header = d3.select('header');
    main = d3.select('main');

    // start with navbar
    initNavbar(header);

    // load data for page
    Promise.all([
        d3.json('data/projects.json')
    ]).then(function (values) {
        for (var i = 0; i < 3; i++) {
            lang = langs[i]
            initPage(values[0][lang.toLowerCase()], main);
        }
    });
}

function initPage(proj, loc) {
    var proj_div = loc.append('div')
        .attr('id', `${lang}-div`);

    // title
    proj_div.append('h1')
        .classed('text-center title', true)
        .text(`${lang} Projects`);

    //
    // add each project
    //
    var web_root = 'https://jtpeller.github.io/';
    var link_root = 'https://github.com/jtpeller/';
    var logo_root = 'resources/logos/';
    var proj_root = `resources/${lang}/`

    var rowdiv = proj_div.append('div')
        .classed('row', true);

    for (var i = 0; i < proj.length; i++) {
        var col = rowdiv.append('div')
            .classed('col-sm-12 col-lg-6', true);

        var card = col.append('div')
            .classed('card card-dark', true);

        //
        // image carousel
        //
        var img_div = card.append('div')
            .classed('card-img-top', true);

        if (proj[i].imgs && proj[i].imgn > 0) {
            var carousel_parent = img_div.append('div')
                .classed('w-100 mx-auto', true);

            var carouselid = proj[i].name.replaceAll(' ', '-');

            var carousel = carousel_parent.append('div')
                .classed('carousel slide', true)
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

                var imgname = proj[i].imgs.replace('&d', j + 1)

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

        //
        // card body
        //

        var card_body = card.append('div')
            .classed('card-body', true);

        // title
        var name = card_body.append('h2')
            .classed('card-title section-header', true)
            .text(proj[i].name);

        // language & library logos
        for (var j = 0; j < proj[i].lang.length; j++) {
            var img = proj[i].lang[j].replaceAll('.png', '').replaceAll('.svg', '')

            name.append('img')
                .attr('src', logo_root + proj[i].lang[j])
                .attr('alt', img)
                .attr('title', img)
                .classed('lang-logo', true);
        }

        // card subtitle
        card_body.append('p')
            .classed('card-subtitle text-center grabber', true)
            .append('i')
            .text(proj[i].desc);

        // description
        card_body.append('p').html(proj[i].long);

        //
        // card footer
        //

        // add the link(s) to the footer
        var card_footer = card.append('div')
            .classed('card-body', true)

        if (lang == 'web') {
            // need to add a link to go to the page
            card_footer.append('a')
                .attr('href', web_root + proj[i].link)
                .attr('id', 'proj-' + i)
                .classed('webpage-button link', true)
                .text("See More");
        }

        card_footer.append('a')
            .attr('href', link_root + proj[i].link)
            .append('img')
            .classed('logo-link link', true)
            .attr('src', logo_root + 'GitHub.png')
            .attr('alt', 'GitHub')
            .attr('title', 'Go to the Project Repository on GitHub')
            .text("GitHub");
    }
}
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

window.onload = function() {
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
        .text('My Web Pages');

    listdiv.append('h4')
        .classed('my-h4', true)
        .text('Contents');

    //
    // add each site
    //
    var link_root = 'https://jtpeller.github.io/';
    var img_root = 'resources/';
    sites = [
        {
            name: "R6S Roulette",
            link: "r6siege",
            desc: 'A site to change how you play Rainbow Six Siege',
            imgs: ["r6s_1.png", "r6s_2.png", "r6s_3.png"],
            long: `
            R6S Roulette is a website that allows users to randomly generate an operator or gun
            in Ubisoft's game, Tom Clancy's Rainbow Six Siege. This involves datasets that I 
            manually wrote as JSONs, which are imported and used as the dataset from which 
            the filtered list is built. The user can filter out the full dataset via UI 
            elements such as checkboxes and selection dropdowns.
            `
        },
        {
            name: "Unit Converter",
            link: "unit-converter",
            desc: 'A clean and simple unit converter',
            imgs: ["uc_1.png", "uc_2.png"],
            long: `
            My unit converter is a site that allows for the conversion of various unit types;
            including length, area, volume, mass, time, energy, and temperature. There is a 
            formula that is shown that can be used by the user to approximate the conversion.
            `
        },
        {
            name: "Geography Quiz",
            link: "geography-quiz",
            desc: 'Test your geography skills with this quiz.',
            imgs: ["geo_1.png", "geo_2.png", "geo_3.png"],
            long: `
            My geography quiz, while in need of a massive UI/UX overhaul, is a quiz that 
            allows users to interact with a map of a chosen continent and select the
            randomly generated country. Each quiz runs through the entire continent,
            and will track the user's score to the left.
            `
        },
        {
            name: "WebGL Demos",
            link: "webgl-demos",
            desc: 'The landing page for my WebGL demos',
            imgs: [],//["webgl_1.png", "webgl_2.png", "webgl_3.png", "webgl_4.png", "webgl_5.png"],
            long: `
            My WebGL demo site is a simple landing page that allows access to all of the
            WebGL demos I have written. These demos range from something simple like
            basic animation to more complicated demos such as lighting and shading.
            `
        },
    ]


    for (var i = 0; i < sites.length; i++) {
        var div = left.append('div');

        // title and link
        div.append('h4')
            .classed('my-h4', true)
            .append('a')
            .html(sites[i].name + '&#128279;')
            .attr('href', link_root+sites[i].link)
            .attr('id', 'site-' + i);

        // quick grabber description
        div.append('p')
            .classed('text-center grabber', true)
            .append('i')
            .text(sites[i].desc);

        // there'll be an image carousel to the left, and a longer description to the right
        var row = div.append('div')
            .classed('row', true);

        var carousel_parent = row.append('div')
            .classed('col-8', true);

        var carouselid = sites[i].name.replaceAll(' ', '-');

        var carousel = carousel_parent.append('div')
            .classed('carousel slide carousel-fade', true)
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
                .attr('data-bs-target', '#'+carouselid)
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
        innerdiv.select('#'+sites[i].name.replaceAll(' ', '-') + '-img-' + 0).classed('active', true);
        
        // the indicators
        var prev = carousel.append('button')
            .classed('carousel-control-prev', true)
            .attr('type', 'button')
            .attr('data-bs-target', '#'+carouselid)
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
            .attr('data-bs-target', '#'+carouselid)
            .attr('data-bs-slide', 'next');

        next.append('span')
            .classed('carousel-control-next-icon', true)
            .attr('aria-hidden', true);

        next.append('span')
            .classed('visually-hidden', true)
            .text('Next');

        // now, add the description
        var long = row.append('div')
            .classed('col', true);

        long.append('h4')
            .classed('my-h4', true)
            .text('Description')
            
        long.append('p').text(sites[i].long);

        // add the list items
        listdiv.append('a')
            .classed('list-group-item list-group-item-action dark-item', true)
            .attr('href', '#site-' + i)
            .text(sites[i].name);
    }

    // what if i did a "fromsite=?" and animated the website accordingly?
    // also bootstrap scrollspy? https://getbootstrap.com/docs/5.2/components/scrollspy/

    // finalize with the footer
    //initFooter(footer, false);
}

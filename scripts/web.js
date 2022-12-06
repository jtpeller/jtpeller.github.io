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
    let sites = [
        {
            name: "R6S Roulette",
            link: "r6siege",
            desc: 'A site to change how you play Rainbow Six Siege',
            imgs: ["r6s_1.png", "r6s_2.png", "r6s_3.png", "r6s_4.png", "r6s_5.png", "r6s_6.png"],
            lang: ['HTML.png', 'CSS.png', 'JavaScript.png'],
            long: `
            R6S Roulette is a website serving multiple purposes. It's primary purpose is to allow
            users to randomly generate an operator or gun in Ubisoft's game, Tom Clancy's Rainbow 
            Six Siege. The user can filter out the full dataset via UI elements such as checkboxes
            and selection dropdowns.Additionally, users can view information about the operators
            or guns of the game. The data is stored in manually-written JSONs, and imported for use.
            `
        },
        {
            name: "Tic-Tac-Toe",
            link: "tic-tac-toe",
            desc: 'Tic-Tac-Toe written using ReactJS',
            imgs: ["ttt1.png", "ttt2.png", "ttt3.png"],
            lang: ['HTML.png', 'CSS.png', 'JavaScript.png', 'ReactJS.svg'],
            long: `
            This website is yet another rendition of the tic-tac-toe game. My first application
            written with ReactJS, it establishes the use of ReactJS basics like 
            <code>React.createElement</code> and <code>ReactDOM.createRoot</code>
            to build the site. The AI is based on the minimax algorithm.
            `
        },
        {
            name: "Geography Quiz",
            link: "geography-quiz",
            desc: 'Test your geography skills with this quiz.',
            imgs: ["geo_1.png", "geo_2.png", "geo_3.png"],
            lang: ['HTML.png', 'CSS.png', 'JavaScript.png'],
            long: `
            My geography quiz is a quiz that allows users to interact with a map of 
            a chosen continent and select the randomly generated country. Each quiz
            runs through the entire continent and tracks the user's score.
            `
        },
        {
            name: "Unit Converter",
            link: "unit-converter",
            desc: 'A clean and simple unit converter',
            imgs: ["uc_1.png", "uc_2.png"],
            lang: ['HTML.png', 'CSS.png', 'JavaScript.png'],
            long: `
            My unit converter is a site that allows for the conversion of various unit types;
            including length, area, volume, mass, time, energy, and temperature. There is a 
            formula that is shown that can be used by the user to approximate the conversion.
            `
        },
        {
            name: "WebGL Demos",
            link: "webgl-demos",
            desc: 'The landing page for my WebGL demos',
            imgs: ["webgl_1.png", "webgl_2.png", "webgl_3.png", "webgl_4.png", "webgl_5.png"],
            lang: ['HTML.png', 'CSS.png', 'JavaScript.png'],
            long: `
            My WebGL demos demonstrate my ability to use WebGL. These demos range from something
            simple like basic animation to more complicated demos such as lighting and shading.
            `
        },
    ]


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

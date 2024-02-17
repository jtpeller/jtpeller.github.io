// =================================================================
// = projects.js
// =  Description   : builds projects.html
// =  Author        : jtpeller
// =  Date          : September 19, 2022
// =================================================================
"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const CARO_INT = 5000;      // interval for carousel transition
    const utils = new Utils();
    const langs = ["Web", "Console", "Desktop"];
    const root = {
        web: 'https://jtpeller.github.io/',
        git: 'https://github.com/jtpeller/',
        logo: 'resources/logos/',
        proj: `resources/`,     // this will be updated later
    }

    // start with navbar
    utils.initNavbar(utils.select('#header'));

    // load data for page
    Promise.all([
        fetch('data/projects.json')
    ]).then(function (responses) {
        return Promise.all(responses.map(function(response) {
            return response.json();
        }));
    }).then(function (values) {
        for (var i = 0; i < langs.length; i++) {
            let lang = langs[i]
            initPage(values[0][lang.toLowerCase()], lang, utils.select('#main'));
        }
    });

    function initPage(proj, lang, loc) {
        // update project root
        root.proj = `resources/${lang.toLowerCase()}/`

        // project div for ${lang} and its title
        let proj_div = utils.create('div', {id: `${lang}-div`})
        proj_div.append(utils.create('h1', {
            classList: 'text-center title',
            textContent: `${lang} Applications`,
        }))

        // add the projects for this ${lang}
        let row_div = utils.create('div', {classList: 'row',});
        for (let i = 0; i < proj.length; i++) {
            row_div.append(buildProjectCard(proj[i], lang))
        }

        // append everything
        proj_div.append(row_div)    // append cards to projects
        loc.append(proj_div);       // append ${lang}'s projects to loc
    }

    function buildProjectCard(proj, lang) {
        // card's column in the row
        let col = utils.create('div', {classList: 'col-sm-12 col-lg-6'});

        let card = utils.create('div', {classList: 'card card-dark'});

        // image carousel
        let img_div = utils.create('div', {classList: 'card-img-top'});

        // create only if there are images to add
        console.log(proj);
        if (proj.imgs && proj.imgn > 0) {
            const cid = proj.name.replaceAll(' ', '-')

            // carousel parent div
            let carousel_parent = utils.create('div', {classList: 'w-100 mx-auto'});

            let carousel = utils.create('div', {
                classList: 'carousel slide',
                id: cid,
            });
            carousel.dataset.bsRide = 'carousel';

            // ordered list for indicators
            let indicators = utils.create('div', {classList: 'carousel-indicators'});

            // inner carousel div
            let inner_div = utils.create('div', {classList: 'carousel-inner'});

            // loop to add all the images, indicators, etc.
            for (let j = 0; j < proj.imgn; j++) {
                // button to move to the next slide (bottom of the carousel)
                let btn = utils.create('button', {
                    type: 'button',
                    ariaLabel: `Slide ${j}`
                });
                btn.dataset.bsTarget = `#${cid}`;
                btn.dataset.bsSlideTo = j;
                indicators.append(btn);

                // add inner slides/imgs
                const imgid = proj.name.replaceAll(' ', '-') + '-img-' + j;
                const imgname = proj.imgs.replace('&d', j+1);
                const alt = imgname.replaceAll('.webp', '');
                console.log(imgid, imgname, alt);

                var items = utils.create('div', {
                    classList: j == 0 ? 'carousel-item active' : 'carousel-item',
                    id: imgid,
                })
                items.dataset.bsInterval = CARO_INT;

                // append the image
                items.append(utils.create('img', {
                    classList: 'd-block w-100',
                    src: root.proj + imgname,
                    alt: alt,
                    loading: 'lazy'
                }))

                // append captions
                if (proj.caps && proj.caps.length > 0) {
                    let capdiv = utils.create('div', {
                        classList: 'carousel-caption d-none d-md-block'
                    })

                    capdiv.append(utils.create('h5', {
                        classList: 'text-shadow',
                        textContent: proj.caps[j]
                    }))
                    items.append(capdiv)        // append capdiv to items
                }
                inner_div.append(items)     // add items to inner_div
            }

            // append inner div, indicators, prev/next btns, carousel, and img_div
            carousel.append(indicators);                    // indicators
            carousel.append(inner_div);                     // inner div
            carousel.append(createPrevOrNext(true, cid))    // prev btn
            carousel.append(createPrevOrNext(false, cid))   // next btn
            carousel_parent.append(carousel);               // carousel < carousel_parent
            img_div.append(carousel_parent);                // carousel_parent < img_div

            // ensure first button is active for inner/indicators
            let temp = indicators.querySelector('button')
            temp.classList.add('active')
            temp.ariaCurrent = true;
           
            // start the carousel
            document.querySelectorAll(`button[data-bs-slide-to='0']`).forEach( (elem) => elem.click() );
        }

        // create card body
        let card_body = createCardBody(proj);
        let card_footer = createCardFooter(proj, lang);

        // append everything
        col.append(card);
        card.append(img_div);
        card.append(card_body);
        card.append(card_footer);
        return col;
    }

    // creates the previous or next button for the carousel
    function createPrevOrNext(isPrev, cid) {
        let output;
        let val = 'prev'
        let title = 'Previous'
        if (!isPrev) {
            val = 'next';
            title = "Next";
        }
        
        output = utils.create('button', {
            classList: `carousel-control-${val}`,
            type: 'button',
        })
        output.dataset.bsTarget = `#${cid}`;
        output.dataset.bsSlide = val;

        let span_icon = utils.create('span', {
            classList: `carousel-control-${val}-icon`,
            ariaHidden: true,
        })
        output.append(span_icon);

        let span_hidden = utils.create('span', {
            classList: 'visually-hidden',
            textContent: title
        })
        output.append(span_hidden);

        return output;
    }

    // creates a card body given the project
    function createCardBody(proj) {
        let card_body = utils.create('div', {classList: 'card-body'})

        // append title, subtitle, and description
        card_body.append(utils.create('h2', {
            classList: 'card-title section-header',
            textContent: proj.name
        }));

        card_body.append(utils.create('p', {
            classList: 'card-subtitle text-center grabber',
            textContent: proj.desc,
        }))

        card_body.append(utils.create('p', {innerHTML: proj.long}))

        // language & library logos
        let logos = utils.create('div', {classList: 'text-center my-4'});
        for (let x = 0; x < proj.lang.length; x++) {
            let img = proj.lang[x];
            logos.append(utils.create('img', {
                src: root.logo + img + '.svg',
                alt: img,
                title: img,
                classList: 'lang-logo',
                loading: 'lazy',
            }))
        }
        card_body.append(logos);

        return card_body;
    }

    // creates a card footer given the project
    function createCardFooter(proj, lang) {
        // .card-body eliminates the bootstrap card-footer bkgd-color & whatnot
        let footer = utils.create('div', {classList: 'card-body'})

        if (lang == 'Web') {
            let a = utils.create('a', {
                classList: 'webpage-button link float-left bg-dark bg-gradient',
                href: root.web + proj.link,
                title: `Visit: ${proj.name}`,
                textContent: 'Visit',
            })
            a.append(utils.create('img', {
                src: 'resources/external-link.svg',
                alt: '[External Link]',
                classList: 'btn-logo'
            }))
            footer.append(a);
        }

        let git = utils.create('a', {href: root.git + proj.link})
        git.append(utils.create('img', {
            classList: 'logo-link link float-end',
            src: `${root.logo}github.svg`,
            alt: "GitHub",
            title: "Project Repo on GitHub",
            loading: 'lazy',
        }));
        footer.append(git);

        return footer;
    }
})

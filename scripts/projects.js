// =================================================================
// = projects.js
// =  Description   : builds projects.html
// =  Author        : jtpeller
// =  Date          : September 19, 2022
// =================================================================
"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const CARO_INT = 5000;      // interval for carousel transition
    const root = {
        web: 'https://jtpeller.github.io/',
        git: 'https://github.com/jtpeller/',
        logo: 'resources/logos/',
        proj: `resources/projects`,     // this will be updated later
    }

    // Start with navbar
    Utils.initNavbar(Utils.select('#header'));

    // Load data for page
    Promise.all([fetch('data/projects.json')]).then(function (responses) {
        return Promise.all(responses.map(function(response) {
            return response.json();
        }));
    }).then(function (values) {
        initPage(values[0], Utils.select('#main'));
    });

    function initPage(projects, loc) {
        // Add a title for the projects
        loc.append(Utils.create('h1', {
            classList: 'text-center title',
            textContent: `jtpeller's Projects`,
        }))

        // Create the main project div which holds the project cards
        let proj_div = Utils.create('div', {id: `project-cards-div`})

        // Create all the project cards in a new div
        let row_div = Utils.create('div', {classList: 'row',});
        for (let i = 0; i < projects.length; i++) {
            // Update the project root to point to its image folder.
            root.proj = `resources/projects/${projects[i].link}/`

            // Build the project card and append it to this div.
            row_div.append(buildProjectCard(projects[i]))
        }

        // Append everything
        proj_div.append(row_div)    // Append cards to projects div
        loc.append(proj_div);       // Append this projects div to the provided location

        // Enable tooltips everywhere 
        // ref: https://getbootstrap.com/docs/5.3/components/tooltips/#enable-tooltips
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
        const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
    }

    function buildProjectCard(proj) {
        // This div is the Bootstrap column which enables 2 cards per row in a wide screen
        // and only 1 in a smaller screen.
        let col = Utils.create('div', {classList: 'col-sm-12 col-lg-6'});

        // This is the div which holds the card and sizes it appropriately.
        let card = Utils.create('div', {classList: 'card card-dark'});

        // Image carousel for all the images for a project.
        let img_div = Utils.create('div', {classList: 'card-img-top'});

        // Only populate this image div if there are images.
        if (proj.imgs && proj.imgn > 0) {
            const cid = proj.name.replaceAll(' ', '-')

            // Carousel parent div
            let carousel_parent = Utils.create('div', {classList: 'w-100 mx-auto'});

            let carousel = Utils.create('div', {
                classList: 'carousel slide',
                id: cid,
            });
            carousel.dataset.bsRide = 'carousel';

            // Ordered list for indicators
            let indicators = Utils.create('div', {classList: 'carousel-indicators'});

            // Inner carousel div
            let inner_div = Utils.create('div', {classList: 'carousel-inner'});

            // Loop to add all the images, indicators, etc.
            for (let j = 0; j < proj.imgn; j++) {
                // Button to move to the next slide (bottom of the carousel)
                let btn = Utils.create('button', {
                    type: 'button',
                    ariaLabel: `Slide ${j}`
                });
                btn.dataset.bsTarget = `#${cid}`;
                btn.dataset.bsSlideTo = j;
                indicators.append(btn);

                // Add inner slides/imgs
                const imgid = proj.name.replaceAll(' ', '-') + '-img-' + j;
                const imgname = proj.imgs.replace('&d', j+1);
                const alt = imgname.replaceAll('.webp', '');

                var items = Utils.create('div', {
                    classList: j == 0 ? 'carousel-item active' : 'carousel-item',
                    id: imgid,
                })
                items.dataset.bsInterval = CARO_INT;

                // Append the image
                items.append(Utils.create('img', {
                    classList: 'd-block w-100',
                    src: root.proj + imgname,
                    alt: alt,
                    loading: 'lazy'
                }))

                // Append captions
                if (proj.caps && proj.caps.length > 0) {
                    let capdiv = Utils.create('div', {
                        classList: 'carousel-caption d-none d-md-block'
                    })

                    capdiv.append(Utils.create('h5', {
                        classList: 'text-shadow',
                        textContent: proj.caps[j]
                    }))
                    items.append(capdiv)        // append capdiv to items
                }
                inner_div.append(items)     // add items to inner_div
            }

            // Append inner div, indicators, prev/next btns, carousel, and img_div
            carousel.append(indicators);                    // indicators
            carousel.append(inner_div);                     // inner div
            carousel.append(createPrevOrNext(true, cid))    // prev btn
            carousel.append(createPrevOrNext(false, cid))   // next btn
            carousel_parent.append(carousel);               // carousel < carousel_parent
            img_div.append(carousel_parent);                // carousel_parent < img_div

            // Ensure first button is active for inner/indicators
            let temp = indicators.querySelector('button')
            temp.classList.add('active')
            temp.ariaCurrent = true;

            // Start the carousel
            document.querySelectorAll(`button[data-bs-slide-to='0']`).forEach( (elem) => elem.click() );
        }

        // Create card body
        let card_body = createCardBody(proj);
        let card_footer = createCardFooter(proj);

        // Append everything
        col.append(card);
        card.append(img_div);
        card.append(card_body);
        card.append(card_footer);
        return col;
    }

    // Creates the previous or next button for the carousel
    function createPrevOrNext(isPrev, cid) {
        let output;
        let val = 'prev'
        let title = 'Previous'
        if (!isPrev) {
            val = 'next';
            title = "Next";
        }
        
        output = Utils.create('button', {
            classList: `carousel-control-${val}`,
            type: 'button',
        })
        output.dataset.bsTarget = `#${cid}`;
        output.dataset.bsSlide = val;

        let span_icon = Utils.create('span', {
            classList: `carousel-control-${val}-icon`,
            ariaHidden: true,
        })
        output.append(span_icon);

        let span_hidden = Utils.create('span', {
            classList: 'visually-hidden',
            textContent: title
        })
        output.append(span_hidden);

        return output;
    }

    // Creates a card body given the project
    function createCardBody(proj) {
        let card_body = Utils.create('div', {
            classList: 'card-body',
            id: Utils.makeID(proj.name)
        })

        // Append title, subtitle, and description
        card_body.append(Utils.create('h2', {
            classList: 'card-title section-header',
            textContent: proj.name
        }));

        card_body.append(Utils.create('p', {
            classList: 'card-subtitle text-center grabber',
            textContent: proj.desc,
        }))

        card_body.append(Utils.create('p', {innerHTML: proj.long}))

        // Language & library logos
        let logos = Utils.create('div', {classList: 'text-center my-4'});
        for (let x = 0; x < proj.lang.length; x++) {
            let img = proj.lang[x];
            
            let logo = Utils.create('img', {
                src: root.logo + img + '.svg',
                alt: img,
                title: img,
                classList: 'lang-logo',
                loading: 'lazy',
            });

            // add tooltips to the logo
            logo.setAttribute("data-bs-toggle", "tooltip")
            logo.setAttribute("data-bs-placement", "bottom")
            logo.setAttribute("data-bs-title", img)

            logos.append(logo);

        }
        card_body.append(logos);

        return card_body;
    }

    // creates a card footer given the project
    function createCardFooter(proj) {
        // .card-body eliminates the bootstrap card-footer bkgd-color & whatnot
        let footer = Utils.create('div', {classList: 'card-body'})

        if (proj.tags.includes('web')) {
            let web_link = proj.site === undefined ? proj.link : proj.site;
            let a = Utils.create('a', {
                classList: 'webpage-button link float-left bg-dark bg-gradient',
                href: root.web + web_link,
                target: '_blank',
                title: `Visit: ${proj.name}`,
                textContent: 'Visit',
            })
            a.append(Utils.create('img', {
                src: 'resources/external-link.svg',
                alt: '[External Link]',
                classList: 'btn-logo'
            }))
            footer.append(a);
        }

        let git = Utils.create('a', {
            href: root.git + proj.link,
            target: '_blank',
        })
        git.append(Utils.create('img', {
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

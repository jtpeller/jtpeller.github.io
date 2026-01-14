// =================================================================
// = project-card.js
// =  Description   : Class implementation for ``ProjectCard``
// =  Author        : jtpeller
// =  Date          : January 11, 2026
// =================================================================
"use strict";

class Project {
    constructor(title, link, desc, tags, lang, long, paths, site = "", imgs = "", imgn = 0, caps = []) {
        // Save everything.
        this.title = title;
        this.link = link;
        this.desc = desc;
        this.tags = tags;
        this.lang = lang;
        this.long = long;
        this.paths = paths;
        this.site = site;
        this.imgs = imgs;
        this.imgn = imgn;
        this.caps = caps;
    }

    /**
     * Builds the card element and places it in the DOM element `elem`.
     * @param {Element} elem Where the card will be built
     */
    buildCardDOM(elem) {
        let proj_card = this.#assemble(elem);
        elem.append(proj_card);
    }

    /**
     * Builds the card element and places it in the DOM element provided.
     */
    #assemble() {
        // Add the entirety of the card
        // This is the div which holds the card and sizes it appropriately.
        let card = Utils.create('div', { classList: 'card card-dark' });

        // Image carousel for all the images for a project.
        let img_div = Utils.create('div', { classList: 'card-img-top' });

        // Only populate this image div if there are images.
        if (this.imgs && this.imgn > 0) {
            const cid = this.title.replaceAll(' ', '-')

            // Carousel parent div
            let carousel_parent = Utils.create('div', { classList: 'w-100 mx-auto' });

            let carousel = Utils.create('div', {
                classList: 'carousel slide',
                id: cid,
            });
            carousel.dataset.bsRide = 'carousel';

            // Ordered list for indicators
            let indicators = Utils.create('div', { classList: 'carousel-indicators' });

            // Inner carousel div
            let inner_div = Utils.create('div', { classList: 'carousel-inner' });

            // Loop to add all the images, indicators, etc.
            for (let j = 0; j < this.imgn; j++) {
                // Button to move to the next slide (bottom of the carousel)
                let btn = Utils.create('button', {
                    type: 'button',
                    ariaLabel: `Slide ${j}`
                });
                btn.dataset.bsTarget = `#${cid}`;
                btn.dataset.bsSlideTo = j;
                indicators.append(btn);

                // Add inner slides/imgs
                const imgid = this.title.replaceAll(' ', '-') + '-img-' + j;
                const imgname = this.imgs.replace('&d', j + 1);
                const alt = imgname.replaceAll('.webp', '');

                var items = Utils.create('div', {
                    classList: j == 0 ? 'carousel-item active' : 'carousel-item',
                    id: imgid,
                })
                items.dataset.bsInterval = 5000;    // 5 second interval

                // Append the image
                items.append(Utils.create('img', {
                    classList: 'd-block w-100',
                    src: this.paths.proj + `/${this.link}/` + imgname,
                    alt: alt,
                    loading: 'lazy'
                }))

                // Append captions
                if (this.caps && this.caps.length > 0) {
                    let capdiv = Utils.create('div', {
                        classList: 'carousel-caption d-none d-md-block'
                    })

                    capdiv.append(Utils.create('h5', {
                        classList: 'text-shadow',
                        textContent: this.caps[j]
                    }))
                    items.append(capdiv)        // append capdiv to items
                }
                inner_div.append(items)     // add items to inner_div
            }

            // Append inner div, indicators, prev/next btns, carousel, and img_div
            carousel.append(indicators);                    // indicators
            carousel.append(inner_div);                     // inner div
            carousel.append(this.#createPrevOrNext(true, cid))    // prev btn
            carousel.append(this.#createPrevOrNext(false, cid))   // next btn
            carousel_parent.append(carousel);               // carousel < carousel_parent
            img_div.append(carousel_parent);                // carousel_parent < img_div

            // Ensure first button is active for inner/indicators
            let temp = indicators.querySelector('button')
            temp.classList.add('active')
            temp.ariaCurrent = true;

            // Start the carousel
            document.querySelectorAll(`button[data-bs-slide-to='0']`).forEach((elem) => elem.click());
        }

        // Create card body
        let card_body = this.#createCardBody();
        let card_footer = this.#createCardFooter();
        card.append(img_div);
        card.append(card_body);
        card.append(card_footer);

        return card;
    }

    // Creates the previous or next button for the carousel
    #createPrevOrNext(isPrev, cid) {
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
    #createCardBody() {
        let card_body = Utils.create('div', {
            classList: 'card-body',
            id: Utils.makeID(this.title)
        })

        // Append title, subtitle, and description
        card_body.append(Utils.create('h2', {
            classList: 'card-title section-header',
            textContent: this.title
        }));

        card_body.append(Utils.create('p', {
            classList: 'card-subtitle text-center grabber',
            textContent: this.desc,
        }))

        card_body.append(Utils.create('p', { innerHTML: this.long }))

        // Language & library logos
        let logos = Utils.create('div', { classList: 'text-center my-4' });
        for (let x = 0; x < this.lang.length; x++) {
            let img = this.lang[x];

            let logo = Utils.create('img', {
                src: this.paths.logo + img + '.svg',
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
    #createCardFooter() {
        // .card-body eliminates the bootstrap card-footer bkgd-color & whatnot
        let footer = Utils.create('div', { classList: 'card-body' })

        if (this.tags.includes('web')) {
            let web_link = this.site === undefined ? this.link : this.site;
            let a = Utils.create('a', {
                classList: 'webpage-button link float-left bg-dark bg-gradient',
                href: this.paths.web + web_link,
                target: '_blank',
                title: `Visit: ${this.title}`,
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
            href: this.paths.git + this.link,
            target: '_blank',
        })
        git.append(Utils.create('img', {
            classList: 'logo-link link float-end',
            src: `${this.paths.logo}github.svg`,
            alt: "GitHub",
            title: "Project Repo on GitHub",
            loading: 'lazy',
        }));
        footer.append(git);

        return footer;
    }
}
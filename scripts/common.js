// =================================================================
// = common.js
// =  Description   : utility class
// =  Author        : jtpeller
// =  Date          : September 19, 2022
// =================================================================
"use strict";

class Utils {
    ll = [
        {
            href: 'projects.html',
            text: '> Projects'
        },
        {
            href: 'about.html',
            text: '> About Me'
        }
    ]

    // wrapper for Object.assign for easier readability
    create(elem, options) {
        return Object.assign(document.createElement(elem), options)
    }

    // wrapper for querySelector
    select(val, origin=document) {
        return origin.querySelector(val);
    }

    /**
     * initNavbar() -- initializes the navbar for navigating the site
     * @param {Element} header  The Element to place this in.
     */
    initNavbar(header) {
        // <nav>
        let nav = this.create("nav", {
            classList: 'navbar navbar-expand-lg fixed-top navbar-dark',
        })

        // nav container
        let navdiv = this.create('div', {
            classList: 'container-fluid',
        });

        // hamburger menu title (hidden when page is large)
        navdiv.append(this.create('a', {
            classList: 'navbar-brand link d-lg-none',
            href: 'index.html',
            textContent: 'jtpeller',
        }))

        // hamburger menu for mobile
        let menu = this.create('button', {
            classList: 'navbar-toggler',
            type: 'button',
            ariaControls: 'navbar-content'
        })
        menu.dataset.bsToggle = 'collapse'
        menu.dataset.bsTarget = '#navbar-content'

        menu.append(this.create('span', {
            classList: 'navbar-toggler-icon',
        }))

        // build the title
        let linkdiv = this.create('div', {
            classList: 'collapse navbar-collapse',
            id: 'navbar-content',
        })

        // list of links
        let ul = this.create('ul', {
            classList: 'navbar-nav mx-auto mb-2 mb-lg-0',
        })

        // title within this link list
        ul.append(this.create('a', {
            classList: 'navbar-brand link d-none d-lg-block',
            href: 'index.html',
            textContent: 'jtpeller'
        }))

        // all links from ll
        for (let i = 0; i < this.ll.length; i++) {
            let li = this.create('li', {
                classList: 'nav-item',
            })
            li.append(this.create('a', {
                classList: 'link active',
                ariaCurrent: 'page',
                href: this.ll[i].href,
                textContent: this.ll[i].text,
            }))
            ul.append(li)
        }
        
        // append everything
        linkdiv.append(ul)      // link list to link div
        navdiv.append(menu)     // hamburger menu to nav div
        navdiv.append(linkdiv)  // link div to nav div
        nav.append(navdiv)      // nav div to nav
        header.append(nav)      // append to header
    }
    
}

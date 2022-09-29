// =================================================================
// = common.js
// =  Description   : utility functions
// =  Author        : jtpeller
// =  Date          : September 19, 2022
// =================================================================

let ll = [
    {
        html: 'web.html',
        link: 'Web Pages'
    },
    {
        html: 'projects.html',
        link: 'Other Work'
    },
    {
        html: 'about.html',
        link: 'About'
    }
]

function arrow() {
    let arrow = document.getElementById('arrow');
    let maxStep = 15;
    let step = 0;
    let dx = 0.1;
    let time = 10;     // how many ms before next 'frame'
    
    function updatePosition() {
        arrow.style.paddingRight = step + 'px';
        step += dx;
        if (step > maxStep) {
            dx = -dx;
            step += 2*dx;
        } else if (step < 0) {
            dx = -dx; 
            step += 2*dx;
        }
    }

    setInterval(updatePosition, time);
}

/**
 * initNavbar() -- initializes the navbar for navigating the site
 * @param header  The d3 element to place this in.
 */
 function initNavbar(header) {
    let nav = header.append('nav')
    nav.classed('navbar navbar-expand-lg fixed-top navbar-dark my-bg-dark', true)

    let navdiv = nav.append('div')
        .classed('container-fluid', true);
    
    let brand = navdiv.append('a')
        .classed('navbar-brand d-lg-none', true)
        .attr('href', 'index.html')
        .text('jtpeller');
    
    //
    // add the hamburger menu button for mobile/thin
    //
    let menu = navdiv.append('button')
        .classed('navbar-toggler', true)
        .attr('type', 'button')
        .attr('data-bs-toggle', 'collapse')
        .attr('data-bs-target', '#navbar-content')
        .attr('aria-controls', 'navbar-content')
        .attr('aria-expanded', 'false')
        .attr('aria-label', 'Toggle navigation');

    menu.append('span')
        .classed('navbar-toggler-icon', true);

    //
    // build the links
    //
    let linkdiv = navdiv.append('div')
        .classed('collapse navbar-collapse', true)
        .attr('id', 'navbar-content');

    let ul = linkdiv.append('ul')
        .classed('navbar-nav mx-auto mb-2 mb-lg-0', true);

    ul.append('a')
        .classed('navbar-brand d-none d-lg-block', true)
        .attr('href', 'index.html')
        .text('jtpeller');

    for (var i = 0; i < ll.length; i++) {
        ul.append('li')
            .classed('nav-item', true)
            .append('a')
            .classed('nav-link active', true)
            .attr('aria-current', 'page')
            .attr('href', ll[i].html)
            .text(ll[i].link);
    }
}

function initFooter(footer, anim) {
    let elem;
    if (anim) {
        elem = footer.append('footer')
            .classed('footer footer-anim text-center text-lg-start mt-auto my-bg-dark', true)
            .style('height', '5em');
    } else {
        elem = footer.append('footer')
            .classed('footer text-center text-lg-start mt-auto my-bg-dark', true)
            .style('height', '5em');
    }
    
    let div = elem.append('div')
        .classed('text-center p-4 container', true);

    div.append('a')
        .attr('href', 'https://www.github.com/jtpeller')
        .classed('text-light', true)
        .append('img')
        .classed('logo-link', true)
        .attr('src', 'resources/github.png')
        .attr('alt', 'GitHub')
        .attr('title', 'My GitHub Link...');     
}


// pulled from: https://stackoverflow.com/questions/8188548/splitting-a-js-array-into-n-arrays
function chunkify(a, n, balanced) {
    if (n < 2)
        return [a];

    var len = a.length,
        out = [],
        i = 0,
        size;

    if (len % n === 0) {
        size = Math.floor(len / n);
        while (i < len) {
            out.push(a.slice(i, i += size));
        }
    }

    else if (balanced) {
        while (i < len) {
            size = Math.ceil((len - i) / n--);
            out.push(a.slice(i, i += size));
        }
    }

    else {

        n--;
        size = Math.floor(len / n);
        if (len % size === 0)
            size--;
        while (i < size * n) {
            out.push(a.slice(i, i += size));
        }
        out.push(a.slice(size * n));

    }

    return out;
}

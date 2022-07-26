window.onload = function () {
    gradient();
    arrow();
}

function gradient() {
    //
    // background gradient
    //
    let set = false;
    let c1 = {};
    let c2 = {};
    let step1 = {
        r: Math.random() * 4 + 1,
        g: Math.random() * 4 + 1,
        b: Math.random() * 4 + 1
    };
    let step2 = {
        r: Math.random() * 4 + 1,
        g: Math.random() * 4 + 1,
        b: Math.random() * 4 + 1
    };
    function generateBackgroundGradient() {
        if (!set) {
            // generate first gradient (randomly)
            c1 = {
                r: Math.random() * 255,
                g: Math.random() * 255,
                b: Math.random() * 255,
            }

            c2 = {
                r: Math.random() * 255,
                g: Math.random() * 255,
                b: Math.random() * 255,
            }
            document.body.style.backgroundImage = `linear-gradient(-45deg, rgb(${c1.r}, ${c1.g}, ${c1.b}), rgb(${c2.r}, ${c2.g}, ${c2.b}))`
            set = true;
        } else {
            function updateColor(color, step) {
                function updateComponent(v, s) {
                    v += s
                    if (v > 255) {  // s will be positive here
                        s = -Math.random() * 4 + 1
                        v += s * 2
                    } else if (v < 0) {
                        s = Math.random() * 4 + 1
                        v += s * 2
                    }
                    return { v, s }
                }

                ret = updateComponent(color.r, step.r);
                color.r = ret.v;
                step.r = ret.s;
                ret = updateComponent(color.g, step.g);
                color.g = ret.v;
                step.g = ret.s;
                ret = updateComponent(color.b, step.b);
                color.b = ret.v;
                step.b = ret.s;

                return { color, step }
            }

            // update colors
            ret = updateColor(c1, step1)
            c1 = ret.color
            step1 = ret.step

            ret = updateColor(c2, step2)
            c2 = ret.color
            step2 = ret.step

            // update gradient
            document.body.style.backgroundImage = `linear-gradient(-45deg, rgb(${c1.r}, ${c1.g}, ${c1.b}), rgb(${c2.r}, ${c2.g}, ${c2.b}))`
        }
    }

    generateBackgroundGradient();
    setInterval(generateBackgroundGradient, 150);
}

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
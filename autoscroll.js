const roll1 = roll(".autoscroll", { duration: 9 });
const roll2 = roll(".autoscroll", { duration: 9 });

function roll(targets, vars) {
    vars = vars || {};
    vars.ease || (vars.ease = "none");

    const tl = gsap.timeline({
        repeat: -1,
        onReverseComplete() { 
            this.totalTime(this.rawTime() + this.duration() * 10); 
        }
    });

    const elements = gsap.utils.toArray(targets);
    const clones = elements.map(el => {
        let clone = el.cloneNode(true);
        el.parentNode.appendChild(clone);
        return clone;
    });

    // Position clones to the right of the original elements
    const positionClones = () => elements.forEach((el, i) => 
        gsap.set(clones[i], { 
            position: "absolute", 
            overwrite: false, 
            top: el.offsetTop, 
            left: el.offsetLeft + el.offsetWidth // Position clones to the right
        })
    );

    positionClones();

    // Animate original and cloned elements to the left
    elements.forEach((el, i) => 
        tl.to([el, clones[i]], { xPercent: -100, ...vars }, 0)
    );

    window.addEventListener("resize", () => {
        let time = tl.totalTime(); // record the current time
        tl.totalTime(0); // rewind and clear out the timeline
        positionClones(); // reposition
        tl.totalTime(time); // jump back to the proper time
    });

    return tl;
}

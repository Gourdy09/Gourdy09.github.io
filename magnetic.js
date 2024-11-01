const magneticElements = document.querySelectorAll(".magnetic");
const minWidth540 = window.matchMedia("(max-width: 540px)");

function updateMagnetic() {
    if (minWidth540.matches) {
        // Remove event listeners and the 'magnetic' class if screen is smaller than or equal to 540px
        magneticElements.forEach((magneticElement) => {
            magneticElement.removeEventListener("mousemove", mouseMoveHandler);
            magneticElement.removeEventListener("mouseout", mouseOutHandler);
            magneticElement.classList.remove("magnetic"); // Remove the magnetic class
        });
    } else {
        // Add event listeners and the 'magnetic' class back if screen is larger than 540px
        magneticElements.forEach((magneticElement) => {
            magneticElement.classList.add("magnetic"); // Add the magnetic class back
            magneticElement.addEventListener("mousemove", mouseMoveHandler);
            magneticElement.addEventListener("mouseout", mouseOutHandler);
        });
    }
}

function mouseMoveHandler(e) {
    let rect = this.getBoundingClientRect();
    let x = (e.clientX - rect.left - rect.width / 2) * 0.5;
    let y = (e.clientY - rect.top - rect.height / 2) * 0.5;

    this.style.transform = "translate(" + x + "px, " + y + "px)";
    this.style.scale = "1.1";
    this.style.transition = ".1s ease, .3s ease";
    this.style.transitionProperty = "transform, scale";
    this.style.cursor = "pointer";
    this.style.zIndex = "100";
}

function mouseOutHandler() {
    this.style.transform = "translate(0px, 0px)";
    this.style.scale = "1";
    this.style.transition = ".3s cubic-bezier(0.0, 0.4, 0.55, 1.6), .3s cubic-bezier(0.0, 0.4, 0.55, 1.6)";
    this.style.transitionProperty = "transform, scale";
    this.style.zIndex = "0";
}

// Initial check
updateMagnetic();

// Listen for changes in the viewport size
minWidth540.addListener(updateMagnetic);


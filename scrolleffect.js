let lastScrollTop = 0;
window.addEventListener('scroll', function() {
    const svg = document.getElementById('fullScreenSVG');
    const header = document.querySelector('header');
    const scrollY = window.scrollY;
    const stopScalingThreshold = 1100;
    const spaceBetweenSvgAndHeader = -30; // Space in pixels

    // SVG Scaling Logic
    if (scrollY <= stopScalingThreshold) {
        svg.style.top = `${scrollY}px`;
        svg.style.position = 'absolute';
        svg.style.height = `calc(100vh - ${scrollY}px)`;
        if (scrollY > 550) {
            let scaleFactor = 1 - ((scrollY - 550) / 1000);
            svg.style.width = `calc(100vw * ${Math.max(scaleFactor, 0.5)})`;
            svg.style.left = `calc(50% - (50vw * ${Math.max(scaleFactor, 0.5)}))`;
        } else {
            svg.style.width = "100vw";
            svg.style.left = "0";
        }
    } else {
        svg.style.position = 'fixed';
        svg.style.top = '0';
        svg.style.height = `calc(100vh - ${stopScalingThreshold}px)`;
        let finalScaleFactor = 1 - ((stopScalingThreshold - 550) / 1000);
        svg.style.width = `calc(100vw * ${Math.max(finalScaleFactor, 0.5)})`;
        svg.style.left = `calc(50% - (50vw * ${Math.max(finalScaleFactor, 0.5)}))`;
    }

    // Header Repositioning Logic
    if (scrollY > lastScrollTop && scrollY > stopScalingThreshold) {
        // Moving down past threshold
        header.style.position = 'absolute';
        header.style.top = `${svg.getBoundingClientRect().bottom + window.pageYOffset + spaceBetweenSvgAndHeader}px`;
    } else if (scrollY < lastScrollTop && scrollY < svg.getBoundingClientRect().bottom + window.pageYOffset) {
        // Moving up, re-fix header at the top
        header.style.position = 'fixed';
        header.style.top = '20px';
    }

    lastScrollTop = scrollY <= 0 ? 0 : scrollY; // For Mobile or negative scrolling
}, false);










let lastScrollY = window.scrollY;
let targetScrollY = lastScrollY;
let lerpFactor = 0.1;  // Adjust this factor to control the "drag" effect

function updateSVGSize() {
    lastScrollY += (targetScrollY - lastScrollY) * lerpFactor;
    const scrollY = lastScrollY;
    const startWidthScalingThreshold = 550;
    const stopScalingThreshold = 1100;
    const svg = document.getElementById('fullScreenSVG');

    if (scrollY <= stopScalingThreshold) {
        svg.style.position = 'fixed';
        svg.style.top = '0'; // Keeps the top fixed

        // Calculate the height reduction based on scroll, ensuring it only reduces from the bottom
        let heightReduction = Math.min(scrollY, stopScalingThreshold);
        svg.style.height = `calc(100vh - ${heightReduction}px)`;

        if (scrollY > startWidthScalingThreshold) {
            let scaleFactor = 1 - ((scrollY - startWidthScalingThreshold) / 1000);
            scaleFactor = Math.max(scaleFactor, 0.5);  // Ensure the scale factor does not go too low
            svg.style.width = `calc(100vw * ${scaleFactor})`;
            svg.style.left = `calc(50% - (50vw * ${scaleFactor}))`;
        } else {
            svg.style.width = "100vw";
            svg.style.left = "0";
        }
    } else {
        // Fix the SVG with the final dimensions after scaling stops
        svg.style.height = `calc(100vh - ${stopScalingThreshold}px)`;
        let finalScaleFactor = 1 - ((stopScalingThreshold - startWidthScalingThreshold) / 1000);
        finalScaleFactor = Math.max(finalScaleFactor, 0.5);
        svg.style.width = `calc(100vw * ${finalScaleFactor})`;
        svg.style.left = `calc(50% - (50vw * ${finalScaleFactor}))`;
    }

    requestAnimationFrame(updateSVGSize);
}

window.addEventListener('scroll', () => {
    targetScrollY = window.scrollY;
});

updateSVGSize();

window.addEventListener('scroll', function() {
    const svg = document.getElementById('fullScreenSVG');
    const scrollY = window.scrollY;
    const startWidthScalingThreshold = 550; // Start scaling width after 200px
    const stopScalingThreshold = 1100; // Stop scaling and fix position at 650px

    if (scrollY <= stopScalingThreshold) {
        // Update the top position to keep the SVG visible
        svg.style.top = `${scrollY}px`;
        svg.style.position = 'absolute';

        // Scale the height of the SVG
        svg.style.height = `calc(100vh - ${scrollY}px)`;

        if (scrollY > startWidthScalingThreshold) {
            // Calculate scaling factor for width, starting only after 200px
            let scaleFactor = 1 - ((scrollY - startWidthScalingThreshold) / 1000); // Example scaling factor, ensure it does not scale too large or negative
            svg.style.width = `calc(100vw * ${Math.max(scaleFactor, 0.5)})`; // Use max to ensure width does not invert or disappear
            svg.style.left = `calc(50% - (50vw * ${Math.max(scaleFactor, 0.5)}))`; // Adjust left to center the SVG
        } else {
            svg.style.width = "100vw";
            svg.style.left = "0";
        }
    } else {
        // Fix the SVG at the top after stopScalingThreshold
        svg.style.position = 'fixed';
        svg.style.top = '0';
        svg.style.height = `calc(100vh - ${stopScalingThreshold}px)`;
        let finalScaleFactor = 1 - ((stopScalingThreshold - startWidthScalingThreshold) / 1000);
        svg.style.width = `calc(100vw * ${Math.max(finalScaleFactor, 0.5)})`; // Set the final width at the stopping point
        svg.style.left = `calc(50% - (50vw * ${Math.max(finalScaleFactor, 0.5)}))`; // Center the SVG
    }
});
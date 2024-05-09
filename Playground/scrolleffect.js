let lastScrollTop = 0;

document.addEventListener('DOMContentLoaded', function () {
    const svg = document.getElementById('fullScreenSVG');
    const header = document.querySelector('header');
    const blurBackground = document.querySelector('.background-blur');
    const items = document.querySelectorAll('.content div, #production-info');
    const headerSpacing = -50; // This sets the header spacing when below SVG
    const stopScalingThreshold = 1100;
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            entry.target.style.opacity = entry.isIntersecting ? '1' : '0'; // Manage visibility based on intersection
        });
    }, { threshold: 0.1 });

    items.forEach(item => observer.observe(item));

    function updatePage() {
        const scrollY = window.scrollY;
        const svgHeight = svg.getBoundingClientRect().height;

        // Manage SVG scaling
        if (scrollY <= stopScalingThreshold) {
            svg.style.position = 'fixed';
            svg.style.top = '0';
            svg.style.height = `calc(100vh - ${scrollY}px)`;
            blurBackground.style.height = `${svgHeight}px`;  // Adjust background blur height dynamically
            adjustSVGWidth(scrollY);
        } else {
            svg.style.position = 'fixed';
            svg.style.height = `calc(100vh - ${stopScalingThreshold}px)`;
            adjustSVGWidth(stopScalingThreshold);
            blurBackground.style.height = `${svgHeight + header.offsetHeight + Math.abs(headerSpacing)}px`; // Cover SVG and header after scaling stops
        }

        // Header repositioning logic
        if (scrollY > lastScrollTop) { // Scrolling down
            if (scrollY > stopScalingThreshold && window.pageYOffset > svgHeight + stopScalingThreshold) {
                header.style.position = 'fixed';
                header.style.top = `${svgHeight + headerSpacing}px`;  // Consider headerSpacing
            }
        } else { // Scrolling up
            if (window.pageYOffset <= svgHeight + stopScalingThreshold) {
                header.style.position = 'fixed';
                header.style.top = '20px';
            }
        }

        lastScrollTop = scrollY;
        requestAnimationFrame(updatePage);
    }

    function adjustSVGWidth(scrollY) {
        const scaleFactor = scrollY > 550 ? Math.max(0.5, 1 - ((scrollY - 550) / 1000)) : 1;
        svg.style.width = `calc(100vw * ${scaleFactor})`;
        svg.style.left = `calc(50% - (50vw * ${scaleFactor}))`;
    }

    window.addEventListener('scroll', updatePage);
    updatePage();



    const blurDiv = document.querySelector('.background-blur');
    window.addEventListener('scroll', function () {
        const maxBlur = 3; // Maximum blur in pixels
        const fadeStart = 100; // Scroll position where blur starts fading
        const fadeEnd = 500; // Scroll position where blur ends completely

        const scrollY = window.scrollY;
        let blurIntensity;

        if (scrollY < fadeStart) {
            blurIntensity = maxBlur;
        } else if (scrollY > fadeEnd) {
            blurIntensity = maxBLur;
        }

        blurDiv.style.backdropFilter = `blur(${blurIntensity}px)`;
    });


});

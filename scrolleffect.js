// script.js
document.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const screenHeight = window.innerHeight;
    let scale = 1;

    if (scrollTop < screenHeight) {
        scale = 1 - scrollTop / screenHeight;
        document.querySelector('.svg-container').style.transform = `scale(${scale})`;
    }
});

// ---------- JQuery for Navbar----------
$(document).ready(function () {
    $('.menu-btn').click(function () {
        $('.navbar .menu').toggleClass('active');
        $('.menu-btn i').toggleClass('active');
        $('.dropdown-content').removeClass('onscreen');
    });
    $('.dropdown').click(function () {
        $('.dropdown-content').toggleClass("onscreen");
    });
});



// For Fliping Cards
var cards = document.querySelectorAll('.card');

[...cards].forEach((card) => {
    card.addEventListener('click', function () {
        card.classList.toggle('is-flipped');
    });
});
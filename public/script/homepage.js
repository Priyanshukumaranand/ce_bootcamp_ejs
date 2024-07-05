// ---------- WELCOME ----------
const elts = {
    text1: document.getElementById("text1"),
    text2: document.getElementById("text2")
};

const texts = [
    "Welcome To",
    "CE Bootcamp",
];

const morphTime = 1;
const cooldownTime = 0.25;

let textIndex = texts.length - 1;
let time = new Date();
let morph = 0;
let cooldown = cooldownTime;

elts.text1.textContent = texts[textIndex % texts.length];
elts.text2.textContent = texts[(textIndex + 1) % texts.length];

function doMorph() {
    morph -= cooldown;
    cooldown = 0;

    let fraction = morph / morphTime;

    if (fraction > 1) {
        cooldown = cooldownTime;
        fraction = 1;
    }

    setMorph(fraction);
}

function setMorph(fraction) {
    elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    fraction = 1 - fraction;
    elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    elts.text1.textContent = texts[textIndex % texts.length];
    elts.text2.textContent = texts[(textIndex + 1) % texts.length];
}

function doCooldown() {
    morph = 0;

    elts.text2.style.filter = "";
    elts.text2.style.opacity = "100%";

    elts.text1.style.filter = "";
    elts.text1.style.opacity = "0%";
}

function animate() {
    requestAnimationFrame(animate);

    let newTime = new Date();
    let shouldIncrementIndex = cooldown > 0;
    let dt = (newTime - time) / 1000;
    time = newTime;

    cooldown -= dt;

    if (cooldown <= 0) {
        if (shouldIncrementIndex) {
            textIndex++;
        }

        doMorph();
    } else {
        doCooldown();
    }
}

animate();



// ---------- Carousel ----------
let currentIndex = 0;
    const carousel = document.querySelector('.carousel');
    const items = document.querySelectorAll('.carousel-item');
    const totalItems = items.length;

    // Clone first and last items
    const firstItemClone = items[0].cloneNode(true);
    const lastItemClone = items[totalItems - 1].cloneNode(true);

    // Append and prepend cloned items
    carousel.appendChild(firstItemClone);
    carousel.insertBefore(lastItemClone, items[0]);

    function moveCarousel(direction) {
        currentIndex += direction;

        carousel.style.transition = 'transform 0.5s ease-in-out';
        const offset = -currentIndex * 100;
        carousel.style.transform = `translateX(${offset}%)`;

        // Check bounds and adjust without transition for seamless loop
        setTimeout(() => {
            if (currentIndex === totalItems) {
                carousel.style.transition = 'none';
                currentIndex = 0;
                carousel.style.transform = `translateX(${currentIndex * -100}%)`;
            } else if (currentIndex === -1) {
                carousel.style.transition = 'none';
                currentIndex = totalItems - 1;
                carousel.style.transform = `translateX(${currentIndex * -100}%)`;
            }
        }, 500);
    }



// ---------- JQuery for Navbar----------
$(document).ready(function () {
    $('.menu-btn').click(function () {
        $('.navbar .menu').toggleClass('active');
        $('.menu-btn i').toggleClass('active');
    });
});

$(document).ready(function () {
    $('.menu-btn').click(function () {
        $('.menu').toggleClass('active');
    });
});

(function ($) {
    $(function () {
        $('nav ul li a:not(:only-child)').click(function (e) {
            $(this).siblings('.dropdown').toggle();
            $('.dropdown').not($(this).siblings()).hide();
            e.stopPropagation();
        });
        $('html').click(function () {
            $('.dropdown').hide();
        });
        $('#nav-toggle').click(function () {
            $('nav ul').slideToggle();
        });
        $('#nav-toggle').on('click', function () {
            this.classList.toggle('active');
        });
    });
})(jQuery);


// For Profile icon
let profileDropdownList = document.querySelector(".profile-dropdown-list");
let btn = document.querySelector(".profile-dropdown-btn");

let classList = profileDropdownList.classList;

const toggle = () => classList.toggle("active");

window.addEventListener("click", function (e) {
  if (!btn.contains(e.target)) classList.remove("active");
});
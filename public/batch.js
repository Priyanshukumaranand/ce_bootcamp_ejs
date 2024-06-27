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

document.querySelectorAll('.link.instagram').forEach((instagramLink) => {
    instagramLink.addEventListener('click', () => {
      const instagramUrl = `${instagramLink.getAttribute('value')}`;
      window.open(instagramUrl, '_blank');
    });
  });

document.querySelectorAll('.link.github').forEach((githubLink) => {
  githubLink.addEventListener('click', () => {
    const githubUrl = `${githubLink.getAttribute('value')}`;
    window.open(githubUrl, '_blank');
  });
});

document.querySelectorAll('.link.linkedin').forEach((linkedinLink) => {
  linkedinLink.addEventListener('click', () => {
    const linkedinUrl = `${linkedinLink.getAttribute('value')}`;
    window.open(linkedinUrl, '_blank');
  });
});
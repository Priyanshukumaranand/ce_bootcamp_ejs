// ----NAVBAR----//
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
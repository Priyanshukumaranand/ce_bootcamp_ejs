document.addEventListener("DOMContentLoaded", function() {
    // Toggle profile dropdown
    document.querySelector('.profile-dropdown-btn').addEventListener('click', function() {
        const profileDropdownList = document.querySelector('.profile-dropdown-list');
        profileDropdownList.style.display = profileDropdownList.style.display === 'block' ? 'none' : 'block';
    });

    // Handle file upload
    const profilePictureInput = document.getElementById('profilePicture');
    const profileImage = document.getElementById('profileImage');
    const uploadContainer = document.getElementById('uploadContainer');
    const browseButton = document.getElementById('browseButton');
    const saveImageButton = document.getElementById('saveImageButton');

    browseButton.addEventListener('click', function() {
        profilePictureInput.click();
    });

    profilePictureInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                profileImage.src = e.target.result;
                saveImageButton.hidden = false;
            };
            reader.readAsDataURL(file);
        }
    });

    uploadContainer.addEventListener('dragover', function(event) {
        event.preventDefault();
    });

    uploadContainer.addEventListener('drop', function(event) {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                profileImage.src = e.target.result;
                saveImageButton.hidden = false;
            };
            reader.readAsDataURL(file);
        }
    });

    // Character count for textarea
    const descriptionInput = document.getElementById('description');
    const charCount = document.getElementById('char-count');
    const remainingCharsSpan = document.getElementById('remaining');

    descriptionInput.addEventListener('input', function() {
        const maxLength = descriptionInput.getAttribute('maxlength');
        const currentLength = descriptionInput.value.length;
        remainingCharsSpan.textContent = maxLength - currentLength;
    });

    // Initialize remaining character count on page load
    remainingCharsSpan.textContent = descriptionInput.getAttribute('maxlength') - descriptionInput.value.length;

    // Handle form submission (optional example)
    document.getElementById('saveImageButton').addEventListener('click', function (event) {
        event.preventDefault();
        const formData = new FormData(document.getElementById('profileForm'));
        fetch('/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                alert(data.message);
            }
        })
        .catch(error => console.error('Error:', error));
    }); // Toggle menu on mobile
    const menuBtn = document.querySelector('.menu-btn');
    const menu = document.querySelector('.menu');

    menuBtn.addEventListener('click', function() {
        menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
    });

    // Close profile dropdown on click outside
    document.addEventListener('click', function(event) {
        const profileDropdown = document.querySelector('.profile-dropdown');
        const isClickInside = profileDropdown.contains(event.target);

        if (!isClickInside) {
            document.querySelector('.profile-dropdown-list').style.display = 'none';
        }
    });
});







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
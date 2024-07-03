document.getElementById('browseButton').addEventListener('click', function() {
    document.getElementById('profilePicture').click();
});

document.getElementById('profilePicture').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('profileImage').src = e.target.result;
            document.getElementById('saveImageButton').hidden = false;
            // Show the alert message
            const alertMessage = document.getElementById('alertMessage');
            alertMessage.textContent = 'Profile picture uploaded!';
            alertMessage.classList.add('show');
            setTimeout(function() {
                alertMessage.classList.remove('show');
            }, 3000); // Hide the alert after 3 seconds (3000 milliseconds)
        }
        reader.readAsDataURL(file);
    }
});

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
});

document.getElementById('uploadContainer').addEventListener('dragover', function(event) {
    event.preventDefault();
    event.stopPropagation();
    this.style.borderColor = '#007bff';
});

document.getElementById('uploadContainer').addEventListener('dragleave', function(event) {
    event.preventDefault();
    event.stopPropagation();
    this.style.borderColor = '#444';
});

document.getElementById('uploadContainer').addEventListener('drop', function(event) {
    event.preventDefault();
    event.stopPropagation();
    this.style.borderColor = '#444';
    const file = event.dataTransfer.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('profileImage').src = e.target.result;
            document.getElementById('saveImageButton').hidden = false;
            // Show the alert message
            const alertMessage = document.getElementById('alertMessage');
            alertMessage.textContent = 'Profile picture uploaded!';
            alertMessage.classList.add('show');
            setTimeout(function() {
                alertMessage.classList.remove('show');
            }, 3000); // Hide the alert after 3 seconds (3000 milliseconds)
        }
        reader.readAsDataURL(file);
    }
});
document.addEventListener('DOMContentLoaded', function () {
    var textarea = document.getElementById('description');
    var charCount = document.getElementById('remaining');
    var maxChars = parseInt(textarea.getAttribute('maxlength'));

    updateCharCount();

    textarea.addEventListener('input', function () {
        updateCharCount();
    });

    function updateCharCount() {
        var remainingChars = maxChars - textarea.value.length;
        charCount.textContent = remainingChars + " out of " + maxChars;
        if (remainingChars < 0) {
            charCount.style.color = 'red'; // Change color to indicate exceeding limit
        } else {
            charCount.style.color = ''; // Reset color
        }
    }
});



(function($) {
    $(document).ready(function() {
      $('nav ul li a:not(:only-child)').on('click', function(e) {
        $(this).siblings('.nav-dropdown').toggle();
        $('.nav-dropdown').not($(this).siblings()).hide();
        e.stopPropagation();
      });
  
      $('html').on('click', function() {
        $('.nav-dropdown').hide();
      });
  
      $('#nav-toggle').on('click', function() {
        $('nav ul').slideToggle();
        this.classList.toggle('active');
      });
    });
  })(jQuery);
  
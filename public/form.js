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
        }
        reader.readAsDataURL(file);
    }
});

document.getElementById('saveImageButton').addEventListener('click', function() {
    alert('Profile picture saved!');
    document.getElementById('saveImageButton').hidden = true;
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
        }
        reader.readAsDataURL(file);
    }
});
// document.getElementById('profileForm').addEventListener('submit', function(event) {
//     event.preventDefault();
//     // Here you can add your code to save the form data or perform any other actions
//     alert('Changes saved successfully!');
// });

// document.getElementById('profileForm').addEventListener('submit', function(event) {
//     event.preventDefault();
//     // Here you can add your code to save the form data or perform any other actions
//     const alertMessage = document.getElementById('alertMessage');
//     alertMessage.textContent = 'Changes saved successfully!';
//     alertMessage.classList.add('show');
//     setTimeout(function() {
//         alertMessage.classList.remove('show');
//     }, 3000); // Hide the alert after 3 seconds (3000 milliseconds)
// });


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


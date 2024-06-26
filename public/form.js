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
document.getElementById('profileForm').addEventListener('submit', function(event) {
    event.preventDefault();
    // Here you can add your code to save the form data or perform any other actions
    alert('Changes saved successfully!');
});

document.getElementById('profileForm').addEventListener('submit', function(event) {
    event.preventDefault();
    // Here you can add your code to save the form data or perform any other actions
    const alertMessage = document.getElementById('alertMessage');
    alertMessage.textContent = 'Changes saved successfully!';
    alertMessage.classList.add('show');
    setTimeout(function() {
        alertMessage.classList.remove('show');
    }, 3000); // Hide the alert after 3 seconds (3000 milliseconds)
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

// Client-side JavaScript
const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    if (response.ok) {
      const { token } = await response.json();
      // Store the token (e.g., in localStorage or a cookie)
      localStorage.setItem('token', token);
      // Redirect the user to the /home route
      window.location.href = '/home';
    } else {
      const { error } = await response.json();
      // Display the error message to the user
      alert(error);
    }
  } catch (err) {
    console.error(err);
    alert('An error occurred. Please try again later.');
  }
});


const profileForm = document.getElementById('profileForm');

profileForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);

  try {
    const response = await fetch('/update-profile', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      const { message, user } = await response.json();
      console.log(message);
      // Update the UI with the new user data
      updateUserProfile(user);
    } else {
      const { error } = await response.json();
      console.error(error);
    }
  } catch (error) {
    console.error('Error updating profile:', error);
  }
});

function updateUserProfile(user) {
  // Update the UI with the new user data
  document.getElementById('name').value = user.name;
  document.getElementById('place').value = user.place;
  document.getElementById('description').value = user.about;
  document.getElementById('instagram').value = user.instagram;
  document.getElementById('linkedin').value = user.linkedin;
  document.getElementById('github').value = user.github;
}
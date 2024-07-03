document.addEventListener('DOMContentLoaded', () => {
    // const forgotPasswordLink = document.querySelector('#forgotPasswordLink');
    const forgotPasswordModal = document.querySelector('#forgotPasswordModal');
    const closeButton = document.getElementsByClassName('close-button')[0];
    const forgotPasswordForm = document.querySelector('#forgotPasswordForm');
  
    // forgotPasswordLink.addEventListener('click', () => {
    //   forgotPasswordModal.style.display = 'block';
    // });
  
    closeButton.addEventListener('click', () => {
      forgotPasswordModal.style.display = 'none';
    });
  
    window.addEventListener('click', (event) => {
      if (event.target == forgotPasswordModal) {
        forgotPasswordModal.style.display = 'none';
      }
    });
  
    forgotPasswordForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const email = document.querySelector('#forgotPasswordEmail').value;
      
      try {
        console.log(email);
        const response = await fetch('/forgetpassword', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });
  
        if (response.ok) {
          alert('Password reset instructions have been sent to your email.');
          forgotPasswordModal.style.display = 'none';
        } else {
          const { error } = await response.json();
          alert(`Error: ${error}`);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
      }
    });
  });


  
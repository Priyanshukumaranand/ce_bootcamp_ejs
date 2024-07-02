const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

const rollIdPattern = /^b52\d{4}$/;
const emailIdPattern=

document.querySelector(".sign-in-form").addEventListener("submit", function(event){
  const rollId = document.querySelector("#roll-id-sign-in").value;
  if (!rollIdPattern.test(rollId)) {
    alert("Invalid Roll ID. It should be in the format b52XXXX.");
    event.preventDefault();
  }
});

document.querySelector(".sign-up-form").addEventListener("submit", function(event) {
  const rollId = document.querySelector("#roll-id-sign-up").value;
  if (!rollIdPattern.test(rollId)) {
    alert("Invalid Roll ID. It should be in the format b52XXXX.");
    event.preventDefault();
  }
});

// const sign_in_btn = document.querySelector("#sign-in-btn");
// const sign_up_btn = document.querySelector("#sign-up-btn");
// const container = document.querySelector(".container");
const google_signin1=document.querySelector(".login-with-google-btn");
const google_signin2=document.querySelector(".login-with-google-btn");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

function Redirect() {
  window.location = "/Auth/google";
   }
google_signin1.addEventListener("click",()=>{
  Redirect();
});
google_signin2.addEventListener("click",()=>{
  Redirect();
});


const sendOTPBtn = document.getElementById('sendOTPBtn');
const otpInput = document.getElementById('otpInput');
const emailInput = document.getElementById('email-id');

const emailPattern = /^b52\d{4}@iiit-bh.ac.in$/;

sendOTPBtn.addEventListener('click', async () => {
  try {
    const email = emailInput.value;

    if (!emailPattern.test(email)) {
      alert("Invalid email. It should be in the format b52XXXX@iiit-bh.ac.in.");
      return;
    }

    const response = await fetch('/generate-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (response.ok) {
      const { otp } = await response.json();
      // console.log('OTP:', otp);
      // Display the OTP input field
      otpInput.classList.remove('hidden');
    } else {
      console.error('Error generating OTP:', response.status);
    }
  } catch (error) {
    console.error('Error:', error);
  }
});

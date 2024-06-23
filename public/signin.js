




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

document.querySelector("#sign-in-form").addEventListener("submit", function(event) {
  const rollId = document.querySelector("#roll-id-sign-in").value;
  if (!rollIdPattern.test(rollId)) {
    alert("Invalid Roll ID. It should be in the format b52XXXX.");
    event.preventDefault();
  }
});

document.querySelector("#sign-up-form").addEventListener("submit", function(event) {
  const rollId = document.querySelector("#roll-id-sign-up").value;
  if (!rollIdPattern.test(rollId)) {
    alert("Invalid Roll ID. It should be in the format b52XXXX.");
    event.preventDefault();
  }
});

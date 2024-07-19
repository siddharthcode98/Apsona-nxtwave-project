let formContainer = document.getElementById("form-container");
let userLogin = document.getElementById("userlogin");
formContainer.addEventListener("submit", async (e) => {
  e.preventDefault();
  let userName = document.getElementById("username");
  let userPassword = document.getElementById("userpassword");
  let providedUserName = userName.value;
  let providedPassword = userPassword.value;
  const res = await fetch("/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ providedUserName, providedPassword }),
  });
  const data = await res.json();
  console.log(data);
  if (res.ok) {
    console.log(data.title);
    userLogin.style.display = "none";
    window.location.href = "/noteapp";
  } else {
    const errorElement = document.createElement("p");
    errorElement.innerHTML = data.title;
    errorElement.classList.add("error-style");
    formContainer.appendChild(errorElement);
  }
});

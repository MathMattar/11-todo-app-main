const switchButton = document.getElementById("switch");
const iconThema = document.getElementById("iconThema");

switchButton.addEventListener("click", () => {
  document.body.classList.toggle("switch");
  document.body.classList.toggle("light-mode");

  if (document.body.classList.contains("switch")) {
    iconThema.src = "./assets/images/icon-moon.svg";
    iconThema.alt = "Moon icon";
  } else {
    iconThema.src = "./assets/images/icon-sun.svg";
    iconThema.alt = "Sun icon";
  }
});

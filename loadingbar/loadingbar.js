import { animate } from "https://cdn.jsdelivr.net/npm/motion@12.16.0/+esm";

const splash = document.getElementById("splash");
const progressBar = document.getElementById("progressBar");
const reloadButton = document.getElementById("reloadButton");

function playSplashAnimation(){
  splash.style.opacity = "1";
  splash.style.display = "block";
  progressBar.style.width = "0%";

  animate(progressBar, { width: ["0%", "100%"] }, { duration: 2.5, easing: "ease-in-out" });

  setTimeout(() => {
  animate(splash, { opacity: 0 }, { duration: 0.5 }).finished.then(() => {
    reloadButton.classList.remove("hidden", "opacity-0");
    reloadButton.classList.add("clear-left", "opacity-100");
  });
}, 3000);
}

playSplashAnimation();

reloadButton.addEventListener("click", () => {
  reloadButton.classList.add("hidden");
  reloadButton.classList.remove("clear-left");
  playSplashAnimation();
});

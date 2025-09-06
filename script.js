// Year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Audio player logic
const audio = document.getElementById("player");
const buttons = document.querySelectorAll(".reel-buttons button");
let currentBtn = null;

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const track = btn.dataset.track;

    // If same button clicked again: pause/stop
    if (currentBtn === btn) {
      if (!audio.paused) {
        audio.pause();
        btn.classList.remove("playing");
      } else {
        audio.play();
        btn.classList.add("playing");
      }
    } else {
      // New track
      if (currentBtn) currentBtn.classList.remove("playing");
      currentBtn = btn;
      audio.src = track;
      audio.play();
      btn.classList.add("playing");
    }
  });
});

// When track ends, reset button
audio.addEventListener("ended", () => {
  if (currentBtn) currentBtn.classList.remove("playing");
  currentBtn = null;
});

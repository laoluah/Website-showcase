// Year in footer
document.getElementById("year").textContent = new Date().getFullYear();

const audio = document.getElementById("player");
const buttons = document.querySelectorAll(".reel-card");
let currentBtn = null;

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const track = btn.dataset.track;

    // If same button clicked again, toggle play/pause
    if (currentBtn === btn) {
      if (!audio.paused) {
        audio.pause();
        btn.classList.remove("playing");
      } else {
        audio.play();
        btn.classList.add("playing");
      }
    } else {
      // Stop old button highlight
      if (currentBtn) currentBtn.classList.remove("playing");

      // Load new track
      currentBtn = btn;
      audio.src = track;
      audio.play();

      btn.classList.add("playing");
    }
  });
});

// When audio finishes, reset button state
audio.addEventListener("ended", () => {
  if (currentBtn) currentBtn.classList.remove("playing");
  currentBtn = null;
});

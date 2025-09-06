// Year in footer
document.getElementById("year").textContent = new Date().getFullYear();

const audio = document.getElementById("player");
const buttons = document.querySelectorAll(".reel-card");
let currentBtn = null;

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const track = btn.dataset.track;

    // Toggle if same button clicked
    if (currentBtn === btn) {
      if (!audio.paused) {
        audio.pause();
        btn.classList.remove("playing");
      } else {
        audio.play();
        btn.classList.add("playing");
      }
    } else {
      // Stop old button
      if (currentBtn) currentBtn.classList.remove("playing");

      // Load and play new track
      currentBtn = btn;
      audio.src = track;
      audio.play();
      btn.classList.add("playing");
    }
  });
});

// Reset highlight when finished
audio.addEventListener("ended", () => {
  if (currentBtn) currentBtn.classList.remove("playing");
  currentBtn = null;
});

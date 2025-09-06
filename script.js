// ===== Audio Playback & Progress =====
document.querySelectorAll(".audio-card").forEach(card => {
  const playBtn = card.querySelector(".play-button");
  const progressBar = card.querySelector(".progress-bar");
  const timeLabel = card.querySelector(".time");
  const audio = new Audio(card.dataset.src);
  let isPlaying = false;

  playBtn.addEventListener("click", () => {
    if (isPlaying) {
      audio.pause();
    } else {
      // Pause any other playing audio
      document.querySelectorAll(".audio-card").forEach(c => {
        if (c !== card && c.audioInstance) {
          c.audioInstance.pause();
        }
      });
      audio.play();
    }
  });

  audio.addEventListener("play", () => {
    isPlaying = true;
    card.audioInstance = audio; // store reference
    playBtn.innerHTML = `<i class="fas fa-pause"></i>`;
  });

  audio.addEventListener("pause", () => {
    isPlaying = false;
    playBtn.innerHTML = `<i class="fas fa-play"></i>`;
  });

  audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
      const pct = (audio.currentTime / audio.duration) * 100;
      progressBar.style.width = pct + "%";
      timeLabel.textContent =
        formatTime(audio.currentTime) + " / " + formatTime(audio.duration);
    }
  });
});

function formatTime(seconds) {
  if (isNaN(seconds)) return "00:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

// ===== Tab Filtering =====
const tabs = document.querySelectorAll(".tab-button");
const cards = document.querySelectorAll(".audio-card");

tabs.forEach(btn => {
  btn.addEventListener("click", () => {
    tabs.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const category = btn.dataset.tab;
    cards.forEach(card => {
      card.style.display =
        category === "all" || card.dataset.category === category
          ? "block"
          : "none";
    });
  });
});

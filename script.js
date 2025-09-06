// ===== Mobile Nav Toggle =====
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

// ===== Audio Player Logic =====
document.querySelectorAll(".audio-player").forEach(player => {
  const playButton = player.querySelector(".play-button");
  const progressContainer = player.querySelector(".progress-container");
  const progressBar = player.querySelector(".progress-bar");
  const timeDisplay = player.querySelector(".time");
  const volumeButton = player.querySelector(".volume-button");
  const volumeSlider = player.querySelector(".volume-slider");
  const volumeProgress = player.querySelector(".volume-progress");

  const audio = new Audio(player.dataset.src);

  let isPlaying = false;

  // Play / Pause
  playButton.addEventListener("click", () => {
    if (isPlaying) {
      audio.pause();
    } else {
      // Pause all other players
      document.querySelectorAll("audio").forEach(a => a.pause());
      audio.play();
    }
  });

  audio.addEventListener("play", () => {
    isPlaying = true;
    playButton.innerHTML = `<i class="fas fa-pause"></i>`;
  });

  audio.addEventListener("pause", () => {
    isPlaying = false;
    playButton.innerHTML = `<i class="fas fa-play"></i>`;
  });

  // Update progress
  audio.addEventListener("timeupdate", () => {
    const percent = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = percent + "%";
    timeDisplay.textContent =
      formatTime(audio.currentTime) + " / " + formatTime(audio.duration);
  });

  // Seek
  progressContainer.addEventListener("click", e => {
    const rect = progressContainer.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audio.currentTime = percent * audio.duration;
  });

  // Volume
  volumeButton.addEventListener("click", () => {
    audio.muted = !audio.muted;
    volumeButton.innerHTML = audio.muted
      ? `<i class="fas fa-volume-mute"></i>`
      : `<i class="fas fa-volume-up"></i>`;
  });

  volumeSlider.addEventListener("click", e => {
    const rect = volumeSlider.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audio.volume = percent;
    volumeProgress.style.width = percent * 100 + "%";
  });
});

// Format time helper
function formatTime(seconds) {
  if (isNaN(seconds)) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

// ===== Tab Switching =====
const tabButtons = document.querySelectorAll(".tab-button");
const audioCards = document.querySelectorAll(".audio-card");

tabButtons.forEach(button => {
  button.addEventListener("click", () => {
    // Reset active state
    tabButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const tab = button.dataset.tab;

    if (tab === "all") {
      audioCards.forEach(card => card.style.display = "block");
    } else {
      audioCards.forEach(card => {
        card.style.display =
          card.dataset.category === tab ? "block" : "none";
      });
    }
  });
});

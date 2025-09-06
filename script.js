// Play / Pause and Progress
document.querySelectorAll(".audio-card").forEach(card => {
  const button = card.querySelector(".play-button");
  const bar = card.querySelector(".progress-bar");
  const time = card.querySelector(".time");
  const audio = new Audio(card.dataset.src);

  let isPlaying = false;

  button.addEventListener("click", () => {
    if (isPlaying) {
      audio.pause();
    } else {
      document.querySelectorAll("audio").forEach(a => a.pause());
      audio.play();
    }
  });

  audio.addEventListener("play", () => {
    isPlaying = true;
    button.innerHTML = `<i class="fas fa-pause"></i>`;
  });

  audio.addEventListener("pause", () => {
    isPlaying = false;
    button.innerHTML = `<i class="fas fa-play"></i>`;
  });

  audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
      const percent = (audio.currentTime / audio.duration) * 100;
      bar.style.width = percent + "%";
      time.textContent = formatTime(audio.currentTime) + " / " + formatTime(audio.duration);
    }
  });
});

function formatTime(sec) {
  if (isNaN(sec)) return "00:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
}

// Tabs
const tabs = document.querySelectorAll(".tab-button");
const cards = document.querySelectorAll(".audio-card");

tabs.forEach(btn => {
  btn.addEventListener("click", () => {
    tabs.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const cat = btn.dataset.tab;
    cards.forEach(c => {
      c.style.display = (cat === "all" || c.dataset.category === cat) ? "block" : "none";
    });
  });
});

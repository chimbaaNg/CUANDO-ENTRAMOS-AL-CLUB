const audio = document.getElementById("audio");
const playPauseBtn = document.getElementById("playPauseBtn");
const tiempoAudio = document.getElementById("tiempo-audio");

playPauseBtn.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        playPauseBtn.textContent = "⏸️";
    } else {
        audio.pause();
        playPauseBtn.textContent = "▶️";
    }
});

audio.addEventListener("timeupdate", () => {
    const minActual = Math.floor(audio.currentTime / 60);
    const secActual = Math.floor(audio.currentTime % 60).toString().padStart(2, "0");

    const minTotal = Math.floor(audio.duration / 60) || 0;
    const secTotal = Math.floor(audio.duration % 60).toString().padStart(2, "0");

    tiempoAudio.textContent = `${minActual}:${secActual} / ${minTotal}:${secTotal}`;
});

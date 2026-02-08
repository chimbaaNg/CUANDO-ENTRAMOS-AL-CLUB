// ===========================
// VARIABLES PRINCIPALES
// ===========================
const slides = document.querySelectorAll("#slider .slide"); // Todas las imágenes del slider
const contadorDias = document.getElementById("dias");
const contadorHoras = document.getElementById("horas");
const contadorMinutos = document.getElementById("minutos");
const contadorSegundos = document.getElementById("segundos");
const playPauseBtn = document.getElementById("play-pause");
const audio = document.getElementById("audio");
const logoTitulo = document.getElementById("logo-titulo");
const presaveBtn = document.getElementById("boton-presave");
const audioPresave = document.getElementById("audio-presave");

// ===========================
// SLIDER AUTOMÁTICO CON FADE
// ===========================
let slideIndex = 0;

function mostrarSlide() {
    slides.forEach((slide, i) => {
        slide.style.opacity = "0"; // oculta todas
        slide.style.position = "absolute";
    });
    slides[slideIndex].style.opacity = "1"; // muestra la actual
    slides[slideIndex].style.position = "relative";
    slideIndex++;
    if (slideIndex >= slides.length) slideIndex = 0;
}

// Cambia de imagen cada 4 segundos
setInterval(mostrarSlide, 2000);

// Muestra la primera imagen al cargar
mostrarSlide();

// ===========================
// CUENTA ATRÁS DINÁMICA
// ===========================
// Cambia esta fecha a la de lanzamiento de la canción
const fechaLanzamiento = new Date("2026-02-13T12:00:00").getTime();

function actualizarCuentaAtras() {
    const ahora = new Date().getTime();
    let distancia = fechaLanzamiento - ahora;

    if (distancia < 0) distancia = 0; // No bajar de 0

    const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

    contadorDias.textContent = dias.toString().padStart(2, "0");
    contadorHoras.textContent = horas.toString().padStart(2, "0");
    contadorMinutos.textContent = minutos.toString().padStart(2, "0");
    contadorSegundos.textContent = segundos.toString().padStart(2, "0");

}

setInterval(actualizarCuentaAtras, 1000);
actualizarCuentaAtras();


// ===========================
// DESBLOQUEO DEL PRESAVE
// ===========================
audio.addEventListener("ended", () => {
    presaveBtn.classList.remove("bloqueado");
    presaveBtn.classList.add("desbloqueado");
    presaveBtn.style.cursor = "pointer"; // cambiar cursor
});

// SUPONIENDO que tu audio principal está controlado y al terminar se desbloquea:
function desbloquearPresave() {
    presaveBtn.classList.add("desbloqueado");
    presaveBtn.classList.remove("bloqueado");
    presaveBtn.style.cursor = "pointer";
}

// CLICK BOTÓN PRESAVE
presaveBtn.addEventListener("click", (e) => {
    // solo funciona si está desbloqueado
    if (presaveBtn.classList.contains("desbloqueado")) {
        e.preventDefault(); // evita abrir enlace antes de sonido si quieres
        audioPresave.currentTime = 0;
        audioPresave.play();
        // si quieres, luego redirige al link
        window.open(presaveBtn.href, "_blank");
    } else {
        e.preventDefault(); // bloqueado → no hace nada
    }
});



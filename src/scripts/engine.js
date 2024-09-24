const pianoKeys = document.querySelectorAll(".piano-keys .key");
const volumeSlider = document.querySelector(".volume-slider input");
const keysCheck = document.querySelector(".keys-check input");

let mapedKeys = [];
let audio = new Audio();

// Função para ativar a tecla visualmente
const activateKey = (key) => {
  const clickedKey = document.querySelector(`[data-key="${key}"]`);
  clickedKey.classList.add("active");
  setTimeout(() => {
    clickedKey.classList.remove("active");
  }, 150);
};

// Função para tocar a música
const playTune = (key) => {
  audio.src = `src/tunes/${key}.wav`;
  audio.currentTime = 0; // Reinicia o áudio se já estiver tocando
  audio.play();
  activateKey(key);
};

// Mapeia as teclas e configura eventos
pianoKeys.forEach((key) => {
  key.addEventListener("click", () => playTune(key.dataset.key));
  mapedKeys.push(key.dataset.key);
});

// Adiciona o evento de teclado
document.addEventListener("keydown", (e) => {
  if (mapedKeys.includes(e.key)) {
    playTune(e.key);
  }
});

// Controla o volume
const savedVolume = localStorage.getItem("piano-volume");
if (savedVolume) {
  volumeSlider.value = savedVolume;
  audio.volume = savedVolume;
}

const handleVolume = (e) => {
  audio.volume = e.target.value;
  localStorage.setItem("piano-volume", e.target.value);
};

// Mostra/oculta as teclas
const showHideKeys = () => {
  pianoKeys.forEach((key) => key.classList.toggle("hide"));
};

// Adiciona eventos
volumeSlider.addEventListener("input", handleVolume);
keysCheck.addEventListener("click", showHideKeys);

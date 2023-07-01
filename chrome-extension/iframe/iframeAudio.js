let sounds = {};
window.addEventListener("message", (event) => {
  if (event.data.message === "setup") {
    const soundUrls = event.data.sounds;
    for (const score in soundUrls) {
      sounds[score] = { score: score, audio: new Audio(soundUrls[score]) };
    }
    // console.log(sounds);
  } else if (event.data.message === "score") {
    pauseSounds();
    let score = event.data.score;
    if (sounds[score].audio.readyState != 0) {
      sounds[score].audio.play();
    }
  }
});

function pauseSounds() {
  for (const score in sounds) {
    if (sounds[score].audio.readyState != 0) {
      sounds[score].audio.pause();
      sounds[score].audio.currentTime = 0;
    }
  }
}

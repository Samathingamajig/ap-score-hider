let sounds = {};
window.addEventListener('message', (event) => {
    if (event.data.message === "setup"){
        const soundUrls = event.data.sounds
        for (const score in soundUrls) {
            sounds[score] = {score: score, audio: new Audio(soundUrls[score])}
        }
        console.log(sounds)
    }
    else if (event.data.message === "score"){
        pauseSounds()
        let score = event.data.score;
        sounds[score].audio.play()
    }
});

function pauseSounds(){
    for (const score in sounds){
        sounds[score].audio.pause()
    }
}

let sound = null;
window.addEventListener('message', (event) => {
    if (sound) sound.pause() // pause the sound if another one is already playing
    sound = new Audio(event.data) // create a sound object
    sound.play() // play the sound
}, {once: true});
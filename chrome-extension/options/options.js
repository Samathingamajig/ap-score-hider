// Function to get sounds array from Chrome storage
function getSoundsFromStorage(callback) {
    chrome.storage.sync.get("sounds", function (result) {
        callback(result.sounds || []);
    });
}

// Function to get selected sounds object from Chrome storage
function getSelectedSoundsFromStorage(callback) {
    chrome.storage.sync.get("selectedSounds", function (result) {
        callback(result.selectedSounds || {});
    });
}

// Function to save selected sounds to Chrome storage
function saveSelectedSoundsToStorage(selectedSounds) {
    chrome.storage.sync.set({ selectedSounds: selectedSounds });
}
// Function to fill in select elements with sound titles
function fillSelectElements() {
    const soundSelects = document.querySelectorAll(".song-select");

    // Get sounds from storage
    getSoundsFromStorage(function (sounds) {
        // Get selected sounds from storage
        getSelectedSoundsFromStorage(function (selectedSounds) {
            // Loop through each select element
            soundSelects.forEach(function (selectElement) {
                // Clear previous options
                selectElement.innerHTML = "";

                // Add default sounds
                const defaultOpt = document.createElement("option");
                defaultOpt.value = getDefaultSound(selectElement.id).URL;
                defaultOpt.text = getDefaultSound(selectElement.id).title;
                selectElement.appendChild(defaultOpt);

                // Add sound titles as options
                sounds.forEach(function (sound) {
                    const option = document.createElement("option");
                    option.value = sound.URL;
                    option.text = sound.title;
                    selectElement.appendChild(option);
                });

                // Set the selected option based on stored selection or default sound
                selectElement.value = selectedSounds[selectElement.id] || getDefaultSound(selectElement.id).URL;
            });
        });
    });
}

// Function to get the default sound URL based on score number (using royalty free, free to use sounds from pixabay)
function getDefaultSound(scoreNumber) {
    if (scoreNumber === "s1" || scoreNumber === "s2") {
        return {URL: "https://cdn.pixabay.com/download/audio/2021/08/04/audio_c003cb2711.mp3", title: "Sad Trombone"};
    } else {
        return {URL: "https://cdn.pixabay.com/download/audio/2022/03/24/audio_7c345b1d9d.mp3", title: "Yay!"};
    }
}

// Function to validate URL and add sound to the songs array
function addSound() {
    const soundURLInput = document.getElementById("sound-url");
    const soundTitleInput = document.querySelector("table input[type='text']");

    const soundURL = soundURLInput.value.trim();
    const soundTitle = soundTitleInput.value.trim();

    // Check if URL ends with an audio format
    if (soundURL.match(/\.(mp3|wav|ogg)$/i)) {
        // Get sounds array from storage
        getSoundsFromStorage(function (sounds) {
            // Add new sound object to sounds array
            sounds.push({ title: soundTitle, URL: soundURL });

            // Save updated sounds array to storage
            chrome.storage.sync.set({ sounds: sounds });

            // Refresh the page
            location.reload();
        });
    } else {
        // Display error message for invalid URL format
        alert("Invalid sound URL! Please provide a direct link to an audio file (MP3, WAV, or OGG format).");
    }
}

// Function to handle song selection change event
function handleSongSelectionChange(event) {
    const selectElement = event.target;

    // Get selected sounds from storage
    getSelectedSoundsFromStorage(function (selectedSounds) {
        // Update the selected sound for the corresponding score
        selectedSounds[selectElement.id] = selectElement.value;

        // Save updated selected sounds to storage
        saveSelectedSoundsToStorage(selectedSounds);
    });
}

// Event listener for "Import sound" button click
document.getElementById("import-btn").addEventListener("click", addSound);

// Event listener for song select element change
document.querySelectorAll(".song-select").forEach(function (selectElement) {
    selectElement.addEventListener("change", handleSongSelectionChange);
});

// Call the function to fill select elements with sound titles
fillSelectElements();


let soundEffect = null;
// Function to handle play button click event
function handlePlayButtonClick(event) {
    const row = event.target.closest("tr");
    const selectElement = row.querySelector("select.song-select");

    const selectedSoundUrl = selectElement.value;

    if (selectedSoundUrl) {
        if (soundEffect) soundEffect.pause()
        soundEffect = new Audio(selectedSoundUrl)
        soundEffect.play()
    } else {
        alert("Please select a sound before playing.");
    }
}

// Event listener for play button click
document.querySelectorAll(".play-button").forEach(function (button) {
    button.addEventListener("click", handlePlayButtonClick);
});

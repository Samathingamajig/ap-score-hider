const defaultSelected = {
    "1" : "0",
    "2" : "0",
    "3" : "1",
    "4" : "1",
    "5" : "1",
}

const defaultSoundList = [
    {URL: "https://cdn.pixabay.com/download/audio/2021/08/04/audio_c003cb2711.mp3", title: "Sad Trombone", id: "0"},
    {URL: "https://cdn.pixabay.com/download/audio/2022/03/24/audio_7c345b1d9d.mp3", title: "Yay!", id: "1"}
]

function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// Function to get sounds array from Chrome storage
function getSoundsFromStorage(callback) {
    chrome.storage.local.get("sounds", function (result) {
        if (!result.sounds) chrome.storage.local.set({"sounds": defaultSoundList})
        callback(result.sounds || defaultSoundList);
    });
}

// Function to get selected sounds object from Chrome storage
function getSelectedSoundsFromStorage(callback) {
    chrome.storage.local.get("selectedSounds", function (result) {
        if (!result.selectedSounds) chrome.storage.local.set({"selectedSounds": defaultSelected})
        callback(result.selectedSounds || defaultSelected);
    });
}

// Function to save selected sounds to Chrome storage
function saveSelectedSoundsToStorage(selectedSounds) {
    chrome.storage.local.set({ selectedSounds: selectedSounds });
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

                // Add "None" option
                const noneOption = document.createElement("option");
                noneOption.value = null;
                noneOption.text = "None";
                selectElement.appendChild(noneOption);

                // Add sound titles as options
                sounds.forEach(function (sound) {
                    const option = document.createElement("option");
                    option.value = sound.id;
                    option.dataset.url = sound.URL
                    option.text = sound.title;
                    selectElement.appendChild(option);
                });

                // Set the selected option based on stored selection or default sound
                selectElement.value = selectedSounds[selectElement.id] || getDefaultSound(selectElement.id)
            });
        });
    });
}

// Function to get the default sound URL based on score number (using royalty free, free to use sounds from pixabay)
function getDefaultSound(scoreNumber) {
    if (scoreNumber == "1" || scoreNumber == "2") {
        return "0";
    } else {
        return "1";
    }
}

async function addLocalSound(){
    const soundTitleInput = document.querySelector("table input[type='text']");
    const soundTitle = soundTitleInput.value.trim();
    chrome.storage.local.get({savedAudio: null}, function (result){
        if (result.savedAudio) {
            getSoundsFromStorage(function (sounds){
                sounds.push({ title: soundTitle, URL: result.savedAudio, id: generateUUID()});
                chrome.storage.local.set({ sounds: sounds });
                chrome.storage.local.remove("savedAudio")
                location.reload();
            })
        }
    })

}

function handleAdd(){
    chrome.storage.local.get({localSave: false}, function (result){
        if (result.localSave === true){
            addLocalSound()
        }
        else {
            addSound()
        }
    })
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
            sounds.push({ title: soundTitle, URL: soundURL, id: generateUUID()});

            // Save updated sounds array to storage
            chrome.storage.local.set({ sounds: sounds });

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
document.getElementById("import-btn").addEventListener("click", handleAdd);

// Event listener for song select element change
document.querySelectorAll(".song-select").forEach(function (selectElement) {
    selectElement.addEventListener("change", handleSongSelectionChange);
});

// Call the function to fill select elements with sound titles
fillSelectElements();

function getObjWithId(array, id){
    for (let obj of array){
        if (obj.id === id){
            return obj
        }
    }
}

let soundEffect = null;
// Function to handle play button click event
function handlePlayButtonClick(event) {
    const row = event.target.closest("tr");
    const selectElement = row.querySelector("select.song-select");

    getSoundsFromStorage(function (sounds){
        const selectedSoundUrl = getObjWithId(sounds, selectElement.value).URL;

        if (selectedSoundUrl) {
            if (soundEffect) soundEffect.pause()
            soundEffect = new Audio(selectedSoundUrl)
            soundEffect.play()
        } else {
            alert("Please select a sound before playing.");
        }
    })
}

function handleFileUpload(event) {
    document.getElementById("sound-url").disabled = true
    var file = event.target.files[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function(e) {
            // Save the audio file to chrome.storage.local
            chrome.storage.local.set({savedAudio: e.target.result});
            chrome.storage.local.set({localSave: true})
            document.getElementById("upload-label").innerText = "File Uploaded!"
        };
        reader.readAsDataURL(file);
    }
}

document.getElementById('audioFile').addEventListener('change', (e) => handleFileUpload(e))


function fillDeleteSoundsTable() {
    const deleteSoundsTable = document.getElementById("deleteSounds");

    // Get sounds from storage
    getSoundsFromStorage(function (sounds) {
        if (sounds.length > 2) {
            // Add sound rows
            sounds.forEach(function (sound, index) {
                if (sound.id == "1" || sound.id == "0") return;
                const row = deleteSoundsTable.insertRow();
                const soundCell = row.insertCell();
                const deleteCell = row.insertCell();
                soundCell.textContent = sound.title;

                const deleteButton = document.createElement("button");
                deleteButton.textContent = "Delete";
                deleteButton.addEventListener("click", function () {
                    getSoundsFromStorage(function (sounds) {
                        // Remove the sound from the sounds array
                        getObjWithId(sounds, sound.id)
                        sounds.splice(index, 1); // this is not a problem because we refresh the page anytime we delete or add a sound

                        // Save updated sounds array to storage
                        chrome.storage.local.set({sounds: sounds});

                        // Refresh the table
                        location.reload()
                    })
                });

                deleteCell.appendChild(deleteButton);
            });
            const row = deleteSoundsTable.insertRow()
            const cell = row.insertCell()
            cell.insertAdjacentHTML("afterbegin", `<button id="deleteAll">Delete All Sounds</button><br><p><strong>Warning: this is permanent</strong></p>`)
            document.getElementById("deleteAll").addEventListener("click", function () {
                chrome.storage.local.set({"sounds": defaultSoundList})
                location.reload()
            })
            document.getElementById("delete-div").style.display = "block"
        }
    });
}

// Call the function to populate the delete sounds table
fillDeleteSoundsTable();

// Event listener for play button click
document.querySelectorAll(".play-button").forEach(function (button) {
    button.addEventListener("click", handlePlayButtonClick);
});

// Get the URL parameters
const urlParams = new URLSearchParams(window.location.search);

// Check if the "justInstalled" parameter exists and its value is "true"
if (urlParams.has('justInstalled') && urlParams.get('justInstalled') === 'true'){
    document.getElementById("installThanks").style.display = "block"
}

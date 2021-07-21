// ==UserScript==
// @name         AP Score Hider
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  try to take over the world!
// @author       Samathingamajig
// @match        https://apscore.collegeboard.org/scores/view-your-scores*
// @icon         https://www.google.com/s2/favicons?domain=collegeboard.org
// @grant        none
// @require      https://cdn.jsdelivr.net/npm/canvas-confetti@1.4.0/dist/confetti.browser.min.js
// ==/UserScript==

(function () {
    "use strict";

    // Grab all of the boxes that contain scores
    const containers = document.querySelectorAll(".year-exams-container .row-fluid.item .span5:nth-child(2) span");

    for (const container of containers) {
        const scoreEm = container.querySelector("em"); // Grab the text box that holds the score number
        scoreEm.hidden = true; // Hide the score number
        container.style.cursor = "pointer"; // Makes the mouse display a pointer when you hover over the place the score should be

        const clickListener = (e) => {
            const score = parseInt(scoreEm.innerText); // Get the score as a number (not a string)
            if (score >= 3) {
                const { left, top } = container.getBoundingClientRect();

                // Display confetti if score is >= 3, and the higher the score, the more confetti.
                // This function comes from the `@require` section in the top of this file
                window.confetti({
                    particleCount: 400 * [0.25, 0.5, 1][score - 3],
                    spread: 160,
                    startVelocity: 50 * [0.6, 0.8, 1][score - 3],
                    origin: {
                        x: (left + container.offsetWidth / 2) / window.innerWidth,
                        y: (top + container.offsetHeight / 2) / window.innerHeight,
                    },
                });
            }
            scoreEm.hidden = false; // Show the score number
            container.style.cursor = ""; // Don't show a pointer on hover anymore
            container.removeEventListener("click", clickListener); // Delete the click listener so confetti doesn't show multiple times
        };
        container.addEventListener("click", clickListener); // Listen for a "click" event on each container in this loop
    }
})();

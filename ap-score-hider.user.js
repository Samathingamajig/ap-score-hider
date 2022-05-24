// ==UserScript==
// @name         AP Score Hider
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Hides AP Exam scores on the College Board website until you click on them. As a bonus, display confetti when you click on a passing exam.
// @author       Samathingamajig
// @match        https://apstudents.collegeboard.org/view-scores*
// @icon         https://www.google.com/s2/favicons?domain=collegeboard.org
// @grant        none
// @require      https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js
// ==/UserScript==

(async function () {
  "use strict";

  // Grab all of the boxes that contain scores
  document.body.style.opacity = "0%";
  let ccontainers = [];
  while ((ccontainers = document.querySelectorAll(".apscores-card-col-left.display-flex")).length == 0) {
    await new Promise((res) => setTimeout(res, 10));
  } // Wait for page to load
  document.body.style.opacity = "100%";

  for (const ccontainer of ccontainers) {
    const container = ccontainer.querySelector(".apscores-badge.apscores-badge-score");
    if (!container) continue; // Might've accidentally selected an award
    const scoreEm = container.childNodes[1]; // Grab the text box that holds the score number
    ccontainer.style.opacity = "0%"; // Hide the score number
    ccontainer.style.cursor = "pointer"; // Makes the mouse display a pointer when you hover over the place the score should be

    const clickListener = (e) => {
      const score = parseInt(scoreEm.nodeValue); // Get the score as a number (not a string)
      if (score >= 3) {
        const { left, top } = ccontainer.getBoundingClientRect();

        // Display confetti if score is >= 3, and the higher the score, the more confetti.
        // This function comes from the `@require` section in the top of this file
        window.confetti({
          particleCount: 400 * [0.25, 0.5, 1][score - 3],
          spread: 160,
          startVelocity: 50 * [0.6, 0.8, 1][score - 3],
          origin: {
            x: (left + ccontainer.offsetWidth / 2) / window.innerWidth,
            y: (top + ccontainer.offsetHeight / 2) / window.innerHeight,
          },
        });
      }
      ccontainer.style.opacity = "100%"; // Show the score number
      ccontainer.style.cursor = ""; // Don't show a pointer on hover anymore
      ccontainer.removeEventListener("click", clickListener); // Delete the click listener so confetti doesn't show multiple times
    };
    ccontainer.addEventListener("click", clickListener); // Listen for a "click" event on each container in this loop
  }
})();

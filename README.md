# AP® Score Hider

You spend hundreds of hours in classes and even more doing homework, yet your reward for taking an AP® Exam is a single digit. Even worse, once you go to your scores page it shows them all at once, which is very anticlimactic. Introducing AP® Score Hider. With this extension, all of your exam scores are hidden until you click on the box containing the score. If you get a 3, 4, or 5, confetti blasts off. The higher the score, the more confetti.

A highly requested feature was sound effects upon revealing a score, so we have that too\*. On the options page, which opens upon installation or clicking the icon, you can customize which sound effect plays for each score, 1-5. We've provided some defaults, but you can either disable sound effects or add your own via a URL or a direct file upload (which never gets uploaded to the internet).

This extension/userscript only runs on the webpage for viewing scores, we can't see your password or any other sensitive info, and we don't keep track of your scores. It just hides the scores until they're clicked on, plus the bonus features of confetti and sound effects\*.

\* = Sound effects and their customization are only available with the Chrome extension version, not the userscript, at least for now

## 🎥 Demo

- Note: The sidebar of scores (example: "Most U.S. colleges accept your score for credit and placement.") is now hidden and the whole score box is clickable, I'm just too lazy to remake the demo.

<p align="center">
  <a href="demo-1.2.1.gif">
    <img src="demo-1.2.1.gif" />
  </a>
</p>

## ⚡️ Is this a virus?

Nope! Anyone that understands basic English can understand the script.

The code:

- 🔓 is 100% open source (because it needs to be so you can install it)
- 🔍 has very detailed comments on almost each line
- 🔒 only runs on the specific AP® Scores page
- 📶 makes no network requests
- 👨‍💻️ is written in JavaScript
- 💻 can't do anything to your computer

## 📜 Installation

## Option 1: Chrome extension from the Chrome Web Store (recommended)

Download the Chrome extension from the Chrome Web Store: https://chrome.google.com/webstore/detail/ap%C2%AE-score-hider/jfeofgolbklfnkjdogghbmbgnonkgace

## Option 2: Userscript

- Install Tampermonkey from the [Chrome Web Store](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) (or [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/))
- After this, you have two options (only do one of these):
  - **GreasyFork** _(recommended)_: Go to the [GreasyFork page](https://greasyfork.org/en/scripts/429680-ap-score-hider) and click the green "Install this script" button. This will take you to a page on Tampermonkey where you need to click "Install" to install the script.
  - **GitHub/Manual install** _(not recommended)_: Go to the [raw script page](https://raw.githubusercontent.com/Samathingamajig/ap-score-hider/main/ap-score-hider.user.js). Tampermonkey will automatically detect this file as a userscript (since the file is named `*.user.js`), so click the "Install" button to install it. If it doesn't, copy the entire contents of the script into the Tampermonkey script editor (**make sure you save**).
  - If none of these work, look up how to install a Tampermonkey userscript.
 
## Option 3: Manual installation as a Chrome extension

- Download this git repository
- In a new tab, open `chrome://extensions`
- In the top right, toggle "Developer mode" to on
- In the top left, select "Load unpacked" and select the folder "chrome-extension" (the folder that contains the manifest.json file) from this repo

## 🚫 Uninstallation

If you don't want to use this extension/script anymore, you can uninstall it anytime.

If you installed the Chrome extension, just go to `chrome://extensions` and click "Remove" on the AP® Score Hider card.

If you installed the userscript with Tampermonkey,

- Navigate to the Tampermonkey dashboard (click the extension icon in the top right, then click "Dashboard" at the bottom of the popup)
- Click the trashcan on the right side of the page

AP® is a trademark registered by the College Board, which is not affiliated with, and does not endorse, this product.

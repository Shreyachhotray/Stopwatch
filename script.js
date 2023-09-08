// script.js
let isRunning = false;
let startTime;
let interval;

const display = document.getElementById("display");
const startPauseButton = document.getElementById("startPause");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");
const lapsList = document.getElementById("laps");

startPauseButton.addEventListener("click", toggleStartPause);
resetButton.addEventListener("click", reset);
lapButton.addEventListener("click", recordLap);

function toggleStartPause() {
    if (isRunning) {
        clearInterval(interval);
        isRunning = false;
        startPauseButton.textContent = "Start";
    } else {
        if (!startTime) {
            startTime = new Date().getTime();
        }
        interval = setInterval(updateTime, 10);
        isRunning = true;
        startPauseButton.textContent = "Pause";
    }
}

function updateTime() {
    const currentTime = new Date().getTime();
    const elapsedTime = new Date(currentTime - startTime);
    const timeString = elapsedTime.toISOString().substr(11, 8);
    display.textContent = timeString;
}

function reset() {
    clearInterval(interval);
    isRunning = false;
    startTime = null;
    display.textContent = "00:00:00";
    startPauseButton.textContent = "Start";
    lapsList.innerHTML = "";
}

function recordLap() {
    if (isRunning) {
        const lapTime = display.textContent;
        const lapItem = document.createElement("li");
        lapItem.textContent = lapTime;
        lapsList.appendChild(lapItem);
    }
}

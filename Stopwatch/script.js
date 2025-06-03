const timeDisplay = document.getElementById('time');
const startPauseBtn = document.getElementById('startPause');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const lapsList = document.getElementById('laps');

let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;

function timeToString(time) {
  const diffInHrs = time / 3600000;
  const hh = Math.floor(diffInHrs);

  const diffInMin = (diffInHrs - hh) * 60;
  const mm = Math.floor(diffInMin);

  const diffInSec = (diffInMin - mm) * 60;
  const ss = Math.floor(diffInSec);

  const diffInMs = (diffInSec - ss) * 1000;
  const ms = Math.floor(diffInMs);

  const formattedHH = hh.toString().padStart(2, "0");
  const formattedMM = mm.toString().padStart(2, "0");
  const formattedSS = ss.toString().padStart(2, "0");
  const formattedMS = ms.toString().padStart(3, "0");

  return `${formattedHH}:${formattedMM}:${formattedSS}.${formattedMS}`;
}

function print(txt) {
  timeDisplay.innerHTML = txt;
}

function start() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    print(timeToString(elapsedTime));
  }, 10);
  running = true;
  startPauseBtn.textContent = "Pause";
}

function pause() {
  clearInterval(timerInterval);
  running = false;
  startPauseBtn.textContent = "Start";
}

function reset() {
  clearInterval(timerInterval);
  print("00:00:00.000");
  elapsedTime = 0;
  running = false;
  startPauseBtn.textContent = "Start";
  lapsList.innerHTML = "";
}

function lap() {
  if (!running) return;
  const lapTime = timeToString(elapsedTime);
  const li = document.createElement('li');
  li.textContent = lapTime;
  lapsList.appendChild(li);
}

startPauseBtn.addEventListener("click", () => {
  if (!running) start();
  else pause();
});

resetBtn.addEventListener("click", reset);

lapBtn.addEventListener("click", lap);

let timerInterval;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;

const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const millisecondsEl = document.getElementById('milliseconds');
const lapsList = document.getElementById('laps-list');

document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('pause').addEventListener('click', pauseTimer);
document.getElementById('reset').addEventListener('click', resetTimer);
document.getElementById('lap').addEventListener('click', recordLap);

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateDisplay, 10);
  }
}

function pauseTimer() {
  if (isRunning) {
    isRunning = false;
    elapsedTime = Date.now() - startTime;
    clearInterval(timerInterval);
  }
}

function resetTimer() {
    isRunning = false;
    clearInterval(timerInterval);
    startTime = 0;
    elapsedTime = 0;
  
    // Explicitly reset the display values
    minutesEl.textContent = '00';
    secondsEl.textContent = '00';
    millisecondsEl.textContent = '00';
  
    // Clear the laps list
    lapsList.innerHTML = '';
  }
  

function updateDisplay() {
  elapsedTime = Date.now() - startTime;

  const totalMilliseconds = elapsedTime % 1000;
  const totalSeconds = Math.floor(elapsedTime / 1000) % 60;
  const totalMinutes = Math.floor(elapsedTime / 60000);

  millisecondsEl.textContent = totalMilliseconds.toString().padStart(3, '0').slice(0, 2);
  secondsEl.textContent = totalSeconds.toString().padStart(2, '0');
  minutesEl.textContent = totalMinutes.toString().padStart(2, '0');
}

function recordLap() {
  if (isRunning) {
    const lapTime = `${minutesEl.textContent}:${secondsEl.textContent}:${millisecondsEl.textContent}`;
    const lapItem = document.createElement('li');
    lapItem.textContent = lapTime;
    lapsList.appendChild(lapItem);
  }
}

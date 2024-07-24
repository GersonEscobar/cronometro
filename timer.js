let timer;
let isRunning = false;
let elapsedTime = 0;
let lastTime = 0;

const screen = document.getElementById('screen');
const start = document.getElementById('start');
const reset = document.getElementById('reset');
const lap = document.getElementById('lap');
const lapsHistory = document.getElementById('laps');

start.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(timer);
        start.textContent = 'Reanudar';
    } else {
        lastTime = Date.now() - elapsedTime;
        timer = setInterval(updateDisplay, 10);
        start.textContent = ' Pausar ';
    }
    isRunning = !isRunning;
});

reset.addEventListener('click', () => {
    clearInterval(timer);
    elapsedTime = 0;
    screen.textContent = '00:00:00.000';
    start.textContent = 'Iniciar';
    isRunning = false;
    lapsHistory.innerHTML = '';
});



lap.addEventListener('click', () => {
    if (elapsedTime > 0) {
        const lapTime = screen.textContent;
        const lapItem = document.createElement('li');
        lapItem.textContent = lapTime;
        lapsHistory.appendChild(lapItem);
    }
});

function updateDisplay() {
    elapsedTime = Date.now() - lastTime;
    let hours = Math.floor(elapsedTime / 3600000);
    let minutes = Math.floor((elapsedTime % 3600000) / 60000);
    let seconds = Math.floor((elapsedTime % 60000) / 1000);
    let milliseconds = elapsedTime % 1000;

    screen.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${padMilliseconds(milliseconds)}`;
}

function pad(number) {
    return number.toString().padStart(2, '0');
}

function padMilliseconds(number) {
    return number.toString().padStart(3, '0');
}

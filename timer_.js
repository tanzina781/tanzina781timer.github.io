
let hours = 0;
let minutes = 0;
let secounds = 0;
let totalSecounds = 0;
let timerCount;

const setTimerButton = document.querySelector('#set-timer-button');
const overlay = document.querySelector('#set-timer-overlay');
const setTimerIntervals = document.querySelector('#set-button');
const playButton = document.querySelector('#play-container');
const pauseButton = document.querySelector('#pause-container');
const timerCountElement = document.querySelector('#time');
const resetButton = document.querySelector('#reset-button')
const cancelButton= document.querySelector('#cancel-container')
const timesUp = document.querySelector('#times-up');

setTimerButton.addEventListener('click', function () {
    pause();
    overlay.style.display = 'grid';
   
});

cancelButton.addEventListener('click', function () {
    overlay.style.display = 'none';
});

setTimerIntervals.addEventListener('click', function () {
    setTimer();
    overlay.style.display = 'none';
});

resetButton.addEventListener('click', resetTimer);


function stepper(id, step) {
    let input = document.getElementById(id);

    let value = parseInt(input.value) + step;

    if (value < parseInt(input.min)) {
        value = parseInt(input.min);
    } else if (value > parseInt(input.max)) {
        value = parseInt(input.max);
    }

    input.value = value;

}
function setTimer() {

    let hoursInput = document.querySelector('#hours').value;
    let minutesInput = document.querySelector('#minutes').value;
    let secoundsInput = document.querySelector('#secounds').value;

    hours = parseInt(hoursInput, 10) || 0;
    minutes = parseInt(minutesInput, 10) || 0;
    secounds = parseInt(secoundsInput, 10) || 0;

    currentCountdown = hours * 3600 + minutes * 60 + secounds;
    totalSecounds=currentCountdown;
    updateTimerCount(totalSecounds);

    timesUp.style.display = 'none';
    timesUp.style.opacity = '0';
    timerCountElement.style.display='block';

}

function concatZero(timeUnit) {
    return timeUnit < 10 ? '0' + timeUnit : timeUnit;
}

function updateTimerCount(totalSecounds) {
    let hourCount = Math.floor(totalSecounds / 3600);
    let minuteCount = Math.floor((totalSecounds % 3600) / 60);
    let secoundCount = totalSecounds % 60;


    let formattedTime = `${concatZero(hourCount)}:${concatZero(minuteCount)}:${concatZero(secoundCount)}`;

    timerCountElement.textContent = formattedTime;

    if (totalSecounds === 0) {
        clearInterval(timerCount);
        pauseButton.style.display = 'none';
        playButton.style.display = 'block';

        timesUp.style.opacity = '1'
        timesUp.style.display = 'block';

        timerCountElement.style.display = 'none';

        timesUpTimeout = setTimeout(function () {
            timesUp.style.display = 'none';
            timerCountElement.style.display = 'block';
        
        }, 5000);
    }
        
}

function startTimer() {
    timerCount = setInterval(function () {
        if (totalSecounds > 0) {
            totalSecounds--;
            updateTimerCount(totalSecounds);
        } else {
            updateTimerCount(0);
        }
    }, 1000);
    pauseButton.style.display=
    'none'
}

function play() {
    startTimer();
    playButton.style.display = 'none';
    pauseButton.style.display = 'block';
}

function pause() {
    clearInterval(timerCount);
    updateTimerCount(totalSecounds);
    pauseButton.style.display = 'none';
    playButton.style.display = 'block';
}
function resetTimer() {
    clearInterval(timerCount);
    timerCount = null; 
    updateTimerCount(currentCountdown);
    totalSecounds = currentCountdown;

    if (timerCount === null) {       
        playButton.style.display = 'block';
        pauseButton.style.display = 'none';
    } else {
        
        playButton.style.display = 'none';
        pauseButton.style.display = 'block';
    }

    timesUp.style.display = 'none';
    timesUp.style.opacity = '0';
    timerCountElement.style.display='block';
   
}

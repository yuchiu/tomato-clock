var timer = document.getElementById('timer');
var toggleBtn = document.getElementById('toggle');
var resetBtn = document.getElementById('reset');

var workAdd = document.getElementById('workAdd');
var workMinus = document.getElementById('workMinus');
var workTimer = document.getElementById('workTimer');

var restAdd = document.getElementById('restAdd');
var restMinus = document.getElementById('restMinus');
var restTimer = document.getElementById('restTimer');

let timerStarted = document.getElementById('timerStarted');
let timerEnded = document.getElementById('timerEnded');
let breakTime = document.getElementById('breakTime');


var timer = new PomoTimer(timer);

function start() {
  timer.start();
  toggleBtn.textContent = 'Stop';
}

function stop() {
  timer.stop();
  toggleBtn.textContent = 'Start';
}

toggleBtn.addEventListener('click', function() {
  (timer.isOn) ? stop() : start();
});

resetBtn.addEventListener('click', function() {
    timer.reset();
});


workAdd.addEventListener('click', function() {
    timer.workAddMin();
});

workMinus.addEventListener('click', function() {

    timer.workMinusMin();
});

restAdd.addEventListener('click', function() {
    timer.restAddMin();
});

restMinus.addEventListener('click', function() {

    timer.restMinusMin();
});
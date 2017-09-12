const timer = document.getElementById('timer');
const toggleBtn = document.getElementById('toggle');
const resetBtn = document.getElementById('reset');

const workAdd = document.getElementById('workAdd');
const workMinus = document.getElementById('workMinus');
const workTimer = document.getElementById('workTimer');

const restAdd = document.getElementById('restAdd');
const restMinus = document.getElementById('restMinus');
const restTimer = document.getElementById('restTimer');

const message = document.getElementById('message');

const secHand = document.getElementById("secHand").style;
const minHand = document.getElementById("minHand").style;

let pomo = new PomoTimer(timer);

function start() {
    pomo.start();
}

function stop() {
    pomo.stop();
}

toggleBtn.addEventListener('click', function () {
    (pomo.isOn) ? stop(): start();
});

resetBtn.addEventListener('click', function () {
    pomo.reset();
});


workAdd.addEventListener('click', function () {
    pomo.workAddMin();
});

workMinus.addEventListener('click', function () {

    pomo.workMinusMin();
});

restAdd.addEventListener('click', function () {
    pomo.restAddMin();
});

restMinus.addEventListener('click', function () {

    pomo.restMinusMin();
});
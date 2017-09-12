function PomoTimer(elem) {
  let time = 1500000;
  let restTime = 300000;
  let interval;
  let offset;

  this.isOn = false;
  this.workTimerIsOn = true;

  updateClock();

  this.start = function () {
    if (!this.isOn) {
      toggleBtn.textContent = 'Pause';
      interval = setInterval(update.bind(this), 10);
      offset = Date.now();
      this.isOn = true;
      startClock();
      message.innerHTML = "Timer has Started."
    }
  };

  this.stop = function () {
    if (this.isOn) {
      toggleBtn.textContent = 'Start';
      clearInterval(interval);
      interval = null;
      this.isOn = false;
    }
  };

  this.reset = function () {
    this.stop();
    toggleBtn.textContent = 'Start';
    time = 1500000;
    restTime = 300000;
    this.workTimerIsOn = true;
    timer.textContent = timeFormatter(time);
    workTimer.textContent = timeFormatter(time);
    restTimer.textContent = timeFormatter(restTime);

    workAdd.disabled = false;
    workMinus.disabled = false;
    restAdd.disabled = false;
    restMinus.disabled = false;
    toggleBtn.disabled = false;

    message.innerHTML = "";

    update();
  };

  this.restStart = function () {
    time = restTime;
    this.isOn = true
    this.workTimerIsOn = false;
    workAdd.disabled = true;
    workMinus.disabled = true;

    message.innerHTML = "Break Time.";
    update();
  }
  this.sessionEnd = function () {
    restAdd.disabled = true;
    restMinus.disabled = true;
    toggleBtn.disabled = true;
    message.innerHTML = "Timer Ended."
  }

  this.workAddMin = function () {
    if (time < 3540000) {
      time += 60000;
      timer.textContent = timeFormatter(time);
      workTimer.textContent = timeFormatter(time);
      updateClock();
      update();
    }
  }

  this.workMinusMin = function () {
    if (time > 60000) {
      time -= 60000;
      timer.textContent = timeFormatter(time);
      workTimer.textContent = timeFormatter(time);
      updateClock();
      update();
    }

  }
  this.restAddMin = function () {
    if (this.workTimerIsOn === true) {

      if (restTime < 3540000) {
        restTime += 60000;
        restTimer.textContent = timeFormatter(restTime);
        update();
        updateClock();

      }
    } else {

      if (time < 3540000) {
        time += 60000;
        timer.textContent = timeFormatter(time);
        restTimer.textContent = timeFormatter(time);
        update();
        updateClock();

      }
    }

  }
  this.restMinusMin = function () {
    if (this.workTimerIsOn === true) {

      if (restTime > 60000) {
        restTime -= 60000;
        restTimer.textContent = timeFormatter(restTime);
        update();
        updateClock();
      }

    } else {
      if (time > 60000) {
        time -= 60000;
        timer.textContent = timeFormatter(time);
        restTimer.textContent = timeFormatter(time);
        update();
        updateClock();
      }
    }
  }

  function startClock() {
    let clock = setInterval(function () {
      updateClock();
    }, 500);
  }

  function updateClock() {
    secHand.transform = "rotate(" + calculateSec() * 6 + "deg)";
    minHand.transform = "rotate(" + calculateMin() * 6 + "deg)";
  }

  function update() {
    if (this.isOn) {
      let timePassed = delta();
      time -= timePassed;
    }

    if (time > 600) {
      if (this.workTimerIsOn) {
        let formattedTime = timeFormatter(time);
        elem.textContent = formattedTime;
        workTimer.textContent = formattedTime;

      } else if (this.workTimerIsOn === false) {
        let formattedTime = timeFormatter(time);
        elem.textContent = formattedTime;
        restTimer.textContent = formattedTime;
      }

    } else if (this.workTimerIsOn) {
      this.isOn = false;
      this.restStart();
    } else {
      this.isOn = false;
      this.sessionEnd();
    }
  }

  function delta() {
    let now = Date.now();
    let timePassed = now - offset;
    offset = now;
    return timePassed;
  }

  function timeFormatter(timeInMilliseconds) {
    let time = new Date(timeInMilliseconds);
    let minutes = time.getMinutes().toString();
    let seconds = time.getSeconds().toString();


    if (minutes.length < 2) {
      minutes = '0' + minutes;
    }

    if (seconds.length < 2) {
      seconds = '0' + seconds;
    }
    return minutes + ' : ' + seconds;
  }

  function calculateMin() {
    let minute = Math.floor(time / 60000);
    return minute;
  }

  function calculateSec() {
    let sec = time % 60000
    sec = Math.floor(sec / 1000);
    return sec;
  }
}
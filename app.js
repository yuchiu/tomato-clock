function PomoTimer(elem) {
  var time = 1500000;
  var restTime = 300000;
  var interval;
  var offset;

  this.isOn = false;
  this.workTimerIsOn = true;
  timerStarted.style.display = 'none';
  breakTime.style.display = 'none';
  timerEnded.style.display = 'none';

  function update() {
    if (this.isOn) {
      var timePassed = delta();
      time -= timePassed;
    }

    if (time > 600) {
      if (this.workTimerIsOn) {
        var formattedTime = timeFormatter(time);
        elem.textContent = formattedTime;
        workTimer.textContent = formattedTime;

      } else if (this.workTimerIsOn === false) {
        var formattedTime = timeFormatter(time);
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
    var now = Date.now();
    var timePassed = now - offset;
    offset = now;
    return timePassed;
  }

  function timeFormatter(timeInMilliseconds) {
    var time = new Date(timeInMilliseconds);
    var minutes = time.getMinutes().toString();
    var seconds = time.getSeconds().toString();


    if (minutes.length < 2) {
      minutes = '0' + minutes;
    }

    if (seconds.length < 2) {
      seconds = '0' + seconds;
    }

    return minutes + ' : ' + seconds;
  }
  this.start = function () {
    if (!this.isOn) {
      interval = setInterval(update.bind(this), 10);
      offset = Date.now();
      this.isOn = true;
      timerStarted.style.display = 'block';
    }
  };

  this.stop = function () {
    if (this.isOn) {
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

    timerStarted.style.display = 'none';
    breakTime.style.display = 'none';
    timerEnded.style.display = 'none';

    update();
  };

  this.restStart = function () {
    time = restTime;
    this.isOn = true
    this.workTimerIsOn = false;
    workAdd.disabled = true;
    workMinus.disabled = true;
    breakTime.style.display = 'block';
  timerStarted.style.display = 'none';
    update();
  }
  this.sessionEnd = function () {
    restAdd.disabled = true;
    restMinus.disabled = true;
    toggleBtn.disabled = true;
    breakTime.style.display = 'none';
    timerEnded.style.display = 'block';
    playSound();
  }

  this.workAddMin = function () {
    if (time < 3540000) {
      time += 60000;
      timer.textContent = timeFormatter(time);
      workTimer.textContent = timeFormatter(time);
      update();
    }
  }

  this.workMinusMin = function () {
    if (time > 60000) {
      time -= 60000;
      timer.textContent = timeFormatter(time);
      workTimer.textContent = timeFormatter(time);
      update();
    }

  }
  this.restAddMin = function () {
    if (this.workTimerIsOn === true) {

      if (restTime < 3540000) {
        restTime += 60000;
        restTimer.textContent = timeFormatter(restTime);
        update();

      }
    } else {

      if (time < 3540000) {
        time += 60000;
        timer.textContent = timeFormatter(time);
        restTimer.textContent = timeFormatter(time);
        update();

      }
    }

  }
  this.restMinusMin = function () {
    if (this.workTimerIsOn === true) {

      if (restTime > 60000) {
        restTime -= 60000;
        restTimer.textContent = timeFormatter(restTime);
        update();
      }

    } else {
      if (time > 60000) {
        time -= 60000;
        timer.textContent = timeFormatter(time);
        restTimer.textContent = timeFormatter(time);
        update();
      }
    }
  }
  
}
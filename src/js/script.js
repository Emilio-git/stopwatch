"use strict";

window.addEventListener('DOMContentLoaded', () => {
   // Navigation
   const btns = document.querySelectorAll('.nav__item');
   const startBtn = document.querySelector('#start');
   const pauseBtn = document.querySelector('#pause');
   const resetBtn = document.querySelector('#reset');
   const recordBtn = document.querySelector('#record');
   const mainRecord = document.querySelector('.main__record');
   // Timer
   const millisecondsTimer = document.querySelector('#milliseconds'),
       secondsTimer = document.querySelector('#seconds'),
       minutesTimer = document.querySelector('#minutes'),
       hoursTimer = document.querySelector('#hours');

   // Variables
   let milliseconds = 0,
       seconds = 0,
       minutes = 0,
       hours = 0,
       interval;

   // Listeners
   startBtn.addEventListener('click', () => {
      startBtn.style.display = 'none';
      pauseBtn.style.display = 'block';
      clearInterval(interval);
      interval = setInterval(start, 10);
   });

   pauseBtn.addEventListener('click', () => {
      pauseBtn.style.display = 'none';
      startBtn.style.display = 'block';
      clearInterval(interval);
   });

   recordBtn.addEventListener('click', () => {
      recordTimer();
   });


   resetBtn.addEventListener('click', () => {
      clearInterval(interval);
      milliseconds = 0;
      seconds = 0;
      minutes = 0;
      hours = 0;

      millisecondsTimer.textContent = `00`;
      secondsTimer.textContent = `00`;
      minutesTimer.textContent = `00`;
      hoursTimer.textContent = `00`;

      pauseBtn.style.display = 'none';
      startBtn.style.display = 'block';

   });

   function start() {

      // Miliseconds
      milliseconds++;
      if (milliseconds < 9) {
         millisecondsTimer.innerText = `0${milliseconds}`;

      } else if (milliseconds > 9 && milliseconds < 99) {
         millisecondsTimer.innerText = milliseconds;
      } else if(milliseconds > 99) {
         seconds++;
         secondsTimer.innerText = `0${seconds}`;
         milliseconds = 0;
         millisecondsTimer.innerText = `0${milliseconds}`;
      }

      // Seconds
      if (seconds < 9) {
         secondsTimer.innerText = `0${seconds}`;
      } else if (seconds > 9 && seconds < 60) {
         secondsTimer.innerText = seconds;
      } else if (seconds > 59) {
         minutes++;
         minutesTimer.innerText = `0${minutes}`;
         seconds = 0;
         secondsTimer.innerText = `0${seconds}`;
      }

      // Minutes
      if (minutes < 9) {
         minutesTimer.innerText = `0${minutes}`;
      } else if (minutes > 9 && minutes < 60) {
         minutesTimer.innerText = minutes;
      } else if (minutes > 59) {
         hours++;
         hoursTimer.innerText = `0${hours}`;
         minutes = 0;
         minutesTimer.innerText = `0${minutes}`;
      }
   }

   function recordTimer() {
      const record = document.createElement('div');
      record.classList.add('timer__record', 'record');

      record.innerHTML = `
         <span class="record__inner">
            ${hoursTimer.textContent}:
            ${minutesTimer.innerHTML}:
            ${secondsTimer.innerHTML}:
            ${millisecondsTimer.textContent}
         </span>
      `;

      mainRecord.append(record);
   }


});



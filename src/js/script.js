"use strict";

window.addEventListener('DOMContentLoaded', () => {
   // Navigation
   const btns = document.querySelectorAll('.nav__item');
   const startBtn = document.querySelector('#start');
   const pauseBtn = document.querySelector('#pause');
   const resetBtn = document.querySelector('#reset');
   const recordBtn = document.querySelector('#record');
   const recordInner = document.querySelector('.record__inner');
   const timer = document.querySelector('.timer');
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
       counter = 0,
       activate = false,
       interval;

   // Listeners
   startBtn.addEventListener('click', () => {
      startBtn.style.display = 'none';
      pauseBtn.style.display = 'block';
      clearInterval(interval);
      interval = setInterval(start, 10);
      activate = true;
      btnActivation(activate, recordBtn);
      btnActivation(activate, resetBtn);

   });

   pauseBtn.addEventListener('click', () => {
      if (!(pauseBtn.classList.contains('deactivate'))) {
         pauseBtn.style.display = 'none';
         startBtn.style.display = 'block';
         clearInterval(interval);
         activate = false;
         btnActivation(activate, recordBtn);
      }
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

      const childLength = recordInner.children.length;
      for (let i = 1; i <= childLength; i++) {
         recordInner.children[childLength - i].remove();
      }
      
      activate = false;
      btnActivation(activate, recordBtn);
      btnActivation(activate, resetBtn);
      btnActivation(activate = true, pauseBtn);
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

      if (hours < 9) {
         hoursTimer.innerHTML = `0${hours}`;
      } else if (hours > 9 && hours < 25) {
         hoursTimer.innerHTML = hours;
      } 
      
      if (hoursTimer.innerHTML == 24) {
         clearInterval(interval);
         timerEnd();
      }
   }

   function recordTimer() {
      if (activate) {
         if (!recordInner.children.length) {
            counter = 0;
         }
         const record = document.createElement('div');
         record.classList.add('record__item');
         counter++;
         record.innerHTML = `
            <span class="record__number">Круг ${counter}:</span>
            <span class="record__time">${hoursTimer.textContent}:${minutesTimer.innerHTML}:${secondsTimer.innerHTML}:${millisecondsTimer.textContent}</span>
         `;
         recordInner.prepend(record);
      }
   }

   function btnActivation(activate, btnName) {
      if (!activate) {
         btnName.classList.add('deactivate');
      } else {
         btnName.classList.remove('deactivate');
      }
   }

   function timerEnd() {
      const timerEndNode = document.createElement('div');
      timerEndNode.classList.add('timer__end');
      timerEndNode.innerHTML = `
         <h3>Таймер завершил свою работу! Нажмите сброс для начала работы снова</h3>
      `;
      activate = false;
      btnActivation(activate, recordBtn);
      btnActivation(activate, pauseBtn);
      timer.after(timerEndNode);
   }
});
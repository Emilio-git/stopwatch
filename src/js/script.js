"use strict";

window.addEventListener('DOMContentLoaded', () => {
   // Navigation
   const startBtn = document.querySelector('#start'),
         pauseBtn = document.querySelector('#pause'),
         resetBtn = document.querySelector('#reset'),
         recordBtn = document.querySelector('#record'),
         recordInner = document.querySelector('.record__inner'),
         timer = document.querySelector('.timer'),
         timerParent = timer.parentNode;

   // Timer
   const millisecondsTimer = document.querySelector('#milliseconds'),
       secondsTimer = document.querySelector('#seconds'),
       minutesTimer = document.querySelector('#minutes'),
       hoursTimer = document.querySelector('#hours');

   // Animation
   const lineFirst = document.querySelector('.timer__line-first'),
         lineLayout = document.querySelector('.timer__line'),
         lineSecond = document.querySelector('.timer__line-second');
   let lineCounter = 0;

   // Variables
   let milliseconds = 0,
       seconds = 0,
       minutes = 0,
       hours = 0,
       counter = 0,
       switcher = 0,
       activate = false,
       interval;

   // Button listeners
   startBtn.addEventListener('click', () => {
      switcher = 1;
      startInit();
   });

   pauseBtn.addEventListener('click', () => {
      switcher = 0;
      pauseInit();
   });

   recordBtn.addEventListener('click', () => {
      recordTimer();
   });

   resetBtn.addEventListener('click', () => {
      resetInit();
   });

   // Keydown Listeners
   document.addEventListener('keydown', (e) => {
      if (e.code === 'Space') {
         e.preventDefault();
         if (switcher === 0) {
            switcher = 1;
            startInit();
         } else if (switcher === 1) {
            switcher = 0;
            pauseInit();
         }
      } else if (e.code === 'Enter') {
         recordTimer();
      } else if (e.code === 'Backspace') {
         switcher = 0;
         resetInit();
      }
   });

   // Funtions --------------------------------------------------
   function startInit() {
      startBtn.style.display = 'none';
      pauseBtn.style.display = 'block';
      clearInterval(interval);
      interval = setInterval(start, 10);
      activate = true;
      btnActivation(activate, recordBtn);
      btnActivation(activate, resetBtn);
   }

   function pauseInit() {
      if (!(pauseBtn.classList.contains('deactivate'))) {
         pauseBtn.style.display = 'none';
         startBtn.style.display = 'block';
         clearInterval(interval);
         activate = false;
         btnActivation(activate, recordBtn);
      }
   }

   function resetInit() {
      clearInterval(interval);
      moveLineBack();

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
      btnActivation(1, pauseBtn);

      if (timerParent.contains(timerEndNode)) {
         timerEndNode.remove();
      }
   }
   // -----------------------------------------------------------

   function start() {
      startLine(seconds);

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

   // Record new item
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

   // Activate buttons
   function btnActivation(activate, btnName) {
      if (!activate) {
         btnName.classList.add('deactivate');
      } else {
         btnName.classList.remove('deactivate');
      }
   }

   const timerEndNode = document.createElement('div');
   //When timer ends 
   function timerEnd() {
      timerEndNode.classList.add('main__timer-end');
      timerEndNode.innerHTML = `
         <h3>Секундомер завершил свою работу. Нажмите "Сброс" для работы сначала</h3>
      `;
      activate = false;
      btnActivation(activate, recordBtn);
      btnActivation(activate, pauseBtn);
      timer.after(timerEndNode);
      switcher = 2;
   }

   // Line
   function startLine(seconds) {
      if (minutes % 2 == 0 || minutes < 1) {
         lineCounter++;
         if(seconds >= 30) {
            lineLayout.style.cssText = `background: #FCB677`;
            lineSecond.style.cssText = `z-index: 1;`;
            lineFirst.style.transform = `rotate(${lineCounter * 0.06}deg)`;
         } else {
            lineSecond.style.cssText = `z-index: 3`;
            lineFirst.style.cssText = `z-index: 2`;
            lineFirst.style.transform = `rotate(${lineCounter * 0.06}deg)`;
         }
      } else {
         lineCounter++;
         if(seconds >= 30) {
            lineLayout.style.cssText = `background: #034C65`;
            lineFirst.style.cssText = `z-index: 1;`;
            lineSecond.style.transform = `rotate(${lineCounter * 0.06}deg)`;
         } else {
            lineFirst.style.cssText = `z-index: 3`;
            lineSecond.style.cssText = `z-index: 2`;
            lineSecond.style.transform = `rotate(${lineCounter * 0.06}deg)`;
         }
      } 
   }

   function moveLineBack() {
      lineCounter = 0;
      lineLayout.style.cssText = `background: #034C65`;
      lineSecond.style.cssText = `z-index: 3`;
      lineFirst.style.cssText = `z-index: 2`;
      lineFirst.style.transform = `rotate(${lineCounter * 0.06})`;
   }
});
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import "../css/timer.css";

const dateTime = document.querySelector("#datetime-picker")
const startBtn = document.querySelector("[data-start]");

const daysEl = document.querySelector("[data-days]");
const hoursEl = document.querySelector("[data-hours]");
const minutesEl = document.querySelector("[data-minutes]");
const secondsEl = document.querySelector("[data-seconds]");


let selectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      selectedDate = selectedDates[0];
        if (selectedDate < new Date()) {
    iziToast.error({
        message: "Please choose a date in the future",
        position: "topRight",
      });
  }
  },
};


flatpickr(dateTime, options);


startBtn.addEventListener("click", (e) => {
  if (!selectedDate) return;

            
    const timerId = setInterval(() => {
        
        
        const fark = selectedDate - Date.now();   
        
        if (fark <= 0) {
            clearInterval(timerId);
            return;
        }
        
        const time = convertMs(fark);  
        
        daysEl.textContent = String(time.days).padStart(2, "0");
        hoursEl.textContent = String(time.hours).padStart(2, "0");
        minutesEl.textContent = String(time.minutes).padStart(2, "0");
        secondsEl.textContent = String(time.seconds).padStart(2, "0");
        
    },1000)
});





function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}





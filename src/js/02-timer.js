import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const dateTimePicker = document.querySelector("#datetime-picker");
const startBtn = document.querySelector("button[data-start]");
const daysInput = document.querySelector("span[data-days]");
const hoursInput = document.querySelector("span[data-hours]");
const minutesInput = document.querySelector("span[data-minutes]");
const secondsInput = document.querySelector("span[data-seconds]");


startBtn.disabled = "true";

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

const setCountdownTimer = () => {
    const timerId = setInterval(() => {
        const countdown = new Date(dateTimePicker.value) - new Date();
        startBtn.disabled = "true";
        if (countdown >= 0) {
            dateTimePicker.disabled = true;

            const timeObject = convertMs(countdown);
            daysInput.textContent = addLeadingZero(timeObject.days);
            hoursInput.textContent = addLeadingZero(timeObject.hours);
            minutesInput.textContent = addLeadingZero(timeObject.minutes);
            secondsInput.textContent = addLeadingZero(timeObject.seconds);
        } else {
            clearInterval(timerId);
            Notiflix.Notify.success('Finish!', {
                position: 'left-top',
            });
            dateTimePicker.disabled = false;
        }
    }, 1000)
};

startBtn.addEventListener("click", (setCountdownTimer));

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if(selectedDates[0] < new Date()) {
            Notiflix.Notify.failure('Please choose a date in the future');        
            startBtn.disabled = true;
            return;
        }
        startBtn.disabled = false; 
    },
};

flatpickr("input#datetime-picker", options);
    
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
};

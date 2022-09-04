import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const timer = document.querySelector(".timer");
const startBtn = document.querySelector("button[data-start]");
const daysInput = document.querySelector("span[data-days]");
const hoursInput = document.querySelector("span[data-hours]");
const minutesInput = document.querySelector("span[data-minutes]");
const secondsInput = document.querySelector("span[data-seconds]");


startBtn.disabled = "true";
startBtn.addEventListener("click", () => {
    
    function addLeadingZero() {
        const { days, hours, minutes, seconds } = convertMs(dateDifference);
        
        daysInput.textContent = days.toString().length < 2 ? `0${days}` : days;
        hoursInput.textContent = hours.toString().length < 2 ? `0${hours}` : hours;
        minutesInput.textContent = minutes.toString().length < 2 ? `0${minutes}` : minutes;
        secondsInput.textContent = seconds.toString().length < 2 ? `0${seconds}` : seconds;
    }
    addLeadingZero();
    setInterval(() => {
        addLeadingZero();
    }, 1000);
});

let dateDifference;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(dateDifferences) {
        function actualTime() {
            const dateNow = new Date().getTime();
            dateDifference = dateDifferences[0].getTime() - dateNow;
        }
        actualTime();
        setInterval(() => {
            actualTime();
        }, 1000);

        if(dateDifference <= 0) {
            Notiflix.Notify.failure('Please choose a date in the future');
            startBtn.disabled = "true";
        } else {        
            startBtn.removeAttribute("disabled")
        }
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

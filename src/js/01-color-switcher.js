
const start = document.querySelector("button[data-start]");
const stop = document.querySelector("button[data-stop]");

start.addEventListener("click", changeColor);


function changeColor() {
    document.body.style.backgroundColor = getRandomHexColor();
    
    const interval = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);

    stop.addEventListener("click", stopColor);

    function stopColor () {
        clearInterval(interval);
        start.removeAttribute("disabled")
    };
    start.setAttribute("disabled", "true");
};

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};
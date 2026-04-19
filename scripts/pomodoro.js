let time = 25 * 60;
let timer = null;

function updateDisplay() {
    const m = Math.floor(time / 60).toString().padStart(2, "0");
    const s = (time % 60).toString().padStart(2, "0");
    document.getElementById("pomodoro-timer").textContent = `${m}:${s}`;
}

document.getElementById("startPomodoro").onclick = () => {
    if (timer) return;
    timer = setInterval(() => {
        if (time > 0) time--;
        updateDisplay();
    }, 1000);
};

document.getElementById("pausePomodoro").onclick = () => {
    clearInterval(timer);
    timer = null;
};

document.getElementById("resetPomodoro").onclick = () => {
    clearInterval(timer);
    timer = null;
    time = 25 * 60;
    updateDisplay();
};

updateDisplay();

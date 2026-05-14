const timerDisplay = document.getElementById("timer");

const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");

const subjectInput = document.getElementById("subject");
const topicInput = document.getElementById("topic");

const sessionList = document.getElementById("sessionList");

let seconds = 0;
let interval = null;


// Load sessions from localStorage
window.onload = () => {
    const sessions = JSON.parse(localStorage.getItem("studySessions")) || [];

    sessions.forEach(addSessionToUI);
};


// Format time
function formatTime(totalSeconds) {

    const hrs = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");

    const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");

    const secs = String(totalSeconds % 60).padStart(2, "0");

    return `${hrs}:${mins}:${secs}`;
}


// Update timer UI
function updateTimer() {

    seconds++;

    timerDisplay.innerText = formatTime(seconds);
}


// Start timer
startBtn.addEventListener("click", () => {

    if (interval) return;

    interval = setInterval(updateTimer, 1000);
});


// Stop timer
stopBtn.addEventListener("click", () => {

    clearInterval(interval);

    interval = null;

    saveSession();
});


// Reset timer
resetBtn.addEventListener("click", () => {

    clearInterval(interval);

    interval = null;

    seconds = 0;

    timerDisplay.innerText = "00:00:00";
});


// Save session
function saveSession() {

    const subject = subjectInput.value.trim();

    const topic = topicInput.value.trim();

    if (!subject || !topic || seconds === 0) {
        return;
    }

    const session = {
        subject,
        topic,
        duration: formatTime(seconds),
        date: new Date().toLocaleDateString()
    };

    // Get old sessions
    const sessions = JSON.parse(localStorage.getItem("studySessions")) || [];

    // Add new session
    sessions.push(session);

    // Save back
    localStorage.setItem("studySessions", JSON.stringify(sessions));

    // Add to UI
    addSessionToUI(session);

    // Reset timer
    seconds = 0;

    timerDisplay.innerText = "00:00:00";
}


// Add session to UI
function addSessionToUI(session) {

    const li = document.createElement("li");

    li.innerHTML = `
        <strong>${session.subject}</strong><br>
        Topic: ${session.topic}<br>
        Duration: ${session.duration}<br>
        Date: ${session.date}
    `;

    sessionList.prepend(li);
}

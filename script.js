// TIMER
let time = 1500;
let interval;

function updateTimer() {
  let m = Math.floor(time / 60);
  let s = time % 60;
  document.getElementById("timer").innerText =
    `${m}:${s < 10 ? "0" : ""}${s}`;
}

function startTimer() {
  interval = setInterval(() => {
    if (time > 0) {
      time--;
      updateTimer();
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(interval);
  time = 1500;
  updateTimer();
}

// TODO
const input = document.getElementById("todoInput");
const list = document.getElementById("todoList");

input.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    let div = document.createElement("div");
    div.innerText = input.value;
    div.onclick = () => div.style.textDecoration = "line-through";
    list.appendChild(div);
    input.value = "";
  }
});

// MUSIC
document.getElementById("musicUpload").addEventListener("change", function(e) {
  const file = e.target.files[0];
  const url = URL.createObjectURL(file);
  document.getElementById("player").src = url;
});

// THEME
function toggleTheme() {
  document.body.style.background = document.body.style.background === "black" ? "white" : "black";
}

// API KEY
function saveKey() {
  localStorage.setItem("geminiKey", document.getElementById("apiKey").value);
  alert("Saved!");
}

// AI
async function askAI() {
  const input = document.getElementById("aiInput").value;
  const chat = document.getElementById("chat");

  chat.innerHTML += `<p><b>You:</b> ${input}</p>`;

  const key = localStorage.getItem("geminiKey");

  if (!key) {
    chat.innerHTML += `<p><b>AI:</b> Add API key first</p>`;
    return;
  }

  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${key}`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      contents: [{ parts: [{ text: input }] }]
    })
  });

  const data = await res.json();
  const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Error";

  chat.innerHTML += `<p><b>AI:</b> ${reply}</p>`;
}

<script>
window.sendToAI = async () => {
  const input = document.getElementById('ai-input').value;
  if (!input.trim()) return;

  const out = document.getElementById('ai-output');
  out.innerHTML += `<div class='msg user'>${input}</div>`;
  document.getElementById('ai-input').value = '';

  const apiKey = localStorage.getItem('geminiKey');
  if (!apiKey) {
    out.innerHTML += `<div class='msg bot'>Add your Gemini API key in settings.</div>`;
    return;
  }

  const res = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + apiKey, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contents: [{ parts: [{ text: input }] }] })
  });

  const data = await res.json();
  const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "AI error";

  out.innerHTML += `<div class='msg bot'>${reply}</div>`;
  out.scrollTop = out.scrollHeight;
};
</script>

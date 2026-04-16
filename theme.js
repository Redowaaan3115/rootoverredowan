<script>
window.themes = {
  light: { bg: "#fafafa", text: "#111" },
  dark: { bg: "#0a0a0a", text: "#fff" },
  neon: { bg: "#050505", text: "#39ff14" },
  pastel: { bg: "#f5e6ff", text: "#333" },
  hacker: { bg: "black", text: "#0f0" },
  anime: { bg: "#ffe6f2", text: "#402040" }
};
window.applyTheme = () => {
  const t = document.getElementById('theme-select').value;
  const theme = themes[t];
  document.documentElement.style.setProperty('--bg', theme.bg);
  document.documentElement.style.setProperty('--text', theme.text);
  localStorage.setItem('theme', t);
};
</script>

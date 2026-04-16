<script>
window.savePomodoro = (mins) => {
  const uid = localStorage.getItem('uid');
  firebase.database().ref(`users/${uid}/pomodoro`).push({
    minutes: mins,
    date: Date.now()
  });
};
</script>

<!-- PHASE 6: CLOUD ALARMS (focus-tools.js) -->
<script>
window.saveAlarm = (time, label) => {
  const uid = localStorage.getItem('uid');
  firebase.database().ref(`users/${uid}/alarms`).push({ time, label });
};
</script>

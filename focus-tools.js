<script>
window.saveAlarm = (time, label) => {
  const uid = localStorage.getItem('uid');
  firebase.database().ref(`users/${uid}/alarms`).push({ time, label });
};
</script>

<!-- PHASE 6: STORAGE UPLOADS (music.js) -->
<script>
window.uploadMusic = async (file) => {
  const uid = localStorage.getItem('uid');
  const ref = firebase.storage().ref(`music/${uid}/${file.name}`);
  await ref.put(file);
  const url = await ref.getDownloadURL();
  firebase.database().ref(`users/${uid}/music`).push({ name: file.name, url });
};
</script>

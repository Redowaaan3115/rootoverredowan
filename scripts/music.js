const audio = document.getElementById("audioPlayer");
document.getElementById("uploadMusic").onchange = (e) => {
    const file = e.target.files[0];
    if (file) audio.src = URL.createObjectURL(file);
};

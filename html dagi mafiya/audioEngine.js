const AudioEngine = {
    play(id) {
        const audio = document.getElementById(id);
        if (audio) {
            audio.currentTime = 0;
            audio.play();
        }
    },
    stop(id) {
        const audio = document.getElementById(id);
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
    }
};

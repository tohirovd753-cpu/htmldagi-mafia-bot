const Win = {
    show(message) {
        UI.setPhase("🏆 O‘yin tugadi!");
        alert(message); // Soddalashtirilgan, keyin modal qo‘shish mumkin
        AudioEngine.play("audioWin");

        // O‘yinni qayta boshlash
        setTimeout(() => {
            location.reload();
        }, 5000);
    }
};

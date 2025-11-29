const Main = {
    players: [],

    addPlayer() {
        const input = document.getElementById("playerName");
        const name = input.value.trim();
        if (name === "") return alert("Iltimos, ism kiriting!");
        this.players.push({ 
            name, alive: true, role: null, love: null, shot: false, protected: false, toDie: false, shownDeath: false 
        });
        input.value = "";

        // Chat uchun current player
        Chat.currentPlayer = name;

        UI.renderPlayers(this.players);
    },

    startGame() {
        if (this.players.length < 4) return alert("Kamida 4 o‘yinchi kerak!");
        document.getElementById("setup").style.display = "none";
        document.getElementById("game").style.display = "block";

        // Rollarni taqsimlash
        Roles.assign(this.players);

        // Har bir o‘yinchiga rolni ko‘rsatish
        this.players.forEach((p, i) => {
            setTimeout(() => UI.showRole(p), i * 1000);
        });

        // Playerlar ro‘yxatini yangilash
        UI.renderPlayers(this.players);

        // Chatni ishga tushirish
        Chat.init();

        // Tun boshlash
        setTimeout(() => {
            UI.hidePopup("rolePopup");
            Night.start();
        }, this.players.length * 1200);
    },

    alivePlayers() {
        return this.players.map((p, i) => p.alive ? i : null).filter(i => i !== null);
    },

    checkWin() {
        const alive = this.alivePlayers();
        const mafiaCount = alive.filter(i => ["Mafia","Don"].includes(this.players[i].role)).length;
        const townCount = alive.length - mafiaCount;

        if (mafiaCount === 0) {
            Win.show("Fuqaro jamoasi g‘alaba qildi!");
        } else if (mafiaCount >= townCount) {
            Win.show("Mafia jamoasi g‘alaba qildi!");
        } else {
            // O'yin davom etadi
            Day.start();
        }
    }
};

// Event listenerlar
document.getElementById("addPlayerBtn").addEventListener("click", () => Main.addPlayer());
document.getElementById("startGameBtn").addEventListener("click", () => Main.startGame());

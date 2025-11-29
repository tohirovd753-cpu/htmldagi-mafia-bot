const Vote = {
    start() {
        const votePopup = document.getElementById("votePopup");
        const voteOptions = document.getElementById("voteOptions");
        voteOptions.innerHTML = "";

        const alive = Main.players.filter(p => p.alive);
        alive.forEach((p, i) => {
            const btn = document.createElement("button");
            btn.innerHTML = p.name;
            btn.onclick = () => this.vote(p);
            voteOptions.appendChild(btn);
        });

        UI.showPopup("votePopup");
        UI.setPhase("🗳 Ovoz berish bosqichi");
    },

    vote(target) {
        UI.hidePopup("votePopup");
        // Ovoz berish mexanikasi: 1 ovoz → o‘sha o‘yinchi o‘ldi
        target.alive = false;
        AudioEngine.play("audioKill");
        UI.renderPlayers(Main.players);
        Main.checkWin();
    }
};

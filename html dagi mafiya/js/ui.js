const UI = {
    renderPlayers(players) {
        const container = document.getElementById("playerList");
        const gameArea = document.getElementById("playerArea");
        container.innerHTML = "";
        gameArea.innerHTML = "";

        players.forEach((p, i) => {
            const card = document.createElement("div");
            card.className = "playerCard " + (p.alive ? "alive" : "dead");
            card.innerHTML = `<strong>${p.name}</strong> <br> ${p.role ? p.role : ''}`;
            container.appendChild(card);

            const gameCard = document.createElement("div");
            gameCard.className = "playerCard " + (p.alive ? "alive" : "dead");
            gameCard.innerHTML = `<strong>${p.name}</strong>`;
            gameArea.appendChild(gameCard);
        });
    },

    showRole(player) {
        const popup = document.getElementById("rolePopup");
        const text = document.getElementById("roleText");
        text.innerHTML = `Sizning rolingiz: <strong>${player.role}</strong>`;
        popup.classList.add("show");
    },

    closeRole() {
        const popup = document.getElementById("rolePopup");
        popup.classList.remove("show");
    },

    showPopup(id) {
        const popup = document.getElementById(id);
        if (popup) popup.classList.add("show");
    },

    hidePopup(id) {
        const popup = document.getElementById(id);
        if (popup) popup.classList.remove("show");
    },

    setPhase(phase) {
        const title = document.getElementById("phaseTitle");
        title.innerHTML = phase;
    },

    setDayMode() {
        document.body.classList.add("day");
        document.body.classList.remove("night");
        AudioEngine.play("audioDay");
    },

    setNightMode() {
        document.body.classList.add("night");
        document.body.classList.remove("day");
        AudioEngine.play("audioNight");
    }
};

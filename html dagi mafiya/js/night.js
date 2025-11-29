const Night = {
    start() {
        UI.setNightMode();
        UI.setPhase("🌙 Tun boshlandi");
        UI.showPopup("nightPopup");

        const actionsContainer = document.getElementById("nightActions");
        actionsContainer.innerHTML = "";

        const alive = Main.players.filter(p => p.alive);

        // Tun harakatlarini prioritet bo‘yicha ro‘yxatlash:
        // 1. Cupidon sevishganlarni bog‘laydi
        const cupid = alive.find(p => p.role === "Cupidon");
        if (cupid) {
            const targets = alive.filter(p => p !== cupid);
            actionsContainer.innerHTML += `<p>Cupidon sevishganlarni tanlaydi...</p>`;
            // Random 2 sevishgan
            const shuffled = targets.sort(() => 0.5 - Math.random());
            const lovers = shuffled.slice(0, 2);
            lovers.forEach(p => p.love = lovers.filter(l => l !== p)[0]);
        }

        // 2. Doctor himoya qiladi
        const doctor = alive.find(p => p.role === "Doctor");
        if (doctor) {
            actionsContainer.innerHTML += `<p>Doctor kimni saqlashini tanlaydi...</p>`;
            // Random himoya
            const target = alive[Math.floor(Math.random() * alive.length)];
            target.protected = true;
        }

        // 3. Bodyguard himoya qiladi va o‘zi fido bo‘ladi
        const bodyguard = alive.find(p => p.role === "Bodyguard");
        if (bodyguard) {
            actionsContainer.innerHTML += `<p>Bodyguard himoya qiladi...</p>`;
            const targets = alive.filter(p => p !== bodyguard);
            const protectTarget = targets[Math.floor(Math.random() * targets.length)];
            protectTarget.protected = true;
        }

        // 4. Mafia va Don harakati
        const mafiaPlayers = alive.filter(p => ["Mafia", "Don"].includes(p.role));
        if (mafiaPlayers.length > 0) {
            const targets = alive.filter(p => !["Mafia", "Don"].includes(p.role));
            const victim = targets[Math.floor(Math.random() * targets.length)];
            victim.toDie = true;
            actionsContainer.innerHTML += `<p>Mafia kimni o‘ldirishini tanlaydi...</p>`;
        }

        // 5. Sniper o‘qini ishlatadi (bir martalik)
        const sniper = alive.find(p => p.role === "Sniper" && !p.shot);
        if (sniper) {
            const targets = alive.filter(p => p !== sniper);
            const target = targets[Math.floor(Math.random() * targets.length)];
            target.toDie = true;
            sniper.shot = true;
            actionsContainer.innerHTML += `<p>Sniper o‘qini ishlatdi!</p>`;
        }

        // 6. Maniac o‘ldiradi
        const maniac = alive.find(p => p.role === "Maniac");
        if (maniac) {
            const targets = alive.filter(p => p !== maniac);
            const target = targets[Math.floor(Math.random() * targets.length)];
            target.toDie = true;
            actionsContainer.innerHTML += `<p>Maniac harakat qildi!</p>`;
        }

        // 7. Don Sherifdan yashirinadi (tuzatildi rollarda)

        // Tun tugadi → Day bosqichi
        setTimeout(() => this.end(), 3000);
    },

    end() {
        const alive = Main.players.filter(p => p.alive);

        // Himoya tekshiruvi
        alive.forEach(p => {
            if (p.toDie) {
                if (p.protected) {
                    p.toDie = false; // Himoya saqlaydi
                } else {
                    p.alive = false;
                    AudioEngine.play("audioKill");

                    // Sevishganlar tizimi
                    if (p.love) {
                        p.love.alive = false;
                        AudioEngine.play("audioKill");
                    }
                }
            }
            // Reset flags
            p.protected = false;
            p.toDie = false;
        });

        UI.renderPlayers(Main.players);
        UI.hidePopup("nightPopup");
        Day.start();
    }
};

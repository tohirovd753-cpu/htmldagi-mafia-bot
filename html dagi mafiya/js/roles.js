const Roles = {
    availableRoles: [
        "Mafia", "Don", "Sherif", "Doctor",
        "Bodyguard", "Cupidon", "Sniper", "Maniac"
    ],

    assign(players) {
        // Playerlar soni katta bo‘lsa, extra Mafia qo‘shish
        let roles = [...this.availableRoles];

        // Agar o‘yinchilar 8+ bo‘lsa, 1–2 ta Mafia qo‘shish
        const extraMafiaCount = Math.max(0, players.length - roles.length);
        for (let i = 0; i < extraMafiaCount; i++) {
            roles.push("Mafia");
        }

        // Shuffle roles
        roles = roles.sort(() => 0.5 - Math.random());

        // Har bir playerga rol tayinlash
        players.forEach((p, i) => {
            p.role = roles[i] || "Fuqaro"; // Agar yetarli rollar bo‘lmasa → Town
            // Maxsus flaglar
            p.alive = true;
            p.love = null;
            p.protected = false;
            p.shot = false; // Sniper uchun
            p.toDie = false; // Night kill flag
            p.shownDeath = false; // Day popup uchun
        });
    }
};

const Chat = {
    messages: [],
    
    init() {
        // Chat oynasi yaratish
        if (!document.getElementById("chatArea")) {
            const chatDiv = document.createElement("div");
            chatDiv.id = "chatArea";
            chatDiv.style.position = "fixed";
            chatDiv.style.bottom = "10px";
            chatDiv.style.right = "10px";
            chatDiv.style.width = "300px";
            chatDiv.style.height = "400px";
            chatDiv.style.background = "rgba(0,0,0,0.5)";
            chatDiv.style.backdropFilter = "blur(8px)";
            chatDiv.style.borderRadius = "15px";
            chatDiv.style.padding = "10px";
            chatDiv.style.overflowY = "auto";
            chatDiv.style.color = "#fff";
            chatDiv.style.fontSize = "0.9rem";

            const input = document.createElement("input");
            input.id = "chatInput";
            input.placeholder = "Xabar yozing...";
            input.style.width = "100%";
            input.style.marginTop = "5px";
            input.style.borderRadius = "8px";
            input.style.border = "none";
            input.style.padding = "5px";
            input.style.outline = "none";

            input.addEventListener("keypress", (e) => {
                if (e.key === "Enter") {
                    Chat.send(e.target.value);
                    e.target.value = "";
                }
            });

            chatDiv.appendChild(input);
            document.body.appendChild(chatDiv);
        }
    },

    send(message) {
        if (!message.trim()) return;

        // Tun yoki kun holatiga qarab xabar
        let phase = document.body.classList.contains("night") ? "night" : "day";

        // Mafia chat: faqat Mafia/Don xabar yuborishi mumkin tun paytida
        if (phase === "night") {
            const mafiaNames = Main.players.filter(p => ["Mafia", "Don"].includes(p.role) && p.alive).map(p => p.name);
            if (!mafiaNames.includes(Chat.currentPlayer)) return;
        }

        this.messages.push({ text: message, phase: phase, player: Chat.currentPlayer });
        this.render();
    },

    render() {
        const chatDiv = document.getElementById("chatArea");
        chatDiv.innerHTML = ""; // tozalash

        this.messages.forEach(msg => {
            // Tun paytida faqat mafia xabar ko‘rsatiladi, kun paytida hamma
            if (msg.phase === "day" || (msg.phase === "night" && ["Mafia", "Don"].includes(Main.players.find(p => p.name === msg.player)?.role))) {
                const div = document.createElement("div");
                div.innerHTML = `<strong>${msg.player}:</strong> ${msg.text}`;
                chatDiv.appendChild(div);
            }
        });

        const input = document.createElement("input");
        input.id = "chatInput";
        input.placeholder = "Xabar yozing...";
        input.style.width = "100%";
        input.style.marginTop = "5px";
        input.style.borderRadius = "8px";
        input.style.border = "none";
        input.style.padding = "5px";
        input.style.outline = "none";
        input.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                Chat.send(e.target.value);
                e.target.value = "";
            }
        });

        chatDiv.appendChild(input);
        chatDiv.scrollTop = chatDiv.scrollHeight;
    },

    currentPlayer: null, // set qilish kerak: kim xabar yozayotganini bilish uchun
};

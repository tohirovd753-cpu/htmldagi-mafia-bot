const AudioEngine = {
    night: new Audio("sounds/night.mp3"),
    kill: new Audio("sounds/kill.mp3"),
    day: new Audio("sounds/day.mp3"),
    winMafia: new Audio("sounds/win-mafia.mp3"),
    winTown: new Audio("sounds/win-town.mp3"),

    play(name) {
        if (this[name]) this[name].play();
    }
};

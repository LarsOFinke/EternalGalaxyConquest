"use strict";
import { Game } from "./models/Game.js";
export var game;



// ### BACKEND COMMUNICATION ### //

// Connect to the Flask-SocketIO server with credentials (cookies) //
const socket = io.connect(`${socket_url}`, {
    withCredentials: true  // Ensure the session cookie is sent with the WebSocket connection
});

// Listen for the 'welcome' message from the server //
socket.on('welcome', (data) => {
    let msg = data["message"];
    document.getElementById("welcome-msg").textContent = msg;

    register_player();
});

// Register Player //
function register_player() {
    socket.emit("register_player", { user: username })
};

// Start the game //
function startGame() {
    socket.emit('start_game', { user: username });  // Notify the backend to start the game

    document.getElementById("welcome-msg").remove();

    const next_round_btn = document.createElement("button");
    next_round_btn.id = "next-round";
    next_round_btn.className = "btn-small";
    next_round_btn.textContent = "Fertig!";
    next_round_btn.addEventListener("click", event => nextRound(event));
    const start_game_btn = document.getElementById("start-game");
    start_game_btn.insertAdjacentElement("beforebegin", next_round_btn);
    start_game_btn.remove();

};
document.getElementById("start-game").addEventListener("click", e => startGame());

//  Listen for game start //
socket.on("new_game_started", data => {
    console.log("Game started with state (Backend):");
    console.log(data["game_state"]);

    data["game_state"]["player_states"].forEach(e => {
        if (e.name === username) {
            window.player_id = e.player_id;
        }
    });

    game = new Game(data.host, data["game_state"]);
    game.spawn_game_field(data["game_state"]["tile_states"]);

});

// Listen for game updates from the server //
socket.on('game_update', (game_state) => {
    console.log("Game state updated (Backend):");
    console.log(game_state);

    game.updateGameState(game_state);
});

// Listen for 'your_turn' event //
socket.on('your_turn', data => {
    if (parseInt(data.player) === window.player_id) {
        alert(username + ", it's your turn!");
    }

    console.log("Current Game-State (Frontend):");
    console.log(game);
});

// Send player input (actions) to the server //
export function sendPlayerActions(action) {
    socket.emit('player_input', { 
        host: game.host, 
        player: window.player_id,
        "action": action   // Send player action to the backend
    });  
};

// Listen for the result of the player action //
socket.on("result_player_action", data => {
    // const result_box = document.getElementById("result_box");
    // if (result_box === null) {
    //     const result_box = document.createElement("div");
    //     result_box.id = "result_box";
    //     document.querySelector("h1").insertAdjacentElement("afterend", result_box);
    //     result_box.textContent = data["message"];
    // } else {
    //     result_box.textContent = data["message"];
    // }
    
    alert(data["message"]);
    console.log(data);
    if (data.success) {
        game.playerActionUpdate(data.player, data.update);
    }
});

function nextRound() {
    socket.emit("next_round", {
        host: game.host, 
        player: window.player_id
    });
};


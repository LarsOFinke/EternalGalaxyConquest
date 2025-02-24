"use strict";



// ### INITIALIZATION ### //

// Connect to the Flask-SocketIO server with credentials (cookies)
const socket = io('http://localhost:5000', {
    withCredentials: true  // Ensure the session cookie is sent with the WebSocket connection
  });
  

// Listen for the 'welcome' message from the server
socket.on('welcome', (data) => {
    let msg = data["message"]
    document.getElementById("welcome-msg").textContent = msg

    register_player()
    const start_button = document.createElement("button");
    start_button.id = "start_button";
    start_button.textContent = "Start Game";
    start_button.onclick = startGame;
    document.getElementById('gameState').insertAdjacentElement("afterend", start_button);
})



// ### GAME COMMUNICATION ### //

// Register Player
function register_player() {
    socket.emit("register_player", { user: username })
}

// Start the game
function startGame() {
    socket.emit('start_game', { user: username });  // Notify the backend to start the game

    document.getElementById("start_button").remove();
    document.getElementById("welcome-msg").remove();

    const send_data_button = document.createElement("button");
    send_data_button.id = "send_data_button";
    send_data_button.textContent = "Send Data";
    send_data_button.onclick = getPlayerInput;
    document.getElementById('gameState').insertAdjacentElement("afterend", send_data_button);
}

//  Listen for host assignment
socket.on("host", data => {
    window.host = data.host;
})

//  Listen for player_id assignment
socket.on("players", data => {
    data.forEach(e => {
        if (e.name === username) {
            window.user_id = e.player_id;
        }
    });
})


// Listen for 'your_turn' event
socket.on('your_turn', data => {
    if (parseInt(data.player) === window.user_id) {
        alert(username + ", it's your turn!");
    }
    
});


// Listen for game updates from the server
socket.on('game_update', (gameState) => {
    console.log('Updated game state:', gameState);
    document.getElementById('gameState').innerHTML = JSON.stringify(gameState);
});


// Listen for the result of the player action
socket.on("result_player_action", data => {
    const result_box = document.getElementById("result_box");
    if (result_box === null) {
        const result_box = document.createElement("div");
        result_box.id = "result_box";
        document.querySelector("h1").insertAdjacentElement("afterend", result_box);
        result_box.textContent = data["message"];
    }
    result_box.textContent = data["message"];
})


// Get Player input from buttons, forms etc
function getPlayerInput() {
    sendPlayerInput("test");
}


// Send player input (action) to the server
function sendPlayerInput(action) {
    socket.emit('player_input', 
                { payload:  {
                                "player": window.user_id,
                                "category": "buildings",
                                "location": ["factory", "Hauptstadt", "Heimatplanet"],
                                "target": "Builders Hut",
                                "action": "Get Workers",
                                "context": ["dump",]
                            },
     host: window.host, user_id: window.user_id });  // Send player action to the backend
}

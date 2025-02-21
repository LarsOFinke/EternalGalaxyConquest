"use strict";



// ### INITIALIZATION ### //

// Connect to the Flask-SocketIO server
const socket = io('http://localhost:5000');

// Listen for the 'welcome' message from the server
socket.on('welcome', (data) => {
    window.user_id = data.user_id;

    const start_button = document.createElement("button");
    start_button.id = "start_button";
    start_button.textContent = "Start Game";
    start_button.onclick = startGame;
    document.getElementById('gameState').insertAdjacentElement("afterend", start_button);
})



// ### GAME COMMUNICATION ### //

// Start the game
function startGame() {
    socket.emit('start_game');  // Notify the backend to start the game

    const start_button = document.getElementById("start_button");
    start_button.remove();

    const send_data_button = document.createElement("button");
    send_data_button.id = "send_data_button";
    send_data_button.textContent = "Send Data";
    send_data_button.onclick = getPlayerInput;
    document.getElementById('gameState').insertAdjacentElement("afterend", send_data_button);
}


// Listen for 'your_turn' event
socket.on('your_turn', function(data) {
    if (parseInt(data.player) === window.user_id) {
        alert(data.player + ", it's your turn!");
        // Enable game input UI for this player
    }
    
});


// Listen for game updates from the server
socket.on('game_update', (gameState) => {
    console.log('Updated game state:', gameState);
    document.getElementById('gameState').innerHTML = JSON.stringify(gameState);
});


function getPlayerInput() {
    sendPlayerInput("test");
}


// Send player input (action) to the server
function sendPlayerInput(action) {
    socket.emit('player_input', { action: action, user_id: window.user_id });  // Send player action to the backend
}

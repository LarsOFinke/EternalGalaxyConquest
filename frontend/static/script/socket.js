"use strict";



// ### INITIALIZATION ### //

// Connect to the Flask-SocketIO server
const socket = io('http://localhost:5000');

// Listen for the 'welcome' message from the server
socket.on('welcome', (data) => {
    console.log(data.message);  // Logs: "Welcome to the game!"
    const button = document.createElement("button");
    button.textContent = "Start Game";
    button.onclick = startGame();
})

// Start the game
function startGame() {
    socket.emit('start_game');  // Notify the backend to start the game
}


// ### GAME COMMUNICATION ### //

// Listen for game updates from the server
socket.on('game_update', (gameState) => {
    console.log('Updated game state:', gameState);
    document.getElementById('gameState').innerHTML = JSON.stringify(gameState);
});


// Send player input (action) to the server
function sendPlayerInput(action) {
    socket.emit('player_input', { action: action });  // Send player action to the backend
}

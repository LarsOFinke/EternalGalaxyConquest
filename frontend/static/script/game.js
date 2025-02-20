"use strict";


// Establish a WebSocket connection to the Python server
const socket = new WebSocket('ws://localhost:8765');

// When the connection is open, you can send data to the server
socket.addEventListener('open', function(event) {
    console.log('Connected to the WebSocket server');
});

// Listen for incoming messages from the server
socket.addEventListener('message', function(event) {
    console.log('Message from server:', event.data);

    // Parse the incoming message
    const gameData = JSON.parse(event.data);

    if (gameData.turn === 'player') {
        alert('It\'s your turn!');
        // Prompt player to make a move
        const playerMove = prompt('Enter your move (e.g., "move 1,1 to 2,2"):');

        // Send the player's move to the server
        socket.send(JSON.stringify({ action: 'player_move', move: playerMove }));
    } else if (gameData.turn === 'ai') {
        alert('It\'s the AI\'s turn!');
        // Display AI's move
        const aiMove = gameData.ai_move;
        console.log('AI move:', aiMove);
        alert(`AI has made a move: ${aiMove.from} to ${aiMove.to}`);
    }
});

// Handle connection close or errors
socket.addEventListener('close', function(event) {
    console.log('Disconnected from the WebSocket server');
});

socket.addEventListener('error', function(event) {
    console.error('WebSocket error:', event);
});
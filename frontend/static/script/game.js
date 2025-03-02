"use strict";
import { Game } from "./models/Game.js";
var game;



// ### INITIALIZATION ### //

function spawn_game_field() {
    const game_field = document.getElementById("game_field");

    for (let i=1; i<=12; i++) {
        let new_tile = document.createElement("div");
        new_tile.id = i;
        new_tile.addEventListener("click", event => inspectTile(event));

        if (i === 2) {
            new_tile.classList = "hex color2";
            const home_planet = document.createElement("div");
            home_planet.classList = "home_planet";
            new_tile.insertAdjacentElement("afterbegin", home_planet);
        } else if (i === 11) {
            new_tile.classList = "hex color3";
        } else {
            new_tile.classList = "hex color1";
        }

        game_field.insertAdjacentElement("beforeend", new_tile);
    }
};

spawn_game_field()

// Connect to the Flask-SocketIO server with credentials (cookies) //
const socket = io(`${socket_url}`, {
    withCredentials: true  // Ensure the session cookie is sent with the WebSocket connection
  });

// Listen for the 'welcome' message from the server //
socket.on('welcome', (data) => {
    let msg = data["message"];
    document.getElementById("welcome-msg").textContent = msg;

    register_player();
    startGame();
})



// ### GAME COMMUNICATION ### //

// Register Player //
function register_player() {
    socket.emit("register_player", { user: username })
}

// Start the game //
function startGame() {
    socket.emit('start_game', { user: username });  // Notify the backend to start the game
    document.getElementById("welcome-msg").remove();
    game = new Game();
}

//  Listen for host assignment //
socket.on("host", data => {
    window.host = data.host;
})

//  Listen for player_id assignment //
socket.on("players", data => {
    data.forEach(e => {
        if (e.name === username) {
            window.user_id = e.player_id;
        }
    });
})

// Listen for 'your_turn' event //
socket.on('your_turn', data => {
    if (parseInt(data.player) === window.user_id) {
        alert(username + ", it's your turn!");
    }
    
});

// Listen for game updates from the server //
socket.on('game_update', (gameState) => {
    console.log('Updated game state:', gameState);
});

// Listen for the result of the player action //
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



// ### FRONTEND FUNCTIONALITY ### //
//<div id="build-menu">
//    <button class="btn">Baumenü</button>
//</div>
function spawnTileContextMenu(tile_menu, tile) {
    switch (tile.tile_type) {
        case "home_planet":
            const tile_menu_header = document.createElement("h4");
            tile_menu_header.textContent = tile.tile_content.planet_name;
            tile_menu.insertAdjacentElement("afterbegin", tile_menu_header);

    }
    
    
}


function spawnTileMenu(event) {
    let tile_menu = document.getElementById("tile-menu");
    if (tile_menu !== null) {
        tile_menu.remove();
    }

    // SPAWN OVERLAY CONTAINER + CORE ELEMENTS //
    tile_menu = document.createElement("div");
    tile_menu.id = "tile-menu";
    const close_btn = document.createElement("button");
    close_btn.id = "close-btn";
    close_btn.className = "bordered";
    close_btn.textContent = "X";
    close_btn.addEventListener("click", e => document.getElementById("tile-menu").remove());
    tile_menu.insertAdjacentElement("afterbegin", close_btn);
    document.getElementById("next-round").insertAdjacentElement("afterend", tile_menu);

    // SEARCH THE SELECTED TILE IN THE GAME-OBJECT //
    for (let tile of game.tile_list) {
        if (parseInt(tile.tile_id) === parseInt(event.srcElement.id)) {
            spawnTileContextMenu(tile_menu, tile);
            
        }
    }
}


function inspectTile(event) {
    event.preventDefault();
    spawnTileMenu(event);

}


// Get Player input from buttons, forms etc //
function nextRound() {
    sendPlayerActions({
        "category": "buildings",
        "location": ["factory", "Hauptstadt", "Heimatplanet"],
        "target": "Builders Hut",
        "action": "Get Workers",
        "context": ["dump",]
    });
}

// Send player input (actions) to the server //
function sendPlayerActions(actions) {
    socket.emit('player_input', 
                { 
                    host: window.host, 
                    user_id: window.user_id,
                    payload:  {
                                "player": window.user_id,
                                "payload": actions   // Send player action to the backend
                              }
                });  
}


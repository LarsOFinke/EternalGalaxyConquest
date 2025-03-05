"use strict";
import { Game } from "./models/Game.js";
var game;



// ### INITIALIZATION ### //

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



// ### GAME COMMUNICATION ### //

function nextRound() {
    socket.emit("next_round", {
        host: game.host, 
        player: window.player_id
    });
};


// Send player input (actions) to the server //
function sendPlayerActions(action) {
    socket.emit('player_input', { 
        host: game.host, 
        player: window.player_id,
        "action": action   // Send player action to the backend
    });  
};

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
    console.log("Game started with state:");
    console.log(data["game_state"]);

    data["game_state"]["player_states"].forEach(e => {
        if (e.name === username) {
            window.player_id = e.player_id;
        }
    });

    game = new Game(data.host, data["game_state"]);
    game.spawn_game_field(data["game_state"]["tile_states"]);

});

// Listen for 'your_turn' event //
socket.on('your_turn', data => {
    if (parseInt(data.player) === window.player_id) {
        alert(username + ", it's your turn!");
    }
    
});

// Listen for game updates from the server //
socket.on('game_update', (gameState) => {
    console.log("Game state updated:");
    console.log(gameState);
});

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
});



// ### FRONTEND FUNCTIONALITY ### //

function changePlanetName(event) {
    event.preventDefault();

};


function buildBuildersHut(event) {
    event.preventDefault();

    // ADD CITY SELECTION FOR PAYLOAD // 
    const payload = {
        "category": "locations",
        "location": ["settlements", "admin's Planet"],
        "target": "Hauptstadt",
        "action": "Build",
        "context": ["Builders Hut",]
    };

    sendPlayerActions(payload)
};


function spawnBuildMenu() {
    // SPAWN OVERLAY CONTAINER + CORE ELEMENTS //
    const build_menu_container = document.createElement("div");
    build_menu_container.id = "build-menu-container";
    build_menu_container.className = "bordered";
    const build_menu_header = document.createElement("h4");
    build_menu_header.id = "build-menu-header";
    build_menu_header.textContent = "Baumenü";
    build_menu_container.insertAdjacentElement("afterbegin", build_menu_header);
    const close_btn = document.createElement("button");
    close_btn.classList = "close-btn bordered";
    close_btn.textContent = "X";
    close_btn.addEventListener("click", e => document.getElementById("build-menu-container").remove());
    build_menu_container.insertAdjacentElement("afterbegin", close_btn);
    
    // HOME-PLANET MENU //
    const build_builders_hut_input_box = document.createElement("div");
    build_builders_hut_input_box.className = "small-input-box";
    const build_builders_hut_lbl = document.createElement("label");
    build_builders_hut_lbl.id = "build-builders-hut-lbl";
    build_builders_hut_lbl.textContent = "Bauhütte";
    build_builders_hut_input_box.insertAdjacentElement("afterbegin", build_builders_hut_lbl);
    const build_builders_hut_btn = document.createElement("button");
    build_builders_hut_btn.id = "build-builders-hut-btn";
    build_builders_hut_btn.className = "btn-small";
    build_builders_hut_btn.textContent = "Bauen";
    build_builders_hut_btn.addEventListener("click", event => buildBuildersHut(event));
    build_builders_hut_input_box.insertAdjacentElement("beforeend", build_builders_hut_btn);
    build_menu_container.insertAdjacentElement("beforeend", build_builders_hut_input_box);

    // APPEND BUILD-MENU TO THE FRONTEND //
    document.getElementById("next-round").insertAdjacentElement("afterend", build_menu_container);


};


function createPlanetTileContextMenu(tile_menu_container, tile) {
    const planet_name_container = document.createElement("div");
    planet_name_container.id = "planet-name-container";
    planet_name_container.className = "centered";

    const planet_name_label = document.createElement('label');
    planet_name_label.setAttribute("for", "planet-name");
    planet_name_label.textContent = "Name des Planeten:";
    planet_name_container.insertAdjacentElement("beforeend", planet_name_label);

    const planet_name_input_box = document.createElement("div");
    planet_name_input_box.className = "small-input-box";
    const planet_name_input = document.createElement('input');
    planet_name_input.type = "text";
    planet_name_input.id = "planet-name";
    planet_name_input.value = tile.tile_content.planet_name;
    planet_name_input_box.insertAdjacentElement("beforeend", planet_name_input);
    const planet_name_btn = document.createElement("button");
    planet_name_btn.className = "btn-small";
    planet_name_btn.textContent = "Bestätigen";
    planet_name_btn.addEventListener("click", event => changePlanetName(event));
    planet_name_input_box.insertAdjacentElement("beforeend", planet_name_btn);
    planet_name_container.insertAdjacentElement("beforeend", planet_name_input_box);

    tile_menu_container.insertAdjacentElement("beforeend", planet_name_container);

    const build_menu_btn = document.createElement("button");
    build_menu_btn.id = "build-menu-btn";
    build_menu_btn.className = "btn-small";
    build_menu_btn.textContent = "Baumenü";
    build_menu_btn.addEventListener("click", event => spawnBuildMenu(event));
    tile_menu_container.insertAdjacentElement("beforeend", build_menu_btn);

};

function spawnTileContextMenu(tile_menu_container, tile) {
    const tile_menu_header = document.createElement("h4");
    tile_menu_header.textContent = tile.tile_content.tile_name;
    tile_menu_container.insertAdjacentElement("afterbegin", tile_menu_header);

    switch (tile.tile_type) {
        case "planet":
            createPlanetTileContextMenu(tile_menu_container, tile) 

    }
    
};


function spawnTileMenu(event) {
    let tile_menu_container = document.getElementById("tile-menu-container");
    if (tile_menu_container !== null) {
        tile_menu_container.remove();
    }

    // SPAWN OVERLAY CONTAINER + CORE ELEMENTS //
    tile_menu_container = document.createElement("div");
    tile_menu_container.id = "tile-menu-container";
    tile_menu_container.className = "bordered";
    const close_btn = document.createElement("button");
    close_btn.classList = "close-btn bordered";
    close_btn.textContent = "X";
    close_btn.addEventListener("click", e => document.getElementById("tile-menu-container").remove());
    tile_menu_container.insertAdjacentElement("afterbegin", close_btn);
    document.getElementById("next-round").insertAdjacentElement("afterend", tile_menu_container);

    // SEARCH THE SELECTED TILE IN THE GAME-OBJECT //
    for (let tile of game.fetchTileStates()) {
        if (parseInt(tile.id) === parseInt(event.srcElement.id)) {
            spawnTileContextMenu(tile_menu_container, tile);
            
        }
    }
};


export function inspectTile(event) {
    event.preventDefault();
    spawnTileMenu(event);

};


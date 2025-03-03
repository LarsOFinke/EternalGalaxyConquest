"use strict";
import { Game } from "./models/Game.js";
var game;



// ### INITIALIZATION ### //

function spawnHomePlanet(new_tile, color) {
    new_tile.classList = `hex ${color}`;

    const home_planet_container = document.createElement("div");
    home_planet_container.className = "home-planet";
    home_planet_container.id = new_tile.id;
    
    const home_planet = document.createElement("img");
    home_planet.id = new_tile.id;
    home_planet.classList = "home-planet-sprite";
    home_planet.src = "/api/sprite/1";
    home_planet.addEventListener("click", event => inspectTile(event));
    home_planet_container.insertAdjacentElement("afterbegin", home_planet);

    new_tile.insertAdjacentElement("afterbegin", home_planet_container);

};

function spawn_game_field() {
    const game_field = document.getElementById("game_field");

    for (let i=1; i<=12; i++) {
        let new_tile = document.createElement("div");
        new_tile.id = i;
        new_tile.addEventListener("click", event => inspectTile(event));

        if (i === 2) {
            spawnHomePlanet(new_tile, "color2")

        } else if (i === 11) {
            spawnHomePlanet(new_tile, "color3")

        } else {
            new_tile.classList = "hex color1";
        }

        game_field.insertAdjacentElement("beforeend", new_tile);
    }
};


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
    const start_game_btn = document.getElementById("start-game");
    start_game_btn.insertAdjacentElement("beforebegin", next_round_btn);
    start_game_btn.remove();

};
document.getElementById("start-game").addEventListener("click", e => startGame());

//  Listen for game start //
socket.on("game_started", data => {
    window.host = data.host;

    data["game_state"]["player_states"].forEach(e => {
        if (e.name === username) {
            window.user_id = e.player_id;
        }
    });

    game = new Game(data["game_state"]);
    spawn_game_field();

});

// Listen for 'your_turn' event //
socket.on('your_turn', data => {
    if (parseInt(data.player) === window.user_id) {
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
    const result_box = document.getElementById("result_box");
    if (result_box === null) {
        const result_box = document.createElement("div");
        result_box.id = "result_box";
        document.querySelector("h1").insertAdjacentElement("afterend", result_box);
        result_box.textContent = data["message"];
    } else {
        result_box.textContent = data["message"];
    }
    
});



// ### FRONTEND FUNCTIONALITY ### //

function changePlanetName(event) {
    event.preventDefault();

};


function buildBuildersHut(event) {
    event.preventDefault();

    // ADD CITY SELECTION FOR PAYLOAD // 
    const payload = {
        "player": 2,
        "category": "locations",
        "location": ["settlements", "Heimatplanet"],
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


function createHomePlanetTileContextMenu(tile_menu_container, tile) {
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
        case "home_planet":
            createHomePlanetTileContextMenu(tile_menu_container, tile) 

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
    for (let tile of game.tile_list) {
        if (parseInt(tile.tile_id) === parseInt(event.srcElement.id)) {
            spawnTileContextMenu(tile_menu_container, tile);
            
        }
    }
};


function inspectTile(event) {
    event.preventDefault();
    spawnTileMenu(event);

};


// Get Player input from buttons, forms etc //
function nextRound() {
    sendPlayerActions({
        "category": "buildings",
        "location": ["factory", "Hauptstadt", "Heimatplanet"],
        "target": "Builders Hut",
        "action": "Get Workers",
        "context": ["dump",]
    });
};
document.getElementById("next-round").addEventListener("click", event => nextRound(event));


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
};


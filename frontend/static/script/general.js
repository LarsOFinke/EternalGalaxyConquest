"use strict";



const socket_url = "ws://192.168.2.31:5000/";
const api_url = "http://192.168.2.31:5000/api/";


function createErrorBox(message) {
    const errorbox = document.getElementById("error_box");
    if (errorbox !== null) {
        errorbox.remove();
    }
    
    const error_box = document.createElement("div");
    error_box.id = "error_box";
    const error_message = document.createElement("p");
    error_message.textContent = message;
    error_box.insertAdjacentElement("afterbegin", error_message);
    const error_anchor = document.querySelector("form h1");
    error_anchor.insertAdjacentElement("afterend", error_box);
};

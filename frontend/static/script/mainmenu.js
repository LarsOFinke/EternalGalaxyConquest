"use strict";


document.getElementById("start").addEventListener("click", e => {
    e.preventDefault();
    window.location.href = "/game";
})


document.getElementById("profile").addEventListener("click", e => {
    e.preventDefault();
    window.location.href = "/profile";
})


document.getElementById("settings").addEventListener("click", e => {
    e.preventDefault();
    window.location.href = "/settings";
})

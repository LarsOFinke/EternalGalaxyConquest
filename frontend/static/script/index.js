"use strict";


document.querySelector(".wrapper form").addEventListener("submit", e => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const formData = {username, password};

    const submit_button = document.querySelector(".wrapper form button");
    if (submit_button.id === "login") {
        // Send login request to Flask backend
        fetch('http://127.0.0.1:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            let message = data.message;
            console.log(message);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    } else {
        const password_confirm = document.getElementById("password2").value;
        if (password == password_confirm) {
            // Send register request to Flask backend
            fetch("http://127.0.0.1:5000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                let message = data.message;
                console.log(message);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        } else {
            // Throw an error, passwords don't match
            console.log("Passwörter stimmen nicht überein")
        }
        
    }
    
});


function toggleShowPasswords() {
    const passwordInput = document.getElementById('password');
    const passwordConfirm = document.getElementById('password2')
    const showPasswordCheckbox = document.getElementById('showPassword');

    passwordInput.type = showPasswordCheckbox.checked === true ? "text" : "password";
    if (passwordConfirm !== null) {
        passwordConfirm.type = showPasswordCheckbox.checked === true ? "text" : "password";
    }
};


function toggleForms() {
    const header = document.querySelector(".wrapper form h1");
    const show_pw_label = document.querySelector("#show-password label");
    const button = document.querySelector(".wrapper form button");
    const anchor = document.querySelector(".register-link p a");

    if (header.textContent === "Login") {
        header.textContent = "Registrierung";
        show_pw_label.textContent = "Passwörter anzeigen";
        button.textContent = "Registrieren";
        button.id = "register";
        anchor.textContent = "Bereits registriert?";

        const pw2_box = document.createElement("div");
        pw2_box.setAttribute("class", "input-box");
        pw2_box.id = "pw2_box";
        
        const pw2_input = document.createElement("input");
        pw2_input.id = "password2";
        pw2_input.type = "password";
        pw2_input.placeholder = "Passwort bestätigen";
        pw2_input.required = true;
        pw2_box.insertAdjacentElement("afterbegin", pw2_input);
        document.getElementById("show-password").insertAdjacentElement("beforebegin", pw2_box);
    } else {
        header.textContent = "Login";
        show_pw_label.textContent = "Passwort anzeigen";
        button.textContent = "Einloggen";
        button.id = "login";
        anchor.textContent = "Noch nicht registriert?";
        document.getElementById("pw2_box").remove();
    }
};

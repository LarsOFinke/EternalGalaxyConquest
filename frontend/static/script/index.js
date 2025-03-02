"use strict";


document.querySelector(".wrapper form").addEventListener("submit", e => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const formData = {username, password};

    const submit_button = document.querySelector(".wrapper form button");
    if (submit_button.id === "login") {
        // Send login request to Flask backend
        fetch(`${api_url}auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            let success = data.success;
            if (success) {
                window.location.href = "/mainmenu";
            } else {
                createErrorBox("Login fehlgeschlagen!");
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    } else {
        const password_confirm = document.getElementById("password2").value;
        if (password == password_confirm) {
            // Send registration request to Flask backend
            fetch(`${api_url}auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                let success = data.success;
                if (success) {
                    toggleForms();
                    document.getElementById("username").value = "";
                    document.getElementById("password").value = "";
                    const errorbox = document.getElementById("error_box");
                    if (errorbox !== null) {
                        errorbox.remove();
                    }
                } else {
                    createErrorBox("Registrierung fehlgeschlagen!");
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        } else {
            // Throw an error, passwords don't match
            createErrorBox("Passwörter stimmen nicht überein");
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
    const button = document.querySelector(".wrapper form button");
    const anchor = document.querySelector(".register-link p a");

    if (header.textContent === "Login") {
        header.textContent = "Registrierung";
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

        const spacer_list = document.querySelectorAll(".spacer")
        spacer_list.forEach(e => e.remove());
    } else {
        header.textContent = "Login";

        const spacer_1 = document.createElement("br")
        const spacer_2 = document.createElement("br")
        const spacer_3 = document.createElement("br")
        const spacer_4 = document.createElement("br")
        spacer_1.classList.add("spacer");
        spacer_2.classList.add("spacer");
        spacer_3.classList.add("spacer");
        spacer_4.classList.add("spacer");
        document.querySelector("h1").insertAdjacentElement("beforebegin", spacer_1);
        document.querySelector("h1").insertAdjacentElement("afterend", spacer_2);
        document.getElementById("show-password").insertAdjacentElement("beforebegin", spacer_3);
        document.getElementById("show-password").insertAdjacentElement("afterend", spacer_4);

        button.textContent = "Einloggen";
        button.id = "login";
        anchor.textContent = "Noch nicht registriert?";
        document.getElementById("pw2_box").remove();
    }

    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    const errorbox = document.getElementById("error_box");
    if (errorbox !== null) {
        errorbox.remove();
    }
};

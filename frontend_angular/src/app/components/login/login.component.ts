import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  password: string = '';
  showPassword: boolean = false;

  toggleShowPasswords(event: any): void {
    // Toggle the showPassword value based on checkbox state
    this.showPassword = event.target.checked;
  };

}




// document.querySelector(".wrapper form").addEventListener("submit", e => {
//     e.preventDefault();
//     const username = document.getElementById("username").value;
//     const password = document.getElementById("password").value;
//     const formData = {username, password};

//     const submit_button = document.querySelector(".wrapper form button");
//     if (submit_button.id === "login") {
//         // Send login request to Flask backend
//         fetch(`${api_url}auth/login`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(formData)
//         })
//         .then(response => response.json())
//         .then(data => {
//             let success = data.success;
//             if (success) {
//                 window.location.href = "/mainmenu";
//             } else {
//                 createErrorBox("Login fehlgeschlagen!");
//             }
//         })
//         .catch(error => {
//             console.error('Error:', error);
//         });
//     } else {
//         const password_confirm = document.getElementById("password2").value;
//         if (password == password_confirm) {
//             // Send registration request to Flask backend
//             fetch(`${api_url}auth/register`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(formData)
//             })
//             .then(response => response.json())
//             .then(data => {
//                 let success = data.success;
//                 if (success) {
//                     toggleForms();
//                     document.getElementById("username").value = "";
//                     document.getElementById("password").value = "";
//                     const errorbox = document.getElementById("error_box");
//                     if (errorbox !== null) {
//                         errorbox.remove();
//                     }
//                 } else {
//                     createErrorBox("Registrierung fehlgeschlagen!");
//                 }
//             })
//             .catch(error => {
//                 console.error('Error:', error);
//             });
//         } else {
//             // Throw an error, passwords don't match
//             createErrorBox("Passwörter stimmen nicht überein");
//         }
        
//     }
    
// });

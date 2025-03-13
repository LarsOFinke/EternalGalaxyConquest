import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [
    RouterLink,
    FormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  password: string = '';
  password_confirm: string = '';
  showPassword: boolean = false;

  toggleShowPasswords(event: any): void {
    // Toggle the showPassword value based on checkbox state
    this.showPassword = event.target.checked;
  };
}

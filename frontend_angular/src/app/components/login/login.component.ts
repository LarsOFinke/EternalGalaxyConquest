import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LoginService } from './auth.service';
import { ErrorBoxComponent } from '../general_components/error-box/error-box.component';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    RouterLink,
    ErrorBoxComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  hasError: boolean = false;
  message: string = '';
  username: string = '';
  password: string = '';
  showPassword: boolean = false;

  private loginService = inject(LoginService);

  toggleShowPasswords(event: any): void {
    // Toggle the showPassword value based on checkbox state
    this.showPassword = event.target.checked;
  };

  login() {
    this.loginService.login(this.username, this.password).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        // if (response.success) {
          
        // }
      },
      error: (error) => {
        console.error('Login failed', error);
      }
    });
  }
}


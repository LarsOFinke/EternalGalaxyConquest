import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ErrorBoxComponent } from '../general_components/error-box/error-box.component';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  imports: [
    RouterLink,
    FormsModule,
    ErrorBoxComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  hasError: boolean = false;
  message: string = '';
  username: string = '';
  password: string = '';
  password_confirm: string = '';
  showPassword: boolean = false;

  private registerService = inject(RegisterService);
  private router = inject(Router);

  toggleShowPasswords(event: any): void {
    // Toggle the showPassword value based on checkbox state
    this.showPassword = event.target.checked;
  };

  register() {
    this.registerService.register(this.username, this.password).subscribe({
      next: (response) => {
        console.log('Register-API-Call successfull', response);
        // if (response.success) {
          console.log('Registration successful');
          this.router.navigate(["/"]);
        // }
      },
      error: (error) => {
        console.error('Registration failed', error);
      }
    });
  }
}

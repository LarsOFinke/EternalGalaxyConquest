import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { api_url } from '../../../main';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private httpClient = inject(HttpClient);

  // This method sends the username and password to the API endpoint
  register(username: string, password: string) {
    const payload = { username, password }; // Create the payload object

    return this.httpClient.post(`${api_url}auth/register`, payload); // Send a POST request with the payload
  }
}

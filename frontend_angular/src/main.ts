import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);

export const socket_url = environment.socket_url;
export const api_url = environment.api_url;

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));



export const socket_url = environment.socket_url;
export const api_url = environment.api_url;


// REPLACE DOM-INTERACTIONS WITH DATA BINDING //
export function createErrorBox(message: string) {
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
    if (error_anchor !== null) {
      error_anchor.insertAdjacentElement("afterend", error_box);
    } else {
      console.error("ERROR-ANCHOR NOT FOUND (form h1)");
    }
    
};

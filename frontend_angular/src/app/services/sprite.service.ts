import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { api_url } from '../../main';


@Injectable({
  providedIn: 'root'
})
export class SpriteService {
    private httpClient = inject(HttpClient);
  
    upload(sprite: File) {
      return this.httpClient.post(`${api_url}sprite/upload`, { sprite }); 
    };

    getSprite(sprite_id: string) {
        return this.httpClient.post(`${api_url}sprite/${sprite_id}`, { sprite_id }); 
    }
}
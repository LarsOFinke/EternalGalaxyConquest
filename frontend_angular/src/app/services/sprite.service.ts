import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { api_url } from '../../main';

@Injectable({
  providedIn: 'root',
})
export class SpriteService {
  private httpClient = inject(HttpClient);

  upload(sprite: File) {
    const formData = new FormData();
    formData.append('sprite', sprite);
    return this.httpClient.post(`${api_url}sprite/upload`, formData);
  }

  getSprite(sprite_id: string) {
    return this.httpClient.get(`${api_url}sprite/${sprite_id}`);
  }
}

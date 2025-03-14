import { Component, inject } from '@angular/core';
import { SpriteService } from '../../services/sprite.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-panel',
  imports: [FormsModule],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css',
})
export class AdminPanelComponent {
  private spriteService = inject(SpriteService);
  sprite_file: File | null = null;

  onFileSelected(event: any): void {
    const sprite: File = event.target.files[0];

    if (sprite) {
      this.sprite_file = sprite;
      console.log('Sprite selected:', sprite);
    }
  }

  uploadSprite() {
    if (this.sprite_file !== null) {
      this.spriteService.upload(this.sprite_file).subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => console.error(error),
      });
    }
  }
}

// document.getElementById("sprite-upload").addEventListener("click", event => {
//   event.preventDefault();

//   const fileInput = document.getElementById("sprite-file");
//   let new_sprite = fileInput.files[0];

//   const reader = new FileReader();
//   reader.onload = function(e) {
//           const fileData = e.target.result;

//           fetch(`${api_url}/sprite/upload`, {
//               method: "POST",
//               headers: {
//                   "Content-Type": "application/json"
//               },
//               body: JSON.stringify({fileData})
//           })
//           .then(response => response.json())
//           .then(data => {
//               console.log("Sprite uploaded", data);
//               fileInput.value = '';
//           })
//           .catch(error => {
//               console.error('Error uploading file:', error);
//           });
//       };

//   reader.readAsDataURL(new_sprite);

// })

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-box',
  imports: [],
  templateUrl: './error-box.component.html',
  styleUrl: './error-box.component.css',
})
export class ErrorBoxComponent {
  @Input() message: string = '';
}

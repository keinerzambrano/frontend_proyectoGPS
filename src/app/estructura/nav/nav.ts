
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css'
})
export class Nav {
  @Input() collapsed = false;
  @Output() navigate = new EventEmitter<void>();

  seleccionarOpcion(): void {
    this.navigate.emit();
  }
}

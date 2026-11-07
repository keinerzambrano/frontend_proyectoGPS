
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Nav } from './nav/nav';
import { Header } from './header/header';
import { Footer } from './footer/footer';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterOutlet, Nav, Header, Footer],
  templateUrl: './main.html',
  styleUrl: './main.css'
})
export class Main {
  menuColapsado = false;

  alternarMenu(): void {
    this.menuColapsado = !this.menuColapsado;
  }

  cerrarMenuEnMovil(): void {
    if (window.innerWidth <= 700) {
      this.menuColapsado = true;
    }
  }
}

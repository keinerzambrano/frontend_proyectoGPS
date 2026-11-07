
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  usuario = '';
  password = '';
  mensaje = '';
  cargando = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  iniciarSesion(): void {

    // Limpiar mensaje anterior
    this.mensaje = '';

    // Validar campos vacíos
    if (!this.usuario.trim() || !this.password.trim()) {

      this.mensaje = 'Ingresa tu usuario y contraseña.';

      return;
    }

    // Activar cargando
    this.cargando = true;

    this.authService.login(
      this.usuario.trim(),
      this.password
    ).subscribe({

      // ==========================================
      // RESPUESTA DEL SERVIDOR
      // ==========================================
      next: (respuesta) => {

        // SIEMPRE quitar cargando
        this.cargando = false;

        console.log('Respuesta del servidor:', respuesta);

        // ========================================
        // LOGIN CORRECTO
        // ========================================
        if (respuesta && respuesta.success === true) {

          localStorage.setItem(
            'token',
            respuesta.token
          );

          localStorage.setItem(
            'usuario',
            JSON.stringify(respuesta.usuario)
          );

          this.router.navigate(['/dashboard']);

          return;
        }

        // ========================================
        // LOGIN INCORRECTO
        // ========================================

        if (respuesta?.message) {

          this.mensaje = respuesta.message;

        } else {

          this.mensaje = 'Usuario o contraseña incorrectos';

        }

      },

      // ==========================================
      // ERROR DE CONEXIÓN / SERVIDOR
      // ==========================================
      error: (error) => {

        console.error('Error de login:', error);

        // IMPORTANTE:
        // quitar cargando aunque haya error
        this.cargando = false;

        // Si el servidor respondió con un mensaje
        if (error?.error?.message) {

          this.mensaje = error.error.message;

        } else {

          this.mensaje =
            'No se pudo conectar con el servidor.';

        }

      }

    });
  }
}

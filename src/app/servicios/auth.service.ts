import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl =
    'http://localhost/Proyecto/SoftwareGPS/backend/modelos/login.php';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}


  login(usuario: string, password: string): Observable<any> {

    return this.http.post<any>(
      this.apiUrl,
      {
        usuario: usuario,
        password: password
      }
    ).pipe(

      tap(respuesta => {

        if (respuesta.success) {

          localStorage.setItem(
            'token',
            respuesta.token
          );

          localStorage.setItem(
            'usuario',
            JSON.stringify(respuesta.usuario)
          );

        }

      })

    );
  }


  logout(): void {

    localStorage.removeItem('token');

    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);

  }


  estaAutenticado(): boolean {

    return !!localStorage.getItem('token');

  }


  obtenerUsuario(): any {

    const usuario =
      localStorage.getItem('usuario');

    if (!usuario) {
      return null;
    }

    return JSON.parse(usuario);

  }


  obtenerRol(): string {

    const usuario = this.obtenerUsuario();

    return usuario?.rol || '';

  }


  esAdministrador(): boolean {

    return this.obtenerRol() === 'administrador';

  }


  esInvitado(): boolean {

    return this.obtenerRol() === 'invitado';

  }

}
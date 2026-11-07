
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class productos {

  url = "http://localhost/Proyecto/SoftwareGPS/backend/controladores/productos.php";

  constructor(private http: HttpClient) {}

  consultar() {
    return this.http.get(`${this.url}?control=consultar`);
  }

  insertar(params: any) {
    return this.http.post(`${this.url}?control=insertar`, JSON.stringify(params));
  }

  editar(id: number, params: any) {
    return this.http.post(`${this.url}?control=editar&id=${id}`, JSON.stringify(params));
  }

  eliminar(id: number) {
    return this.http.get(`${this.url}?control=eliminar&id=${id}`);
  }

}

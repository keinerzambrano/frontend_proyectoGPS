
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './clientes.html',
  styleUrl: './clientes.css'
})
export class Clientes implements OnInit {

  // =====================================================
  // URL DEL PHP
  // =====================================================

  private url =
    'http://localhost/Proyecto/SoftwareGPS/backend/modelos/insertar_cliente.php';


  // =====================================================
  // LISTA DE CLIENTES
  // =====================================================

  clientes: any[] = [];


  // =====================================================
  // DATOS DEL FORMULARIO
  // =====================================================

  id_cliente: number = 0;

  nombre_completo: string = '';

  correo_electronico: string = '';

  telefono: string = '';

  direccion_envio: string = '';


  // =====================================================
  // ESTADOS
  // =====================================================

  mensaje: string = '';

  cargando: boolean = false;

  cargandoClientes: boolean = false;

  modoEdicion: boolean = false;


  // =====================================================
  // CONSTRUCTOR
  // =====================================================

  constructor(
    private http: HttpClient
  ) {}


  // =====================================================
  // INICIO
  // =====================================================

  ngOnInit(): void {

    this.cargarClientes();

  }


  // =====================================================
  // CARGAR CLIENTES
  // =====================================================

  cargarClientes(): void {

    this.cargandoClientes = true;

    this.http.get<any>(this.url).subscribe({

      next: (respuesta) => {

        console.log(
          'RESPUESTA AL CARGAR CLIENTES:',
          respuesta
        );


        if (respuesta.success) {

          // IMPORTANTE:
          // SI PHP NO DEVUELVE CLIENTES,
          // DEJAMOS UN ARRAY VACÍO.

          this.clientes =
            Array.isArray(respuesta.clientes)
              ? respuesta.clientes
              : [];

        } else {

          this.clientes = [];

          this.mensaje =
            respuesta.message || 'No se pudieron cargar los clientes';

        }


        this.cargandoClientes = false;

      },


      error: (error) => {

        console.error(
          'ERROR AL CARGAR CLIENTES:',
          error
        );


        this.clientes = [];

        this.cargandoClientes = false;

        this.mensaje =
          'Error al cargar los clientes';

      }

    });

  }


  // =====================================================
  // NUEVO CLIENTE
  // =====================================================

  nuevoCliente(): void {

    this.modoEdicion = false;

    this.id_cliente = 0;

    this.nombre_completo = '';

    this.correo_electronico = '';

    this.telefono = '';

    this.direccion_envio = '';

    this.mensaje = '';

  }


  // =====================================================
  // EDITAR CLIENTE
  // =====================================================

  editarCliente(cliente: any): void {

    this.modoEdicion = true;

    this.id_cliente =
      Number(cliente.id_cliente);

    this.nombre_completo =
      cliente.nombre_completo || '';

    this.correo_electronico =
      cliente.correo_electronico || '';

    this.telefono =
      cliente.telefono || '';

    this.direccion_envio =
      cliente.direccion_envio || '';

    this.mensaje = '';

  }


  // =====================================================
  // GUARDAR CLIENTE
  // =====================================================

  guardarCliente(): void {

    console.log(
      'guardarCliente() ejecutado'
    );


    if (this.modoEdicion) {

      this.actualizarCliente();

    } else {

      this.insertarCliente();

    }

  }


  // =====================================================
  // INSERTAR CLIENTE
  // =====================================================

  insertarCliente(): void {

    // VALIDAR

    if (
      !this.nombre_completo.trim() ||
      !this.correo_electronico.trim() ||
      !this.telefono.trim() ||
      !this.direccion_envio.trim()
    ) {

      this.mensaje =
        'Todos los campos son obligatorios';

      return;

    }


    this.cargando = true;

    this.mensaje = '';


    // DATOS

    const cliente = {

      nombre_completo:
        this.nombre_completo.trim(),

      correo_electronico:
        this.correo_electronico.trim(),

      telefono:
        this.telefono.trim(),

      direccion_envio:
        this.direccion_envio.trim()

    };


    console.log(
      'DATOS PARA INSERTAR:',
      cliente
    );


    // POST

    this.http.post<any>(
      this.url,
      cliente
    ).subscribe({

      next: (respuesta) => {

        console.log(
          'RESPUESTA INSERTAR:',
          respuesta
        );


        this.cargando = false;


        if (respuesta.success) {

          this.mensaje =
            'Cliente insertado correctamente';


          this.limpiarFormulario();


          // RECARGAR TABLA

          this.cargarClientes();

        } else {

          this.mensaje =
            respuesta.message ||
            'No se pudo insertar el cliente';

        }

      },


      error: (error) => {

        console.error(
          'ERROR AL INSERTAR CLIENTE:',
          error
        );


        this.cargando = false;


        this.mensaje =
          'Error al conectar con el servidor PHP';

      }

    });

  }


  // =====================================================
  // ACTUALIZAR CLIENTE
  // =====================================================

  actualizarCliente(): void {

    // VALIDAR

    if (
      !this.nombre_completo.trim() ||
      !this.correo_electronico.trim() ||
      !this.telefono.trim() ||
      !this.direccion_envio.trim()
    ) {

      this.mensaje =
        'Todos los campos son obligatorios';

      return;

    }


    this.cargando = true;

    this.mensaje = '';


    // DATOS

    const cliente = {

      id_cliente:
        this.id_cliente,

      nombre_completo:
        this.nombre_completo.trim(),

      correo_electronico:
        this.correo_electronico.trim(),

      telefono:
        this.telefono.trim(),

      direccion_envio:
        this.direccion_envio.trim()

    };


    console.log(
      'DATOS PARA ACTUALIZAR:',
      cliente
    );


    // PUT

    this.http.put<any>(
      this.url,
      cliente
    ).subscribe({

      next: (respuesta) => {

        console.log(
          'RESPUESTA ACTUALIZAR:',
          respuesta
        );


        this.cargando = false;


        if (respuesta.success) {

          this.mensaje =
            'Cliente actualizado correctamente';


          this.limpiarFormulario();


          this.modoEdicion = false;


          // RECARGAR TABLA

          this.cargarClientes();

        } else {

          this.mensaje =
            respuesta.message ||
            'No se pudo actualizar el cliente';

        }

      },


      error: (error) => {

        console.error(
          'ERROR AL ACTUALIZAR CLIENTE:',
          error
        );


        this.cargando = false;


        this.mensaje =
          'Error al actualizar el cliente';

      }

    });

  }


  // =====================================================
  // ELIMINAR CLIENTE
  // =====================================================

  eliminarCliente(cliente: any): void {

    const confirmar =
      window.confirm(
        '¿Está seguro de eliminar al cliente "' +
        cliente.nombre_completo +
        '"?'
      );


    if (!confirmar) {

      return;

    }


    const id =
      Number(cliente.id_cliente);


    console.log(
      'ELIMINANDO CLIENTE ID:',
      id
    );


    // DELETE

    this.http.delete<any>(
      this.url,
      {
        body: {
          id_cliente: id
        }
      }
    ).subscribe({

      next: (respuesta) => {

        console.log(
          'RESPUESTA ELIMINAR:',
          respuesta
        );


        if (respuesta.success) {

          this.mensaje =
            'Cliente eliminado correctamente';


          // RECARGAR TABLA

          this.cargarClientes();

        } else {

          this.mensaje =
            respuesta.message ||
            'No se pudo eliminar el cliente';

        }

      },


      error: (error) => {

        console.error(
          'ERROR AL ELIMINAR CLIENTE:',
          error
        );


        this.mensaje =
          'Error al eliminar el cliente';

      }

    });

  }


  // =====================================================
  // LIMPIAR FORMULARIO
  // =====================================================

  limpiarFormulario(): void {

    this.id_cliente = 0;

    this.nombre_completo = '';

    this.correo_electronico = '';

    this.telefono = '';

    this.direccion_envio = '';

  }

}
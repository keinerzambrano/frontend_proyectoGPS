import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './pedidos.html',
  styleUrl: './pedidos.css'
})
export class Pedidos implements OnInit {

  // URL DEL PHP
  private apiUrl =
    'http://localhost/Proyecto/SoftwareGPS/backend/modelos/pedidos.php';

  // Lista de pedidos
  pedidos: any[] = [];

  // Datos del formulario
  id_pedido: number = 0;
  cliente: string = '';
  origen: string = '';
  destino: string = '';
  vehiculo: string = '';
  estado: string = 'Pendiente';
  fecha: string = '';

  // Control
  modoEdicion: boolean = false;
  cargando: boolean = false;
  cargandoPedidos: boolean = false;

  mensaje: string = '';
  tipoMensaje: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarPedidos();
  }


  // ==========================================
  // CONSULTAR PEDIDOS
  // ==========================================

  cargarPedidos(): void {

    this.cargandoPedidos = true;

    this.http.get<any>(this.apiUrl).subscribe({

      next: (respuesta) => {

        if (respuesta.success) {

          this.pedidos = respuesta.pedidos;

        } else {

          this.pedidos = [];

          this.mostrarMensaje(
            respuesta.message || 'Error al consultar pedidos',
            'danger'
          );
        }

        this.cargandoPedidos = false;
      },

      error: (error) => {

        console.error('Error al consultar pedidos:', error);

        this.pedidos = [];

        this.mostrarMensaje(
          'No se pudo conectar con el servidor PHP',
          'danger'
        );

        this.cargandoPedidos = false;
      }

    });
  }


  // ==========================================
  // NUEVO PEDIDO
  // ==========================================

  nuevoPedido(): void {

    this.limpiarFormulario();

    this.modoEdicion = false;

    this.mensaje = '';
  }


  // ==========================================
  // EDITAR PEDIDO
  // ==========================================

  editarPedido(pedido: any): void {

    this.modoEdicion = true;

    this.id_pedido = Number(pedido.id_pedido);

    this.cliente = pedido.cliente;
    this.origen = pedido.origen;
    this.destino = pedido.destino;
    this.vehiculo = pedido.vehiculo;
    this.estado = pedido.estado;

    // Convertir fecha por si viene con formato diferente
    this.fecha = pedido.fecha
      ? String(pedido.fecha).substring(0, 10)
      : '';
  }


  // ==========================================
  // GUARDAR
  // ==========================================

  guardarPedido(): void {

    if (this.modoEdicion) {

      this.actualizarPedido();

    } else {

      this.insertarPedido();

    }
  }


  // ==========================================
  // INSERTAR
  // ==========================================

  insertarPedido(): void {

    if (!this.validarFormulario()) {
      return;
    }

    this.cargando = true;
    this.mensaje = '';

    const datos = {
      cliente: this.cliente,
      origen: this.origen,
      destino: this.destino,
      vehiculo: this.vehiculo,
      estado: this.estado,
      fecha: this.fecha
    };

    this.http.post<any>(this.apiUrl, datos).subscribe({

      next: (respuesta) => {

        if (respuesta.success) {

          this.mostrarMensaje(
            'Pedido insertado correctamente',
            'success'
          );

          this.limpiarFormulario();

          this.modoEdicion = false;

          this.cargarPedidos();

          // Cerrar modal
          const modal = document.getElementById('modalPedido');

          if (modal) {

            const botonCerrar =
              modal.querySelector('.btn-close') as HTMLElement;

            if (botonCerrar) {
              botonCerrar.click();
            }
          }

        } else {

          this.mostrarMensaje(
            respuesta.message || 'No se pudo insertar el pedido',
            'danger'
          );
        }

        this.cargando = false;
      },

      error: (error) => {

        console.error('Error al insertar pedido:', error);

        this.mostrarMensaje(
          'Error de conexión con PHP',
          'danger'
        );

        this.cargando = false;
      }

    });
  }


  // ==========================================
  // ACTUALIZAR
  // ==========================================

  actualizarPedido(): void {

    if (!this.validarFormulario()) {
      return;
    }

    this.cargando = true;

    const datos = {
      id_pedido: this.id_pedido,
      cliente: this.cliente,
      origen: this.origen,
      destino: this.destino,
      vehiculo: this.vehiculo,
      estado: this.estado,
      fecha: this.fecha
    };

    this.http.put<any>(this.apiUrl, datos).subscribe({

      next: (respuesta) => {

        if (respuesta.success) {

          this.mostrarMensaje(
            'Pedido actualizado correctamente',
            'success'
          );

          this.limpiarFormulario();

          this.modoEdicion = false;

          this.cargarPedidos();

          // Cerrar modal
          const modal = document.getElementById('modalPedido');

          if (modal) {

            const botonCerrar =
              modal.querySelector('.btn-close') as HTMLElement;

            if (botonCerrar) {
              botonCerrar.click();
            }
          }

        } else {

          this.mostrarMensaje(
            respuesta.message || 'No se pudo actualizar el pedido',
            'danger'
          );
        }

        this.cargando = false;
      },

      error: (error) => {

        console.error('Error al actualizar pedido:', error);

        this.mostrarMensaje(
          'Error de conexión con PHP',
          'danger'
        );

        this.cargando = false;
      }

    });
  }


  // ==========================================
  // ELIMINAR
  // ==========================================

  eliminarPedido(pedido: any): void {

    const confirmar = confirm(
      `¿Deseas eliminar el pedido #${pedido.id_pedido}?`
    );

    if (!confirmar) {
      return;
    }

    const datos = {
      id_pedido: Number(pedido.id_pedido)
    };

    this.http.delete<any>(this.apiUrl, {
      body: datos
    }).subscribe({

      next: (respuesta) => {

        if (respuesta.success) {

          this.mostrarMensaje(
            'Pedido eliminado correctamente',
            'success'
          );

          this.cargarPedidos();

        } else {

          this.mostrarMensaje(
            respuesta.message || 'No se pudo eliminar el pedido',
            'danger'
          );
        }

      },

      error: (error) => {

        console.error('Error al eliminar pedido:', error);

        this.mostrarMensaje(
          'Error de conexión con PHP',
          'danger'
        );
      }

    });
  }


  // ==========================================
  // VALIDAR
  // ==========================================

  validarFormulario(): boolean {

    if (
      !this.cliente.trim() ||
      !this.origen.trim() ||
      !this.destino.trim() ||
      !this.vehiculo.trim() ||
      !this.estado.trim() ||
      !this.fecha
    ) {

      this.mostrarMensaje(
        'Todos los campos son obligatorios',
        'warning'
      );

      return false;
    }

    return true;
  }


  // ==========================================
  // LIMPIAR
  // ==========================================

  limpiarFormulario(): void {

    this.id_pedido = 0;
    this.cliente = '';
    this.origen = '';
    this.destino = '';
    this.vehiculo = '';
    this.estado = 'Pendiente';
    this.fecha = '';
  }


  // ==========================================
  // MENSAJE
  // ==========================================

  mostrarMensaje(
    texto: string,
    tipo: string
  ): void {

    this.mensaje = texto;
    this.tipoMensaje = tipo;

    setTimeout(() => {

      this.mensaje = '';

    }, 4000);
  }

}
import { Routes } from '@angular/router';

import { Main } from './estructura/main';
import { Login } from './modulos/login/login';
import { NoEncontro } from './modulos/no-encontro/no-encontro';

export const routes: Routes = [

  // LOGIN
  {
    path: 'login',
    component: Login
  },

  // SISTEMA PRINCIPAL
  {
    path: '',
    component: Main,
    children: [

      {
        path: 'dashboard',
        loadComponent: () =>
          import('./modulos/dashboard/dashboard')
            .then(m => m.Dashboard)
      },

      {
        path: 'seguimiento',
        loadComponent: () =>
          import('./modulos/seguimiento/seguimiento')
            .then(m => m.Seguimiento)
      },

      {
        path: 'clientes',
        loadComponent: () =>
          import('./modulos/clientes/clientes')
            .then(m => m.Clientes)
      },

      {
        path: 'configuracion',
        loadComponent: () =>
          import('./modulos/configuracion/configuracion')
            .then(m => m.Configuracion)
      },

      {
        path: 'pedidos',
        loadComponent: () =>
          import('./modulos/pedidos/pedidos')
            .then(m => m.Pedidos)
      },

      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      }

    ]
  },

  // 404
  {
    path: '**',
    component: NoEncontro
  }

];
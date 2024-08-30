import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearClienteComponent } from './crear-cliente/crear-cliente.component';
import { ListarClientesComponent } from './listar-clientes/listar-clientes.component';

const routes: Routes = [
  {
    path: 'crear-cliente',
    component:CrearClienteComponent
  },


  {
    path: 'listar-clientes',
    component: ListarClientesComponent

  },

  {
    path: 'actualizar-cliente/:id_cliente',
    component:CrearClienteComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }

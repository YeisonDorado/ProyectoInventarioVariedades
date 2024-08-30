import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearVentaComponent } from './crear-venta/crear-venta.component';
import { ListarVentasComponent } from './listar-ventas/listar-ventas.component';

const routes: Routes = [
  {
    path: 'crear-venta',
    component: CrearVentaComponent
  },

  {
    path: 'listar-ventas',
    component:ListarVentasComponent
  },

  {
    path: 'actualizar-venta/:id_venta',
    component: CrearVentaComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VentaRoutingModule { }

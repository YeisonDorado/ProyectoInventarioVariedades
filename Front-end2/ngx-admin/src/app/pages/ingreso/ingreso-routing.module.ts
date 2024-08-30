import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearIngresoComponent } from './crear-ingreso/crear-ingreso.component';
import { ListarIngresosComponent } from './listar-ingresos/listar-ingresos.component';

const routes: Routes = [
  {
    path: 'crear-ingreso',
    component: CrearIngresoComponent
  },

  {
    path: 'listar-ingresos',
    component: ListarIngresosComponent
  },

  {
    path: 'actualizar-ingreso/:id_ingreso',
    component: CrearIngresoComponent
  },

  



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IngresoRoutingModule { }

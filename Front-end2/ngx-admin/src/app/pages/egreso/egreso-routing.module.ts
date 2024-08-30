import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearEgresoComponent } from './crear-egreso/crear-egreso.component';
import { ListarEgresosComponent } from './listar-egresos/listar-egresos.component';

const routes: Routes = [
  {
    path: 'crear-egreso',
    component:CrearEgresoComponent
  },

  {
    path: 'listar-egresos',
    component:ListarEgresosComponent
  },

  {
    path: 'actualizar-egreso/:id_egreso',
    component:CrearEgresoComponent
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EgresoRoutingModule { }

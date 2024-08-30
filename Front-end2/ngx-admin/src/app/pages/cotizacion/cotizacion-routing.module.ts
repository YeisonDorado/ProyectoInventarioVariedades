import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearCotizacionComponent } from './crear-cotizacion/crear-cotizacion.component';
import { ListarCotizacionComponent } from './listar-cotizacion/listar-cotizacion.component';

const routes: Routes = [

  {
    path: 'crear-cotizacion',
    component: CrearCotizacionComponent

  },

  {
   path: 'listar-cotizaciones',
   component: ListarCotizacionComponent
  },

  {
    path: 'actualizar-cotizacion/:id_cotizacion',
    component: CrearCotizacionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CotizacionRoutingModule { }

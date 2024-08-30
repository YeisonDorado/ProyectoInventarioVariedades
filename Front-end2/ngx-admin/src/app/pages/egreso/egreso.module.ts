import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EgresoRoutingModule } from './egreso-routing.module';
import { CrearEgresoComponent } from './crear-egreso/crear-egreso.component';
import { ListarEgresosComponent } from './listar-egresos/listar-egresos.component';
import { NbCardModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CrearEgresoComponent,
    ListarEgresosComponent
  ],
  imports: [
    CommonModule,
    EgresoRoutingModule,
    NbCardModule,
    FormsModule
  ]
})
export class EgresoModule { }

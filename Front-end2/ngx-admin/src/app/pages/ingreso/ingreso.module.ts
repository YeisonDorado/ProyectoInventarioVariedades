import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IngresoRoutingModule } from './ingreso-routing.module';
import { CrearIngresoComponent } from './crear-ingreso/crear-ingreso.component';
import { ListarIngresosComponent } from './listar-ingresos/listar-ingresos.component';
import { NbCardModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CrearIngresoComponent,
    ListarIngresosComponent
  ],
  imports: [
    CommonModule,
    IngresoRoutingModule,
    NbCardModule,
    FormsModule
  ]
})
export class IngresoModule { }

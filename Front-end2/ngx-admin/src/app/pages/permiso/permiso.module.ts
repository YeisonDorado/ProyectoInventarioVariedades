import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PermisoRoutingModule } from './permiso-routing.module';
import { CrearPermisoComponent } from './crear-permiso/crear-permiso.component';
import { ListarPermisosComponent } from './listar-permisos/listar-permisos.component';
import { NbCardModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CrearPermisoComponent,
    ListarPermisosComponent
  ],
  imports: [
    CommonModule,
    PermisoRoutingModule,
    NbCardModule,
    FormsModule
  ]
})
export class PermisoModule { }

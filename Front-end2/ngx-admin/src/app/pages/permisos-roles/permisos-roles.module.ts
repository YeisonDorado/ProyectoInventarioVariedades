import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PermisosRolesRoutingModule } from './permisos-roles-routing.module';
import { ListarPermisosRolesComponent } from './listar-permisos-roles/listar-permisos-roles.component';
import { CrearPermisosRolesComponent } from './crear-permisos-roles/crear-permisos-roles.component';
import { NbCardModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ListarPermisosRolesComponent,
    CrearPermisosRolesComponent
  ],
  imports: [
    CommonModule,
    PermisosRolesRoutingModule,
    NbCardModule,
    FormsModule
  ]
})
export class PermisosRolesModule { }

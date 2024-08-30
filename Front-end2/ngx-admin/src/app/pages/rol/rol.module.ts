import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolRoutingModule } from './rol-routing.module';
import { CrearRolComponent } from './crear-rol/crear-rol.component';
import { ListarRolesComponent } from './listar-roles/listar-roles.component'
import { NbCardModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms'; 

@NgModule({
  declarations: [
    CrearRolComponent,
    ListarRolesComponent
  ],
  imports: [
    CommonModule,
    RolRoutingModule,
    NbCardModule,
    FormsModule
  ]
})
export class RolModule { }

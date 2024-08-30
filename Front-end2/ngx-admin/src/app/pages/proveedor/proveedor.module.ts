import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProveedorRoutingModule } from './proveedor-routing.module';
import { CrearProveedorComponent } from './crear-proveedor/crear-proveedor.component';
import { ListarProveedoresComponent } from './listar-proveedores/listar-proveedores.component';
import { NbCardModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CrearProveedorComponent,
    ListarProveedoresComponent
  ],
  imports: [
    CommonModule,
    ProveedorRoutingModule,
    NbCardModule,
    FormsModule

  ]
})
export class ProveedorModule { }

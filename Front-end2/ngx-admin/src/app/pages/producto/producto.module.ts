import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductoRoutingModule } from './producto-routing.module';
import { CrearProductoComponent } from './crear-producto/crear-producto.component';
import { ListarProductosComponent } from './listar-productos/listar-productos.component';
import { NbCardModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [

    CrearProductoComponent,
    ListarProductosComponent
  ],
  imports: [
    CommonModule,
    ProductoRoutingModule,
    NbCardModule,
    FormsModule
  ]
})
export class ProductoModule { }

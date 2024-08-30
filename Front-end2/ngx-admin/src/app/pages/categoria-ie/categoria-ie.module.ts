import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriaIERoutingModule } from './categoria-ie-routing.module';
import { CrearCategoriaComponent } from './crear-categoria/crear-categoria.component';
import { ListarCategoriasComponent } from './listar-categorias/listar-categorias.component';
import { NbCardModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CrearCategoriaComponent,
    ListarCategoriasComponent
  ],
  imports: [
    CommonModule,
    CategoriaIERoutingModule,
    NbCardModule,
    FormsModule
  ]
})
export class CategoriaIEModule { }

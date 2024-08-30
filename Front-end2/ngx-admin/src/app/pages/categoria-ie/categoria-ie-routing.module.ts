import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearCategoriaComponent } from './crear-categoria/crear-categoria.component';
import { ListarCategoriasComponent } from './listar-categorias/listar-categorias.component';

const routes: Routes = [
  {
    path: 'crear-categoria',
    component:CrearCategoriaComponent
  }, 

  {
    path: 'listar-categorias',
    component:ListarCategoriasComponent
  }, 

  {
    path: 'actualizar-categoria/:id_categoria',
    component:CrearCategoriaComponent
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriaIERoutingModule { }

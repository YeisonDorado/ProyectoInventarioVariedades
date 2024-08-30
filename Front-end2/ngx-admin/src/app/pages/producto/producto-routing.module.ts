import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearProductoComponent } from './crear-producto/crear-producto.component';
import { ListarProductosComponent } from './listar-productos/listar-productos.component';

const routes: Routes = [
  {
    path: 'crear-producto',
    component:CrearProductoComponent
  }, 

  {
    path: 'listar-productos',
    component:ListarProductosComponent
  }, 

  {
    path:'actualizar-producto/:id_producto',
    component: CrearProductoComponent
  }



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductoRoutingModule { }

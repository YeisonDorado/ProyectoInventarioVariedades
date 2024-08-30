import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearProveedorComponent } from './crear-proveedor/crear-proveedor.component';
import { ListarProveedoresComponent } from './listar-proveedores/listar-proveedores.component';

const routes: Routes = [
  {
    path: 'crear-proveedor',
    component:CrearProveedorComponent
  },


  {
    path: 'listar-proveedores',
    component: ListarProveedoresComponent

  },

  
  {
    path: 'actualizar-proveedor/:id_proveedor',
    component: CrearProveedorComponent

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProveedorRoutingModule { }

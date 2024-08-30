import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearRolComponent } from './crear-rol/crear-rol.component';
import { ListarRolesComponent } from './listar-roles/listar-roles.component';

const routes: Routes = [
  {
    path: 'crear-rol',
    component: CrearRolComponent
  },


  {
    path: 'listar-roles',
    component: ListarRolesComponent
  },

  {
    path: 'actualizar-rol/:id_rol',
    component: CrearRolComponent
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolRoutingModule { }

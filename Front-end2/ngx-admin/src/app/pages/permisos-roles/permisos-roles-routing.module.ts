import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearPermisosRolesComponent } from './crear-permisos-roles/crear-permisos-roles.component';
import { ListarPermisosRolesComponent } from './listar-permisos-roles/listar-permisos-roles.component';

const routes: Routes = [
  {
    path: 'crear-permisos-roles',
    component: CrearPermisosRolesComponent
  },

  {
    path: 'listar-permisos-roles',
    component: ListarPermisosRolesComponent
  },

  {
    path: 'actualizar/:id_permisoRol',
    component: CrearPermisosRolesComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermisosRolesRoutingModule { }

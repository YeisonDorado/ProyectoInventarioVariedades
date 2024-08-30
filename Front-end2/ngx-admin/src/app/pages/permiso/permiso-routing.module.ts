import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearPermisoComponent } from './crear-permiso/crear-permiso.component';
import { ListarPermisosComponent } from './listar-permisos/listar-permisos.component';

const routes: Routes = [
  {
    path: 'crear-permiso',
    component: CrearPermisoComponent
  },

  {
    path: 'listar-permisos',
    component: ListarPermisosComponent
  },

  {
    path: 'actualizar-permiso/:id_permiso',
    component: CrearPermisoComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermisoRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';
import { ListarUsuariosComponent } from './listar-usuarios/listar-usuarios.component';

const routes: Routes = [
 

     {
      path:'login',
      component: LoginComponent
     },

    
     {
      path: 'crear-usuario',
      component: CrearUsuarioComponent
     },

     {
      path: 'listar-usuarios',
      component: ListarUsuariosComponent
     },

     {
      path:'actualizar-usuario/:id_usuario',
      component: CrearUsuarioComponent
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguridadRoutingModule { }

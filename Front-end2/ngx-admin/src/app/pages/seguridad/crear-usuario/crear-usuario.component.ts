import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Usuarios } from '../../../modelos/usuarios.model';
import { Rol } from '../../../modelos/rol.model';///////////////
import { RolService } from '../../../servicios/rol.service';////////////////
import { SeguridadService } from '../../../servicios/seguridad.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ngx-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.scss']
})
export class CrearUsuarioComponent {

  modoCreacion: boolean = true;
  id_usuario: string = "";
  intentoEnvio: boolean = false;
  elUsuario: Usuarios = {
  seudonimo: "",
  correo: "",
  contrasena: "",
  //token: "",
  rol_id: "",
  
};

elRol: Rol[] =[]; //arreglo que contiene la lista de proveedores

constructor(
  private miServicioSeguridad: SeguridadService,
  private miServicioRoles: RolService,// se llama los servicios de provvedores
  private rutaActiva: ActivatedRoute,
  private router: Router
) { }

ngOnInit(): void {
  if (this.rutaActiva.snapshot.params.id_usuario) {
    this.modoCreacion = false;
    this.id_usuario = this.rutaActiva.snapshot.params.id_usuario;
    this.getUsuarioConId(this.id_usuario);
  } else {
    this.modoCreacion = true;
  }
  this.getRol();// se llama el metodo que contiene la lista de roles
  
  
}

getUsuarioConId(id: string) {
  this.miServicioSeguridad.getUsuarioId(id).subscribe(data => {
    this.elUsuario = data;
  });
}

//metodo para obtener la lista de proveedores
getRol() {
  this.miServicioRoles.listar().subscribe((data: Rol[]) => {
    this.elRol = data;
  });
}



agregar(): void {
  if (this.validarDatosCompletos()) {
   this.intentoEnvio = true;
   console.log(this.elUsuario); // Añade este log para verificar los datos              
    this.miServicioSeguridad.crear(this.elUsuario).subscribe((usuarioCreado: Usuarios) => {
      console.log('usuario creado:', usuarioCreado);
      Swal.fire(
        'Creado',
        'El usuario ha sido creado correctamente',
        'success'
      );
      if (usuarioCreado._id && this.elUsuario.rol_id) {
        this.asignarRol(usuarioCreado._id, this.elUsuario.rol_id);// Llama a asignarROl después de crear el usuario
      } else {
        console.error('Error: usuario o rol no definido');
      }
    });

  }
}



editar(): void {
  this.intentoEnvio = true;
  if (this.validarDatosCompletos()) {
    this.miServicioSeguridad.editar(this.elUsuario._id, this.elUsuario).subscribe((usuarioCreado: Usuarios) => {
      Swal.fire(
        'Actualizado',
        'El usuario ha sido actualizado correctamente',
        'success'
      );
      if (usuarioCreado._id && this.elUsuario.rol_id) {
        this.asignarRol(usuarioCreado._id, this.elUsuario.rol_id);// Llama a asignarRol después de actualizar el USUARIO
      } else {
        console.error('Error: usuario o rol no definido');
      }
      
    });
  }
}


asignarRol(usuarioId: string, rolId: string): void {
  this.miServicioSeguridad.asignarRol(usuarioId, rolId).subscribe(data => {
    Swal.fire(
      'Rol Asignado',
      'El Rol ha sido asignado correctamente al usuario',
      'success'
    );
    this.router.navigate(["pages/seguridad/listar-usuarios"]);
  }, error => {
    Swal.fire(
      'Error',
      'Hubo un error al asignar el rol',
      'error'
    );
  });
}



validarDatosCompletos(): boolean {
  this.intentoEnvio = true;
  if (this.elUsuario.seudonimo == "" ||
      this.elUsuario.correo == "" ||
      this.elUsuario.contrasena == "" ||
      //this.elUsuario.token == "" ||
      this.elUsuario.rol_id == "") {
    return false;
  } else {
    return true;
  }
}


}

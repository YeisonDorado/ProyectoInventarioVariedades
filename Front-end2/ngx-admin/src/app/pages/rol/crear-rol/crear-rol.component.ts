import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Rol } from '../../../modelos/rol.model';
import { RolService } from '../../../servicios/rol.service';

@Component({
  selector: 'ngx-crear-rol',
  templateUrl: './crear-rol.component.html',
  styleUrls: ['./crear-rol.component.scss']
})
export class CrearRolComponent {

  modoCreacion: boolean = true;
  id_rol: string = "";
  intentoEnvio: boolean = false;
  elRol: Rol = {
  nombre: "",
  descripcion: "",
};

constructor(
  private miServicioRoles: RolService,
  private rutaActiva: ActivatedRoute,
  private router: Router
) { }

ngOnInit(): void {
  if (this.rutaActiva.snapshot.params.id_rol) {
    this.modoCreacion = false;
    this.id_rol = this.rutaActiva.snapshot.params.id_rol;
    this.getRol(this.id_rol);
  } else {
    this.modoCreacion = true;
  }
}

getRol(id: string) {
  this.miServicioRoles.getRol(id).subscribe(data => {
    this.elRol = data;
  });
}

agregar(): void {
  if (this.validarDatosCompletos()) {
    this.intentoEnvio = true;
    this.miServicioRoles.crear(this.elRol).subscribe(data => {
      Swal.fire(
        'Creado',
        'El Rol ha sido creado correctamente',
        'success'
      );
      this.router.navigate(["pages/rol/listar-roles"]);
    });
  }
}

editar(): void {
  this.intentoEnvio = true;
  if (this.validarDatosCompletos()) {
    this.miServicioRoles.editar(this.elRol._id, this.elRol).subscribe(data => {
      Swal.fire(
        'Actualizado',
        'El Rol ha sido actualizado correctamente',
        'success'
      );
      this.router.navigate(["pages/rol/listar-roles"]);
    });
  }
}

validarDatosCompletos(): boolean {
  this.intentoEnvio = true;
  if (this.elRol.nombre == "" ||
      this.elRol.descripcion == "") {
    return false;
  } else {
    return true;
  }
}



}

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Permiso } from '../../../modelos/permiso.model';
import { PermisoService } from '../../../servicios/permiso.service';

@Component({
  selector: 'ngx-crear-permiso',
  templateUrl: './crear-permiso.component.html',
  styleUrls: ['./crear-permiso.component.scss']
})
export class CrearPermisoComponent {

  modoCreacion: boolean = true;
  id_permiso: string = "";
  intentoEnvio: boolean = false;
  elPermiso: Permiso = {
  nombre: "",
  url: "",
  metodo: "",
};

constructor(
  private miServicioPermisos: PermisoService,
  private rutaActiva: ActivatedRoute,
  private router: Router
) { }

ngOnInit(): void {
  if (this.rutaActiva.snapshot.params.id_permiso) {
    this.modoCreacion = false;
    this.id_permiso = this.rutaActiva.snapshot.params.id_permiso;
    this.getPermiso(this.id_permiso);
  } else {
    this.modoCreacion = true;
  }
}

getPermiso(id: string) {
  this.miServicioPermisos.getPermiso(id).subscribe(data => {
    this.elPermiso = data;
  });
}

agregar(): void {
  if (this.validarDatosCompletos()) {
    this.intentoEnvio = true;
    this.miServicioPermisos.crear(this.elPermiso).subscribe(data => {
      Swal.fire(
        'Creado',
        'El Permiso ha sido creado correctamente',
        'success'
      );
      this.router.navigate(["pages/permiso/listar-permisos"]);
    });
  }
}

editar(): void {
  this.intentoEnvio = true;
  if (this.validarDatosCompletos()) {
    this.miServicioPermisos.editar(this.elPermiso._id, this.elPermiso).subscribe(data => {
      Swal.fire(
        'Actualizado',
        'El permiso ha sido actualizado correctamente',
        'success'
      );
      this.router.navigate(["pages/permiso/listar-permisos"]);
    });
  }
}

validarDatosCompletos(): boolean {
  this.intentoEnvio = true;

  if (this.elPermiso.nombre == ""||
      this.elPermiso.url == "" ||
      this.elPermiso.metodo == "") {
    return false;
  } else {
    return true;
  }
}


}

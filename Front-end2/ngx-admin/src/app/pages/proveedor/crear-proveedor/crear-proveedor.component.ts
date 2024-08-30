import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Proveedor } from '../../../modelos/proveedor.model';
import { ProveedorService } from '../../../servicios/proveedor.service';

@Component({
  selector: 'ngx-crear-proveedor',
  templateUrl: './crear-proveedor.component.html',
  styleUrls: ['./crear-proveedor.component.scss']
})
export class CrearProveedorComponent {

  modoCreacion: boolean = true;
  id_proveedor: string = "";
  intentoEnvio: boolean = false;
  elProveedor: Proveedor = {
  nit: "",
  nombre: "",
  direccion: "",
  telefono: "",
  correo: ""
};

constructor(
  private miServicioProveedores: ProveedorService,
  private rutaActiva: ActivatedRoute,
  private router: Router
) { }

ngOnInit(): void {
  if (this.rutaActiva.snapshot.params.id_proveedor) {
    this.modoCreacion = false;
    this.id_proveedor = this.rutaActiva.snapshot.params.id_proveedor;
    this.getProveedor(this.id_proveedor);
  } else {
    this.modoCreacion = true;
  }
}

getProveedor(id: string) {
  this.miServicioProveedores.getProveedor(id).subscribe(data => {
    this.elProveedor = data;
  });
}

agregar(): void {
  if (this.validarDatosCompletos()&& this.correoValido(this.elProveedor.correo)) {
    this.intentoEnvio = true;
    this.miServicioProveedores.crear(this.elProveedor).subscribe(data => {
      Swal.fire(
        'Creado',
        'El Proveedor ha sido creado correctamente',
        'success'
      );
      this.router.navigate(["pages/proveedor/listar-proveedores"]);
    });
  }
}

editar(): void {
  this.intentoEnvio = true;
  if (this.validarDatosCompletos()&& this.correoValido(this.elProveedor.correo)) {
    this.miServicioProveedores.editar(this.elProveedor._id, this.elProveedor).subscribe(data => {
      Swal.fire(
        'Actualizado',
        'El proveedor ha sido actualizado correctamente',
        'success'
      );
      this.router.navigate(["pages/proveedor/listar-proveedores"]);
    });
  }
}

validarDatosCompletos(): boolean {
  this.intentoEnvio = true;
  if (this.elProveedor.nit == "" ||
      this.elProveedor.nombre == "" ||
      this.elProveedor.direccion == "" ||
      this.elProveedor.telefono == "" ||
      this.elProveedor.correo == "") {
    return false;
  } else {
    return true;
  }
}


correoValido(correo: string): boolean {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(correo);
}

}

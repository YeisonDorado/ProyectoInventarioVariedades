import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Proveedor } from '../../../modelos/proveedor.model';
import { ProveedorService } from '../../../servicios/proveedor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-listar-proveedores',
  templateUrl: './listar-proveedores.component.html',
  styleUrls: ['./listar-proveedores.component.scss']
})
export class ListarProveedoresComponent {
  proveedores: Proveedor[];
  nombresColumnas: string[] = ['Nit', 'Nombre', 'Direccion', 'Telefono', 'Correo', 'Opciones'];

  constructor(private miServicioProveedores: ProveedorService, private router: Router) { }

  ngOnInit(): void {
    this.listar();
  }

  listar(): void {
    this.miServicioProveedores.listar().subscribe(data => {
      this.proveedores = data;
    });
  }

  agregar(): void {
    console.log("agregando nuevo");
    this.router.navigate(["pages/proveedor/crear-proveedor"]);
  }

  editar(id: string): void {
    console.log("editando a " + id);
    this.router.navigate(["pages/proveedor/actualizar-proveedor/"+id]);
  }

  eliminar(id: string): void {
    Swal.fire({
      title: 'Eliminar Proveedor',
      text: "Está seguro que quiere eliminar el proveedor?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.miServicioProveedores.eliminar(id).subscribe(data => {
          Swal.fire(
            'Eliminado!',
            'El proveedor ha sido eliminado correctamente',
            'success'
          );
          this.ngOnInit();
        });
      }
    });
  }

}

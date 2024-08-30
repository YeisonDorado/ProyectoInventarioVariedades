import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { PermisosRoles } from '../../../modelos/permisos-roles.model';
import { PermisosRolesService } from '../../../servicios/permisos-roles.service';
import { Router } from '@angular/router';
@Component({
  selector: 'ngx-listar-permisos-roles',
  templateUrl: './listar-permisos-roles.component.html',
  styleUrls: ['./listar-permisos-roles.component.scss']
})
export class ListarPermisosRolesComponent {

  permisosRoles: PermisosRoles[];

  nombresColumnas: string[] = ['Nombre rol', 'Nombre permiso', 'Opciones'];

  constructor(
    private miServicioPermisosRoles: PermisosRolesService,

     private router: Router) { }

  ngOnInit(): void {
    this.listar();

  }

  listar(): void {
    this.miServicioPermisosRoles.listar().subscribe(data => {
      this.permisosRoles = data;
    });
  }

  agregar(): void {
    console.log("agregando nuevo");
    this.router.navigate(["pages/permisos-roles/crear-permisos-roles"]);
  }

  editar(id: string): void {
    console.log("editando a " + id);
    this.router.navigate(["pages/permisos-roles/actualizar/"+id]);
  }

  eliminar(id: string): void {
    Swal.fire({
      title: 'Eliminar Producto',
      text: "Está seguro que quiere eliminar el producto?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.miServicioPermisosRoles.eliminar(id).subscribe(data => {
          Swal.fire(
            'Eliminado!',
            'El producto ha sido eliminado correctamente',
            'success'
          );
          this.ngOnInit();
        });
      }
    });
  }


}

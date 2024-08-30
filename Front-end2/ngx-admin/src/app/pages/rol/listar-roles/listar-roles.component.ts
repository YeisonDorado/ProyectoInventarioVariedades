import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Rol } from '../../../modelos/rol.model';
import { RolService } from '../../../servicios/rol.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-listar-roles',
  templateUrl: './listar-roles.component.html',
  styleUrls: ['./listar-roles.component.scss']
})
export class ListarRolesComponent {

  roles: Rol[];
  nombresColumnas: string[] = ['Nombre', 'Descripcion', 'Opciones'];

  constructor(private miServicioRoles: RolService, private router: Router) { }

  ngOnInit(): void {
    this.listar();
  }

  listar(): void {
    this.miServicioRoles.listar().subscribe(data => {
      this.roles = data;
    });
  }

  agregar(): void {
    console.log("agregando nuevo");
    this.router.navigate(["pages/rol/crear-rol"]);
  }

  editar(id: string): void {
    console.log("editando a " + id);
    this.router.navigate(["pages/rol/actualizar-rol/"+id]);
  }

  eliminar(id: string): void {
    Swal.fire({
      title: 'Eliminar Rol',
      text: "Está seguro que quiere eliminar el Rol?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.miServicioRoles.eliminar(id).subscribe(data => {
          Swal.fire(
            'Eliminado!',
            'El Rol ha sido eliminado correctamente',
            'success'
          );
          this.ngOnInit();
        });
      }
    });
  }
}

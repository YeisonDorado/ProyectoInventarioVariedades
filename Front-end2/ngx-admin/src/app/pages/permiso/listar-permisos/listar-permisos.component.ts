import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Permiso } from '../../../modelos/permiso.model';
import { PermisoService } from '../../../servicios/permiso.service';
import { Router } from '@angular/router';
@Component({
  selector: 'ngx-listar-permisos',
  templateUrl: './listar-permisos.component.html',
  styleUrls: ['./listar-permisos.component.scss']
})
export class ListarPermisosComponent {
  permisos: Permiso[];
  nombresColumnas: string[] = [ 'Nombre del permiso', 'Url', 'Metodo', 'Opciones'];

  constructor(private miServicioPermisos: PermisoService, private router: Router) { }

  ngOnInit(): void {
    this.listar();
  }

  listar(): void {
    this.miServicioPermisos.listar().subscribe(data => {
      this.permisos = data;
    });
  }

  agregar(): void {
    console.log("agregando nuevo");
    this.router.navigate(["pages/permiso/crear-permiso"]);
  }

  editar(id: string): void {
    console.log("editando a " + id);
    this.router.navigate(["pages/permiso/actualizar-permiso/"+id]);
  }

  eliminar(id: string): void {
    Swal.fire({
      title: 'Eliminar Permiso',
      text: "Está seguro que quiere eliminar el permiso?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.miServicioPermisos.eliminar(id).subscribe(data => {
          Swal.fire(
            'Eliminado!',
            'El permiso ha sido eliminado correctamente',
            'success'
          );
          this.ngOnInit();
        });
      }
    });
  }



}

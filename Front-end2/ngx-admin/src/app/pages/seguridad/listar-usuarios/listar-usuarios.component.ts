import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Usuarios } from '../../../modelos/usuarios.model';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.scss']
})
export class ListarUsuariosComponent {

  usuarios: Usuarios[];

  nombresColumnas: string[] = ['Nombre', 'Correo', 'Rol asignado', 'Opciones'];

  constructor(
    private miServicioSeguridad: SeguridadService,

     private router: Router) { }

  ngOnInit(): void {
    this.listar();

  }

  listar(): void {
    this.miServicioSeguridad.listar().subscribe(data => {
      this.usuarios = data;
    });
  }

  agregar(): void {
    console.log("agregando nuevo");
    this.router.navigate(["pages/seguridad/crear-usuario"]);
  }

  editar(id: string): void {
    console.log("editando a " + id);
    this.router.navigate(["pages/seguridad/actualizar-usuario/"+id]);
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
        this.miServicioSeguridad.eliminar(id).subscribe(data => {
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

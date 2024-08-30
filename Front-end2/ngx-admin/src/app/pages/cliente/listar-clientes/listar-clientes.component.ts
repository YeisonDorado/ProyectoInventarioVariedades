import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Cliente } from '../../../modelos/cliente.model';
import { ClienteService } from '../../../servicios/cliente.service';
import { Router } from '@angular/router';
@Component({
  selector: 'ngx-listar-clientes',
  templateUrl: './listar-clientes.component.html',
  styleUrls: ['./listar-clientes.component.scss']
})
export class ListarClientesComponent {
  clientes: Cliente[];
  nombresColumnas: string[] = ['Cedula/Nit', 'Nombre', 'Tipo', 'Direccion', 'Ciudad', 'Telefono', 'Correo', 'Opciones'];

  constructor(private miServicioClientes: ClienteService, private router: Router) { }

  ngOnInit(): void {
    this.listar();
  }

  listar(): void {
    this.miServicioClientes.listar().subscribe(data => {
      this.clientes = data;
    });
  }

  agregar(): void {
    console.log("agregando nuevo");
    this.router.navigate(["pages/cliente/crear-cliente"]);
  }

  editar(id: string): void {
    console.log("editando a " + id);
    this.router.navigate(["pages/cliente/actualizar-cliente/"+id]);
  }

  eliminar(id: string): void {
    Swal.fire({
      title: 'Eliminar Cliente',
      text: "Está seguro que quiere eliminar el cliente?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.miServicioClientes.eliminar(id).subscribe(data => {
          Swal.fire(
            'Eliminado!',
            'El cliente ha sido eliminado correctamente',
            'success'
          );
          this.ngOnInit();
        });
      }
    });
  }


}

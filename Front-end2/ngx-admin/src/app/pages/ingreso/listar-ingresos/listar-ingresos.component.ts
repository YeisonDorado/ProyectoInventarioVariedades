import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Ingreso } from '../../../modelos/ingreso.model';
import { IngresoService } from '../../../servicios/ingreso.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-listar-ingresos',
  templateUrl: './listar-ingresos.component.html',
  styleUrls: ['./listar-ingresos.component.scss']
})
export class ListarIngresosComponent {

  ingresos: Ingreso[];

  nombresColumnas: string[] = ['Codigo', 'Fecha', 'Monto', 'Descripcion', 'Metodo/pago', 'Categoria', 'Opciones'];

  constructor(
    private miServicioIngresos: IngresoService, private router: Router) { }

  ngOnInit(): void {
    this.listar();

  }

  listar(): void {
    this.miServicioIngresos.listar().subscribe(data => {
      this.ingresos = data;
    });
  }

  agregar(): void {
    console.log("agregando nuevo");
    this.router.navigate(["pages/ingreso/crear-ingreso"]);
  }

  editar(id: string): void {
    console.log("editando a " + id);
    this.router.navigate(["pages/ingreso/actualizar-ingreso/"+id]);
  }

  eliminar(id: string): void {
    Swal.fire({
      title: 'Eliminar Ingreso',
      text: "Está seguro que quiere eliminar el ingreso?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.miServicioIngresos.eliminar(id).subscribe(data => {
          Swal.fire(
            'Eliminado!',
            'El ingreso ha sido eliminado correctamente',
            'success'
          );
          this.ngOnInit();
        });
      }
    });
  }

}

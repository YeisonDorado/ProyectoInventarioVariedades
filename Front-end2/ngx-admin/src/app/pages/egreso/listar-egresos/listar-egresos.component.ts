import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Egreso } from '../../../modelos/egreso.model';
import { EgresoService } from '../../../servicios/egreso.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-listar-egresos',
  templateUrl: './listar-egresos.component.html',
  styleUrls: ['./listar-egresos.component.scss']
})
export class ListarEgresosComponent {

  egresos: Egreso[];

  nombresColumnas: string[] = ['Codigo', 'Fecha', 'Monto', 'Descripcion', 'Categoria', 'Opciones'];

  constructor(
    private miServicioEgresos: EgresoService, private router: Router) { }

  ngOnInit(): void {
    this.listar();

  }

  listar(): void {
    this.miServicioEgresos.listar().subscribe(data => {
      this.egresos = data;
    });
  }

  agregar(): void {
    console.log("agregando nuevo");
    this.router.navigate(["pages/egreso/crear-egreso"]);
  }

  editar(id: string): void {
    console.log("editando a " + id);
    this.router.navigate(["pages/egreso/actualizar-egreso/"+id]);
  }

  eliminar(id: string): void {
    Swal.fire({
      title: 'Eliminar Egreso',
      text: "Está seguro que quiere eliminar el egreso?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.miServicioEgresos.eliminar(id).subscribe(data => {
          Swal.fire(
            'Eliminado!',
            'El egreso ha sido eliminado correctamente',
            'success'
          );
          this.ngOnInit();
        });
      }
    });
  }

}

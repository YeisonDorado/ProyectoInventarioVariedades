import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { CategoriaIe } from '../../../modelos/categoria-ie.model';
import { CategoriaIeService } from '../../../servicios/categoria-ie.service';
import { Router } from '@angular/router';
@Component({
  selector: 'ngx-listar-categorias',
  templateUrl: './listar-categorias.component.html',
  styleUrls: ['./listar-categorias.component.scss']
})
export class ListarCategoriasComponent {
  categorias: CategoriaIe[];
  nombresColumnas: string[] = ['Codigo', 'Nombre', 'Opciones'];

  constructor(private miServicioCategorias: CategoriaIeService, private router: Router) { }

  ngOnInit(): void {
    this.listar();
  }

  listar(): void {
    this.miServicioCategorias.listar().subscribe(data => {
      this.categorias = data;
    });
  }

  agregar(): void {
    console.log("agregando nuevo");
    this.router.navigate(["pages/categoria-ie/crear-categoria"]);
  }

  editar(id: string): void {
    console.log("editando a " + id);
    this.router.navigate(["pages/categoria-ie/actualizar-categoria/"+id]);
  }

  eliminar(id: string): void {
    Swal.fire({
      title: 'Eliminar Categoria',
      text: "Está seguro que quiere eliminar la categoria?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.miServicioCategorias.eliminar(id).subscribe(data => {
          Swal.fire(
            'Eliminado!',
            'La categoria ha sido eliminado correctamente',
            'success'
          );
          this.ngOnInit();
        });
      }
    });
  }


}

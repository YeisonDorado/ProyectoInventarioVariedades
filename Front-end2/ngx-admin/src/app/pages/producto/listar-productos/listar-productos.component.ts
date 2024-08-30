import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Producto } from '../../../modelos/producto.model';
import { ProductoService } from '../../../servicios/producto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.scss']
})
export class ListarProductosComponent {

  productos: Producto[];

  nombresColumnas: string[] = ['Codigo', 'Nombre', 'Marca', 'Descripcion', 'Categoria', 'Cantidad/compra', 'Und', 'Precio/costo', 'Precio/Venta', 'Proveedor', 'Opciones'];

  constructor(
    private miServicioProductos: ProductoService,

     private router: Router) { }

  ngOnInit(): void {
    this.listar();

  }

  listar(): void {
    this.miServicioProductos.listar().subscribe(data => {
      this.productos = data;
    });
  }

  agregar(): void {
    console.log("agregando nuevo");
    this.router.navigate(["pages/producto/crear-producto"]);
  }

  editar(id: string): void {
    console.log("editando a " + id);
    this.router.navigate(["pages/producto/actualizar-producto/"+id]);
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
        this.miServicioProductos.eliminar(id).subscribe(data => {
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

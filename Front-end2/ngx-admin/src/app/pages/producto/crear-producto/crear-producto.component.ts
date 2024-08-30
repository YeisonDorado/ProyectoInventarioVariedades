import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Producto } from '../../../modelos/producto.model';
import { ProductoService } from '../../../servicios/producto.service';
import { Proveedor } from '../../../modelos/proveedor.model';///////////////
import { ProveedorService } from '../../../servicios/proveedor.service';////////////////


@Component({
  selector: 'ngx-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.scss']
})
export class CrearProductoComponent {

  modoCreacion: boolean = true;
  id_producto: string = "";
  intentoEnvio: boolean = false;
  elProducto: Producto = {
  prod_codigo: "",
  prod_nombre: "",
  prod_marca: "",
  prod_descripcion: "",
  prod_categoria: "",
  prod_cantidad_compra: 0,
  prod_unidad_medida: "",
  prod_precio_costo: 0,
  prod_precio_venta: 0,
  proveedor_id: "",
 
};

elProveedor: Proveedor[] =[]; //arreglo que contiene la lista de proveedores

constructor(
  private miServicioProductos: ProductoService,
  private miServicioProveedores: ProveedorService,// se llama los servicios de provvedores
  private rutaActiva: ActivatedRoute,
  private router: Router
) { }

ngOnInit(): void {
  if (this.rutaActiva.snapshot.params.id_producto) {
    this.modoCreacion = false;
    this.id_producto = this.rutaActiva.snapshot.params.id_producto;
    this.getProducto(this.id_producto);
  } else {
    this.modoCreacion = true;
  }
  this.getProveedor();// se llama el metodo que contiene la lista de proveedores
  
  
}

getProducto(id: string) {
  this.miServicioProductos.getProducto(id).subscribe(data => {
    this.elProducto = data;
  });
}

//metodo para obtener la lista de proveedores
getProveedor() {
  this.miServicioProveedores.listar().subscribe((data: Proveedor[]) => {
    this.elProveedor = data;
  });
}



agregar(): void {
  if (this.validarDatosCompletos()) {
   this.intentoEnvio = true;
   console.log(this.elProducto); // Añade este log para verificar los datos              
    this.miServicioProductos.crear(this.elProducto).subscribe((productoCreado: Producto) => {
      console.log('Producto creado:', productoCreado);
      Swal.fire(
        'Creado',
        'El Producto ha sido creado correctamente',
        'success'
      );
      if (productoCreado._id && this.elProducto.proveedor_id) {
        this.asignarProveedor(productoCreado._id, this.elProducto.proveedor_id);// Llama a asignarProveedor después de crear el producto
      } else {
        console.error('Error: Producto o proveedor no definido');
      }
    });

  }
}



editar(): void {
  this.intentoEnvio = true;
  if (this.validarDatosCompletos()) {
    this.miServicioProductos.editar(this.elProducto._id, this.elProducto).subscribe((productoCreado: Producto) => {
      Swal.fire(
        'Actualizado',
        'El producto ha sido actualizado correctamente',
        'success'
      );
      if (productoCreado._id && this.elProducto.proveedor_id) {
        this.asignarProveedor(productoCreado._id, this.elProducto.proveedor_id);// Llama a asignarProveedor después de actualizar el producto
      } else {
        console.error('Error: Producto o proveedor no definido');
      }
      
    });
  }
}


asignarProveedor(productId: string, proveedorId: string): void {
  this.miServicioProductos.asignarProveedor(productId, proveedorId).subscribe(data => {
    // Swal.fire(
    //   'Proveedor Asignado',
    //   'El proveedor ha sido asignado correctamente al producto',
    //   'success'
    // );
    this.router.navigate(["pages/producto/listar-productos"]);
  }, error => {
    Swal.fire(
      'Error',
      'Hubo un error al asignar el proveedor',
      'error'
    );
  });
}










validarDatosCompletos(): boolean {
  this.intentoEnvio = true;
  if (this.elProducto.prod_codigo == "" ||
      this.elProducto.prod_nombre == "" ||
      this.elProducto.prod_marca == "" ||
      this.elProducto.prod_descripcion == "" ||
      this.elProducto.prod_categoria == "" ||
      this.elProducto.prod_cantidad_compra == 0 ||
      this.elProducto.prod_unidad_medida == "" ||
      this.elProducto.prod_precio_costo == 0 ||
      this.elProducto.prod_precio_venta == 0 ||
      this.elProducto.proveedor_id == "") {
    return false;
  } else {
    return true;
  }
}

}

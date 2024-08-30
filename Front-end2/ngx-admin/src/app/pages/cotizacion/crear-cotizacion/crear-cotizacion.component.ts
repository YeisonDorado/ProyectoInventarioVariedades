import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Cotizacion } from '../../../modelos/cotizacion.model';
import { CotizacionService } from '../../../servicios/cotizacion.service';
import { Cliente } from '../../../modelos/cliente.model';
import { ClienteService } from '../../../servicios/cliente.service';
import { Producto } from '../../../modelos/producto.model';
import { ProductoService } from '../../../servicios/producto.service';

@Component({
  selector: 'ngx-crear-cotizacion',
  templateUrl: './crear-cotizacion.component.html',
  styleUrls: ['./crear-cotizacion.component.scss']
})
export class CrearCotizacionComponent implements OnInit {
  modoCreacion: boolean = true;
  id_cotizacion: string = "";
  intentoEnvio: boolean = false;

  laCotizacion: Cotizacion = {
    cot_numero: "",
    cot_fecha: "",
    cot_forma_pago: "",
    //comp_item: "",
    cot_cantidad_venta_prod: 0,
    //comp_precio_venta_prod: 0,
    cot_valor_total_prod: 0,
    cot_total_pago: 0,
    //comp_nombre_vendedor: "",
    cliente_id: "",
    //producto_id: "",
    productos: [],
    nextNumber: "",
  
  };

  elCliente: Cliente[] = [];
  elProducto: Producto[] = [];
  productoSeleccionado: Producto | null = null;
  selectedProductoId: string | null = null;
  cantidadSeleccionada: number = 1;
  searchTerm: string = '';

  constructor(
    private miServicioCotizaciones: CotizacionService,
    private miServicioClientes: ClienteService,
    private miServicioProductos: ProductoService,
    private rutaActiva: ActivatedRoute,
    private router: Router
  ) { }


  ngOnInit(): void {
    if (this.rutaActiva.snapshot.params.id_cotizacion) {
      this.modoCreacion = false;
      this.id_cotizacion = this.rutaActiva.snapshot.params.id_cotizacion;
      this.getCotizacion(this.id_cotizacion);
    } else {
      this.modoCreacion = true;
      this.getNextCotizacionNumber();
      this.laCotizacion.cot_fecha = this.getFechaColombia();
      console.log(this.getFechaColombia()); // Verifica que la fecha se genera correctamente
     
    }
    this.getClientes();
    this.getProductos();
  }


  
  getFechaColombia(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = ('0' + (now.getMonth() + 1)).slice(-2);
    const day = ('0' + now.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
  

  getCotizacion(id: string) {
    this.miServicioCotizaciones.getCotizacion(id).subscribe(data => {
      this.laCotizacion = data;
      //productos  inicializados
      this.laCotizacion.productos = this.laCotizacion.productos || [];
    });
  }

  getClientes() {
    this.miServicioClientes.listar().subscribe((data: Cliente[]) => {
      this.elCliente = data;
    });
  }

  getProductos() {
    this.miServicioProductos.listar().subscribe((data: Producto[]) => {
      this.elProducto = data;
    });
  }


   ///funcion para filtrar de  manera simple los productos 
   filtrarProductos(): Producto[] {
    return this.elProducto.filter(producto =>
      producto.prod_nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
   // funcion para seleccionar un producto para agregar a la cotizacion  
  seleccionarProducto(prodCodigo: string) {
    this.productoSeleccionado = this.elProducto.find(producto => producto.prod_codigo === prodCodigo) || null;
    console.log('Producto seleccionado:', this.productoSeleccionado);
  }
  // funcion para agregar producto a la cotizacion 
  agregarProducto() {
    if (this.productoSeleccionado) {
      console.log('Producto seleccionado:', this.productoSeleccionado);
      const precioVenta = this.productoSeleccionado.prod_precio_venta || 0;
      const cantidad = this.cantidadSeleccionada || 0;

      const nuevoProducto = { 
        prod_codigo: this.productoSeleccionado.prod_codigo,
        prod_nombre: this.productoSeleccionado.prod_nombre,
        prod_marca: this.productoSeleccionado.prod_marca,
        prod_precio_venta: this.productoSeleccionado.prod_precio_venta,
        cot_cantidad_venta_prod: cantidad, 
        cot_valor_total_prod: cantidad * precioVenta 
      };
      console.log('Nuevo producto:', nuevoProducto);
  
      this.laCotizacion.productos.push(nuevoProducto);
      this.calcularTotalCotizacion();
      console.log('laVenta.productos:', this.laCotizacion.productos);
    }else {
      console.error('No se ha seleccionado ningún producto.');
    }
  }


  calcularTotalCotizacion() {
     // Calculo del total del comprobante sumando valores de todos los productos
      this.laCotizacion.cot_total_pago = this.laCotizacion.productos.reduce((total, item2: Cotizacion) => total + (item2.cot_valor_total_prod || 0), 0);
   }

   //funcion para eliminar un producto de la cotizacion
   eliminarProducto(producto: any): void {
    Swal.fire({
      title: 'Eliminar producto',
      text: "Está seguro que quiere eliminar el producto de la cotizacion?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed){
       const index = this.laCotizacion.productos.indexOf(producto);
        if (index !== -1) {
          this.laCotizacion.productos.splice(index, 1);
          this.calcularTotalCotizacion();
        }
      }
    });
  }


  agregar(): void {
    if (this.validarDatosCompletos()) {
      this.intentoEnvio = true;
      this.miServicioCotizaciones.crear(this.laCotizacion.cliente_id!, this.productoSeleccionado!._id!, this.laCotizacion).subscribe((comprobanteCreado: Cotizacion) => {
        Swal.fire('Creado', 'La cotizacion ha sido creada correctamente', 'success');
        this.router.navigate(["/pages/cotizacion/listar-cotizaciones"]);
      });
    }
  }


  editar(): void {
    if (this.validarDatosCompletos()) {
      this.intentoEnvio = true;
  
      // Verificación de que `this.laVenta` y sus propiedades necesarias no sean nulas
      if (this.laCotizacion && this.laCotizacion._id && this.laCotizacion.cliente_id) {
        // Si tienes varios productos seleccionados, elige un producto para el ID del producto
        const producto_id = this.laCotizacion.productos.length > 0 ? this.laCotizacion.productos[0].prod_codigo : '';
  
        this.miServicioCotizaciones.editar(this.laCotizacion._id, this.laCotizacion.cliente_id, producto_id, this.laCotizacion)
          .subscribe(
            (comprobanteActualizado: Cotizacion) => {
              Swal.fire('Actualizado', 'La cotizacion ha sido actualizada correctamente', 'success');
              this.router.navigate(["/pages/cotizacion/listar-cotizaciones"]);
            },
            (error) => {
              console.error('Error al actualizar la cotizacion:', error);
              Swal.fire('Error', 'Hubo un problema al actualizar la cotizacion', 'error');
            }
          );
      } else {
        // Caso en que los datos necesarios no están presentes
        console.error('Datos incompletos para actualizar la cotizacion:', {
          laVenta: this.laCotizacion,
          productoSeleccionado: this.productoSeleccionado
        });
        Swal.fire('Error', 'Datos incompletos para actualizar la cotizacion', 'error');
      }
    } else {
      Swal.fire('Error', 'Por favor complete todos los campos requeridos', 'error');
    }
  }



  getNextCotizacionNumber(): void {
    this.miServicioCotizaciones.getCotizacionNumero().subscribe(
      data => {
        this.laCotizacion.cot_numero = data.nextNumber; //
      },
      error => {
        console.error('Error al obtener el próximo número la cotizacion', error);
      }
    );
  }


  validarDatosCompletos(): boolean {
    return this.laCotizacion.cot_numero === "" ||
      this.laCotizacion.cot_fecha === "" ||
      this.laCotizacion.cot_forma_pago ==="" ||
      this.laCotizacion.cliente_id === "" ||
      this.laCotizacion.productos.length > 0;
  }


}

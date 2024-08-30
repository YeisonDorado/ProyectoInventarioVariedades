import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Venta } from '../../../modelos/venta.model';
import { VentaService } from '../../../servicios/venta.service';
import { Cliente } from '../../../modelos/cliente.model';
import { ClienteService } from '../../../servicios/cliente.service';
import { Producto } from '../../../modelos/producto.model';
import { ProductoService } from '../../../servicios/producto.service';

@Component({
  selector: 'ngx-crear-venta',
  templateUrl: './crear-venta.component.html',
  styleUrls: ['./crear-venta.component.scss']
})
export class CrearVentaComponent implements OnInit {
  modoCreacion: boolean = true;
  id_venta: string = "";
  intentoEnvio: boolean = false;

  laVenta: Venta = {
    comp_numero: "",
    comp_fecha: "",
    comp_forma_pago: "",
    comp_item: "",
    comp_cantidad_venta_prod: 0,
    comp_precio_venta_prod: 0,
    comp_valor_total_prod: 0,
    comp_total_pago: 0,
    comp_nombre_vendedor: "",
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
    private miServicioVentas: VentaService,
    private miServicioClientes: ClienteService,
    private miServicioProductos: ProductoService,
    private rutaActiva: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.rutaActiva.snapshot.params.id_venta) {
      this.modoCreacion = false;
      this.id_venta = this.rutaActiva.snapshot.params.id_venta;
      this.getComprobante(this.id_venta);
    } else {
      this.modoCreacion = true;
      this.getNextComprobanteNumber();
      this.laVenta.comp_fecha = this.getFechaColombia();
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
  

  getComprobante(id: string) {
    this.miServicioVentas.getComprobante(id).subscribe(data => {
      this.laVenta = data;
      //productos  inicializados
      this.laVenta.productos = this.laVenta.productos || [];
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
   // funcion para seleccnar un producto para agrrgar a la venta 
  seleccionarProducto(prodCodigo: string) {
    this.productoSeleccionado = this.elProducto.find(producto => producto.prod_codigo === prodCodigo) || null;
    console.log('Producto seleccionado:', this.productoSeleccionado);
  }
  // funcion para agregar producto a la venta 
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
        comp_cantidad_venta_prod: cantidad, 
        comp_valor_total_prod: cantidad * precioVenta 
      };
      console.log('Nuevo producto:', nuevoProducto);
  
      this.laVenta.productos.push(nuevoProducto);
      this.calcularTotalComprobante();
      console.log('laVenta.productos:', this.laVenta.productos);
    }else {
      console.error('No se ha seleccionado ningún producto.');
    }
  }


  calcularTotalComprobante() {
     // Calculo del total del comprobante sumando valores de todos los productos
      this.laVenta.comp_total_pago = this.laVenta.productos.reduce((total, item2: Venta) => total + (item2.comp_valor_total_prod || 0), 0);
   }



  eliminarProducto(producto: any): void {
    Swal.fire({
      title: 'Eliminar producto',
      text: "Está seguro que quiere eliminar el producto del comprobante de venta?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed){
       const index = this.laVenta.productos.indexOf(producto);
        if (index !== -1) {
          this.laVenta.productos.splice(index, 1);
          this.calcularTotalComprobante();
        }
      }
    });
  }



  agregar(): void {
    if (this.validarDatosCompletos()) {
      this.intentoEnvio = true;
      this.miServicioVentas.crear(this.laVenta.cliente_id!, this.productoSeleccionado!._id!, this.laVenta).subscribe((comprobanteCreado: Venta) => {
        Swal.fire('Creado', 'El Comprobante ha sido creado correctamente', 'success');
        this.router.navigate(["/pages/venta/listar-ventas"]);
      });
    }
  }

  


    editar(): void {
      if (this.validarDatosCompletos()) {
        this.intentoEnvio = true;
    
        // Verificación de que `this.laVenta` y sus propiedades necesarias no sean nulas
        if (this.laVenta && this.laVenta._id && this.laVenta.cliente_id) {
          // Si tienes varios productos seleccionados, elige un producto para el ID del producto
          const producto_id = this.laVenta.productos.length > 0 ? this.laVenta.productos[0].prod_codigo : '';
    
          this.miServicioVentas.editar(this.laVenta._id, this.laVenta.cliente_id, producto_id, this.laVenta)
            .subscribe(
              (comprobanteActualizado: Venta) => {
                Swal.fire('Actualizado', 'El Comprobante ha sido actualizado correctamente', 'success');
                this.router.navigate(["/pages/venta/listar-ventas"]);
              },
              (error) => {
                console.error('Error al actualizar el comprobante:', error);
                Swal.fire('Error', 'Hubo un problema al actualizar el comprobante', 'error');
              }
            );
        } else {
          // Caso en que los datos necesarios no están presentes
          console.error('Datos incompletos para actualizar el comprobante:', {
            laVenta: this.laVenta,
            productoSeleccionado: this.productoSeleccionado
          });
          Swal.fire('Error', 'Datos incompletos para actualizar el comprobante', 'error');
        }
      } else {
        Swal.fire('Error', 'Por favor complete todos los campos requeridos', 'error');
      }
    }



    getNextComprobanteNumber(): void {
      this.miServicioVentas.getComprobanteNumero().subscribe(
        data => {
          this.laVenta.comp_numero = data.nextNumber; //
        },
        error => {
          console.error('Error al obtener el próximo número de comprobante', error);
        }
      );
    }
    

  


  



  validarDatosCompletos(): boolean {
    return this.laVenta.comp_numero === "" ||
      this.laVenta.comp_fecha === "" ||
      this.laVenta.comp_forma_pago ==="" ||
      this.laVenta.cliente_id === "" ||
      this.laVenta.productos.length > 0;
  }



}

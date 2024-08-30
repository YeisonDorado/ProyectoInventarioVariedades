import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Venta } from '../../../modelos/venta.model';
import { Ingreso} from '../../../modelos/ingreso.model';
import { VentaService } from '../../../servicios/venta.service';
import { IngresoService } from '../../../servicios/ingreso.service';
import { CategoriaIe } from '../../../modelos/categoria-ie.model';
import { CategoriaIeService } from '../../../servicios/categoria-ie.service';
import { Router } from '@angular/router';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'ngx-listar-ventas',
  templateUrl: './listar-ventas.component.html',
  styleUrls: ['./listar-ventas.component.scss']
})
export class ListarVentasComponent implements OnInit  {

  elIngreso: Ingreso = {
    ing_codigo: "",
    ing_fecha: "",
    ing_monto: 0,
    ing_descripcion: "",
    ing_metodo_pago: "",/////////////////////
    categoria_id: "",
    nextNumber: "",
   
  };

  ventas: Venta[];
  categorias: CategoriaIe[] = [];
  nombresColumnas: string[] = ['Codigo', 'Fecha', 'Cliente', 'Forma/pago', 'Total', 'Opciones'];

  constructor(
    private miServicioVentas: VentaService,
    private miServicioIngresos: IngresoService,
    private miServicioIeCategorias: CategoriaIeService,
    private router: Router) { }

  ngOnInit(): void {
    this.listar();
    this.cargarCategorias();
    this.getNextIngresoNumber();
  }

  listar(): void {
    this.miServicioVentas.listar().subscribe(data => {
      this.ventas = data;
      console.log('Respuesta cruda del backend:', data); // Añadir para depuración
      this.ventas = data;
      this.ventas.forEach(venta => {
        console.log('Cliente:', venta.cliente); // Añadir para depuración
      });
    });
  }

  agregar(): void {
    console.log("agregando nuevo");
    this.router.navigate(["pages/venta/crear-venta"]);
  }

  editar(id: string): void {
    console.log("editando a " + id);
   this.router.navigate(["pages/venta/actualizar-venta/"+id]);
  }

  eliminar(id: string): void {
    Swal.fire({
      title: 'Eliminar Comprobante de venta',
      text: "Está seguro que quiere eliminar el comprobante de venta?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.miServicioVentas.eliminar(id).subscribe(data => {
          Swal.fire(
            'Eliminado!',
            'El comprobante de venta ha sido eliminado correctamente',
            'success'
          );
          this.ngOnInit();
        });
      }
    });
  }



  cargarCategorias(): void {
    this.miServicioIeCategorias.listar().subscribe(
      (data: CategoriaIe[]) => {
        this.categorias = data;
        console.log('Categorías cargadas:', this.categorias); // Verificar categorías cargadas
      },
      (error) => {
        console.error('Error al cargar categorías', error);
      }
    );
  }

  obtenerCategoriaPorNombre(nombre: string): CategoriaIe | undefined {
    const categoria = this.categorias.find(categoria => categoria.cat_nombre === nombre);
    console.log(`Categoría obtenida para "${nombre}":`, categoria); // Verificar categoría obtenida
    return categoria
  }


  
  getNextIngresoNumber(): void {
    this.miServicioIngresos.getIngresoNumero().subscribe(
      data => {
        this.elIngreso.ing_codigo = data.nextNumber; //
      },
      error => {
        console.error('Error al obtener el próximo número de comprobante', error);
      }
    );
  }



  registrarIngreso(venta: Venta): void {
    const categoria = this.obtenerCategoriaPorNombre('Ingresos ventas');
    if (!categoria) {
      Swal.fire('Error', 'No se encontró la categoría "Ingresos ventas"', 'error');
      return;
    }

    this.getNextIngresoNumber(); // Obtener el próximo número de ingreso

    const ingreso: Ingreso = {
      ing_codigo: this.elIngreso.ing_codigo,
      ing_fecha: venta.comp_fecha,
      ing_monto: venta.comp_total_pago,
      ing_descripcion: `Comprobante de venta: ${venta.comp_numero}`,
      ing_metodo_pago: venta.comp_forma_pago,
      categoria_id: categoria._id,
    };
    console.log('Ingreso a crear:', ingreso); // Verificar ingreso antes de crear

    this.miServicioIngresos.crear(ingreso).subscribe(
      (ingresoCreado: Ingreso) => {
        Swal.fire('Ingreso Registrado', 'El ingreso ha sido registrado correctamente', 'success');
        this.asignarCategoria(ingresoCreado._id, ingreso.categoria_id)
      },
      (error) => {
        Swal.fire('Error', 'Hubo un problema al registrar el ingreso', 'error');
      }
    );
  }


  asignarCategoria(ingresoId: string, categoriaId: string): void {
    this.miServicioIngresos.asignarCategoria(ingresoId, categoriaId).subscribe(data => {
      // Swal.fire(
      //   'Categoria Asignada',
      //   'La categoria ha sido asignado correctamente al ingreso',
      //   'success'
      // );
      this.router.navigate(["pages/ingreso/listar-ingresos"]);
    }, error => {
      Swal.fire(
        'Error',
        'Hubo un error al asignar la categoria',
        'error'
      );
    });
  }







generarPDF(venta: Venta): void {
    const doc = new jsPDF();

    // Datos de la empresa
    doc.setFontSize(18);
    doc.text('Variedades Electricas', 20, 15);
    doc.setFontSize(12);
    doc.text('Yeison Uveimar Dorado Perafan', 20, 20);
    doc.text('No responsable de IVA', 20, 25);
    doc.text('NIT: 1061795542-4', 20, 30);
    doc.text('Dirección: Calle 7 # 10-66 Centro-Popayan', 20, 35);
    doc.text('Teléfono: 3216088319', 20, 40);
    doc.text('Correo: variedadeselectricaspopayan@gmail.com', 20, 45);
    

    // Ruta de la imagen del logo
    const logoPath = 'assets/images/logo_variedades.png'; 

    // Cargar la imagen y añadirla al PDF
    const img = new Image();
    img.src = logoPath;
    img.onload = () => {
      const logoWidth = 60;  // Ancho del logo en el PDF
      const logoHeight = 50; // Alto del logo en el PDF
      doc.addImage(img, 'PNG', 130, 10, logoWidth, logoHeight);


    // Datos del comprobante
    doc.setFontSize(14);
    doc.text('Comprobante de Venta', 136, 15);
    doc.setFontSize(12);
    doc.text(`Número: ${venta.comp_numero}`, 145, 20);
    doc.text(`Fecha: ${venta.comp_fecha}`, 142, 25);

    // Datos del cliente
    doc.text('Datos del Cliente:', 20, 55);
    doc.text(`Nombre: ${venta.cliente.nombre_completo}`, 20, 60);
    doc.text(`Cédula/NIT: ${venta.cliente.cedula_nit}`, 120, 60);
    doc.text(`Dirección: ${venta.cliente.direccion}`, 20, 65);
    doc.text(`Teléfono: ${venta.cliente.telefono}`, 120, 65);

   
    
    // Datos de los productos con jspdf-autotable
    const productos = venta.productos.map(producto => [
      producto.prod_codigo,
      producto.prod_nombre,
      producto.prod_marca,
      producto.comp_cantidad_venta_prod, 
      producto.prod_precio_venta,
      producto.comp_valor_total_prod 
    ]);



    autoTable(doc, {
      startY: 80,
      head: [['Codigo', 'Nombre', 'Marca', 'Cantidad', 'Precio', 'Subtotal']],
      body: productos,
      margin: { top: 80 },
      didDrawPage: (data) => {
        // Si se detecta un nuevo salto de página, esto asegura que los datos de la empresa y cliente se redibujen
        if (data.pageNumber > 1) {
          // Redibujar el encabezado en cada nueva página
          doc.setFontSize(18);
          doc.text('Variedades Electricas', 20, 15);
          doc.setFontSize(12);
          doc.text('Yeison Uveimar Dorado Perafan', 20, 20);
          doc.text('No responsable de IVA', 20, 25);
          doc.text('NIT: 1061795542-4', 20, 30);
          doc.text('Dirección: Calle 7 # 10-66 Centro-Popayan', 20, 35);
          doc.text('Teléfono: 3216088319', 20, 40);
          doc.text('Correo: variedadeselectricaspopayan@gmail.com', 20, 45);


          doc.setFontSize(14);
          doc.text('Comprobante de Venta', 136, 15);
          doc.setFontSize(12);
          doc.text(`Número: ${venta.comp_numero}`, 145, 20);
          doc.text(`Fecha: ${venta.comp_fecha}`, 142, 25);

          // Datos del cliente
          doc.text('Datos del Cliente:', 20, 55);
          doc.text(`Nombre: ${venta.cliente.nombre_completo}`, 20, 60);
          doc.text(`Cédula/NIT: ${venta.cliente.cedula_nit}`, 120, 60);
          doc.text(`Dirección: ${venta.cliente.direccion}`, 20, 65);
          doc.text(`Teléfono: ${venta.cliente.telefono}`, 120, 65);
        }
      }
    });

    // Total a pagar
    doc.text(`Total a Pagar: ${venta.comp_total_pago}`, 150, (doc as any).lastAutoTable.finalY + 10);

    doc.save(`comprobante_${venta.comp_numero}.pdf`);
  }
}

}


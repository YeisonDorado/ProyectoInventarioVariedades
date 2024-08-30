import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Cotizacion } from '../../../modelos/cotizacion.model';
import { CotizacionService } from '../../../servicios/cotizacion.service';
import { Router } from '@angular/router';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'ngx-listar-cotizacion',
  templateUrl: './listar-cotizacion.component.html',
  styleUrls: ['./listar-cotizacion.component.scss']
})
export class ListarCotizacionComponent implements OnInit{

  cotizaciones: Cotizacion[];

  nombresColumnas: string[] = ['Codigo', 'Fecha', 'Cliente', 'Forma/pago',  'Total', 'Opciones'];

  constructor(
    private miServicioCotizaciones: CotizacionService,
    private router: Router) { }

  ngOnInit(): void {
    this.listar();
  }

  listar(): void {
    this.miServicioCotizaciones.listar().subscribe(data => {
      this.cotizaciones = data;
      console.log('Respuesta cruda del backend:', data); // Añadir para depuración
      this.cotizaciones = data;
      this.cotizaciones.forEach(Cotizacion => {
        console.log('Cliente:', Cotizacion.cliente); // Añadir para depuración
      });
    });
  }

  agregar(): void {
    console.log("agregando nuevo");
    this.router.navigate(["pages/cotizacion/crear-cotizacion"]);
  }

  editar(id: string): void {
    console.log("editando a " + id);
   this.router.navigate(["pages/cotizacion/actualizar-cotizacion/"+id]);
  }

  eliminar(id: string): void {
    Swal.fire({
      title: 'Eliminar Cotizacion',
      text: "Está seguro que quiere eliminar la cotizacion?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.miServicioCotizaciones.eliminar(id).subscribe(data => {
          Swal.fire(
            'Eliminado!',
            'La cotizacion ha sido eliminada correctamente',
            'success'
          );
          this.ngOnInit();
        });
      }
    });
  }



  generarPDF(cotizacion: Cotizacion): void {
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
    doc.text('Cotización', 136, 15);
    doc.setFontSize(12);
    doc.text(`Número: ${cotizacion.cot_numero}`, 145, 20);
    doc.text(`Fecha: ${cotizacion.cot_fecha}`, 142, 25);

    // Datos del cliente
    doc.text('Datos del Cliente:', 20, 55);
    doc.text(`Nombre: ${cotizacion.cliente.nombre_completo}`, 20, 60);
    doc.text(`Cédula/NIT: ${cotizacion.cliente.cedula_nit}`, 120, 60);
    doc.text(`Dirección: ${cotizacion.cliente.direccion}`, 20, 65);
    doc.text(`Teléfono: ${cotizacion.cliente.telefono}`, 120, 65);

   
    
    // Datos de los productos con jspdf-autotable
    const productos = cotizacion.productos.map(producto => [
      producto.prod_codigo,
      producto.prod_nombre,
      producto.prod_marca,
      producto.cot_cantidad_venta_prod, 
      producto.prod_precio_venta,
      producto.cot_valor_total_prod 
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
          doc.text('Cotización', 136, 15);
          doc.setFontSize(12);
          doc.text(`Número: ${cotizacion.cot_numero}`, 145, 20);
          doc.text(`Fecha: ${cotizacion.cot_fecha}`, 142, 25);

          // Datos del cliente
          doc.text('Datos del Cliente:', 20, 55);
          doc.text(`Nombre: ${cotizacion.cliente.nombre_completo}`, 20, 60);
          doc.text(`Cédula/NIT: ${cotizacion.cliente.cedula_nit}`, 120, 60);
          doc.text(`Dirección: ${cotizacion.cliente.direccion}`, 20, 65);
          doc.text(`Teléfono: ${cotizacion.cliente.telefono}`, 120, 65);
        }
      }
    });

    // Total a pagar
    doc.text(`Total a Pagar: ${cotizacion.cot_total_pago}`, 150, (doc as any).lastAutoTable.finalY + 10);

    doc.save(`cotización_${cotizacion.cot_numero}.pdf`);
  }
}

}

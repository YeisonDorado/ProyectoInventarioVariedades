import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Ingreso } from '../../../modelos/ingreso.model';
import { Egreso } from '../../../modelos/egreso.model';
import { IngresoService } from '../../../servicios/ingreso.service';
import { EgresoService } from '../../../servicios/egreso.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import 'jspdf-autotable';

@Component({
  selector: 'ngx-listar-dashboard',
  templateUrl: './listar-dashboard.component.html',
  styleUrls: ['./listar-dashboard.component.scss']
})
export class ListarDashboardComponent implements OnInit{


  ingresos: any[] = [];//arrgelo para incluir en le pdf
  egresos: any[] = [];//arrgelo para incluir en le pdf
  ventasDiarias: number = 0;
  ventasMensuales: number = 0;
  egresosDiarios: number = 0;
  egresosMensuales: number = 0;
  saldoMensual: number = 0;

  // Gráfica
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = ['Ingresos', 'Egresos', 'Saldo'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  barChartData: ChartDataSets[] = [
    { data: [], label: 'Totales', backgroundColor: ['#28a745', '#dc3545', '#FFCE56'] }
  ];

  constructor(private ingresoService: IngresoService, private egresoService: EgresoService) { }

  ngOnInit(): void {
    this.getTotales();
  }

  getTotales(): void {
    const today = new Date().toISOString().split('T')[0];

    this.ingresoService.getTotalVentasDia().subscribe(data => {
      console.log('Ventas diarias:', data);
      const ventasHoy = data.filter((venta: any) => venta._id.startsWith(today));
      if (ventasHoy.length > 0) {
        this.ventasDiarias = ventasHoy.reduce((sum: number, current: any) => sum + current.totalVentasDia, 0);
      } else {
        this.ventasDiarias = 0;
      }
    });




    this.ingresoService.getTotalVentasMes().subscribe(data => {
      console.log('Ventas Mensuales:', data);
      if (Array.isArray(data) && data.length > 0) {
        this.ventasMensuales = data[0].totalVentasMes;
        this.updateChart();
      }
      
    });


    this.egresoService.getTotalEgresosDia().subscribe(data => {
      console.log('Egresos diarios:', data);
      const egresosHoy = data.filter((egreso: any) => egreso._id.startsWith(today));
      if (egresosHoy.length > 0) {
        this.egresosDiarios = egresosHoy.reduce((sum: number, current: any) => sum + current.totalEgresosDia, 0);
      } else {
        this.egresosDiarios = 0;
      }
    });



    this.egresoService.getTotalEgresosMes().subscribe(data => {
      console.log('Egresos Mensuales:', data);
      if (Array.isArray(data) && data.length > 0) {
        this.egresosMensuales = data[0].totalEgresosMes;
        this.updateChart();
      }
    });

    ///metodos para traer las listas de ingresos y egresos para incluir en el pdf 
    this.ingresoService.listar().subscribe(data => {
      this.ingresos = data;
    });

    this.egresoService.listar().subscribe(data => {
      this.egresos = data;
    });

  }

  updateChart(): void {
    this.saldoMensual = this.ventasMensuales - this.egresosMensuales;
    this.barChartData[0].data = [this.ventasMensuales, this.egresosMensuales, this.saldoMensual];
  }

////////////////////////////// metodos para generar reporte en pdf////////////////////////////////////////////////

 // Opciones de meses y años
 months = [
  { value: 0, name: 'Enero' },
  { value: 1, name: 'Febrero' },
  { value: 2, name: 'Marzo' },
  { value: 3, name: 'Abril' },
  { value: 4, name: 'Mayo' },
  { value: 5, name: 'Junio' },
  { value: 6, name: 'Julio' },
  { value: 7, name: 'Agosto' },
  { value: 8, name: 'Septiembre' },
  { value: 9, name: 'Octubre' },
  { value: 10, name: 'Noviembre' },
  { value: 11, name: 'Diciembre' }
];

years = [2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030]; // Puedes ajustar los años disponibles según tu necesidad

// Valores seleccionados por defecto
selectedMonth: number = new Date().getMonth();
selectedYear: number = new Date().getFullYear();

// Datos de ingresos y egresos
//ingresos: any[] = [];
//egresos: any[] = [];

generarReporte(): void {
  const doc = new jsPDF();

  // Filtrar ingresos y egresos según el mes y año seleccionados
  const ingresosDelMes = this.ingresos.filter(ingreso => {
    const fecha = new Date(ingreso.ing_fecha);
    return fecha.getMonth() === this.selectedMonth && fecha.getFullYear() === this.selectedYear;
  });

  const egresosDelMes = this.egresos.filter(egreso => {
    const fecha = new Date(egreso.egreso_fecha);
    return fecha.getMonth() === this.selectedMonth && fecha.getFullYear() === this.selectedYear;
  });

  // Calcular totales
  const totalIngresos = ingresosDelMes.reduce((sum, current) => sum + current.ing_monto, 0);
  const totalEgresos = egresosDelMes.reduce((sum, current) => sum + current.egreso_monto, 0);
  const saldo = totalIngresos - totalEgresos;

  // Generar PDF
  doc.text(`Reporte de ingresos y egresos - ${this.getMonthName(this.selectedMonth)} ${this.selectedYear}`, 14, 20);

  doc.text('Ingresos', 14, 30);
  (doc as any).autoTable({
    head: [['Fecha', 'Monto', 'Descripción']],
    body: ingresosDelMes.map(ingreso => [ingreso.ing_fecha, ingreso.ing_monto, ingreso.ing_descripcion]),
    startY: 35,
    didDrawPage: (data) => {
      if (data.pageNumber > 1) {
        doc.text('Reporte de ingresos y egresos - Variedades Eléctricas', 14, 20);
        doc.text('Ingresos (continuación)', 14, 30);
      }
    }
  });

  const finalY = (doc as any).lastAutoTable.finalY || 35;

  doc.text('Egresos', 14, finalY + 10);
  (doc as any).autoTable({
    head: [['Fecha', 'Monto', 'Descripción']],
    body: egresosDelMes.map(egreso => [egreso.egreso_fecha, egreso.egreso_monto, egreso.egreso_descripcion]),
    startY: finalY + 15,
    didDrawPage: (data) => {
      if (data.pageNumber > 1 && data.startY === finalY + 15) {
        doc.text('Reporte de ingresos y egresos - Variedades Eléctricas', 14, 20);
        doc.text('Egresos (continuación)', 14, 30);
      }
    }
  });

  const finalY2 = (doc as any).lastAutoTable.finalY || finalY + 15;

  doc.text(`Total Ingresos: ${totalIngresos}`, 14, finalY2 + 10);
  doc.text(`Total Egresos: ${totalEgresos}`, 14, finalY2 + 20);
  doc.text(`Saldo: ${saldo}`, 14, finalY2 + 30);

  doc.save(`reporte-${this.selectedMonth + 1}-${this.selectedYear}.pdf`);
}

// Obtener el nombre del mes seleccionado
getMonthName(month: number): string {
  return this.months.find(m => m.value === month)?.name || '';
}

  
}


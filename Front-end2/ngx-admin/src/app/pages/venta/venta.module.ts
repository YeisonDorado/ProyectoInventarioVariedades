import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VentaRoutingModule } from './venta-routing.module';
import { CrearVentaComponent } from './crear-venta/crear-venta.component';
import { ListarVentasComponent } from './listar-ventas/listar-ventas.component';
import { NbCardModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    CrearVentaComponent,
    ListarVentasComponent
  ],
  imports: [
    CommonModule,
    VentaRoutingModule,
    NbCardModule,
    FormsModule,
  
  ],
  exports: [/////////////////////
    CrearVentaComponent,
    // exporta otros componentes si es necesario
  ]
})
export class VentaModule { }

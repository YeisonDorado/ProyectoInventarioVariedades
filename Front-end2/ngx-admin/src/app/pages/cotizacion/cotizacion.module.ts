import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CotizacionRoutingModule } from './cotizacion-routing.module';
import { CrearCotizacionComponent } from './crear-cotizacion/crear-cotizacion.component';
import { ListarCotizacionComponent } from './listar-cotizacion/listar-cotizacion.component';
import { NbCardModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CrearCotizacionComponent,
    ListarCotizacionComponent
  ],
  imports: [
    CommonModule,
    CotizacionRoutingModule,
    NbCardModule,
    FormsModule
  ],
  exports: [/////////////////////
    CrearCotizacionComponent,
    // exporta otros componentes si es necesario
  ]
})
export class CotizacionModule { }

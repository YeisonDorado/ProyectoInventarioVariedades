import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { CrearClienteComponent } from './crear-cliente/crear-cliente.component';
import { ListarClientesComponent } from './listar-clientes/listar-clientes.component';
import { NbCardModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CrearClienteComponent,
    ListarClientesComponent
  ],
  imports: [
    CommonModule,
    ClienteRoutingModule,
    NbCardModule,
    FormsModule
  ]
})
export class ClienteModule { }

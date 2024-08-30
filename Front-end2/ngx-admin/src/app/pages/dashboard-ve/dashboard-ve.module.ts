import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardVERoutingModule } from './dashboard-ve-routing.module';
import { ListarDashboardComponent } from './listar-dashboard/listar-dashboard.component';
import { ChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ListarDashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardVERoutingModule,
    ChartsModule, 
    FormsModule
  ]
})
export class DashboardVEModule { }

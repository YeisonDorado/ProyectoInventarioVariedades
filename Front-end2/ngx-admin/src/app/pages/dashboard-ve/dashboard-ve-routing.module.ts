import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarDashboardComponent } from './listar-dashboard/listar-dashboard.component';

const routes: Routes = [
  {
    path: 'listar-dashboard',
    component: ListarDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardVERoutingModule { }

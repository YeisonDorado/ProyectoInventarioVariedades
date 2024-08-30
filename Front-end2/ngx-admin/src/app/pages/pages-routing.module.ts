import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';

const routes: Routes = [
 

  
  {
  path: '',
  component: PagesComponent,
  children: [
    {
    path: 'seguridad',
    loadChildren:() => import('./seguridad/seguridad.module')
    .then(m=>m.SeguridadModule),
    },

    {
      path: 'cliente',
      loadChildren:() => import('./cliente/cliente.module')
      .then(m=>m.ClienteModule),

    },

    {
      path: 'proveedor',
      loadChildren:() => import('./proveedor/proveedor.module')
      .then(m=>m.ProveedorModule),

    },

    {
      path: 'producto',
      loadChildren:() => import('./producto/producto.module')
      .then(m=>m.ProductoModule),

    },

    {
      path: 'categoria-ie',
      loadChildren:() => import('./categoria-ie/categoria-ie.module')
      .then(m=>m.CategoriaIEModule),

    },

    {
      path: 'ingreso',
      loadChildren:() => import('./ingreso/ingreso.module')
      .then(m=>m.IngresoModule),

    },

    {
      path: 'egreso',
      loadChildren:() => import('./egreso/egreso.module')
      .then(m=>m.EgresoModule),

    },

    {
      path: 'permiso',
      loadChildren:() => import('./permiso/permiso.module')
      .then(m=>m.PermisoModule),

    },

    {
      path: 'rol',
      loadChildren:() => import('./rol/rol.module')
      .then(m=>m.RolModule),

    },

    {
      path: 'venta',
      loadChildren:() => import('./venta/venta.module')
      .then(m=>m.VentaModule),

    },

    {
      path: 'dashboard-ve',
      loadChildren:() => import('./dashboard-ve/dashboard-ve.module')
      .then(m=>m.DashboardVEModule),

    },

    {
      path: 'permisos-roles',
      loadChildren:() => import('./permisos-roles/permisos-roles.module')
      .then(m=>m.PermisosRolesModule),

    },

    {
      path: 'cotizacion',
      loadChildren:() => import('./cotizacion/cotizacion.module')
      .then(m=>m.CotizacionModule),

    },

    







    
    {
      path: 'dashboard',
      component: ECommerceComponent,
    },
    {
      path: 'iot-dashboard',
      component: DashboardComponent,
    },
    {
      path: 'layout',
      loadChildren: () => import('./layout/layout.module')
        .then(m => m.LayoutModule),
    },
    {
      path: 'forms',
      loadChildren: () => import('./forms/forms.module')
        .then(m => m.FormsModule),
    },
    {
      path: 'ui-features',
      loadChildren: () => import('./ui-features/ui-features.module')
        .then(m => m.UiFeaturesModule),
    },
    {
      path: 'modal-overlays',
      loadChildren: () => import('./modal-overlays/modal-overlays.module')
        .then(m => m.ModalOverlaysModule),
    },
    {
      path: 'extra-components',
      loadChildren: () => import('./extra-components/extra-components.module')
        .then(m => m.ExtraComponentsModule),
    },
    {
      path: 'maps',
      loadChildren: () => import('./maps/maps.module')
        .then(m => m.MapsModule),
    },
    {
      path: 'charts',
      loadChildren: () => import('./charts/charts.module')
        .then(m => m.ChartsModule),
    },
    {
      path: 'editors',
      loadChildren: () => import('./editors/editors.module')
        .then(m => m.EditorsModule),
    },
    {
      path: 'tables',
      loadChildren: () => import('./tables/tables.module')
        .then(m => m.TablesModule),
    },
    {
      path: 'miscellaneous',
      loadChildren: () => import('./miscellaneous/miscellaneous.module')
        .then(m => m.MiscellaneousModule),
    },
    // {
    // path: '',
    // redirectTo: 'seguridad/login',
    // pathMatch: 'full',
    // },
    // {
    // path: '',
    // redirectTo: 'pages/dashboard-ve/listar-dashboard',
    // pathMatch: 'full',
    // },

    {
      path: '**',
      component: NotFoundComponent,
    },
  ],

}
];

@NgModule({
  imports: [RouterModule.forChild(routes)
    
  ],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}

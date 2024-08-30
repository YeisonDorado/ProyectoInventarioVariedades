import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard VE',
    icon: 'home-outline',
    link: '/pages/dashboard-ve/listar-dashboard',
    home: true,
  },
 
  {
    title: 'PANEL DE ADMINISTRACION',
    group: true,
  },


  {
    title: 'Gestion de inventario',
    icon: 'layout-outline',
    children: [
      {
        title: 'Clientes',
        link: '/pages/cliente/listar-clientes',
      },
      {
        title: 'Productos',
        link: '/pages/producto/listar-productos',
      },
      {
        title: 'Proveedores',
        link: '/pages/proveedor/listar-proveedores',
      },
      {
        title: 'Cotizaciones',
        link: '/pages/cotizacion/listar-cotizaciones',
      },
      {
        title: 'Ventas',
        link: '/pages/venta/listar-ventas',
      },
     
    ],
  },

  
  {
    title: 'Gestion contable',
    icon: 'edit-2-outline',
    children: [
      
      {
        title: 'Dashboard',
        link: '/pages/dashboard-ve/listar-dashboard',
      },
      {
        title: 'Ingresos',
        link: '/pages/ingreso/listar-ingresos',
      },
      {
        title: 'Egresos',
        link: '/pages/egreso/listar-egresos',
      },
      {
        title: 'Categorias',
        link: '/pages/categoria-ie/listar-categorias',
      },
      
    ],
  },


  {
    title: 'Gestion de acceso',
    icon: 'lock-outline',
    children: [
      {
        title: 'Usuarios',
        link: '/pages/seguridad/listar-usuarios',
      },
      {
        title: 'Roles',
        link: '/pages/rol/listar-roles',
      },
      {
        title: 'Permisos',
        link: '/pages/permiso/listar-permisos',
      },

      {
        title: 'Asigacion permisos',
        link: '/pages/permisos-roles/listar-permisos-roles',
      },
      
    ],
  },







];

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PermisosRoles } from '../../../modelos/permisos-roles.model';
import { PermisosRolesService } from '../../../servicios/permisos-roles.service';
import { Rol } from '../../../modelos/rol.model';
import { RolService } from '../../../servicios/rol.service';
import { Permiso } from '../../../modelos/permiso.model';
import { PermisoService } from '../../../servicios/permiso.service';

@Component({
  selector: 'ngx-crear-permisos-roles',
  templateUrl: './crear-permisos-roles.component.html',
  styleUrls: ['./crear-permisos-roles.component.scss']
})
export class CrearPermisosRolesComponent {
  modoCreacion: boolean = true;
  id_permisoRol: string = "";
  intentoEnvio: boolean = false;

  elPermisoRol: PermisosRoles = {
   
    rol_id: "",
    permiso_id:"",
  
  };

  elRol: Rol[] = [];
  elPermiso: Permiso[] = [];

  constructor(
    private miServicioPermisosRoles: PermisosRolesService,
    private miServicioRoles: RolService,
    private miServicioPermisos: PermisoService,
    private rutaActiva: ActivatedRoute,
    private router: Router
  ) { }


  ngOnInit(): void {
    if (this.rutaActiva.snapshot.params.id_permisoRol) {
      this.modoCreacion = false;
      this.id_permisoRol = this.rutaActiva.snapshot.params.id_permisoRol;
      this.getPermisoRol(this.id_permisoRol);
    } else {
      this.modoCreacion = true;
     
      
    }
    this.getRoles();
    this.getPermisos();
    
  }

  getPermisoRol(id: string) {
    this.miServicioPermisosRoles.getPermisosRoles(id).subscribe(data => {
      this.elPermisoRol = data;
    });
  }

  getRoles() {
    this.miServicioRoles.listar().subscribe((data: Rol[]) => {
      this.elRol = data;
    });
  }

  getPermisos() {
    this.miServicioPermisos.listar().subscribe((data: Permiso[]) => {
      this.elPermiso = data;
    });
  }

  agregar(): void {
    if (this.validarDatosCompletos()) {
      this.intentoEnvio = true;
      this.miServicioPermisosRoles.crear(this.elPermisoRol.rol_id!, this.elPermisoRol.permiso_id!, this.elPermisoRol).subscribe((permisosRolCreado: PermisosRoles) => {
        Swal.fire('Creado', 'El permiso rol ha sido creado correctamente', 'success');
        this.router.navigate(["/pages/permisos-roles/listar-permisos-roles"]);
      });
    }
  }


  editar(): void {
      if (this.validarDatosCompletos()) {
        this.intentoEnvio = true;
    
        // Verificación de que `this.laVenta` y sus propiedades necesarias no sean nulas
        if (this.elPermisoRol && this.elPermisoRol._id && this.elPermisoRol.rol_id && this.elPermisoRol.permiso_id) {
          
    
          this.miServicioPermisosRoles.editar(this.elPermisoRol._id, this.elPermisoRol.rol_id, this.elPermisoRol.permiso_id, this.elPermisoRol)
            .subscribe(
              (comprobanteActualizado: PermisosRoles) => {
                Swal.fire('Actualizado', 'El Permiso-rol ha sido actualizado correctamente', 'success');
                this.router.navigate(["/pages/permisos-roles/listar-permisos-roles"]);
              },
              (error) => {
                console.error('Error al actualizar el permiso-rol:', error);
                Swal.fire('Error', 'Hubo un problema al actualizar el permiso-rol', 'error');
              }
            );
        } else {
          // Caso en que los datos necesarios no están presentes
          console.error('Datos incompletos para actualizar el permiso-rol:', {
            elPermisoRol: this.elPermisoRol,
           
          });
          Swal.fire('Error', 'Datos incompletos para actualizar el permiso-rol', 'error');
        }
      } else {
        Swal.fire('Error', 'Por favor complete todos los campos requeridos', 'error');
      }
    }




  validarDatosCompletos(): boolean {
    this.intentoEnvio = true;
    return this.elPermisoRol.rol_id !== "" && this.elPermisoRol.permiso_id !== "";
      
  }


}

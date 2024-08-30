import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { PermisosRoles } from '../modelos/permisos-roles.model';

@Injectable({
  providedIn: 'root'
})
export class PermisosRolesService {

  constructor(private http: HttpClient) { }
  listar(): Observable<PermisosRoles[]> {
    return this.http.get<PermisosRoles[]>(`${environment.url_gateway}/permisos-roles`);
}

eliminar(id:string){
    return this.http.delete<PermisosRoles>(`${environment.url_gateway}/permisos-roles/${id}`,
);
}

getPermisosRoles(id: string): Observable<PermisosRoles> {
    return this.http.get<PermisosRoles>(`${environment.url_gateway}/permisos-roles/${id}`);
  }

crear(rol_id: string, permiso_id: string, ElPermisoRol: PermisosRoles) {
 
  return this.http.post(`${environment.url_gateway}/permisos-roles/rol/${rol_id}/permiso/${permiso_id}`, ElPermisoRol);
  }

editar(id: string, rol_id: string, permiso_id: string, ElPermisoRol: PermisosRoles) {
  return this.http.put(`${environment.url_gateway}/permisos-roles/${id}/rol/${rol_id}/permiso/${permiso_id}`, ElPermisoRol);
}

}

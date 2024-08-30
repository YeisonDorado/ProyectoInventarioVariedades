import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { environment } from '../../environments/environment';
import { Ingreso } from '../modelos/ingreso.model';

@Injectable({
  providedIn: 'root'
})
export class IngresoService {
constructor(private http: HttpClient) { }
listar(): Observable<Ingreso[]> {
    return this.http.get<Ingreso[]>(`${environment.url_gateway}/ingresos`);
}

eliminar(id:string){
    return this.http.delete<Ingreso>(`${environment.url_gateway}/ingresos/${id}`,
);
}

getIngreso(id: string): Observable<Ingreso> {
    return this.http.get<Ingreso>(`${environment.url_gateway}/ingresos/${id}`);
  }

crear(elIngreso: Ingreso) {
 
  return this.http.post(`${environment.url_gateway}/ingresos`, elIngreso);
  }

editar(id:string,elIngreso: Ingreso) {
  return this.http.put(`${environment.url_gateway}/ingresos/${id}`, elIngreso);
  }

asignarCategoria(id: string, categoria_id: string): Observable<Ingreso> {
  
  return this.http.put<Ingreso>(`${environment.url_gateway}/ingresos/${id}/categoria/${categoria_id}`, {})

}

getIngresoNumero(): Observable<any> {
  return this.http.get<any>(`${environment.url_gateway}/ingresos/next-number`);
}


getTotalVentasDia():Observable<any> {
  return this.http.get<any>(`${environment.url_gateway}/ingresos/ventas-dia`);
}

getTotalVentasMes():Observable<any> {
  return this.http.get<any>(`${environment.url_gateway}/ingresos/ventas-mes`);
}
 
}

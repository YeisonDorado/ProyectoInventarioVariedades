import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { environment } from '../../environments/environment';
import { Egreso } from '../modelos/egreso.model';


@Injectable({
  providedIn: 'root'
})
export class EgresoService {

  constructor(private http: HttpClient) { }
listar(): Observable<Egreso[]> {
    return this.http.get<Egreso[]>(`${environment.url_gateway}/egresos`);
}

eliminar(id:string){
    return this.http.delete<Egreso>(`${environment.url_gateway}/egresos/${id}`,
);
}

getEgreso(id: string): Observable<Egreso> {
    return this.http.get<Egreso>(`${environment.url_gateway}/egresos/${id}`);
  }

crear(elEgreso: Egreso) {
 
  return this.http.post(`${environment.url_gateway}/egresos`, elEgreso);
  }

editar(id:string,elEgreso: Egreso) {
  return this.http.put(`${environment.url_gateway}/egresos/${id}`, elEgreso);
  }

asignarCategoria(id: string, categoria_id: string): Observable<Egreso> {
  
  return this.http.put<Egreso>(`${environment.url_gateway}/egresos/${id}/categoria/${categoria_id}`, {})

}

getEgresoNumero(): Observable<any> {
  return this.http.get<any>(`${environment.url_gateway}/egresos/next-number`);
}


getTotalEgresosDia():Observable<any> {
  return this.http.get<any>(`${environment.url_gateway}/egresos/egresos-dia`);
}

getTotalEgresosMes():Observable<any> {
  return this.http.get<any>(`${environment.url_gateway}/egresos/egresos-mes`);
}

  
}

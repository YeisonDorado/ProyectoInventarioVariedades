import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { environment } from '../../environments/environment';
import { Cotizacion } from '../modelos/cotizacion.model';


@Injectable({
  providedIn: 'root'
})
export class CotizacionService {

  constructor(private http: HttpClient) { }
listar(): Observable<Cotizacion[]> {
    return this.http.get<Cotizacion[]>(`${environment.url_gateway}/cotizaciones`);
}

eliminar(id:string){
    return this.http.delete<Cotizacion>(`${environment.url_gateway}/cotizaciones/${id}`,
);
}

getCotizacion(id: string): Observable<Cotizacion> {
    return this.http.get<Cotizacion>(`${environment.url_gateway}/cotizaciones/${id}`);
  }

crear(cliente_id: string, producto_id: string, laCotizacion: Cotizacion) {
 
  return this.http.post(`${environment.url_gateway}/cotizaciones/producto/${producto_id}/cliente/${cliente_id}`, laCotizacion);
  }

editar(id: string, cliente_id: string, producto_id: string, laCotizacion: Cotizacion) {
  return this.http.put(`${environment.url_gateway}/cotizaciones/${id}/producto/${producto_id}/cliente/${cliente_id}`, laCotizacion);
}
 
getCotizacionNumero(): Observable<any> {
  return this.http.get<any>(`${environment.url_gateway}/cotizaciones/next-number`);
}

}

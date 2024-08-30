import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { environment } from '../../environments/environment';
import { Venta } from '../modelos/venta.model';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

constructor(private http: HttpClient) { }
listar(): Observable<Venta[]> {
    return this.http.get<Venta[]>(`${environment.url_gateway}/comprobantes`);
}

eliminar(id:string){
    return this.http.delete<Venta>(`${environment.url_gateway}/comprobantes/${id}`,
);
}

getComprobante(id: string): Observable<Venta> {
    return this.http.get<Venta>(`${environment.url_gateway}/comprobantes/${id}`);
  }

crear(cliente_id: string, producto_id: string, laVenta: Venta) {
 
  return this.http.post(`${environment.url_gateway}/comprobantes/producto/${producto_id}/cliente/${cliente_id}`, laVenta);
  }

editar(id: string, cliente_id: string, producto_id: string, laVenta: Venta) {
  return this.http.put(`${environment.url_gateway}/comprobantes/${id}/producto/${producto_id}/cliente/${cliente_id}`, laVenta);
}
 
getComprobanteNumero(): Observable<any> {
  return this.http.get<any>(`${environment.url_gateway}/comprobantes/next-number`);
}

  
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { environment } from '../../environments/environment';
import { Producto } from '../modelos/producto.model';
import { Usuarios } from '../modelos/usuarios.model';



@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http: HttpClient) { }
listar(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${environment.url_gateway}/productos`);
}

eliminar(id:string){
    return this.http.delete<Producto>(`${environment.url_gateway}/productos/${id}`,
);
}

getProducto(id: string): Observable<Producto> {
    return this.http.get<Producto>(`${environment.url_gateway}/productos/${id}`);
  }

crear(elProducto: Producto) {
 
  return this.http.post(`${environment.url_gateway}/productos`, elProducto);
  }

editar(id:string,elProducto: Producto) {
  return this.http.put(`${environment.url_gateway}/productos/${id}`, elProducto);
  }

asignarProveedor(id: string, proveedor_id: string): Observable<Producto> {
  
  return this.http.put<Producto>(`${environment.url_gateway}/productos/${id}/proveedor/${proveedor_id}`, {})

}


 
}

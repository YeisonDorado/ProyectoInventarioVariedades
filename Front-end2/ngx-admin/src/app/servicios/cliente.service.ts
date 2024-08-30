import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Cliente } from '../modelos/cliente.model';
import { Usuarios } from '../modelos/usuarios.model';
@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  constructor(private http: HttpClient) { }
listar(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${environment.url_gateway}/clientes`);
}

eliminar(id:string){
    return this.http.delete<Cliente>(`${environment.url_gateway}/clientes/${id}`,
);
}

getCliente(id: string): Observable<Cliente> {
    return this.http.get<Cliente>(`${environment.url_gateway}/clientes/${id}`);
  }

crear(elCliente: Cliente) {
  return this.http.post(`${environment.url_gateway}/clientes`, elCliente);
  }

editar(id:string,elCliente: Cliente) {
  return this.http.put(`${environment.url_gateway}/clientes/${id}`,
  elCliente);
  }


  
}

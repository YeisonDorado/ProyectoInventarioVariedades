import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CategoriaIe } from '../modelos/categoria-ie.model';
import { Usuarios } from '../modelos/usuarios.model';
@Injectable({
  providedIn: 'root'
})
export class CategoriaIeService {
constructor(private http: HttpClient) { }
listar(): Observable<CategoriaIe[]> {
    return this.http.get<CategoriaIe[]>(`${environment.url_gateway}/categorias`);
}

eliminar(id:string){
    return this.http.delete<CategoriaIe>(`${environment.url_gateway}/categorias/${id}`,
);
}

getCategoria(id: string): Observable<CategoriaIe> {
    return this.http.get<CategoriaIe>(`${environment.url_gateway}/categorias/${id}`);
  }

crear(laCategoria: CategoriaIe) {
  return this.http.post(`${environment.url_gateway}/categorias`, laCategoria);
  }

editar(id:string,laCategoria: CategoriaIe) {
  return this.http.put(`${environment.url_gateway}/categorias/${id}`,
    laCategoria);
  }


  
}

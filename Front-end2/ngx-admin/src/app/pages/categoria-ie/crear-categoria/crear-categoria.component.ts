import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CategoriaIe } from '../../../modelos/categoria-ie.model';
import { CategoriaIeService } from '../../../servicios/categoria-ie.service';
@Component({
  selector: 'ngx-crear-categoria',
  templateUrl: './crear-categoria.component.html',
  styleUrls: ['./crear-categoria.component.scss']
})
export class CrearCategoriaComponent {
  modoCreacion: boolean = true;
  id_categoria: string = "";
  intentoEnvio: boolean = false;
  laCategoria: CategoriaIe = {
  cat_codigo: "",
  cat_nombre: "",
};

constructor(
  private miServicioCategorias: CategoriaIeService,
  private rutaActiva: ActivatedRoute,
  private router: Router
) { }

ngOnInit(): void {
  if (this.rutaActiva.snapshot.params.id_categoria) {
    this.modoCreacion = false;
    this.id_categoria = this.rutaActiva.snapshot.params.id_categoria;
    this.getCategoria(this.id_categoria);
  } else {
    this.modoCreacion = true;
  }
}

getCategoria(id: string) {
  this.miServicioCategorias.getCategoria(id).subscribe(data => {
    this.laCategoria = data;
  });
}

agregar(): void {
  if (this.validarDatosCompletos()) {
    this.intentoEnvio = true;
    this.miServicioCategorias.crear(this.laCategoria).subscribe(data => {
      Swal.fire(
        'Creado',
        'La categoria ha sido creada correctamente',
        'success'
      );
      this.router.navigate(["pages/categoria-ie/listar-categorias"]);
    });
  }
}

editar(): void {
  this.intentoEnvio = true;
  if (this.validarDatosCompletos()) {
    this.miServicioCategorias.editar(this.laCategoria._id, this.laCategoria).subscribe(data => {
      Swal.fire(
        'Actualizado',
        'La categoria ha sido actualizada correctamente',
        'success'
      );
      this.router.navigate(["pages/categoria-ie/listar-categorias"]);
    });
  }
}

validarDatosCompletos(): boolean {
  this.intentoEnvio = true;
  if (this.laCategoria.cat_codigo == "" ||
      this.laCategoria.cat_nombre == "") {
    return false;
  } else {
    return true;
  }
}


}

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Egreso } from '../../../modelos/egreso.model';
import { EgresoService } from '../../../servicios/egreso.service';
import { CategoriaIe } from '../../../modelos/categoria-ie.model';///////////////importacion de modelos categorias
import { CategoriaIeService } from '../../../servicios/categoria-ie.service';////////////////importacion de servcicios categorias

@Component({
  selector: 'ngx-crear-egreso',
  templateUrl: './crear-egreso.component.html',
  styleUrls: ['./crear-egreso.component.scss']
})
export class CrearEgresoComponent {
  modoCreacion: boolean = true;
  id_egreso: string = "";
  intentoEnvio: boolean = false;
  elEgreso: Egreso = {
  egreso_codigo: "",
  egreso_fecha: "",
  egreso_monto: 0,
  egreso_descripcion: "",
  categoria_id: "",// variable de referencia categoria - egresos
  nextNumber: "",
 
};

laCategoria: CategoriaIe[] =[]; //arreglo que contiene la lista de categorias

constructor(
  private miServicioEgresos: EgresoService,
  private miServicioCategorias: CategoriaIeService,// se llama los servicios de categorias ingreso/egresos
  private rutaActiva: ActivatedRoute,
  private router: Router
) { }

ngOnInit(): void {
  if (this.rutaActiva.snapshot.params.id_egreso) {
    this.modoCreacion = false;
    this.id_egreso = this.rutaActiva.snapshot.params.id_egreso;
    this.getEgreso(this.id_egreso);
  } else {
    this.modoCreacion = true;
    this.getNextEgresoNumber();
    this.elEgreso.egreso_fecha = this.getFechaColombia(); // Establece la fecha actual
  }
  this.getCategoria();// se llama el metodo que contiene la lista de categorias
  
}


getFechaColombia(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = ('0' + (now.getMonth() + 1)).slice(-2);
  const day = ('0' + now.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
}



getEgreso(id: string) {
  this.miServicioEgresos.getEgreso(id).subscribe(data => {
    this.elEgreso = data;
  });
}

//metodo para obtener la lista de categrias 
getCategoria() {
  this.miServicioCategorias.listar().subscribe((data: CategoriaIe[]) => {
    this.laCategoria = data;
  });
}



agregar(): void {
  if (this.validarDatosCompletos()) {
   this.intentoEnvio = true;
   console.log(this.elEgreso); // Añade este log para verificar los datos              
    this.miServicioEgresos.crear(this.elEgreso).subscribe((egresoCreado: Egreso) => {
      console.log('Egreso creado:', egresoCreado);
      Swal.fire(
        'Creado',
        'El Egreso ha sido creado correctamente',
        'success'
      );
      if (egresoCreado._id && this.elEgreso.categoria_id) {
        this.asignarCategoria(egresoCreado._id, this.elEgreso.categoria_id);// Llama al metodo asignarCategoria después de crear el producto
      } else {
        console.error('Error: Ingreso o categoria no definido');
      }
    });

  }
}



editar(): void {
  this.intentoEnvio = true;
  if (this.validarDatosCompletos()) {
    this.miServicioEgresos.editar(this.elEgreso._id, this.elEgreso).subscribe((egresoCreado: Egreso) => {
      Swal.fire(
        'Actualizado',
        'El egreso ha sido actualizado correctamente',
        'success'
      );
      if (egresoCreado._id && this.elEgreso.categoria_id) {
        this.asignarCategoria(egresoCreado._id, this.elEgreso.categoria_id);// Llama a asignarCategoria después de actualizar el producto
      } else {
        console.error('Error: egreso o categoria no definido');
      }
      
    });
  }
}


asignarCategoria(egresoId: string, categoriaId: string): void {
  this.miServicioEgresos.asignarCategoria(egresoId, categoriaId).subscribe(data => {
    // Swal.fire(
    //   'Categoria Asignada',
    //   'La categoria ha sido asignado correctamente al egreso',
    //   'success'
    // );
    this.router.navigate(["pages/egreso/listar-egresos"]);
  }, error => {
    Swal.fire(
      'Error',
      'Hubo un error al asignar la categoria',
      'error'
    );
  });
}


getNextEgresoNumber(): void {
  this.miServicioEgresos.getEgresoNumero().subscribe(
    data => {
      this.elEgreso.egreso_codigo = data.nextNumber; //
    },
    error => {
      console.error('Error al obtener el próximo número de egreso', error);
    }
  );
}







validarDatosCompletos(): boolean {
  this.intentoEnvio = true;
  if (this.elEgreso.egreso_codigo == "" ||
      this.elEgreso.egreso_fecha == "" ||
      this.elEgreso.egreso_monto == 0 ||
      this.elEgreso.egreso_descripcion == "" ||
      this.elEgreso.categoria_id == "") {
    return false;
  } else {
    return true;
  }
}


}

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Ingreso } from '../../../modelos/ingreso.model';
import { IngresoService } from '../../../servicios/ingreso.service';
import { CategoriaIe } from '../../../modelos/categoria-ie.model';///////////////
import { CategoriaIeService } from '../../../servicios/categoria-ie.service';////////////////


@Component({
  selector: 'ngx-crear-ingreso',
  templateUrl: './crear-ingreso.component.html',
  styleUrls: ['./crear-ingreso.component.scss']
})
export class CrearIngresoComponent {

  modoCreacion: boolean = true;
  id_ingreso: string = "";
  intentoEnvio: boolean = false;
  elIngreso: Ingreso = {
  ing_codigo: "",
  ing_fecha: "",
  ing_monto: 0,
  ing_descripcion: "",
  ing_metodo_pago: "",
  categoria_id: "",
  nextNumber: "",
 
};

laCategoria: CategoriaIe[] =[]; //arreglo que contiene la lista de categorias

constructor(
  private miServicioIngresos: IngresoService,
  private miServicioCategorias: CategoriaIeService,// se llama los servicios de categorias ingreso/egresos
  private rutaActiva: ActivatedRoute,
  private router: Router
) { }

ngOnInit(): void {
  if (this.rutaActiva.snapshot.params.id_ingreso) {
    this.modoCreacion = false;
    this.id_ingreso = this.rutaActiva.snapshot.params.id_ingreso;
    this.getIngreso(this.id_ingreso);
  } else {
    this.modoCreacion = true;
    this.getNextIngresoNumber();
    this.elIngreso.ing_fecha = this.getFechaColombia(); // Establece la fecha actual
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

getIngreso(id: string) {
  this.miServicioIngresos.getIngreso(id).subscribe(data => {
    this.elIngreso = data;
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
   console.log(this.elIngreso); // Añade este log para verificar los datos              
    this.miServicioIngresos.crear(this.elIngreso).subscribe((ingresoCreado: Ingreso) => {
      console.log('Ingreso creado:', ingresoCreado);
      Swal.fire(
        'Creado',
        'El Ingreso ha sido creado correctamente',
        'success'
      );
      if (ingresoCreado._id && this.elIngreso.categoria_id) {
        this.asignarCategoria(ingresoCreado._id, this.elIngreso.categoria_id);// Llama al metodo asignarCategoria después de crear el producto
      } else {
        console.error('Error: Ingreso o categoria no definido');
      }
    });

  }
}



editar(): void {
  this.intentoEnvio = true;
  if (this.validarDatosCompletos()) {
    this.miServicioIngresos.editar(this.elIngreso._id, this.elIngreso).subscribe((ingresoCreado: Ingreso) => {
      Swal.fire(
        'Actualizado',
        'El ingreso ha sido actualizado correctamente',
        'success'
      );
      if (ingresoCreado._id && this.elIngreso.categoria_id) {
        this.asignarCategoria(ingresoCreado._id, this.elIngreso.categoria_id);// Llama a asignarCategoria después de actualizar el producto
      } else {
        console.error('Error: ingreso o categoria no definido');
      }
      
    });
  }
}


asignarCategoria(ingresoId: string, categoriaId: string): void {
  this.miServicioIngresos.asignarCategoria(ingresoId, categoriaId).subscribe(data => {
    // Swal.fire(
    //   'Categoria Asignada',
    //   'La categoria ha sido asignado correctamente al ingreso',
    //   'success'
    // );
    this.router.navigate(["pages/ingreso/listar-ingresos"]);
  }, error => {
    Swal.fire(
      'Error',
      'Hubo un error al asignar la categoria',
      'error'
    );
  });
}



getNextIngresoNumber(): void {
  this.miServicioIngresos.getIngresoNumero().subscribe(
    data => {
      this.elIngreso.ing_codigo = data.nextNumber; //
    },
    error => {
      console.error('Error al obtener el próximo número de comprobante', error);
    }
  );
}





validarDatosCompletos(): boolean {
  this.intentoEnvio = true;
  if (this.elIngreso.ing_codigo == "" ||
      this.elIngreso.ing_fecha == "" ||
      this.elIngreso.ing_monto == 0 ||
      this.elIngreso.ing_descripcion == "" ||
      this.elIngreso.ing_metodo_pago == "" ||
      this.elIngreso.categoria_id == "") {
    return false;
  } else {
    return true;
  }
}

}

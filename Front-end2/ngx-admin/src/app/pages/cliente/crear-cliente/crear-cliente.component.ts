import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Cliente } from '../../../modelos/cliente.model';
import { ClienteService } from '../../../servicios/cliente.service';


@Component({
  selector: 'ngx-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.scss']
})
export class CrearClienteComponent {

  modoCreacion: boolean = true;
  id_cliente: string = "";
  intentoEnvio: boolean = false;
  elCliente: Cliente = {
  cedula_nit: "",
  nombre_completo: "",
  tipo: "",
  direccion: "",
  ciudad: "",
  telefono: "",
  correo: ""
};

constructor(
  private miServicioClientes: ClienteService,
  private rutaActiva: ActivatedRoute,
  private router: Router
) { }

ngOnInit(): void {
  if (this.rutaActiva.snapshot.params.id_cliente) {
    this.modoCreacion = false;
    this.id_cliente = this.rutaActiva.snapshot.params.id_cliente;
    this.getCliente(this.id_cliente);
  } else {
    this.modoCreacion = true;
  }
}

getCliente(id: string) {
  this.miServicioClientes.getCliente(id).subscribe(data => {
    this.elCliente = data;
  });
}

agregar(): void {
  if (this.validarDatosCompletos()&& this.correoValido(this.elCliente.correo)) {
    this.intentoEnvio = true;
    this.miServicioClientes.crear(this.elCliente).subscribe(data => {
      Swal.fire(
        'Creado',
        'El cliente ha sido creado correctamente',
        'success'
      );
      this.router.navigate(["pages/cliente/listar-clientes"]);
    });
  }
}

editar(): void {
  this.intentoEnvio = true;
  if (this.validarDatosCompletos()&& this.correoValido(this.elCliente.correo)) {
    this.miServicioClientes.editar(this.elCliente._id, this.elCliente).subscribe(data => {
      Swal.fire(
        'Actualizado',
        'El cliente ha sido actualizado correctamente',
        'success'
      );
      this.router.navigate(["pages/cliente/listar-clientes"]);
    });
  }
}

validarDatosCompletos(): boolean {
  this.intentoEnvio = true;
  if (this.elCliente.cedula_nit == "" ||
      this.elCliente.nombre_completo == "" ||
      this.elCliente.tipo == "" ||
      this.elCliente.direccion == "" ||
      this.elCliente.ciudad == "" ||
      this.elCliente.telefono == "" ||
      this.elCliente.correo == "") {
    return false;
  } else {
    return true;
  }
}



correoValido(correo: string): boolean {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(correo);
}


}

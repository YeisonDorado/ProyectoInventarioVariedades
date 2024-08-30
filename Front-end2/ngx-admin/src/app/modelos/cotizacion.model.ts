import { Cliente } from "./cliente.model";
import { Producto } from "./producto.model";

export class Cotizacion {
    _id?: string;
    cot_numero?: string;
    cot_fecha?: string;
    cot_total_pago?: number;
    cot_forma_pago?: string;
    cot_valor_total_prod?: number;
    cot_cantidad_venta_prod?: number;
    cliente?: Cliente;///////se hizo mofificacion para listar nombres de clientes en mayusculas y minusculas
    cliente_id?: string;
    productos?: Producto[];///////////
    producto_id?: string;
    nextNumber?: string;
}

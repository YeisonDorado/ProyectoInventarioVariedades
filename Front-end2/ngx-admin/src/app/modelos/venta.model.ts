import { Cliente } from "./cliente.model";
import { Producto } from "./producto.model";

export class Venta {
    _id?: string;
    comp_numero?: string;
    comp_fecha?: string;
    comp_forma_pago?: string;
    comp_item?: string; //// esta variable es para para que se autonumere cada que agrugue un producto al comprobante 
    comp_cantidad_venta_prod?: number;/// esta variable es para la cantidad que se quiere llevar por producto en el comprobante
    comp_precio_venta_prod?: number;/// variable para el precio de venta del productos pero no se si sea necesario en el comprobante ya que esta en productos
    comp_valor_total_prod?: number; ///// variable para calcular le total por cada item agregado al comprobante de prod_precio_venta x comp_cantidad_venta_prod 
    comp_total_pago?: number;// variable para calcular le total de comprobante 
    comp_nombre_vendedor?: string;
    cliente?: Cliente;///////se hizo mofificacion para listar nombres de clientes en mayusculas y minusculas
    cliente_id?: string;
    productos?: Producto[];///////////
    producto_id?: string;
    nextNumber?: string;

    // Nueva estructura
    items?: {
        producto: Producto;
        comp_cantidad_venta_prod: number;
        comp_valor_total_prod: number;
    }[];
}





import { Proveedor } from "./proveedor.model";



export class Producto {
    _id?:string;
    prod_codigo?:string;
    prod_nombre?:string;
    prod_marca?:string; 
    prod_descripcion?:string; 
    prod_categoria?:string; 
    prod_cantidad_compra?:number; 
    prod_unidad_medida?:string;
    prod_precio_costo?:number;
    prod_precio_venta?: number;
    proveedor_id?: string;///////////////
    //proveedor?: Proveedor;/////////
    comp_cantidad_venta_prod?: number;
    comp_valor_total_prod?: number;

    cot_cantidad_venta_prod?: number;
    cot_valor_total_prod?: number;
}

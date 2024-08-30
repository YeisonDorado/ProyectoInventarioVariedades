import { CategoriaIe } from "./categoria-ie.model";

export class Ingreso {
    _id?: string;
    ing_codigo?: string;
    ing_fecha?: string;
    ing_monto?: number;
    ing_descripcion?: string;
    ing_metodo_pago?: string;
    categoria_id?: string;
    categoria?: CategoriaIe;
    nextNumber?: string;

    //variables para los totales con las consultas 
    totalVentasDia?: number;
    totalVentasMes?: number;
}

import { CategoriaIe } from "./categoria-ie.model";

export class Egreso {
    _id?: string;
    egreso_codigo?: string;
    egreso_fecha?: string;
    egreso_monto?: number;
    egreso_descripcion?: string;
    categoria_id?: string;
    categoria?: CategoriaIe;
    nextNumber?: string;

    //variables para los totales de egresos con las consultas 
    totalEgresosDia?: number;
    totalEgresosMes?: number;

}

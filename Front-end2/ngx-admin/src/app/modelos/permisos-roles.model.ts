import { Permiso } from "./permiso.model";
import { Rol } from "./rol.model";

export class PermisosRoles {
    _id?: string;
    rol_id?: string;
    rol?: Rol
    permiso_id?: string;
    permiso?: Permiso;
}

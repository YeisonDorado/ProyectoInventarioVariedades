from Repositorios.RepositorioProveedor import RepositorioProveedor
from Modelos.Proveedor import Proveedor

class ControladorProveedor():

    def __init__(self):
        self.repositorioProveedor = RepositorioProveedor()
        print("Creando ControladorProveedor")

    def index(self):
        print("Listar todos los proveedores")
        return self.repositorioProveedor.findAll()

    def create(self, elProveedor):
        print("Crear un proveedor")
        nuevoProveedor = Proveedor(elProveedor)
        return self.repositorioProveedor.save(nuevoProveedor)

    def show(self, id):
        elProveedor = Proveedor(self.repositorioProveedor.findById(id))
        return elProveedor.__dict__

    def update(self, id, elProveedor):
        proveedorActual = Proveedor(self.repositorioProveedor.findById(id))
        proveedorActual.nit = elProveedor["nit"]
        proveedorActual.nombre = elProveedor["nombre"]
        proveedorActual.direccion = elProveedor["direccion"]
        proveedorActual.telefono = elProveedor["telefono"]
        proveedorActual.correo = elProveedor["correo"]
        return self.repositorioProveedor.save(proveedorActual)

    def delete(self, id):
        print("Eliminando proveedor ", id)
        return self.repositorioProveedor.delete(id)

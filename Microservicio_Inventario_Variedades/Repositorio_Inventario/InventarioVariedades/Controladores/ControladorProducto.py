from bson import DBRef, ObjectId

from Modelos.Proveedor import Proveedor
from Repositorios.RepositorioProducto import RepositorioProducto
from Modelos.Producto import Producto
from Repositorios.RepositorioProveedor import RepositorioProveedor


class ControladorProducto():

    def __init__(self):
        self.repositorioProducto = RepositorioProducto()
        self.repositorioProveedor = RepositorioProveedor()
        print("Creando ControladorProducto")

    def index(self):
        print("Listar todos los productos")
        return self.repositorioProducto.findAll()

    def create(self, elProducto):
        print("Crear un producto")
        nuevoProducto = Producto(elProducto)
        return self.repositorioProducto.save(nuevoProducto)


    def show(self, id):
        elProducto = Producto(self.repositorioProducto.findById(id))
        return elProducto.__dict__

    def update(self, id, elProducto):
        productoActual = Producto(self.repositorioProducto.findById(id))
        productoActual.prod_codigo = elProducto["prod_codigo"]
        productoActual.prod_nombre = elProducto["prod_nombre"]
        productoActual.prod_marca = elProducto["prod_marca"]
        productoActual.prod_descripcion = elProducto["prod_descripcion"]
        productoActual.prod_categoria = elProducto["prod_categoria"]
        productoActual.prod_cantidad_compra = elProducto["prod_cantidad_compra"]
        productoActual.prod_unidad_medida = elProducto["prod_unidad_medida"]
        productoActual.prod_precio_costo = elProducto["prod_precio_costo"]
        productoActual.prod_precio_venta = elProducto["prod_precio_venta"]
        return self.repositorioProducto.save(productoActual)

    def delete(self, id):
        print("Eliminando un producto con id ", id)
        return self.repositorioProducto.delete(id)



    """
    Relación PROVEEDOR y PRODUCTO
    """

    def asignarProveedor(self, id, id_proveedor):
        productoActual = Producto(self.repositorioProducto.findById(id))
        proveedorActual = Proveedor(self.repositorioProveedor.findById(id_proveedor))
        productoActual.proveedor = proveedorActual
        return self.repositorioProducto.save(productoActual)


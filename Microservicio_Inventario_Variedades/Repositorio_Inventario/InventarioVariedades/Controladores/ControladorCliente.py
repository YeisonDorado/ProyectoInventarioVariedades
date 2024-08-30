from Repositorios.RepositorioCliente import RepositorioCliente
from Modelos.Cliente import Cliente


class ControladorCliente():

    def __init__(self):
        self.repositorioCliente = RepositorioCliente()
        print("Creando ControladorCliente")

    def index(self):
        print("Listar todos los clientes")
        return self.repositorioCliente.findAll()

    def create(self, elCliente):
        print("Crear un cliente")
        nuevoCliente = Cliente(elCliente)
        return self.repositorioCliente.save(nuevoCliente)

    def show(self, id):
        elCliente = Cliente(self.repositorioCliente.findById(id))
        return elCliente.__dict__

    def update(self, id, elCliente):
        clienteActual = Cliente(self.repositorioCliente.findById(id))
        clienteActual.cedula_nit = elCliente["cedula_nit"]
        clienteActual.tipo = elCliente["tipo"]
        clienteActual.nombre_completo = elCliente["nombre_completo"]
        clienteActual.direccion = elCliente["direccion"]
        clienteActual.ciudad = elCliente["ciudad"]
        clienteActual.telefono = elCliente["telefono"]
        clienteActual.correo = elCliente["correo"]
        return self.repositorioCliente.save(clienteActual)

    def delete(self, id):
        print("Eliminando cliente con id ", id)
        return self.repositorioCliente.delete(id)


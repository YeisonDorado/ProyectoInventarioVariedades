from flask import jsonify

from Repositorios.RepositorioIngreso import RepositorioIngreso
from Modelos.Ingreso import Ingreso
from Repositorios.RepositorioCategoria import RepositorioCategoria
from Modelos.Categoria import Categoria

class ControladorIngreso():

    def __init__(self):
        self.repositorioIngreso = RepositorioIngreso()
        self.repositorioCategoria = RepositorioCategoria()
        print("Creando ControladorIngreso")

    def index(self):
        print("Listar todas los ingresos")
        return self.repositorioIngreso.findAll()

    def create(self, elIngreso):
        print("Crear una ingreso")
        nuevoIngreso = Ingreso(elIngreso)
        return self.repositorioIngreso.save(nuevoIngreso)

    def show(self, id):
        elIngreso = Ingreso(self.repositorioIngreso.findById(id))
        return elIngreso.__dict__

    def update(self, id, elIngreso):
        ingresoActual = Ingreso(self.repositorioIngreso.findById(id))
        ingresoActual.ing_codigo = elIngreso["ing_codigo"]
        ingresoActual.ing_fecha = elIngreso["ing_fecha"]
        ingresoActual.ing_monto = elIngreso["ing_monto"]
        ingresoActual.ing_descripcion = elIngreso["ing_descripcion"]
        ingresoActual.ing_metodo_pago = elIngreso["ing_metodo_pago"]
        return self.repositorioIngreso.save(ingresoActual)

    def delete(self, id):
        print("Eliminando un ingreso ", id)
        return self.repositorioIngreso.delete(id)

    """
       Relación categoria e ingreso
       """

    def asignarCategoria(self, id, id_categoria):
        ingresoActual = Ingreso(self.repositorioIngreso.findById(id))
        categoriaActual = Categoria(self.repositorioCategoria.findById(id_categoria))
        ingresoActual.categoria = categoriaActual
        return self.repositorioIngreso.save(ingresoActual)


    # funcion para autonumerar el codigo de ingresos
    def get_next_ingreso_number(self):
        try:
            siguiente_numero = self.repositorioIngreso.get_next_ingreso_number()
            return jsonify({"nextNumber": siguiente_numero}), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    # funcion para obtener las ventas diarias
    def totalVentasDiarias(self):
        return self.repositorioIngreso.getTotalVentasDiarias()

    # funcion para obtener las ventas diarias
    def totalVentasSemanales(self):
        return self.repositorioIngreso.getTotalVentasSemanales()

 # funcion para obtener las ventas mensuales
    def totalVentasMensuales(self):
        return self.repositorioIngreso.getTotalVentasMensuales()

# funcion para obtener las ventas por fecha especifica
    def totalVentasFecha(self):
        return self.repositorioIngreso.getTotalVentasPorFecha()


from flask import jsonify

from Modelos.Cotizacion import Cotizacion
from Modelos.Producto import Producto
from Modelos.Cliente import Cliente
from Repositorios.RepositorioCotizacion import RepositorioCotizacion
from Repositorios.RepositorioProducto import RepositorioProducto
from Repositorios.RepositorioCliente import RepositorioCliente

class ControladorCotizacion():
    def __init__(self):
        self.repositorioCotizaciones = RepositorioCotizacion()
        self.repositorioProductos = RepositorioProducto()
        self.repositorioClientes = RepositorioCliente()

    def index(self):
        try:
            cotizaciones = self.repositorioCotizaciones.findAll()
            print(f"cotizaciones obtenidas: {cotizaciones}")
            if not cotizaciones:
                return jsonify({"message": "No se encontraron cotizaciones."}), 404
                # Convertir los ObjectId de MongoDB a strings para JSON serialization
            for cot in cotizaciones:
                cot['_id'] = str(cot['_id'])
            return jsonify(cotizaciones), 200
        except Exception as e:
            print(f"Error en index: {e}")
            return jsonify({"error": str(e)}), 500

    """
    Asignacion CLIENTE y PRODUCTOS a COTIZACION
    """

    def create(self, infoCotizacion, id_producto, id_cliente):
        nuevaCotizacion = Cotizacion(infoCotizacion)
        elProducto = Producto(self.repositorioProductos.findById(id_producto))
        elCliente = Cliente(self.repositorioClientes.findById(id_cliente))
        nuevaCotizacion.producto = elProducto
        nuevaCotizacion.cliente = elCliente
        return self.repositorioCotizaciones.save(nuevaCotizacion)


    def show(self, id):
        try:
            cotizacion_data = self.repositorioCotizaciones.findById(id)
            if not cotizacion_data:
                return jsonify({"message": f"No se encontró una cotizacion con el id {id}"}), 404

            laCotizacion = Cotizacion(cotizacion_data)
            print(f"Cotizacion obtenida: {laCotizacion.__dict__}")
            return jsonify(laCotizacion.__dict__), 200
        except Exception as e:
            print(f"Error en show: {e}")
            return jsonify({"error": str(e)}), 500



    """
    Modificación de comprobante (producto y cliente)
    """

    def update(self, id, infoCotizacion, id_producto, id_cliente):
        print(f"Actualizando cotizacion con id: {id}")
        laCotizacion = Cotizacion(self.repositorioCotizaciones.findById(id))
        print(f"Cotizacion actual: {laCotizacion.__dict__}")
        laCotizacion.cot_numero = infoCotizacion["cot_numero"]
        laCotizacion.cot_fecha = infoCotizacion["cot_fecha"]
        #laCotizacion.comp_cantidad_venta_prod = infoCotizacion["comp_cantidad_venta_prod"]
        #laCotizacion.comp_precio_venta_prod = infoCotizacion["comp_precio_venta_prod"]
        #laCotizacion.comp_valor_total_prod = infoCotizacion["comp_valor_total_prod"]
        laCotizacion.cot_total_pago = infoCotizacion["cot_total_pago"]
        #laCotizacion.comp_nombre_vendedor = infoCotizacion["comp_nombre_vendedor"]
        laCotizacion.cot_forma_pago = infoCotizacion["cot_forma_pago"]

        # Actualizar el arreglo de productos
        laCotizacion.productos = infoCotizacion.get("productos", [])

        # Eliminar el campo Cliente para evitar conflicto
        laCotizacion.__dict__.pop('Cliente', None)

        # actualizar el cliente
        elCliente = Cliente(self.repositorioClientes.findById(id_cliente))
        laCotizacion.cliente = elCliente
        laCotizacion.cliente_id = id_cliente  # Actualizar cliente_id también

        print(f"Cotizacion modificada: {laCotizacion.__dict__}")
        # guardar los cambios
        result = self.repositorioCotizaciones.save(laCotizacion)
        print(f"Resultado de la actualización: {result}")
        return result


    def delete(self, id):
        return self.repositorioCotizaciones.delete(id)

    def get_next_cotizacion_number(self):
        try:
            siguiente_numero = self.repositorioCotizaciones.get_next_cotizacion_number()
            return jsonify({"nextNumber": siguiente_numero}), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500
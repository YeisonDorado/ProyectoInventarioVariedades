from flask import jsonify

from Modelos.ComprobanteVenta import ComprobanteVenta
from Modelos.Producto import Producto
from Modelos.Cliente import Cliente
from Repositorios.RepositorioComprobanteVenta import RepositorioComprobanteVenta
from Repositorios.RepositorioProducto import RepositorioProducto
from Repositorios.RepositorioCliente import RepositorioCliente

class ControladorComprobanteVenta():
    def __init__(self):
        self.repositorioComprobanteVenta = RepositorioComprobanteVenta()
        self.repositorioProductos = RepositorioProducto()
        self.repositorioClientes = RepositorioCliente()

    def index(self):
        try:
            comprobantes = self.repositorioComprobanteVenta.findAll()
            print(f"Comprobantes obtenidos: {comprobantes}")
            if not comprobantes:
                return jsonify({"message": "No se encontraron comprobantes."}), 404
                # Convertir los ObjectId de MongoDB a strings para JSON serialization
            for comp in comprobantes:
                comp['_id'] = str(comp['_id'])
            return jsonify(comprobantes), 200
        except Exception as e:
            print(f"Error en index: {e}")
            return jsonify({"error": str(e)}), 500



    """
    Asignacion CLIENTE y PRODUCTOS a COMPROBANTE VENTA
    """

    def create(self, infoComprobanteVenta, id_producto, id_cliente):
        nuevoComprobanteVenta = ComprobanteVenta(infoComprobanteVenta)
        elProducto = Producto(self.repositorioProductos.findById(id_producto))
        elCliente = Cliente(self.repositorioClientes.findById(id_cliente))
        nuevoComprobanteVenta.producto = elProducto
        nuevoComprobanteVenta.cliente = elCliente
        return self.repositorioComprobanteVenta.save(nuevoComprobanteVenta)


    def show(self, id):
        try:
            comprobante_data = self.repositorioComprobanteVenta.findById(id)
            if not comprobante_data:
                return jsonify({"message": f"No se encontró un comprobante con el id {id}"}), 404

            elComprobanteVenta = ComprobanteVenta(comprobante_data)
            print(f"Comprobante obtenido: {elComprobanteVenta.__dict__}")
            return jsonify(elComprobanteVenta.__dict__), 200
        except Exception as e:
            print(f"Error en show: {e}")
            return jsonify({"error": str(e)}), 500



    """
    Modificación de comprobante (producto y cliente)
    """

    def update(self, id, infoComprobanteVenta, id_producto, id_cliente):
        print(f"Actualizando comprobante con id: {id}")
        elComprobanteVenta = ComprobanteVenta(self.repositorioComprobanteVenta.findById(id))
        print(f"Comprobante actual: {elComprobanteVenta.__dict__}")
        elComprobanteVenta.comp_numero = infoComprobanteVenta["comp_numero"]
        elComprobanteVenta.comp_fecha = infoComprobanteVenta["comp_fecha"]
        elComprobanteVenta.comp_item = infoComprobanteVenta["comp_item"]
        elComprobanteVenta.comp_cantidad_venta_prod = infoComprobanteVenta["comp_cantidad_venta_prod"]
        elComprobanteVenta.comp_precio_venta_prod = infoComprobanteVenta["comp_precio_venta_prod"]
        elComprobanteVenta.comp_valor_total_prod = infoComprobanteVenta["comp_valor_total_prod"]
        elComprobanteVenta.comp_total_pago = infoComprobanteVenta["comp_total_pago"]
        elComprobanteVenta.comp_nombre_vendedor = infoComprobanteVenta["comp_nombre_vendedor"]
        elComprobanteVenta.comp_forma_pago = infoComprobanteVenta["comp_forma_pago"]

        # Actualizar el arreglo de productos
        elComprobanteVenta.productos = infoComprobanteVenta.get("productos", [])

        # Eliminar el campo Cliente para evitar conflicto
        elComprobanteVenta.__dict__.pop('Cliente', None)


        # actualizar el cliente
        elCliente = Cliente(self.repositorioClientes.findById(id_cliente))
        elComprobanteVenta.cliente = elCliente
        elComprobanteVenta.cliente_id = id_cliente  # Actualizar cliente_id también


        print(f"Comprobante modificado: {elComprobanteVenta.__dict__}")
        #guardar los cambios
        result= self.repositorioComprobanteVenta.save(elComprobanteVenta)
        print(f"Resultado de la actualización: {result}")
        return result


    def delete(self, id):
        return self.repositorioComprobanteVenta.delete(id)

    def get_next_comprobante_number(self):
        try:
            siguiente_numero = self.repositorioComprobanteVenta.get_next_comprobante_number()
            return jsonify({"nextNumber": siguiente_numero}), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500
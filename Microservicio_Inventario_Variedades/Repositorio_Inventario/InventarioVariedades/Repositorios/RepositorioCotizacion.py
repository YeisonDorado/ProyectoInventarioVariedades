from Repositorios.InterfaceRepositorio import InterfaceRepositorio
from Modelos.Cotizacion import Cotizacion

class RepositorioCotizacion(InterfaceRepositorio[Cotizacion]):
    def get_next_cotizacion_number(self):
        laColeccion = self.baseDatos[self.coleccion]
        ultima_cotizacion = laColeccion.find_one(sort=[("cot_numero", -1)])

        if ultima_cotizacion is None:
            return "COT00001"

        ultimo_numero = int(ultima_cotizacion["cot_numero"].replace("COT", ""))
        siguiente_numero = f"COT{str(ultimo_numero + 1).zfill(5)}"
        return siguiente_numero
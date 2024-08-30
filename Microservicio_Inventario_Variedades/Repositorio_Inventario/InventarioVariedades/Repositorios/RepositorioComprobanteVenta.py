from Repositorios.InterfaceRepositorio import InterfaceRepositorio
from Modelos.ComprobanteVenta import ComprobanteVenta

class RepositorioComprobanteVenta(InterfaceRepositorio[ComprobanteVenta]):
    def get_next_comprobante_number(self):
        laColeccion = self.baseDatos[self.coleccion]
        ultimo_comprobante = laColeccion.find_one(sort=[("comp_numero", -1)])

        if ultimo_comprobante is None:
            return "CV00001"

        ultimo_numero = int(ultimo_comprobante["comp_numero"].replace("CV", ""))
        siguiente_numero = f"CV{str(ultimo_numero + 1).zfill(5)}"
        return siguiente_numero
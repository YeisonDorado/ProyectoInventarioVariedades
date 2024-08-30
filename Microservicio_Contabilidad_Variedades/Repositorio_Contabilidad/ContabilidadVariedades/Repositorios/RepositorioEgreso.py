from datetime import datetime

from Repositorios.InterfaceRepositorio import InterfaceRepositorio
from Modelos.Egreso import Egreso

class RepositorioEgreso(InterfaceRepositorio[Egreso]):
    # cosulta para la autonumeracion del codigo de ingresos
    def get_next_egreso_number(self):
        laColeccion = self.baseDatos[self.coleccion]
        ultimo_egreso = laColeccion.find_one(sort=[("egreso_codigo", -1)])

        if ultimo_egreso is None:
            return "EGRE00001"

        ultimo_numero = int(ultimo_egreso["egreso_codigo"].replace("EGRE", ""))
        siguiente_numero = f"EGRE{str(ultimo_numero + 1).zfill(5)}"
        return siguiente_numero

    #consulta para obtener total de egresos diarios
    def getTotalEgresosDiarios(self):
        query1 = {
            "$match": {
                "egreso_fecha": {"$type": "string"}
            }
        }
        query2 = {
            "$group": {
                "_id": {"$toDate": "$egreso_fecha"},
                "totalEgresosDia": {"$sum": "$egreso_monto"}
            }
        }
        query3 = {
            "$sort": {"_id": 1}
        }
        pipeline = [query1, query2, query3]
        return self.queryAggregation(pipeline)



# consulta para obetner el total de las ventas mensuales
    def getTotalEgresosMensuales(self):
        current_year = datetime.now().year
        current_month = datetime.now().month

        # Fechas de inicio y fin para el mes actual
        start_date = datetime(current_year, current_month, 1)
        if current_month < 12:
            end_date = datetime(current_year, current_month + 1, 1)
        else:
            end_date = datetime(current_year + 1, 1, 1)

        query1 = {
            "$match": {
                "egreso_fecha": {
                    "$gte": start_date.isoformat(),
                    "$lt": end_date.isoformat()
                }
            }
        }
        query2 = {
            "$addFields": {
                "egreso_fecha_date": {
                    "$dateFromString": {
                        "dateString": "$egreso_fecha",
                        "format": "%Y-%m-%d"
                    }
                }
            }
        }
        query3 = {
            "$group": {
                "_id": {"$month": "$egreso_fecha_date"},
                "totalEgresosMes": {"$sum": "$egreso_monto"}
            }
        }
        query4 = {
            "$sort": {"_id": 1}
        }
        pipeline = [query1, query2, query3, query4]

        # Imprimir el pipeline para depuración
        print("Pipeline:", pipeline)

        result = self.queryAggregation(pipeline)

        # Imprimir el resultado para depuración
        print("Result:", result)

        return result



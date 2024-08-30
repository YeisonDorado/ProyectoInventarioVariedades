from datetime import datetime

from Repositorios.InterfaceRepositorio import InterfaceRepositorio
from Modelos.Ingreso import Ingreso

class RepositorioIngreso(InterfaceRepositorio[Ingreso]):
    def get_next_ingreso_number(self):
        laColeccion = self.baseDatos[self.coleccion]
        ultimo_ingreso = laColeccion.find_one(sort=[("ing_codigo", -1)])

        if ultimo_ingreso is None:
            return "ING00001"

        ultimo_numero = int(ultimo_ingreso["ing_codigo"].replace("ING", ""))
        siguiente_numero = f"ING{str(ultimo_numero + 1).zfill(5)}"
        return siguiente_numero


#consulta para obetner el total d elas ventas diarias
    def getTotalVentasDiarias(self):
        query1 = {
            "$match": {
                "ing_fecha": {"$type": "string"}
            }
        }
        query2 = {
            "$group": {
                "_id": {"$toDate": "$ing_fecha"},
                "totalVentasDia": {"$sum": "$ing_monto"}
            }
        }
        query3 = {
            "$sort": {"_id": 1}
        }
        pipeline = [query1, query2, query3]
        return self.queryAggregation(pipeline)

    """
    # consulta para obetner el total de las ventas semanales
    def getTotalVentasSemanales(self):
        query1 = {
            "$group": {
                "_id": {"$week": "$ing_fecha"},
                "totalVentas": {"$sum": "$ing_monto"}
            }
        }
        query2 = {
            "$sort": {"_id": 1}
        }
        pipeline = [query1, query2]
        return self.queryAggregation(pipeline)
    """


    # consulta para obetner el total de las ventas mensuales
    def getTotalVentasMensuales(self):
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
                "ing_fecha": {
                    "$gte": start_date.isoformat(),
                    "$lt": end_date.isoformat()
                }
            }
        }
        query2 = {
            "$addFields": {
                "ing_fecha_date": {
                    "$dateFromString": {
                        "dateString": "$ing_fecha",
                        "format": "%Y-%m-%d"
                    }
                }
            }
        }
        query3 = {
            "$group": {
                "_id": {"$month": "$ing_fecha_date"},
                "totalVentasMes": {"$sum": "$ing_monto"}
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

    """
    # consulta para obetner el total de las ventas de acuerdo auna fecha especifica
    def getTotalVentasPorFecha(self, fecha):
        start = datetime.datetime(fecha.year, fecha.month, 1)
        end = datetime.datetime(fecha.year, fecha.month + 1, 1)

        query1 = {
            "$match": {
                "ing_fecha": {
                    "$gte": start,
                    "$lt": end
                }
            }
        }
        query2 = {
            "$group": {
                "_id": None,
                "totalVentas": {"$sum": "$ing_monto"}
            }
        }
        pipeline = [query1, query2]
        return self.queryAggregation(pipeline)
    """



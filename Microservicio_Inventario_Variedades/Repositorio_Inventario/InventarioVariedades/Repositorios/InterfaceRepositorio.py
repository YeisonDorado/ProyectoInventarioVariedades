import pymongo
import certifi
from bson import DBRef
from bson.objectid import ObjectId
from typing import TypeVar, Generic, List, get_origin, get_args
import json

T = TypeVar('T')


class InterfaceRepositorio(Generic[T]):
    def __init__(self):
        ca = certifi.where()
        dataConfig = self.loadFileConfig()
        client = pymongo.MongoClient(dataConfig["data-db-connection"],tlsCAFile=ca)
        self.baseDatos = client[dataConfig["name-db"]]
        theClass = get_args(self.__orig_bases__[0])
        self.coleccion = theClass[0].__name__.lower()

    def loadFileConfig(self):
        with open('config.json') as f:
            data = json.load(f)
        return data




    def save(self, item: T):
        laColeccion = self.baseDatos[self.coleccion]
        item = self.transformRefs(item)

        if hasattr(item, "_id") and item._id != "":
            # Actualización
            elId = item._id
            _id = ObjectId(elId)
            item_dict = item.__dict__
            del item_dict["_id"]

            # Eliminar referencias antiguas primero
            laColeccion.update_one({"_id": _id}, {"$unset": {"Cliente": "", "cliente_id": "", "producto": ""}})

            # Crear el updateItem con las nuevas referencias
            updateItem = {"$set": item_dict}
            laColeccion.update_one({"_id": _id}, updateItem)
        else:
            # Creación
            _id = laColeccion.insert_one(item.__dict__)
            elId = _id.inserted_id.__str__()

        x = laColeccion.find_one({"_id": ObjectId(elId)})
        x["_id"] = x["_id"].__str__()
        return self.findById(elId)



    def delete(self, id):
        laColeccion = self.baseDatos[self.coleccion]
        cuenta = laColeccion.delete_one({"_id": ObjectId(id)}).deleted_count
        return {"deleted_count": cuenta}


    def update(self, id, item: T):
        _id = ObjectId(id)
        laColeccion = self.baseDatos[self.coleccion]
        delattr(item, "_id")
        item = item.__dict__
        updateItem = {"$set": item}
        x = laColeccion.update_one({"_id": _id}, updateItem)
        return {"updated_count": x.matched_count}



    def findById(self, id):
        laColeccion = self.baseDatos[self.coleccion]
        try:
            x = laColeccion.find_one({"_id": ObjectId(id)})
            if x is None:
                print(f"Advertencia: No se encontró un documento con el id {id}")
                return {}

            x = self.getValuesDBRef(x)
            x["_id"] = x["_id"].__str__()
            return x
        except Exception as e:
            print(f"Error al buscar el documento con id {id}: {e}")
            return {"error": str(e)}


    def findAll(self):
        laColeccion = self.baseDatos[self.coleccion]
        data = []
        for x in laColeccion.find():
            try:
                x["_id"] = x["_id"].__str__()
                x = self.transformObjectIds(x)
                x = self.getValuesDBRef(x)
                data.append(x)
            except Exception as e:
                print(f"Error procesando documento {x}: {e}")
        return data


    def query(self, theQuery):
        laColeccion = self.baseDatos[self.coleccion]
        data = []
        for x in laColeccion.find(theQuery):
            x["_id"] = x["_id"].__str__()
            x = self.transformObjectIds(x)
            x = self.getValuesDBRef(x)
            data.append(x)
        return data

    def queryAggregation(self, theQuery):
        laColeccion = self.baseDatos[self.coleccion]
        data = []
        for x in laColeccion.aggregate(theQuery):
            x["_id"] = x["_id"].__str__()
            x = self.transformObjectIds(x)
            x = self.getValuesDBRef(x)
            data.append(x)
        return data


    def getValuesDBRef(self, x):
        if x is None:
            print("Advertencia: El documento proporcionado a getValuesDBRef es None")
            return x

        keys = x.keys()
        for k in keys:
            print(f"Procesando clave: {k}, valor: {x[k]}")
            if isinstance(x[k], DBRef):
                laColeccion = self.baseDatos[x[k].collection]
                valor = laColeccion.find_one({"_id": ObjectId(x[k].id)})
                if valor is not None:
                    valor["_id"] = valor["_id"].__str__()
                    x[k] = valor
                    x[k] = self.getValuesDBRef(x[k])
                else:
                    print(f"Advertencia: No se encontró un documento para DBRef con id {x[k].id}")
                    x[k] = None  # O manejarlo de otra manera según la lógica de tu aplicación
            elif isinstance(x[k], list):
                 x[k] = self.getValuesDBRefFromList(x[k])
            elif isinstance(x[k], dict):
                x[k] = self.getValuesDBRef(x[k])
        return x



    def getValuesDBRefFromList(self, lst):
        newList = []
        if not lst:
            print("Advertencia: La lista proporcionada a getValuesDBRefFromList está vacía")
            return newList

        for item in lst:
            if isinstance(item, dict):
                newList.append(self.getValuesDBRef(item))
            elif isinstance(item, DBRef):
                laColeccion = self.baseDatos[item.collection]
                valor = laColeccion.find_one({"_id": ObjectId(item.id)})
                if valor is not None:
                    valor["_id"] = valor["_id"].__str__()
                    newList.append(valor)
                else:
                    print(f"Advertencia: No se encontró un documento para DBRef en lista con id {item.id}")
                    newList.append(None)  # O manejarlo de otra manera según la lógica de tu aplicación
            else:
                newList.append(item)
        return newList



    def transformObjectIds(self, x):
        for attribute in x.keys():
            if isinstance(x[attribute], ObjectId):
                x[attribute] = x[attribute].__str__()
            elif isinstance(x[attribute], list):
                x[attribute] = self.formatList(x[attribute])
            elif isinstance(x[attribute], dict):
                x[attribute] = self.transformObjectIds(x[attribute])
        return x



    def formatList(self, x):
        newList = []
        for item in x:
            if isinstance(item, ObjectId):
                newList.append(item.__str__())
        if len(newList) == 0:
            newList = x
        return newList

    def transformRefs(self, item):
        theDict = item.__dict__
        keys = list(theDict.keys())
        for k in keys:
            if isinstance(theDict[k], list):
                theDict[k] = self.getValuesDBRefFromList(theDict[k])
            elif isinstance(theDict[k], object) and hasattr(theDict[k], '_id'):
                newObject = self.ObjectToDBRef(getattr(item, k))
                setattr(item, k, newObject)
        return item





    def ObjectToDBRef(self, item: T):
        if item is None or not hasattr(item, '_id'):
            return None
        nameCollection = item.__class__.__name__.lower()
        return DBRef(nameCollection, ObjectId(item._id))




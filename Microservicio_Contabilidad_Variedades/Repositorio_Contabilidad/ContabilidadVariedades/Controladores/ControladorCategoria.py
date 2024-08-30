from Repositorios.RepositorioCategoria import RepositorioCategoria
from Modelos.Categoria import Categoria

class ControladorCategoria():

    def __init__(self):
        self.repositorioCategoria = RepositorioCategoria()
        print("Creando ControladorCategoria")

    def index(self):
        print("Listar todas las categorias")
        return self.repositorioCategoria.findAll()

    def create(self, laCategoria):
        print("Crear una categoria")
        nuevaCategoria = Categoria(laCategoria)
        return self.repositorioCategoria.save(nuevaCategoria)

    def show(self, id):
        laCategoria = Categoria(self.repositorioCategoria.findById(id))
        return laCategoria.__dict__

    def update(self, id, laCategoria):
        categoriaActual = Categoria(self.repositorioCategoria.findById(id))
        categoriaActual.cat_codigo = laCategoria["cat_codigo"]
        categoriaActual.cat_nombre = laCategoria["cat_nombre"]
        return self.repositorioCategoria.save(categoriaActual)

    def delete(self, id):
        print("Eliminando categoria ", id)
        return self.repositorioCategoria.delete(id)
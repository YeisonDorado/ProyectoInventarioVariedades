package com.tutorial.seguridad.Repositorios;
import com.tutorial.seguridad.Modelos.Usuario;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
public interface RepositorioUsuario extends MongoRepository<Usuario,String> {
    //consulta para validar si un usuario tiene acceso a la plataforma
    @Query("{'correo': ?0}")
    public Usuario getUserByEmail(String correo);
}



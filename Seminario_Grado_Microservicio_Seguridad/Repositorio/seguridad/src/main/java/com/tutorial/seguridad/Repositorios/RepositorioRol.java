package com.tutorial.seguridad.Repositorios;
import com.tutorial.seguridad.Modelos.Rol;
import org.springframework.data.mongodb.repository.MongoRepository;
public interface RepositorioRol extends MongoRepository<Rol,String>{

}
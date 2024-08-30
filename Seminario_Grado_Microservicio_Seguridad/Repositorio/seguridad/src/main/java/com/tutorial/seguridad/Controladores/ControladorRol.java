package com.tutorial.seguridad.Controladores;
import com.tutorial.seguridad.Modelos.Permiso;
import com.tutorial.seguridad.Repositorios.RepositorioRol;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import com.tutorial.seguridad.Modelos.Rol;
import com.tutorial.seguridad.Repositorios.RepositorioRol;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;
@CrossOrigin
@RestController
@RequestMapping("/roles")
public class ControladorRol {
    @Autowired
    private RepositorioRol miRepositorioRol;
    @GetMapping("")
    public List<Rol> index(){
        return this.miRepositorioRol.findAll();
    }
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public Rol create(@RequestBody Rol infoRol){

        //infoPermiso.setContrasena(convertirSHA256(infoPermiso.getContrasena()));//
        return this.miRepositorioRol.save(infoRol);
    }

    @GetMapping("{id}")
    public Rol show(@PathVariable String id){
        Rol rolActual=this.miRepositorioRol
                .findById(id)
                .orElse(null);
        return rolActual;
    }


    @PutMapping("{id}")
    public Rol update(@PathVariable String id,@RequestBody Rol infoRol){
        Rol rolActual=this.miRepositorioRol
                .findById(id)
                .orElse(null);
        if (rolActual!=null){
            rolActual.setNombre(infoRol.getNombre());
            rolActual.setDescripcion(infoRol.getDescripcion());
            //usuarioActual.setContrasena(convertirSHA256(infoUsuario.getContrasena()))//
            ;
            return this.miRepositorioRol.save(rolActual);
        }else{
            return null;
        }
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("{id}")
    public void delete(@PathVariable String id){
        Rol rolActual=this.miRepositorioRol
                .findById(id)
                .orElse(null);
        if (rolActual!=null){
            this.miRepositorioRol.delete(rolActual);
        }
    }


}

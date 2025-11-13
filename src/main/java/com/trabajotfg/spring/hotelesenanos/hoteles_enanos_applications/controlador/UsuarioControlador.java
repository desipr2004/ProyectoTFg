package com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.controlador;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.servicio.UsuarioService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.modelo.Usuario;
import java.util.List;
import java.util.Optional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;




@RestController
@RequestMapping("/api/usuarios")
public class UsuarioControlador {
    
    @Autowired
    private UsuarioService usuarioService;

    // GET /api/usuarios - Todos los usuarios
    @GetMapping
    public List<Usuario> todosLosUsuarios(){
        return usuarioService.listaUsuarios();
    }

    //listar usuario por id si no existe devuelve null
    @GetMapping("/{id}")
    public Usuario usuariosId(@PathVariable Integer id) {
        Optional<Usuario> usuario = usuarioService.buscarPorID(id);
        return usuario.orElse(null);
    }
    
    //Con POST se crea un nuevo usuario
    @PostMapping
    public Usuario crearUsuario(@RequestBody Usuario usuario) throws Exception {
        return usuarioService.crerUsuario(usuario);
    }
    
    //Actualizamos el usuario, uno que ya existe
    @PutMapping("/{id}")
    public Usuario actualizarU(@PathVariable Integer id, @RequestBody Usuario usuario) throws Exception {
        usuario.setId(id);
        
        return usuarioService.actualizarUsuario(usuario);
    }

    //Eliminar usuario 
    @DeleteMapping("/{id}")
    public void eliminarU(@PathVariable Integer id){
        usuarioService.eliminarUsuario(id);
    }
    
}

package com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.controlador;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

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
@CrossOrigin(origins = "*")
@RequestMapping("/api/usuarios")
public class UsuarioControlador {
    
    @Autowired
    private UsuarioService usuarioService;

    // GET /api/usuarios: devuelve la lista completa para el panel de admin
    @GetMapping
    public List<Usuario> todosLosUsuarios(){
        return usuarioService.listaUsuarios();
    }

    // GET /api/usuarios/{id}: busca por ID devolviendo 404 si no se encuentra
    @GetMapping("/{id}")
    public ResponseEntity<Usuario> usuariosId(@PathVariable Integer id) {
        Optional<Usuario> usuario = usuarioService.buscarPorID(id);
        if(!usuario.isPresent()){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(usuario.get());
    }
    
    // POST /api/usuarios: crea usuarios desde herramientas internas
    @PostMapping
    public Usuario crearUsuario(@RequestBody Usuario usuario) throws Exception {
        return usuarioService.crerUsuario(usuario);
    }
    
    // PUT /api/usuarios/{id}: actualiza datos básicos o rol
    @PutMapping("/{id}")
    public Usuario actualizarU(@PathVariable Integer id, @RequestBody Usuario usuario) throws Exception {
        usuario.setId(id);
        
        return usuarioService.actualizarUsuario(usuario);
    }

    // DELETE /api/usuarios/{id}: elimina el registro (en demos se usa para limpiar datos)
    @DeleteMapping("/{id}")
    public void eliminarU(@PathVariable Integer id){
        usuarioService.eliminarUsuario(id);
    }
    
}

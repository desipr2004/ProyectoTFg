package com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.controlador;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.modelo.Usuario;
import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.servicio.UsuarioService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/auth")
public class AuthControlador {
    
    @Autowired
    private UsuarioService usuarioService;

    //Post /api/auth/login
    @PostMapping("/registro")
    public Map<String, Object> registro(@RequestBody Usuario usuario) throws Exception {
        Map<String, Object> res =new HashMap<>();        
    try{
        if(usuarioService.existePorEmail(usuario.getEmail())){
            res.put("error", "Usuario existente con ese email");
            return res;
        }

        //Creamos el usuario 
        Usuario usuarioCreado = usuarioService.crerUsuario(usuario);

        res.put("mensaje", "Usuario creado !!");
        res.put("usuario", usuarioCreado);
        return res;

    }catch(Exception e){
        res.put("error", e.getMessage());
        return res;
    }

    
}

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> login) {
    Map<String, Object> res = new HashMap<>();

    try{
        String email = login.get("email");
        String contrasenna = login.get("contrasenna");

        Optional<Usuario> usuarioop = usuarioService.buscarPorEmail(email);

        if(usuarioop.isPresent()){
            Usuario usuario = usuarioop.get();
            if(usuarioService.comprobarContrasenna(email, contrasenna) && usuario.getActivo()) {
                res.put("mensaje", "Login correcto");
                res.put("usuario", usuario);
                return res;
            } else {
                res.put("error", "Contraseña incorrecta o el usuario no está activo");
            }
        }else{
            res.put("error","Usuario no encontrado");
            return res;
        }
    }catch(Exception e){
        res.put("error", e.getMessage());
        return res;
    }
    return res; 
}

    @PostMapping("/registro-rapido")
    public Map<String, Object> registroRapido(@RequestBody Map<String, String> nuevoUsuario) {
        Map<String, Object> res = new HashMap<>();
        try{
            String email = nuevoUsuario.get("email");
            String contrasenna = nuevoUsuario.get("contrasenna");

            if(email == null || contrasenna == null){
                res.put("error", "Debes indicar correo y contrase��a");
                return res;
            }

            if(usuarioService.existePorEmail(email)){
                res.put("error", "Ya existe un usuario con ese correo");
                return res;
            }

            Usuario usuario = new Usuario();
            usuario.setEmail(email);
            usuario.setContrasenna(contrasenna);

            String alias = email.contains("@") ? email.substring(0, email.indexOf('@')) : "Cliente";
            usuario.setNombre(nuevoUsuario.getOrDefault("nombre", alias));
            usuario.setApellido(nuevoUsuario.getOrDefault("apellido", "Web"));
            usuario.setTelefono(nuevoUsuario.getOrDefault("telefono", ""));
            usuario.setTipoUsuario(Usuario.UsuarioTipo.CLIENT);

            Usuario usuarioCreado = usuarioService.crerUsuario(usuario);
            res.put("mensaje", "Usuario creado correctamente");
            res.put("usuario", usuarioCreado);
            return res;
        }catch(Exception e){
            res.put("error", e.getMessage());
            return res;
        }
    }

}

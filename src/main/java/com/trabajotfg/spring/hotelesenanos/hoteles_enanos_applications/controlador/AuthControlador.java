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


/**
 * Controlador encargado de las operaciones públicas de autenticación.
 * Registra cuentas y valida credenciales para que el frontend gestione sesiones.
 */
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/auth")
public class AuthControlador {
    
    @Autowired
    private UsuarioService usuarioService;

    // Post /api/auth/registro -> crea un usuario nuevo si no existe el correo
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

    // Post /api/auth/login -> valida credenciales y devuelve al usuario autenticado
    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> login, jakarta.servlet.http.HttpSession session) {
    Map<String, Object> res = new HashMap<>();

    try{
        String email = login.get("email");
        String contrasenna = login.get("contrasenna");

        Optional<Usuario> usuarioop = usuarioService.buscarPorEmail(email);

        if(usuarioop.isPresent()){
            Usuario usuario = usuarioop.get();
            if(usuarioService.comprobarContrasenna(email, contrasenna) && usuario.getActivo()) {
                session.setAttribute("user", usuario);
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
}

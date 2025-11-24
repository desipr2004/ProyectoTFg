package com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.servicio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.repositorio.RepoUsuario;
import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.modelo.Usuario;
import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.Utils.Cifrado;

import java.util.Optional;
import java.util.List;

//Capa intermediaria entre usuario y servicio
@Service
public class UsuarioService {
    
    @Autowired
    private RepoUsuario repoUsuario;

    //Crear un nuev usuario 
    public Usuario crerUsuario(Usuario usuario) throws Exception{
        String contrasenna = usuario.getContrasenna();
        String contrasennaSegura = Cifrado.cifrarPassword(contrasenna);

        usuario.setContrasenna(contrasennaSegura);

        //Activar usuario por defecto
        if(usuario.getActivo()== null){
            usuario.setActivo(true);
        }

        //el usuario va a ser por defecto un cliente
        if(usuario.getTipoUsuario() == null){
            usuario.setTipoUsuario(Usuario.UsuarioTipo.CLIENT);
        }

        return repoUsuario.save(usuario);
    }

    //Comparar emails

    public boolean existePorEmail(String email){
        return repoUsuario.existsByEmail(email);
    }

    //Registrar un nuevo usuario
    public Usuario registrarUsuario(String nombre, String apellido, String email, String contrasenna, String telefono) throws Exception{
        if(existeEmail(email)){
            // Mensaje estandarizado para los tests
            throw new Exception("El email ya está registrado");
        }

        Usuario nuevoUsuario = new Usuario();
        nuevoUsuario.setNombre(nombre);
        nuevoUsuario.setApellido(apellido);
        nuevoUsuario.setEmail(email);
        nuevoUsuario.setContrasenna(contrasenna);
        nuevoUsuario.setTelefono(telefono);
        nuevoUsuario.setTipoUsuario(Usuario.UsuarioTipo.CLIENT);

        return crerUsuario(nuevoUsuario);
    }
    
    //Iniciar sesion 
    public Usuario iniciarSesion(String email, String contrasenna) throws Exception{
        Optional<Usuario> usuario = repoUsuario.findByEmail(email);

        if(!usuario.isPresent()){
            throw new Exception("No hemos encotrado usuario con el email: "+email);
        }

        Usuario usuarioEncontrado = usuario.get();

        //Comprueba la contraseña
        if(!contrasennaCoincide(contrasenna, usuarioEncontrado)){
            throw new Exception("Contraseña incorrecta");
        }
        return usuarioEncontrado;

    }

    //Buscar todos los usuarios 
    public List<Usuario> listaUsuarios(){
        return repoUsuario.findAll();
    }

    //Buscar usuarios por ID
    public Optional<Usuario> buscarPorID(int id){
        return repoUsuario.findById(id);

    }

    //Buscar por email 
    public Optional<Usuario> buscarPorEmail(String email){
        return repoUsuario.findByEmail(email);
    }

    //Eliminar por ID
    public void eliminarUsuario(Integer id){
        repoUsuario.deleteById(id);
    }

    //Actualizar usuario existente
    public Usuario actualizarUsuario(Usuario usuario){
      return  repoUsuario.save(usuario);
    }

    //Comprobar si el email ya existe
    public boolean existeEmail(String email){
        return repoUsuario.existsByEmail(email);
    }

    //Comprobar si la contraseña es correcta
    public boolean comprobarContrasenna(String email, String contrasenna){
        Optional<Usuario> usuarioList = buscarPorEmail(email);
        if(usuarioList.isPresent()){
            Usuario usuario = usuarioList.get();
            return contrasennaCoincide(contrasenna, usuario);
        }
        return false;
    }

    //Cambiar la contraseña del usuario
    public boolean cambiarContrasenna(String email, String contrasennaActual, String nuevaContrasenna) throws Exception{
        Optional<Usuario> usuarioList = buscarPorEmail(email);
        if(!usuarioList.isPresent()){
            return false;
        }

        Usuario usuario = usuarioList.get();

        //Comprobar que la contraseña actual es correcta
        if(!contrasennaCoincide(contrasennaActual, usuario)){
            return false;
        }

        String contrasennaSegura = Cifrado.cifrarPassword(nuevaContrasenna);
        usuario.setContrasenna(contrasennaSegura);
        repoUsuario.save(usuario);
        return true;
    }

    private boolean contrasennaCoincide(String contrasenna, Usuario usuario){
        if(usuario == null || contrasenna == null){
            return false;
        }

        if(Cifrado.comprobarContrasenna(contrasenna, usuario.getContrasenna())){
            return true;
        }

        return contrasenna.equals(usuario.getContrasenna());
    }

    //Activar usuario
    public void activarUsuario(Integer id){
        Optional<Usuario> usuarioList = buscarPorID(id);
        if(usuarioList.isPresent()){
            Usuario usuario = usuarioList.get();
            usuario.setActivo(true);
            repoUsuario.save(usuario);
        }
    }

    //Desactivar usuario
    public void desactivarUsuario(Integer id){
        Optional<Usuario> usuarioList = buscarPorID(id);
        if(usuarioList.isPresent()){
            Usuario usuario = usuarioList.get();
            usuario.setActivo(false);
            repoUsuario.save(usuario);
        }
    }



}

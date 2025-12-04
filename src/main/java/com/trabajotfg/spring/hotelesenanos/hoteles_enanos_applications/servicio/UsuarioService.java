package com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.servicio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.repositorio.RepoUsuario;
import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.modelo.Usuario;
import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.Utils.Cifrado;

import java.util.Optional;
import java.util.List;

@Service
public class UsuarioService {
    
    @Autowired
    private RepoUsuario repoUsuario;

    // Crea un nuevo usuario aplicando cifrado y valores por defecto
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

    // Comprueba si ya existe el correo para evitar duplicados
    public boolean existePorEmail(String email){
        return repoUsuario.existsByEmail(email);
    }

    // Registro 
    public Usuario registrarUsuario(String nombre, String apellido, String email, String contrasenna, String telefono) throws Exception{
        if(existeEmail(email)){
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
    
    // Inicio de sesión con validación de credenciales
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

    // Lista completa de los usuarios
    public List<Usuario> listaUsuarios(){
        return repoUsuario.findAll();
    }

    // Búsqueda por id
    public Optional<Usuario> buscarPorID(int id){
        return repoUsuario.findById(id);

    }

    // Lookup por email reutilizado en autenticación y validaciones
    public Optional<Usuario> buscarPorEmail(String email){
        return repoUsuario.findByEmail(email);
    }

    // Eliminación física (se usa para limpiar datos de pruebas)
    public void eliminarUsuario(Integer id){
        repoUsuario.deleteById(id);
    }

    // Guardado directo de cambios (manteniendo cifrado existente)
    public Usuario actualizarUsuario(Usuario usuario){
      return  repoUsuario.save(usuario);
    }

    // Expone la existencia del email a otras capas
    public boolean existeEmail(String email){
        return repoUsuario.existsByEmail(email);
    }

    // Comprueba si la contraseña proporcionada coincide con la almacenada
    public boolean comprobarContrasenna(String email, String contrasenna){
        Optional<Usuario> usuarioList = buscarPorEmail(email);
        if(usuarioList.isPresent()){
            Usuario usuario = usuarioList.get();
            return contrasennaCoincide(contrasenna, usuario);
        }
        return false;
    }

    // Cambia la contraseña después de validar la actual
    public boolean cambiarContrasenna(String email, String contrasennaActual, String nuevaContrasenna) throws Exception{
        Optional<Usuario> usuarioList = buscarPorEmail(email);
        if(!usuarioList.isPresent()){
            return false;
        }

        Usuario usuario = usuarioList.get();

        // Validamos que la contraseña actual sea correcta antes de cifrar la nueva
        if(!contrasennaCoincide(contrasennaActual, usuario)){
            return false;
        }

        String contrasennaSegura = Cifrado.cifrarPassword(nuevaContrasenna);
        usuario.setContrasenna(contrasennaSegura);
        repoUsuario.save(usuario);
        return true;
    }

    // Permite comparar contraseñas tanto cifradas como posibles datos legados en texto plano
    private boolean contrasennaCoincide(String contrasenna, Usuario usuario){
        if(usuario == null || contrasenna == null){
            return false;
        }

        if(Cifrado.comprobarContrasenna(contrasenna, usuario.getContrasenna())){
            return true;
        }

        return contrasenna.equals(usuario.getContrasenna());
    }

    // Marca un usuario como activo para permitir el acceso
    public void activarUsuario(Integer id){
        Optional<Usuario> usuarioList = buscarPorID(id);
        if(usuarioList.isPresent()){
            Usuario usuario = usuarioList.get();
            usuario.setActivo(true);
            repoUsuario.save(usuario);
        }
    }

    // Marca un usuario como inactivo sin eliminar sus datos
    public void desactivarUsuario(Integer id){
        Optional<Usuario> usuarioList = buscarPorID(id);
        if(usuarioList.isPresent()){
            Usuario usuario = usuarioList.get();
            usuario.setActivo(false);
            repoUsuario.save(usuario);
        }
    }



}

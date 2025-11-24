package com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.repositorioTest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;

import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.modelo.Usuario;
import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.repositorio.RepoUsuario;

@DataJpaTest(properties = {
    "spring.jpa.hibernate.ddl-auto=create-drop",
    "spring.sql.init.mode=never"
})
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class RepoUsuarioTest {
    @Autowired
    private RepoUsuario repoUsuario;

    @Test
    void buscar_usuario_por_email(){
        
        Usuario usuario = new Usuario();
        usuario.setNombre("Silvia");
        usuario.setApellido("Ruiz");
        usuario.setEmail("silvia@gmail.com");
        usuario.setContrasenna("contrasenna123");
        usuario.setTipoUsuario(Usuario.UsuarioTipo.CLIENT);

        //Guardar 
        repoUsuario.save(usuario);

        Optional<Usuario> usuarioEncontrado = repoUsuario.findByEmail("silvia@gmail.com");
        assertTrue(usuarioEncontrado.isPresent());
        assertEquals("Silvia", usuarioEncontrado.get().getNombre());
    assertEquals("Ruiz", usuarioEncontrado.get().getApellido());
        assertEquals("silvia@gmail.com", usuarioEncontrado.get().getEmail());
    }

    @Test
    void noEncuentraEmail_noExiste(){
       Optional<Usuario> usuarioEncontrado = repoUsuario.findByEmail("noExiste@gmail.com");
       assertFalse(usuarioEncontrado.isPresent());
    }


    @Test 
    void comprobar_existencia_email(){
        Usuario usuario = new Usuario();
        usuario.setNombre("Carlos");
        usuario.setApellido("Lopez");
        usuario.setEmail("carlos@gmail.com");
        usuario.setContrasenna("contrasenna456");
        usuario.setTipoUsuario(Usuario.UsuarioTipo.CLIENT);
        repoUsuario.save(usuario);

        //Comprobar existencia
        boolean existeEmail = repoUsuario.existsByEmail("carlos@gmail.com");
        assertTrue(existeEmail);
        boolean noExisteEmail = repoUsuario.existsByEmail("noexistes@gmail.com");
        assertFalse(noExisteEmail);
    }

    @Test
    void solo_usuarios_activos(){
        Usuario usuarioActivo = new Usuario();
        usuarioActivo.setNombre("Mario");
        usuarioActivo.setApellido("Diaz");
        usuarioActivo.setEmail("mario.dias@example.com");
        usuarioActivo.setContrasenna("ContraseñaSegura7");
        usuarioActivo.setTipoUsuario(Usuario.UsuarioTipo.CLIENT);
        usuarioActivo.setActivo(true);


        Usuario usuarioInactivo = new Usuario();
        usuarioInactivo.setNombre("Ana");
        usuarioInactivo.setApellido("Gomez");
        usuarioInactivo.setEmail("anita@gmail.com");
        usuarioInactivo.setContrasenna("pass");
        usuarioInactivo.setTipoUsuario(Usuario.UsuarioTipo.CLIENT);
        usuarioInactivo.setActivo(false);

        //Guardar los dos usuarios
        repoUsuario.save(usuarioActivo);
        repoUsuario.save(usuarioInactivo);

        //Solo los activos 
        List<Usuario> usuariosActivos = repoUsuario.findByActivoTrue();
        
        //Comprobar que solo esta el activo 
        assertEquals(1, usuariosActivos.size());
    assertEquals("Mario", usuariosActivos.get(0).getNombre());
        assertTrue(usuariosActivos.get(0).getActivo());
    }

}

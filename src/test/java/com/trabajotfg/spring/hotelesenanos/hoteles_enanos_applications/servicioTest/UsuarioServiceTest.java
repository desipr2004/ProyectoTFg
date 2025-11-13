package com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.servicioTest;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.modelo.Usuario;
import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.servicio.UsuarioService;

import jakarta.transaction.Transactional;
import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
public class UsuarioServiceTest {
    
    @Autowired
    private UsuarioService usuarioService;
    
    
    @Test
    void crearUsuario_FuncionalidadCorrecta() throws Exception{
        Usuario usuario = new Usuario ();
        usuario.setNombre("Prueba");
        usuario.setApellido("Test");
        usuario.setEmail("test@gmail.com");
        usuario.setContrasenna("1234");

        Usuario usuarioCreado = usuarioService.crerUsuario(usuario);

        assertThat(usuarioCreado.getId()).isGreaterThan(0);
        assertThat(usuarioCreado.getNombre()).isEqualTo("Prueba");
        assertThat(usuarioCreado.getEmail()).isEqualTo("test@gmail.com");
        assertThat(usuarioCreado.getActivo()).isTrue();

        assertThat(usuarioCreado.getContrasenna()).isNotEqualTo("1234");

    }
}

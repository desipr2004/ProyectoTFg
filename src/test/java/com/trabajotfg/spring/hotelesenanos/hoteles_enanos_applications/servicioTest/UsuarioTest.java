package com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.servicioTest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.fail;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.modelo.Usuario;
import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.Utils.Cifrado;
import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.repositorio.RepoUsuario;
import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.servicio.UsuarioService;

@ExtendWith (MockitoExtension.class)
public class UsuarioTest {
    
    @Mock
    private RepoUsuario repoUsuario;

    @InjectMocks
    private UsuarioService usuarioService;
    
    private Usuario usuarioTst;

    @BeforeEach
    void setUp() throws Exception{
        usuarioTst = new Usuario();
        usuarioTst.setId(1);
        usuarioTst.setNombre("Lara");
        usuarioTst.setApellido("Morandini");
        usuarioTst.setEmail("larita@gmail.com");
        // Guardamos la contraseña cifrada tal y como lo hace el servicio
        usuarioTst.setContrasenna(Cifrado.cifrarPassword("larita123"));
        usuarioTst.setActivo(true);
        usuarioTst.setTipoUsuario(Usuario.UsuarioTipo.CLIENT);
    }

    @Test
    void crearUsuario() throws Exception{

        when(repoUsuario.save(any(Usuario.class))).thenReturn(usuarioTst);

        Usuario usuarioCreado = usuarioService.crerUsuario(usuarioTst);

        verify(repoUsuario).save(usuarioTst);
       assertNotNull(usuarioCreado);
       assertEquals("Lara", usuarioCreado.getNombre());
         assertEquals("larita@gmail.com", usuarioCreado.getEmail());
       assertTrue(usuarioCreado.getActivo());
        
    }


    @Test
    void noRegistrarUsuarioConEmailExistente() {
        when(repoUsuario.existsByEmail("larita@gmail.com")).thenReturn(true);

        try{
            usuarioService.registrarUsuario("Lara", "Morandini", "larita@gmail.com", "larita123", "123456789");
            fail("El email ya existe, tiene que lanzar una excepcion");
        }catch(Exception e){
            assertEquals("El email ya está registrado", e.getMessage());
        }

        verify(repoUsuario, never()).save(any());
    }

    @Test
    void registrar_emailNuevo() throws Exception {
     when(repoUsuario.existsByEmail("nuevo@gmail.com")).thenReturn(false);
     when(repoUsuario.save(any(Usuario.class))).thenReturn(usuarioTst);   

     Usuario usuarioRegistrado = usuarioService.registrarUsuario("Lara", "Morandini", "nuevo@gmail.com", "larita123", "123456789");

        verify (repoUsuario).save(any(Usuario.class));
        assertNotNull(usuarioRegistrado);
        assertEquals("Lara", usuarioRegistrado.getNombre());
    }

    @Test
    void buscar_porEmail(){
        when(repoUsuario.findByEmail("larita@gmail.com")).thenReturn(Optional.of(usuarioTst));

        Optional <Usuario> usuarioEncontrado = usuarioService.buscarPorEmail("larita@gmail.com");

        assertTrue(usuarioEncontrado.isPresent());
        assertEquals("larita@gmail.com", usuarioEncontrado.get().getEmail());
        assertEquals("Lara", usuarioEncontrado.get().getNombre());

    }

    @Test
    void noEncuentraUsuarioPorEmail (){
        when(repoUsuario.findByEmail("noexiste@gmail.com")).thenReturn(Optional.empty());

        Optional<Usuario> usuarioEncontrado = usuarioService.buscarPorEmail("noexiste@gmail.com");

        assertTrue(usuarioEncontrado.isEmpty());

    }

    @Test
    void comoprobarSiEmailExiste(){
        when(repoUsuario.existsByEmail("larita@gmail.com")).thenReturn(true);

        boolean existe = usuarioService.existePorEmail("larita@gmail.com");
        assertTrue(existe);
    }

    @Test
    void comprobarPasswordCorrecta(){
        when(repoUsuario.findByEmail("larita@gmail.com")).thenReturn(Optional.of(usuarioTst));

        when (repoUsuario.findByEmail("larita@gmail.com")).thenReturn(Optional.of(usuarioTst));

        boolean resulado = usuarioService.comprobarContrasenna("larita@gmail.com", "larita123");

        assertTrue(resulado);
    }
}

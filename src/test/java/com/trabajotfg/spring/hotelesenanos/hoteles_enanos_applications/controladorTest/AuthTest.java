package com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.controladorTest;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Optional;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;


import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.controlador.AuthControlador;
import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.modelo.Usuario;
import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.servicio.UsuarioService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;


@WebMvcTest(AuthControlador.class)
public class AuthTest {

    @Autowired
    private MockMvc mockMvc;
    
    @MockBean
    private UsuarioService usuarioSevice;

    private Usuario usuarioTest;
    
    @BeforeEach
    void prepararDatos(){

        usuarioTest = new Usuario();
        usuarioTest.setId(1);
        usuarioTest.setNombre("Juan");
        usuarioTest.setApellido("Pérez");
        usuarioTest.setEmail("juan@gmail.com");
        usuarioTest.setActivo(true);
        usuarioTest.setTipoUsuario(Usuario.UsuarioTipo.CLIENT);
    }

    @Test
    void nuevo_regustro() throws Exception{
        when(usuarioSevice.existePorEmail("nuevo@test.com")).thenReturn(false);
        when(usuarioSevice.crerUsuario(any(Usuario.class))).thenReturn(usuarioTest);

        //enviar solicitud del registro 
        String usuarioJson ="""
                {
                    "nombre": "Juan",
                    "apellido": "Pérez",
            "email": "testeo@gmail.com",
            "contrasenna": "password1233"
        }
                """;

        //Comprobar la respuesta 
    mockMvc.perform(post("/api/auth/registro")
    .contentType(MediaType.APPLICATION_JSON).content(usuarioJson)).andExpect(status().isOk())
    .andExpect(jsonPath("$.mensaje").value("Usuario creado !!"))
    .andExpect(jsonPath("$.usuario.nombre").value("Juan"));

    }

    @Test
    void elEmailYaExiste_noRegistrar () throws Exception{

        //Hacer como que el email ya existe 
        when(usuarioSevice.existePorEmail("existeEmail@gmail.com")).thenReturn(true);

        //Vamos a intentar registrarlo 
        String usuarioJson = """
                {
                    "nombre": "Lara",
                    "apellido": "García",
                    "email": "existeEmail@gmail.com",
                    "contrasenna": "password1234"
                }
                """;

        //Tiene que dar fallo
    mockMvc.perform(post("/api/auth/registro")
    .contentType(MediaType.APPLICATION_JSON).content(usuarioJson)).andExpect(status().isOk())
        .andExpect(jsonPath("$.error").value("Usuario existente con ese email"));


    }

    @Test
    void loginFuncional() throws Exception{
        //Hacer como que ya existe el usuario y la constraseña todo ok 
        when(usuarioSevice.buscarPorEmail("juan@gmail.com")).thenReturn(Optional.of(usuarioTest));
        when(usuarioSevice.comprobarContrasenna("juan@gmail.com", "password1234")).thenReturn(true);


    String loginJson ="""
        {
        "email": "juan@gmail.com",
        "contrasenna": "password1234"
    }
        """;
        //ver que el login es correcto
        mockMvc.perform(post("/api/auth/login")
    .contentType(MediaType.APPLICATION_JSON).content(loginJson)).andExpect(status().isOk())
        .andExpect(jsonPath("$.mensaje").value("Login correcto"))
        .andExpect(jsonPath("$.usuario.email").value("juan@gmail.com"));

    }
    
    @Test
    void loginFalla_noExiste() throws Exception{
        //Hacer como que el usuario no existe 
        when(usuarioSevice.buscarPorEmail("noExiste@gmail.com")).thenReturn(Optional.empty());
        //logear un email que no existe 
        String loginJson ="""
                {
                    "email": "noExiste@gmail.com",
                    "contrasenna": "password1234"
                }
                """;

                //Deberia de dar un error 
                mockMvc.perform(post("/api/auth/login")
        .contentType(MediaType.APPLICATION_JSON).content(loginJson)).andExpect(status().isOk())
        .andExpect(jsonPath("$.error").value("Usuario no encontrado"));
    }

    @Test
    void errorLoginPorContrasenna () throws Exception{
        //Hacer como que el usuario existe pero falla la contraseña
        when(usuarioSevice.buscarPorEmail("juan@gmail.com")).thenReturn(Optional.of(usuarioTest));
        when(usuarioSevice.comprobarContrasenna("juan@gmail.com", "malaContrasenna")).thenReturn(false);

        //Login con incorrecta contraseña 
    String loginJson ="""
        {
        "email": "juan@gmail.com",
        "contrasena": "malaContrasenna"
        }
        """;

    //Se supone que da error
    mockMvc.perform(post("/api/auth/login")
    .contentType(MediaType.APPLICATION_JSON).content(loginJson)).andExpect(status().isOk())
    .andExpect(jsonPath("$.error").value("Contraseña incorrecta o el usuario no está activo"));
    }


}

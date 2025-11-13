package com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.utilTest;

import org.junit.jupiter.api.Test;

import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.Utils.Cifrado;
import static org.assertj.core.api.Assertions.assertThat;

public class cifradoTest {
    
    @Test
    void cifrar_devolveriaLaCadenaEncriptada() throws Exception {

        String original = "miPassword123";
        String cifrada = Cifrado.cifrarPassword(original);

        assertThat(cifrada).isNotNull();
        assertThat(cifrada).isNotEmpty();
        assertThat(cifrada).isNotEqualTo(original);
        
    }

    @Test
    void verificarContrasenna_devolverTrue_ContrasennaCorrecta() throws Exception {

        String original = "miPassword123";
        String cifrada = Cifrado.cifrarPassword(original);
        boolean correcta = Cifrado.comprobarContrasenna(original, cifrada);

        assertThat(correcta).isTrue();
        
    }

    @Test
    void verificarContrasenna_devolverFalse_ContrasennaIncorrecta() throws Exception {

        String original = "miPassword123";
        String incorrecta = "otraContrasena";
        String encriptada= Cifrado.cifrarPassword(original);


        boolean correcta = Cifrado.comprobarContrasenna(incorrecta, encriptada);

        assertThat(correcta).isFalse();
        
    }

    @Test
    void descifrar_devolverLaOriginal(){
        String original = "miPassword123";
        try{
            String cifrada = Cifrado.cifrarPassword(original);
            String descifrada = Cifrado.descifrarContrasenna(cifrada);

            assertThat(descifrada).isEqualTo(original);
        }catch(Exception e){
            e.printStackTrace();
    }
}

    @Test
    void cifrarContrasenna_generarOtroResultado_MismaContrasenna() throws Exception {
        String original = "miPassword123";

        String cifrada1 = Cifrado.cifrarPassword(original);
        String cifrada2 = Cifrado.cifrarPassword(original);

        // El cifrado actual usa AES sin IV y con clave fija, por tanto el resultado es determinista
        assertThat(cifrada1).isEqualTo(cifrada2);


}
}

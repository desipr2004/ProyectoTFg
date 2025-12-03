package com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.Utils;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;

// Utilidad de cifrado simétrico (AES + Base64) empleada para las contraseñas
public class Cifrado {
    
    private static final String CLAVE_SECRETA = "ClaveSecreta1234";
    private static final String ALGORITMO = "AES";



    // Aplica cifrado AES y devuelve Base64 (fácil de persistir)
    public static String cifrarPassword(String contrasenna) throws Exception{
        try{

            //SecretKey 
            SecretKeySpec clave = new SecretKeySpec(CLAVE_SECRETA.getBytes(), ALGORITMO);

            //Cifrador 
            Cipher cipher = Cipher.getInstance(ALGORITMO);
            cipher.init(Cipher.ENCRYPT_MODE, clave);

            //Cifrar contraseña
            byte[] contrasennaCifrada = cipher.doFinal(contrasenna.getBytes());

            //Convertir a Base64 para pasarla a texto
            return Base64.getEncoder().encodeToString(contrasennaCifrada);

        }catch(Exception e){
            throw new Exception("Error para cifrar la contraseña "+ e.getMessage());
        }
    }

    // Descifra una contraseña almacenada para comprobarla contra la versión plana
    public static String descifrarContrasenna(String contrasennaCifrada) throws Exception{
        try{
            //SecretKey 
            SecretKeySpec clave = new SecretKeySpec(CLAVE_SECRETA.getBytes(), ALGORITMO);

            //Cifrador 
            Cipher cipher = Cipher.getInstance(ALGORITMO);
            cipher.init(Cipher.DECRYPT_MODE, clave);

            //convertir a bytes
            byte[] contrasennaBytes = Base64.getDecoder().decode(contrasennaCifrada);

            //Descifrar
            byte[] contrasennaDescifrada = cipher.doFinal(contrasennaBytes);

            //convertir a String
            return new String(contrasennaDescifrada);

        }catch(Exception e){
            throw new Exception("Error para descifrar la contraseña "+ e.getMessage());
        }
    }


    // Compara contraseñas en texto plano contra su equivalente cifrado
    public static boolean comprobarContrasenna(String contrasennaNormal, String contrasennaCifrada){
        try{
            String contrasenna = descifrarContrasenna(contrasennaCifrada);
            return contrasennaNormal.equals(contrasenna);
        }catch(Exception e){
            return false;
        }
    }

}

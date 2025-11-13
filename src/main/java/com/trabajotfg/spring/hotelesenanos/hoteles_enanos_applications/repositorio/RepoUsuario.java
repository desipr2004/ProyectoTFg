package com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.modelo.Usuario;

import java.util.List;
import java.util.Optional;

@Repository
public interface RepoUsuario extends JpaRepository<Usuario, Integer> {
    
    // buscar usuarios que contengan parte del nombre
    List<Usuario> findByNombreContaining(String nombre);

    //buscar usuarios activos
    List<Usuario> findByActivoTrue();

    //buscar por tipo de usuario
    List<Usuario> findByTipoUsuario(Usuario.UsuarioTipo tipoUsuario);
    

    //Buscar por email
    Optional<Usuario> findByEmail(String email);

    //Comprobacion de si ya existe el email
    boolean existsByEmail(String email);

}

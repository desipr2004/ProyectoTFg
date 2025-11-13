package com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.repositorio;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.modelo.Hotel;
import java.util.List;

@Repository
public interface RepoHotel extends JpaRepository<Hotel, Integer> {
    
    //Buscar hoteles por nombre
    List<Hotel> findByNombre(String nombre);

    //Buscar hoteles que contengan parte del nombre
    List<Hotel> findByNombreContaining(String nombre);

    //Buscar hoteles por ciudad
    List<Hotel> findByCiudad(String ciudad);
     
    List<Hotel> findByActivoTrue();

    //Buscar por nombre(ignorando mayusculas y minusculas)
    List<Hotel> findByNombreIgnoreCase(String nombre);

    //BUscar que este activo y por nombre
    List<Hotel> findByNombreAndActivoTrue(String nombre);

    //Buscar por estrellas
    List<Hotel> findByEstrellas(Integer estrellas);

    //Comprobar si existe el hotel con nombre y ciudad
    boolean existsByNombreAndCiudad(String nombre, String ciudad);

} 
package com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.repositorio;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.modelo.Habitacion;
import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.modelo.Hotel;
import java.math.*;
import java.util.List;  

@Repository
public interface RepoHabitacion extends JpaRepository<Habitacion, Integer> {
    
    //Buscar habitaciones por hotel
    List<Habitacion> findByHotel(Hotel hotel);

    //Habitaciones ativas
    List<Habitacion> findByActivaTrue();

    //Buscar habitaciones disponibles
    List<Habitacion> findByEstado(Habitacion.EstadoHabitacion estado);

    //Buscar poe tipo de habitacion
    List<Habitacion> findByTipoHabitacion(Habitacion.TipoHabitacion tipoHabitacion);    

    //Buscar por capacidad 
    List<Habitacion> findByCapacidad(Integer capacidad);

    //Buscar por rango de precio por noche
    List<Habitacion> findByPrecioPorNocheBetween(BigDecimal precioMin, BigDecimal precioMax);

    //Buscar habitacion por estado especifico 
    List<Habitacion> findByEstadoAndHotel(Habitacion.EstadoHabitacion estado, Hotel hotel);
    
    
}

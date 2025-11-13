package com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.servicio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.modelo.Habitacion;
import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.modelo.Hotel;
import java.util.Optional;

import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.repositorio.RepoHabitacion;

@Service
public class HabitacionService {
    
    @Autowired
    private RepoHabitacion habitacionRepo;

    /* 
   

    //Habitaciones ativas
    List<Habitacion> findByActivoTrue();

    //Buscar habitaciones disponibles
    List<Habitacion> findByEstado(Habitacion.EstadoHabitacion estado);

    //Buscar poe tipo de habitacion
    List<Habitacion> findByTipoHabitacion(Habitacion.TipoHabitacion tipoHabitacion);    

    //Buscar por capacidad 
    List<Habitacion> findByCapacidad(Integer capacidad);

    //Buscar por precios 
    List<Habitacion> findByPrecio(BigDecimal precioMin, BigDecimal precioMax);

    //Buscar habitacion por estado especifico 
    List<Habitacion> findByEstadoAndHotel(Habitacion.EstadoHabitacion estado, Hotel hotel);
     */
       // List<Habitacion> findByHotel(Hotel hotel);
    public List<Habitacion> listarHabitaciones(){
        return habitacionRepo.findAll();
    }

    public Optional<Habitacion> buscarPorId(Integer id){
        return habitacionRepo.findById(id);
    }

    public Habitacion crearActualizarHabitacion(Habitacion habitacion){
        return habitacionRepo.save(habitacion);
    }

    public void eliminarHabitacion(Integer id){
        habitacionRepo.deleteById(id);
    }

    public List<Habitacion> habitacionActivo(){
        return habitacionRepo.findByActivaTrue();
    }

    public List<Habitacion> habitacionPorHotel(Hotel hotel){
        return habitacionRepo.findByHotel(hotel);
    }

    public List<Habitacion> buscarPorEstado(Habitacion.EstadoHabitacion estado){
        return habitacionRepo.findByEstado(estado);
    }

    public List<Habitacion> buscarTipoHabitacion(Habitacion.TipoHabitacion tipoHabitacion){
        return habitacionRepo.findByTipoHabitacion(tipoHabitacion);
    }

    public List<Habitacion> buscarPorCapacidad (Integer capacidad){
        return habitacionRepo.findByCapacidad(capacidad);
    }

    public List<Habitacion> buscarPorEstadoYHotel(Habitacion.EstadoHabitacion estado, Hotel hotel){
        return habitacionRepo.findByEstadoAndHotel(estado, hotel);
    }
}


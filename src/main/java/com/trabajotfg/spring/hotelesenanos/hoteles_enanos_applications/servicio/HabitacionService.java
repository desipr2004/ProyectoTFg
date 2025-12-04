package com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.servicio;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.modelo.Habitacion;
import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.modelo.Hotel;
import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.modelo.Reserva;
import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.repositorio.RepoHabitacion;
import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.repositorio.RepoReserva;

@Service
public class HabitacionService {
    
    @Autowired
    private RepoHabitacion habitacionRepo;

    @Autowired
    private RepoReserva reservaRepo;

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
    // Devuelve todas las habitaciones 
    public List<Habitacion> listarHabitaciones(){
        return habitacionRepo.findAll();
    }

    //Muestra una habitación por el id
    public Optional<Habitacion> buscarPorId(Integer id){
        return habitacionRepo.findById(id);
    }

    // Crea o actualiza una habitacion
    public Habitacion crearActualizarHabitacion(Habitacion habitacion){
        return habitacionRepo.save(habitacion);
    }

    // Elimina definitivamente una habitación
    public void eliminarHabitacion(Integer id){
        habitacionRepo.deleteById(id);
    }

    // Devuelve solo las  habitaciones que estan activas
    public List<Habitacion> habitacionActivo(){
        return habitacionRepo.findByActivaTrue();
    }

    // Lista las habitaciones de un hotel en concreto
    public List<Habitacion> habitacionPorHotel(Hotel hotel){
        return habitacionRepo.findByHotel(hotel);
    }
    //Lista las habitaciones segun el estado de esta 
    public List<Habitacion> buscarPorEstado(Habitacion.EstadoHabitacion estado){
        return habitacionRepo.findByEstado(estado);
    }
    //Lista las habitaciones segun el tipo de habitacion
    public List<Habitacion> buscarTipoHabitacion(Habitacion.TipoHabitacion tipoHabitacion){
        return habitacionRepo.findByTipoHabitacion(tipoHabitacion);
    }
    //Lista las habitaciones segun la capacidad de esta
    public List<Habitacion> buscarPorCapacidad (Integer capacidad){
        return habitacionRepo.findByCapacidad(capacidad);
    }
    //Lista las habitaciones segun el estado de la habitacion y el hotel 
    public List<Habitacion> buscarPorEstadoYHotel(Habitacion.EstadoHabitacion estado, Hotel hotel){
        return habitacionRepo.findByEstadoAndHotel(estado, hotel);
    }

    /**
     * Devuelve las habitaciones activas y en estado DISPONIBLE para un hotel que no tenga
     * reservas que se superpongan con el rango indicado. Si las fechas son nulas o invalidas,
     * se devuelve el listado simple de DISPONIBLE.
     */

    public List<Habitacion> buscarDisponiblesPorHotelYRango(Hotel hotel, LocalDate fechaEntrada, LocalDate fechaSalida) {
        if (hotel == null) {
            return List.of(); // devuelve una lista vacia si no hay hotel
        }

        List<Habitacion> base = habitacionRepo.findByEstadoAndHotel(Habitacion.EstadoHabitacion.DISPONIBLE, hotel);
        Iterator<Habitacion> iterator = base.iterator(); // el iterator recorre la lista base y puede eliminar elementos sin causar errores
        while (iterator.hasNext()) {
            Habitacion habitacionActual = iterator.next();
            if (!Boolean.TRUE.equals(habitacionActual.getActiva())) {
                iterator.remove();
            }
        }

        if (fechaEntrada == null || fechaSalida == null || !fechaEntrada.isBefore(fechaSalida)) {
            return base;
        }

        List<Habitacion> libres = new ArrayList<>();
        for (Habitacion habitacion : base) {
            List<Reserva> solapes = reservaRepo.findReservasSuperpuestas(habitacion, fechaEntrada, fechaSalida);// busca las reservas que se solapen en el rango indicado
            boolean ocupada = false;
            for (Reserva reserva : solapes) {
                Reserva.EstadoReserva estado = reserva.getEstadoReserva();
                if (estado == Reserva.EstadoReserva.CONFIRMADA || estado == Reserva.EstadoReserva.PENDIENTE) {
                    ocupada = true;
                    break;
                }
            }
            if (!ocupada) {
                libres.add(habitacion);
            }
        }
        return libres;
    }
}

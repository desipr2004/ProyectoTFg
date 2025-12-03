package com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.servicio;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.modelo.Habitacion;
import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.modelo.Hotel;
import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.modelo.Reserva;
import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.repositorio.RepoHabitacion;
import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.repositorio.RepoReserva;

// Servicio encargado de la lógica de habitaciones (CRUD, filtros y disponibilidad)
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
    // Devuelve todas las habitaciones sin filtros
    public List<Habitacion> listarHabitaciones(){
        return habitacionRepo.findAll();
    }

    // Recupera una habitación concreta
    public Optional<Habitacion> buscarPorId(Integer id){
        return habitacionRepo.findById(id);
    }

    // Guarda la información de la habitación (alta o modificación)
    public Habitacion crearActualizarHabitacion(Habitacion habitacion){
        return habitacionRepo.save(habitacion);
    }

    // Elimina definitivamente una habitación
    public void eliminarHabitacion(Integer id){
        habitacionRepo.deleteById(id);
    }

    // Devuelve solo habitaciones activas
    public List<Habitacion> habitacionActivo(){
        return habitacionRepo.findByActivaTrue();
    }

    // Habitaciones pertenecientes a un hotel concreto
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

    /**
     * Devuelve habitaciones activas y en estado DISPONIBLE para un hotel que no tengan
     * reservas que se superpongan con el rango indicado. Si las fechas son nulas o invalidas,
     * se devuelve el listado simple de DISPONIBLE.
     */
    // Calcula habitaciones libres comprobando solapes de reservas confirmadas/pendientes
    public List<Habitacion> buscarDisponiblesPorHotelYRango(Hotel hotel, LocalDate fechaEntrada, LocalDate fechaSalida) {
        if (hotel == null) {
            return List.of();
        }

        List<Habitacion> base = habitacionRepo.findByEstadoAndHotel(Habitacion.EstadoHabitacion.DISPONIBLE, hotel);
        base.removeIf(h -> !Boolean.TRUE.equals(h.getActiva()));

        if (fechaEntrada == null || fechaSalida == null || !fechaEntrada.isBefore(fechaSalida)) {
            return base;
        }

        List<Habitacion> libres = new ArrayList<>();
        for (Habitacion habitacion : base) {
            List<Reserva> solapes = reservaRepo.findReservasSuperpuestas(habitacion, fechaEntrada, fechaSalida);
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

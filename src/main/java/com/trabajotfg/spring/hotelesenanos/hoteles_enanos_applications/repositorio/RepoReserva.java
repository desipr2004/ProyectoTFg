package com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.modelo.Reserva;
import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.modelo.Usuario;
import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.modelo.Habitacion;
import java.time.LocalDate;
import java.util.List; 

@Repository
public interface RepoReserva extends JpaRepository<Reserva, Integer> {
    
    //Buscar reservas por usuario
    List<Reserva> findByUsuario(Usuario usuario);

    //Buscar reservas por habitacion
    List<Reserva> findByHabitacion(Habitacion habitacion);

    //Buscar por estado (se llama estadoReserva en la entidad)
    List<Reserva> findByEstadoReserva(Reserva.EstadoReserva estadoReserva);

    //Buscar reservas por fecha de entrada
    List<Reserva> findByFechaEntrada(LocalDate fechaEntrada);   

    //Buscar reserva entre fechas (fechaEntrada between)
    List<Reserva> findByFechaEntradaBetween(LocalDate fechaInicio, LocalDate fechaFin);

    //Buscar reservas que se superponen con un rango dado (fechaEntrada, fechaSalida)
    @Query("SELECT r FROM Reserva r WHERE r.habitacion = :habitacion AND r.fechaEntrada < :fechaSalida AND r.fechaSalida > :fechaEntrada")
    List<Reserva> findReservasSuperpuestas(@Param("habitacion") Habitacion habitacion, @Param("fechaEntrada") LocalDate fechaEntrada, @Param("fechaSalida") LocalDate fechaSalida);

    List<Reserva> findByEmailUsuario(String emailUsuario);
    List<Reserva> findByUsuarioEmail(String email);

}

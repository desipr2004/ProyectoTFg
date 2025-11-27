package com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.servicio;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.modelo.Habitacion;
import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.modelo.Reserva;
import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.modelo.Usuario;
import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.repositorio.RepoHabitacion;
import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.repositorio.RepoReserva;
import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.repositorio.RepoUsuario;

@Service
public class ReservaService {
    private static final BigDecimal PRECIO_BASE_POR_PERSONA = new BigDecimal("50.00");

    @Autowired
    private RepoReserva reservaRepo ;

    @Autowired
    private RepoHabitacion habitacionRepo;

    @Autowired
    private RepoUsuario usuarioRepo;

    public List<Reserva> listarReservas(){
        return reservaRepo.findAll();
    }

    public List<Reserva> buscarReservasPorUsuarioId(int usuarioId){
        Optional<Usuario> usuario = usuarioRepo.findById(usuarioId);
        if(usuario.isPresent()){
            return reservaRepo.findByUsuario(usuario.get());
        }
        return Collections.emptyList();
    }

    public List<Reserva> buscarReservasPorCorreo(String email){
        if(email == null){
            return Collections.emptyList();
        }

        Optional<Usuario> usuario = usuarioRepo.findByEmail(email);
        if(usuario.isPresent()){
            return reservaRepo.findByUsuario(usuario.get());
        }
        return Collections.emptyList();
    }

    public Optional<Reserva> buscarPorId(Integer id){
        return reservaRepo.findById(id);
    }

    public Reserva crearReserva(Reserva reserva){
        reserva.setId(0);
        prepararReserva(reserva);
        return reservaRepo.save(reserva);
    }

    public Reserva actualizarReserva(Reserva reserva){
        prepararReserva(reserva);
        return reservaRepo.save(reserva);
    }

    public void eliminarReserva(Integer id){
        reservaRepo.deleteById(id);
    }

    private void prepararReserva(Reserva reserva){
        validarFechas(reserva);
        if (reserva.getEstadoReserva() == null){
            reserva.setEstadoReserva(Reserva.EstadoReserva.PENDIENTE);
        }

        reserva.setHabitacion(cargarHabitacion(reserva));
        reserva.setUsuario(cargarUsuario(reserva));
        reserva.setPrecioTotal(calcularPrecio(reserva));
    }

    private void validarFechas(Reserva reserva){
        LocalDate entrada = reserva.getFechaEntrada();
        LocalDate salida = reserva.getFechaSalida();
        if(entrada == null || salida == null){
            throw new IllegalArgumentException("Las fechas de entrada y salida son obligatorias");
        }
        if(!salida.isAfter(entrada)){
            throw new IllegalArgumentException("La fecha de salida debe ser posterior a la de entrada");
        }
    }

    private Habitacion cargarHabitacion(Reserva reserva){
        Habitacion habitacion = reserva.getHabitacion();
        if (habitacion == null || habitacion.getId() == null){
            return null;
        }
        return habitacionRepo.findById(habitacion.getId())
                .orElseThrow(() -> new IllegalArgumentException("Habitación no encontrada con id " + habitacion.getId()));
    }

    private Usuario cargarUsuario(Reserva reserva){
        Usuario usuario = reserva.getUsuario();
        if (usuario == null || usuario.getId() == 0){
            return null;
        }
        return usuarioRepo.findById(usuario.getId())
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado con id " + usuario.getId()));
    }

    private BigDecimal calcularPrecio(Reserva reserva){
        int noches = Math.max(reserva.calculoNoches(), 1);
        int personas = Math.max(reserva.getNumeroPersonas(), 1);

        BigDecimal precioBase = PRECIO_BASE_POR_PERSONA;
        if (reserva.getHabitacion() != null && reserva.getHabitacion().getPrecioPorNoche() != null){
            precioBase = reserva.getHabitacion().getPrecioPorNoche();
        }

        // Precio base por persona y noche
        BigDecimal total = precioBase
                .multiply(BigDecimal.valueOf(noches))
                .multiply(BigDecimal.valueOf(personas));

        if (Boolean.TRUE.equals(reserva.gettodoIncluido())){
            total = total.multiply(BigDecimal.valueOf(1.2));
        }

        return total.setScale(2, RoundingMode.HALF_UP);
    }
}

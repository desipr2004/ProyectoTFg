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

// Servicio que controla el ciclo completo de las reservas (validaciones, cálculos y notificaciones)
@Service
public class ReservaService {
    private static final BigDecimal RECARGO_POR_PERSONA = new BigDecimal("60.00");
    private static final BigDecimal SUPLEMENTO_POR_DIA = new BigDecimal("10.00");
    private static final BigDecimal COSTE_TODO_INCLUIDO = new BigDecimal("10.00");

    @Autowired
    private RepoReserva reservaRepo ;

    @Autowired
    private RepoHabitacion habitacionRepo;

    @Autowired
    private RepoUsuario usuarioRepo;

    @Autowired(required = false)
    private NotificacionCorreoService notificacionCorreoService;

    // Listado completo para panel administrativo
    public List<Reserva> listarReservas(){
        return reservaRepo.findAll();
    }

    // Filtro por identificador de usuario
    public List<Reserva> buscarReservasPorUsuarioId(int usuarioId){
        Optional<Usuario> usuario = usuarioRepo.findById(usuarioId);
        if(usuario.isPresent()){
            return reservaRepo.findByUsuario(usuario.get());
        }
        return Collections.emptyList();
    }

    // Filtro alternativo basado en el correo
    public List<Reserva> buscarReservasPorCorreo(String email){
        if(email == null){
            return Collections.emptyList();
        }

        Optional<Usuario> usuario = usuarioRepo.findByEmail(email);
        if(usuario.isPresent()){
            return reservaRepo.findByUsuario(usuario.get());
        }
        return reservaRepo.findByEmailUsuario(email);
    }

    // Recupera una reserva puntual si existe
    public Optional<Reserva> buscarPorId(Integer id){
        return reservaRepo.findById(id);
    }

    // Registra una reserva nueva calculando su precio y notificando al cliente
    public Reserva crearReserva(Reserva reserva){
        reserva.setId(0);
        prepararReserva(reserva);
        Reserva reservaGuardada = reservaRepo.save(reserva);
        notificarReservaConfirmada(reservaGuardada);
        return reservaGuardada;
    }

    // Persiste los cambios aplicando las mismas reglas de negocio que en la creación
    public Reserva actualizarReserva(Reserva reserva){
        prepararReserva(reserva);
        return reservaRepo.save(reserva);
    }

    // Permite cancelar reservas guardando un motivo resumido
    public Reserva cancelarReserva(Integer id, String motivo){
        Reserva reserva = reservaRepo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Reserva no encontrada con id " + id));
        String motivoNormalizado = motivo != null ? motivo.trim() : null;
        if (motivoNormalizado != null && motivoNormalizado.length() > 200){
            motivoNormalizado = motivoNormalizado.substring(0, 200);
        }
        reserva.cancelarReserva(motivoNormalizado);
        return reservaRepo.save(reserva);
    }

    // Elimina permanentemente una reserva (solo se usa en demos/tests)
    public void eliminarReserva(Integer id){
        reservaRepo.deleteById(id);
    }

    // Ensambla la reserva previo a guardar: valida fechas, carga entidades y calcula total
    private void prepararReserva(Reserva reserva){
        validarFechas(reserva);
        if (reserva.getEstadoReserva() == null){
            reserva.setEstadoReserva(Reserva.EstadoReserva.PENDIENTE);
        }

        reserva.setHabitacion(cargarHabitacion(reserva));
        reserva.setUsuario(cargarUsuario(reserva));
        reserva.setPrecioTotal(calcularPrecio(reserva));
    }

    // Comprueba que existan fechas y que la salida sea posterior a la entrada
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

    // Obtiene la habitación desde la base para evitar precios desactualizados
    private Habitacion cargarHabitacion(Reserva reserva){
        Habitacion habitacion = reserva.getHabitacion();
        if (habitacion == null || habitacion.getId() == null){
            return null;
        }
        return habitacionRepo.findById(habitacion.getId())
                .orElseThrow(() -> new IllegalArgumentException("Habitación no encontrada con id " + habitacion.getId()));
    }

    // Obtiene el usuario completo desde la base antes de asociarlo a la reserva
    private Usuario cargarUsuario(Reserva reserva){
        Usuario usuario = reserva.getUsuario();
        if (usuario == null || usuario.getId() == 0){
            return null;
        }
        return usuarioRepo.findById(usuario.getId())
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado con id " + usuario.getId()));
    }

    // Calcula el total sumando noches, personas, suplemento diario y extras
    private BigDecimal calcularPrecio(Reserva reserva){
        int noches = Math.max(reserva.calculoNoches(), 1);
        int personas = Math.max(reserva.getNumeroPersonas(), 1);

        BigDecimal precioPorNoche = BigDecimal.ZERO;
        if (reserva.getHabitacion() != null && reserva.getHabitacion().getPrecioPorNoche() != null){
            precioPorNoche = reserva.getHabitacion().getPrecioPorNoche();
        }

        BigDecimal total = precioPorNoche.multiply(BigDecimal.valueOf(noches));
        total = total.add(RECARGO_POR_PERSONA.multiply(BigDecimal.valueOf(personas)));
        total = total.add(SUPLEMENTO_POR_DIA.multiply(BigDecimal.valueOf(noches)));

        if (Boolean.TRUE.equals(reserva.gettodoIncluido())){
            total = total.add(COSTE_TODO_INCLUIDO);
        }

        return total.setScale(2, RoundingMode.HALF_UP);
    }

    // Envía correo de confirmación si el servicio de notificaciones está habilitado
    private void notificarReservaConfirmada(Reserva reservaGuardada) {
        if (notificacionCorreoService != null && reservaGuardada != null) {
            notificacionCorreoService.enviarConfirmacionReserva(reservaGuardada);
        }
    }
}

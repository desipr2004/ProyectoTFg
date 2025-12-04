package com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.servicioTest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

import org.assertj.core.api.ThrowableAssert.ThrowingCallable;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.modelo.Habitacion;
import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.modelo.Hotel;
import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.modelo.Reserva;
import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.modelo.Usuario;
import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.modelo.Habitacion.EstadoHabitacion;
import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.modelo.Habitacion.TipoHabitacion;
import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.repositorio.RepoHabitacion;
import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.repositorio.RepoHotel;
import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.repositorio.RepoUsuario;
import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.servicio.ReservaService;

import jakarta.transaction.Transactional;

@SpringBootTest
@Transactional
class ReservaServiceTest {

    @Autowired
    private ReservaService reservaService;

    @Autowired
    private RepoUsuario repoUsuario;

    @Autowired
    private RepoHotel repoHotel;

    @Autowired
    private RepoHabitacion repoHabitacion;

    private Usuario usuario;
    private Habitacion habitacion;

    @BeforeEach
    void prepararDatos() {
        usuario = new Usuario();
        usuario.setNombre("Cliente");
        usuario.setApellido("Test");
        //uuid es un identificador unico universal para evitar colisiones en los emails
        usuario.setEmail("cliente." + UUID.randomUUID() + "@mail.com");
        usuario.setContrasenna("1234");
        usuario = repoUsuario.save(usuario);

        Hotel hotel = new Hotel();
        hotel.setNombre("Hotel pruebas");
        hotel.setDireccion("Calle Falsa 123");
        hotel.setCiudad("TestCity");
        hotel = repoHotel.save(hotel);

        habitacion = new Habitacion();
        habitacion.setNumeroHabitacion("R-" + UUID.randomUUID());
        habitacion.setTipoHabitacion(TipoHabitacion.DOBLE);
        habitacion.setCapacidad(4);
        habitacion.setPrecioPorNoche(new BigDecimal("100.00"));
        habitacion.setDescripcion("Habitación de pruebas");
        habitacion.setEstado(EstadoHabitacion.DISPONIBLE);
        habitacion.setHotel(hotel);
        habitacion = repoHabitacion.save(habitacion);
    }

    @Test
    void crearReserva_NoPermiteFechasInvertidas() {
        Reserva reserva = construirReserva(LocalDate.of(2025, 1, 10), LocalDate.of(2025, 1, 9), 2, false);
        // Si la fecha de salida es anterior a la de entrada, debe lanzar una excepción
        ThrowingCallable crearReservaCallable = new ThrowingCallable() {
            @Override
            public void call() throws Throwable {
                reservaService.crearReserva(reserva);
            }
        };
        assertThatThrownBy(crearReservaCallable)
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("salida");
    }

    @Test
    void crearReserva_CalculaPrecioTotalIncluyendoServicios() {
        Reserva reserva = construirReserva(LocalDate.of(2025, 2, 1), LocalDate.of(2025, 2, 3), 2, true);

        Reserva guardada = reservaService.crearReserva(reserva);

        assertThat(guardada.getPrecioTotal()).isEqualByComparingTo("350.00");
        assertThat(guardada.getEstadoReserva()).isEqualTo(Reserva.EstadoReserva.PENDIENTE);
    }

    private Reserva construirReserva(LocalDate entrada, LocalDate salida, int personas, boolean todoIncluido) {
        Reserva reserva = new Reserva();
        reserva.setUsuario(usuario);
        reserva.setHabitacion(habitacion);
        reserva.setFechaEntrada(entrada);
        reserva.setFechaSalida(salida);
        reserva.setNumeroPersonas(personas);
        reserva.setTodoIncluido(todoIncluido);
        return reserva;
    }
}

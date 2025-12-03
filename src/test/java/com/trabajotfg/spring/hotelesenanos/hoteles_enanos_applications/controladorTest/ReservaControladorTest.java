package com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.controladorTest;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.math.BigDecimal;
import java.time.LocalDate;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.dto.CancelacionReservaRequest;
import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.modelo.Habitacion;
import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.modelo.Hotel;
import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.modelo.Reserva;
import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.modelo.Usuario;
import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.repositorio.RepoHabitacion;
import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.repositorio.RepoHotel;
import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.repositorio.RepoReserva;
import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.repositorio.RepoUsuario;

@SpringBootTest
@AutoConfigureMockMvc
class ReservaControladorTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private RepoReserva repoReserva;

    @Autowired
    private RepoHabitacion repoHabitacion;

    @Autowired
    private RepoHotel repoHotel;

    @Autowired
    private RepoUsuario repoUsuario;

    @Autowired
    private ObjectMapper objectMapper;

    private Integer reservaId;

    @BeforeEach
    void prepararDatos() {
        repoReserva.deleteAll();
        repoHabitacion.deleteAll();
        repoHotel.deleteAll();
        repoUsuario.deleteAll();

        Usuario usuario = new Usuario();
        usuario.setNombre("Ana");
        usuario.setApellido("Cliente");
        usuario.setEmail("ana@example.com");
        usuario.setContrasenna("secreto");
        usuario = repoUsuario.save(usuario);

        Hotel hotel = new Hotel();
        hotel.setNombre("Hotel Central");
        hotel.setDireccion("Calle Dos");
        hotel.setCiudad("Valencia");
        hotel = repoHotel.save(hotel);

        Habitacion habitacion = new Habitacion();
        habitacion.setNumeroHabitacion("201B");
        habitacion.setTipoHabitacion(Habitacion.TipoHabitacion.DOBLE);
        habitacion.setCapacidad(2);
        habitacion.setPrecioPorNoche(new BigDecimal("75.00"));
        habitacion.setEstado(Habitacion.EstadoHabitacion.DISPONIBLE);
        habitacion.setHotel(hotel);
        habitacion = repoHabitacion.save(habitacion);

        Reserva reserva = new Reserva();
        reserva.setFechaEntrada(LocalDate.now().plusDays(2));
        reserva.setFechaSalida(LocalDate.now().plusDays(5));
        reserva.setNumeroPersonas(2);
        reserva.setPrecioTotal(new BigDecimal("200.00"));
        reserva.setUsuario(usuario);
        reserva.setHabitacion(habitacion);
        reserva = repoReserva.save(reserva);
        reservaId = reserva.getId();
    }

    @Test
    void cancelarReservaDevuelveEstadoActualizado() throws Exception {
        CancelacionReservaRequest request = new CancelacionReservaRequest();
        request.setMotivo("El cliente no puede viajar");

        mockMvc.perform(put("/api/reservas/" + reservaId + "/cancelar")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.estadoReserva").value("CANCELADA"))
                .andExpect(jsonPath("$.motivoCancelacion").value("El cliente no puede viajar"));
    }

    @Test
    void obtenerReservaInexistenteDevuelve404() throws Exception {
        mockMvc.perform(get("/api/reservas/99999").accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }
}

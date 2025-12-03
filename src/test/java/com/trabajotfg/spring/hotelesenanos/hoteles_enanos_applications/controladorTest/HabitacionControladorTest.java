package com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.controladorTest;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.math.BigDecimal;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.modelo.Habitacion;
import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.modelo.Hotel;
import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.repositorio.RepoHabitacion;
import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.repositorio.RepoHotel;

@SpringBootTest
@AutoConfigureMockMvc
class HabitacionControladorTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private RepoHotel repoHotel;

    @Autowired
    private RepoHabitacion repoHabitacion;

    private Integer hotelCreadoId;

    @BeforeEach
    void prepararDatos() {
        repoHabitacion.deleteAll();
        repoHotel.deleteAll();

        Hotel hotel = new Hotel();
        hotel.setNombre("Hotel Disponible");
        hotel.setDireccion("Calle Uno");
        hotel.setCiudad("Madrid");
        hotel = repoHotel.save(hotel);
        hotelCreadoId = hotel.getId();

        Habitacion habitacion = new Habitacion();
        habitacion.setNumeroHabitacion("100A");
        habitacion.setTipoHabitacion(Habitacion.TipoHabitacion.DOBLE);
        habitacion.setCapacidad(2);
        habitacion.setPrecioPorNoche(new BigDecimal("90.00"));
        habitacion.setEstado(Habitacion.EstadoHabitacion.DISPONIBLE);
        habitacion.setHotel(hotel);
        repoHabitacion.save(habitacion);
    }

    @Test
    void disponiblesDevuelveHabitacionesDelHotel() throws Exception {
        mockMvc.perform(get("/api/habitacion/hotel/" + hotelCreadoId + "/disponibles")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].numeroHabitacion").value("100A"));
    }

    @Test
    void disponiblesDevuelveNotFoundCuandoNoExisteHotel() throws Exception {
        mockMvc.perform(get("/api/habitacion/hotel/9999/disponibles")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }
}

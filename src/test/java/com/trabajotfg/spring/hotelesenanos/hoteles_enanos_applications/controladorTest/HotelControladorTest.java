package com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.controladorTest;

import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.modelo.Hotel;
import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.repositorio.RepoHotel;

@SpringBootTest
@AutoConfigureMockMvc
class HotelControladorTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private RepoHotel repoHotel;

    @BeforeEach
    void prepararDatos() {
        repoHotel.deleteAll();
        Hotel hotel = new Hotel();
        hotel.setNombre("Hotelillo Madrid");
        hotel.setDireccion("Gran Via 1");
        hotel.setCiudad("Madrid");
        repoHotel.save(hotel);
    }

    @Test
    void listarHotelesDevuelveListadoConNombres() throws Exception {
        mockMvc.perform(get("/api/hotel").accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].nombre").isNotEmpty());
    }

    @Test
    void buscarPorNombreDevuelveCoincidencias() throws Exception {
        mockMvc.perform(get("/api/hotel/buscarPorNombre")
                        .param("nombre", "Hotelillo Madrid")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].nombre", containsString("Hotelillo Madrid")));
    }
}

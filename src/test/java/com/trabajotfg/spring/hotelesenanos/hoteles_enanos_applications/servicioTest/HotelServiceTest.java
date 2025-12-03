package com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.servicioTest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.modelo.Hotel;
import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.repositorio.RepoHotel;
import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.servicio.HotelService;

@ExtendWith(MockitoExtension.class)
class HotelServiceTest {

    @Mock
    private RepoHotel repoHotel;
//injectmocks crea una instancia de la clase y le inyecta los mocks anotados con @Mock
    @InjectMocks
    private HotelService hotelService;

    @Test
    void crearActualizarHotel_guardaYDevuelveElHotel() {
        Hotel hotel = new Hotel("Hotel Prueba", "Calle Falsa 123", "Madrid");
        hotel.setEstrellas(4);

        when(repoHotel.save(any(Hotel.class))).thenReturn(hotel);

        Hotel resultado = hotelService.crearActualizarHotel(hotel);

        assertThat(resultado).isNotNull();
        assertThat(resultado.getNombre()).isEqualTo("Hotel Prueba");
        assertThat(resultado.getCiudad()).isEqualTo("Madrid");
        verify(repoHotel).save(hotel);
    }
}

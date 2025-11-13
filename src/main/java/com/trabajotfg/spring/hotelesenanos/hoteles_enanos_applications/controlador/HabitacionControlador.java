package com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.controlador;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.modelo.Habitacion;
import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.servicio.HabitacionService;
import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.servicio.HotelService;




@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/habitacion")
public class HabitacionControlador {
    
    @Autowired
    private HabitacionService habitacionService;

    @Autowired
    private HotelService hotelService;

    //Get /api/habitacion 
    @GetMapping
    public List<Habitacion> listarTodasLasHabitaciones() {
        return habitacionService.listarHabitaciones();
    }
    
    //Get /api/habitacion/{id}
    @GetMapping("/{id}")
    public Habitacion habitacionPorId(@PathVariable Integer id) {
        Optional<Habitacion> habitacion = habitacionService.buscarPorId(id);
        return habitacion.orElse(null);
    }
    
    //Post /api/habitacion
    @PostMapping
    public Habitacion crearHabitacion(@RequestBody Habitacion habitacion) {
        return habitacionService.crearActualizarHabitacion(habitacion);
    }
    
    //Put /api/habitacion/{id}
    @PutMapping("/{id}")
    public Habitacion actualizarHabitacion(@PathVariable Integer id, @RequestBody Habitacion habitacion) {
        habitacion.setId(id);
        return habitacionService.crearActualizarHabitacion(habitacion);
    }

    //Delete /api/habitacion/{id}
    @DeleteMapping("/{id}")
    public void eliminarHabitacion(@PathVariable Integer id){
        habitacionService.eliminarHabitacion(id);
    }

    //Get /api/habitacion/hotel/activo
    @GetMapping("/activo")
    public List<Habitacion> listarHabitacionesActivas(){
        return habitacionService.habitacionActivo();
    }

    //Get /api/habitacion/hotel/{hotelId}/disponibles
    @GetMapping("/hotel/{hotelId}/disponibles")
    public ResponseEntity<List<Habitacion>> habitacionesDisponiblesPorHotel(@PathVariable Integer hotelId){
        return hotelService.buscarHotelId(hotelId)
            .map(hotel -> {
                List<Habitacion> habitaciones = habitacionService.buscarPorEstadoYHotel(Habitacion.EstadoHabitacion.DISPONIBLE, hotel);
                habitaciones.removeIf(habitacion -> !Boolean.TRUE.equals(habitacion.getActiva()));
                return ResponseEntity.ok(habitaciones);
            })
            .orElse(ResponseEntity.notFound().build());
    }
}

package com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.controlador;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.format.annotation.DateTimeFormat;

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
    public ResponseEntity<List<Habitacion>> habitacionesDisponiblesPorHotel(
            @PathVariable Integer hotelId,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaEntrada,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaSalida) {

        if ((fechaEntrada != null && fechaSalida == null) || (fechaSalida != null && fechaEntrada == null)) {
            return ResponseEntity.badRequest().build();
        }

        return hotelService.buscarHotelId(hotelId)
                .map(hotel -> {
                    List<Habitacion> habitaciones = habitacionService.buscarDisponiblesPorHotelYRango(hotel, fechaEntrada, fechaSalida);
                    return ResponseEntity.ok(habitaciones);
                })
                .orElse(ResponseEntity.notFound().build());
    }
}

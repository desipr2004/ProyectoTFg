package com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.controlador;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.modelo.Habitacion;
import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.modelo.Hotel;
import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.servicio.HabitacionService;
import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.servicio.HotelService;


/**
 * API de habitaciones: CRUD, filtrado por hotel y consulta de disponibilidad.
 * El frontend la usa tanto para mostrar catálogos como para administrar habitaciones.
 */
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/habitacion")
public class HabitacionControlador {

    private static final String JSON_UTF8_VALUE = "application/json;charset=UTF-8";
    
    @Autowired
    private HabitacionService habitacionService;

    @Autowired
    private HotelService hotelService;

    // GET /api/habitacion -> listado completo
    @GetMapping
    public List<Habitacion> listarTodasLasHabitaciones() {
        return habitacionService.listarHabitaciones();
    }
    
    // GET /api/habitacion/{id} -> detalle puntual o 404 si no existe
    @GetMapping("/{id}")
    public ResponseEntity<Habitacion> habitacionPorId(@PathVariable Integer id) {
        Optional<Habitacion> habitacion = habitacionService.buscarPorId(id);
        if(!habitacion.isPresent()){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(habitacion.get());
    }
    
    // POST /api/habitacion -> crea habitaciones nuevas
    @PostMapping(consumes = { MediaType.APPLICATION_JSON_VALUE, JSON_UTF8_VALUE })
    public Habitacion crearHabitacion(@RequestBody Habitacion habitacion) {
        return habitacionService.crearActualizarHabitacion(habitacion);
    }
    
    // PUT /api/habitacion/{id} -> actualiza los campos de una habitación existente
    @PutMapping(value = "/{id}", consumes = { MediaType.APPLICATION_JSON_VALUE, JSON_UTF8_VALUE })
    public Habitacion actualizarHabitacion(@PathVariable Integer id, @RequestBody Habitacion habitacion) {
        habitacion.setId(id);
        return habitacionService.crearActualizarHabitacion(habitacion);
    }

    // DELETE /api/habitacion/{id} -> elimina físicamente una habitación
    @DeleteMapping("/{id}")
    public void eliminarHabitacion(@PathVariable Integer id){
        habitacionService.eliminarHabitacion(id);
    }

    // GET /api/habitacion/activo -> devuelve sólo habitaciones activas
    @GetMapping("/activo")
    public List<Habitacion> listarHabitacionesActivas(){
        return habitacionService.habitacionActivo();
    }

    // GET /api/habitacion/hotel/{hotelId}/disponibles -> calcula disponibilidad según rango de fechas
    @GetMapping("/hotel/{hotelId}/disponibles")
    public ResponseEntity<List<Habitacion>> habitacionesDisponiblesPorHotel(
            @PathVariable Integer hotelId,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaEntrada,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaSalida) {

        if ((fechaEntrada != null && fechaSalida == null) || (fechaSalida != null && fechaEntrada == null)) {
            return ResponseEntity.badRequest().build();
        }

        Optional<Hotel> hotelBuscado = hotelService.buscarHotelId(hotelId);
        if(!hotelBuscado.isPresent()){
            return ResponseEntity.notFound().build();
        }

        List<Habitacion> habitaciones = habitacionService.buscarDisponiblesPorHotelYRango(hotelBuscado.get(), fechaEntrada, fechaSalida);
        return ResponseEntity.ok(habitaciones);
    }
}

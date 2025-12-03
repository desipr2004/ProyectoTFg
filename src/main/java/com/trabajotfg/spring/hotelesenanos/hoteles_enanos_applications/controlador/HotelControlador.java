package com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.controlador;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.servicio.HotelService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestParam;

import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.modelo.Hotel;
import java.util.List;
import java.util.Optional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

/**
 * API REST para gestionar hoteles: CRUD básico y búsquedas.
 * Se expone públicamente para que el panel de administración consulte y mantenga la información.
 */
@RestController
@RequestMapping("/api/hotel")
@CrossOrigin(origins = "*")
public class HotelControlador {
    
    @Autowired
    private  HotelService hotelService;

    // GET /api/hotel -> lista completa de hoteles sin filtros
    @GetMapping
    public List<Hotel> listarHoteles() {
        return hotelService.listarHoteles();
    }

    // GET /api/hotel/{id} -> devuelve un hotel puntual o 404 si no existe
    @GetMapping("/{id}")
    public ResponseEntity<Hotel> hotelPorId(@PathVariable Integer id) {
       Optional<Hotel> hotel = hotelService.buscarHotelId(id);
       if(!hotel.isPresent()){
            return ResponseEntity.notFound().build();
       }
       return ResponseEntity.ok(hotel.get());
    }

    // POST /api/hotel -> crea un hotel nuevo
    @PostMapping
    public Hotel crearHotel(@RequestBody Hotel hotel) {
        return hotelService.crearActualizarHotel(hotel);
    }
    
    // PUT /api/hotel/{id} -> actualiza los datos del hotel indicado
    @PutMapping("/{id}")
    public Hotel actualizarHotel(@PathVariable Integer id, @RequestBody Hotel hotel) {
        hotel.setId(id);
        
        return hotelService.crearActualizarHotel(hotel);
    }
    
    // DELETE /api/hotel/{id} -> elimina el registro de la base de datos
    @DeleteMapping("/{id}")
    public void eliminarHotel(@PathVariable Integer id){
        hotelService.eliminarHotel(id);
    }

    // GET /api/hotel/buscarPorNombre?nombre=... -> búsqueda simple por coincidencia exacta
    @GetMapping("/buscarPorNombre")
    public List<Hotel> buscarPorNombre(@RequestParam String nombre){
        return hotelService.buscarPorNombre(nombre);
    }

    // GET /api/hotel/activos -> devuelve solo los hoteles marcados como activos
    @GetMapping({"/hotelActivo","/activos"})
    public List<Hotel> hotelesActivos() {
        return hotelService.hotelesActivos();
    }
    
}

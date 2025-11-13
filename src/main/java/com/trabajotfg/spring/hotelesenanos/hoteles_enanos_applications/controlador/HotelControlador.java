package com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.controlador;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.servicio.HotelService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.modelo.Hotel;
import java.util.List;
import java.util.Optional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;



@RestController
@RequestMapping("/api/hotel")
@CrossOrigin(origins = "*")
public class HotelControlador {
    
    @Autowired
    private  HotelService hotelService;

    //Get /api/hotel
    @GetMapping
    public List<Hotel> listarHoteles() {
        return hotelService.listarHoteles();
    }

    //Get /api/hotel/{id}
    @GetMapping("/{id}")
    public Hotel hotelPorId(@PathVariable Integer id) {
       Optional<Hotel> hotel = hotelService.buscarHotelId(id);
       return hotel.orElse(null);
    }

    //Post /api/hotel
    @PostMapping
    public Hotel crearHotel(@RequestBody Hotel hotel) {
        return hotelService.crearActualizarHotel(hotel);
    }
    
    //Put /api/hotel
    @PutMapping("/{id}")
    public Hotel actualizarHotel(@PathVariable Integer id, @RequestBody Hotel hotel) {
        hotel.setId(id);
        
        return hotelService.crearActualizarHotel(hotel);
    }
    
    //Delete /api/hotel/{id}
    @DeleteMapping("/{id}")
    public void eliminarHotel(@PathVariable Integer id){
        hotelService.eliminarHotel(id);
    }

    //Get /api/hotel/buscarPorNombre?nombre=nombreDelHotel
    @GetMapping("/buscarPorNombre")
    public List<Hotel> buscarPorNombre(@RequestParam String nombre){
        return hotelService.buscarPorNombre(nombre);
    }

    //Get /api/hotel/activos
    @GetMapping("/hotelActivo")
    public List<Hotel> hotelesActivos() {
        return hotelService.hotelesActivos();
    }
    
}

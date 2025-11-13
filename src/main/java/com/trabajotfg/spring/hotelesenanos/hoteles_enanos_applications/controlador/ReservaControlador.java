package com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.controlador;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.servicio.ReservaService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;

import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.modelo.Reserva;
import java.util.List;
import java.util.Optional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestParam;




@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/reservas")
public class ReservaControlador {
    
    @Autowired
    private ReservaService reservaService;

    @GetMapping
    public List<Reserva> reservasPorId() {
        return reservaService.listarReservas();
    }

    //Get /api/reservas/por-usuario/{usuarioId}
    @GetMapping("/por-usuario/{usuarioId}")
    public List<Reserva> reservasPorUsuario(@PathVariable Integer usuarioId){
        return reservaService.buscarReservasPorUsuarioId(usuarioId);
    }

    //Get /api/reservas/por-email?correo=...
    @GetMapping("/por-email")
    public List<Reserva> reservasPorCorreo(@RequestParam("email") String email){
        return reservaService.buscarReservasPorCorreo(email);
    }
    

    // Get /api/reservas{id}
    @GetMapping("/{id}")
    public Reserva obtenerReservaId(@PathVariable  Integer id) {
        Optional<Reserva> reserva  = reservaService.buscarPorId(id);
        return reserva.orElse(null);
    }

   
    //Post /api/reservas
    @PostMapping
    public Reserva crearReserva(@RequestBody Reserva reserva) {
        return reservaService.crearReserva(reserva);
    }
    
    //Actualiza una reserva existente
    //Put /api/reservas/{id}
    @PutMapping("/{id}")
    public Reserva actualizarReserva(@PathVariable Integer id, @RequestBody Reserva reserva) {
       reserva.setId(id);
        
        return reservaService.actualizarReserva(reserva);
    }

    //Delete /api/reservas/{id}
    @DeleteMapping("/{id}")
    public void eliminarReserva(@PathVariable Integer id){
        reservaService.eliminarReserva(id);
    }
    
}

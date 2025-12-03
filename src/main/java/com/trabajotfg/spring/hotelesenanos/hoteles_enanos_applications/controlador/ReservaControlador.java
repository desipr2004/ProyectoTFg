package com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.controlador;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.servicio.ReservaService;
import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.dto.CancelacionReservaRequest;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.http.ResponseEntity;

import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.modelo.Reserva;
import java.util.List;
import java.util.Optional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestParam;


/**
 * Controlador REST para reservas. Ofrece listados, filtros por usuario/correo,
 * creación, actualización, cancelación y eliminación.
 */
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/reservas")
public class ReservaControlador {
    
    @Autowired
    private ReservaService reservaService;

    // GET /api/reservas -> devuelve todas las reservas para administración
    @GetMapping
    public List<Reserva> reservasPorId() {
        return reservaService.listarReservas();
    }

    // GET /api/reservas/por-usuario/{usuarioId} -> historial de un usuario concreto
    @GetMapping("/por-usuario/{usuarioId}")
    public List<Reserva> reservasPorUsuario(@PathVariable Integer usuarioId){
        return reservaService.buscarReservasPorUsuarioId(usuarioId);
    }

    // GET /api/reservas/por-email?correo=... -> filtro adicional por correo
    @GetMapping("/por-email")
    public List<Reserva> reservasPorCorreo(@RequestParam("email") String email){
        return reservaService.buscarReservasPorCorreo(email);
    }
    

    // GET /api/reservas/{id} -> detalle puntual
    @GetMapping("/{id}")
    public ResponseEntity<Reserva> obtenerReservaId(@PathVariable  Integer id) {
        Optional<Reserva> reserva  = reservaService.buscarPorId(id);
        if(!reserva.isPresent()){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(reserva.get());
    }

   
    // POST /api/reservas -> crea una reserva calculando precio y validando fechas
    @PostMapping
    public Reserva crearReserva(@RequestBody Reserva reserva) {
        return reservaService.crearReserva(reserva);
    }
    
    // PUT /api/reservas/{id} -> actualiza fechas o estado de una reserva existente
    @PutMapping("/{id}")
    public Reserva actualizarReserva(@PathVariable Integer id, @RequestBody Reserva reserva) {
       reserva.setId(id);
        
        return reservaService.actualizarReserva(reserva);
    }
    
    // PUT /api/reservas/{id}/cancelar -> atajo para cancelar con motivo
    @PutMapping("/{id}/cancelar")
    public Reserva cancelarReserva(@PathVariable Integer id, @RequestBody CancelacionReservaRequest request) {
        String motivo = request != null ? request.getMotivo() : null;
        return reservaService.cancelarReserva(id, motivo);
    }

    // DELETE /api/reservas/{id} -> elimina definitivo (se usa para depurar datos de demo)
    @DeleteMapping("/{id}")
    public void eliminarReserva(@PathVariable Integer id){
        reservaService.eliminarReserva(id);
    }
    
}

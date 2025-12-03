package com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.dto;
// DTO para la solicitud de cancelación de una reserva
public class CancelacionReservaRequest {
    private String motivo;

    public String getMotivo() {
        return motivo;
    }

    public void setMotivo(String motivo) {
        this.motivo = motivo;
    }
}

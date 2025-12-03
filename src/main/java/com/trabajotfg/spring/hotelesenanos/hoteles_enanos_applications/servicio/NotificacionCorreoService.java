package com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.servicio;

import java.text.NumberFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;

import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.modelo.Habitacion;
import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.modelo.Hotel;
import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.modelo.Reserva;

@ConditionalOnClass(name = "org.springframework.mail.MailSender")
@Service
// Servicio auxiliar para enviar correos de confirmación cuando hay infraestructura SMTP disponible
public class NotificacionCorreoService {
    private static final Logger LOGGER = LoggerFactory.getLogger(NotificacionCorreoService.class);
    private static final Locale LOCALE_ES = new Locale("es", "ES");
    private static final DateTimeFormatter DATE_FORMAT = DateTimeFormatter.ofPattern("dd/MM/yyyy");

    private final ObjectProvider<MailSender> mailSenderProvider;
    private final boolean correoHabilitado;
    private final String remitente;

    public NotificacionCorreoService(
            ObjectProvider<MailSender> mailSenderProvider,
            @Value("${app.mail.enabled:true}") boolean correoHabilitado,
            @Value("${app.mail.from:reservas@hotelesenanos.com}") String remitente) {
        this.mailSenderProvider = mailSenderProvider;
        this.correoHabilitado = correoHabilitado;
        this.remitente = remitente;
    }

    /**
     * Envía un correo de confirmación al usuario.
     * si no hay servidor SMTP configurado o el correo falla, se deja un mensaje como log pero no se interrumpe el proceso.
     */
    public void enviarConfirmacionReserva(Reserva reserva) {
        try{
            Class.forName("org.springframework.mail.MailSender");
        }catch(ClassNotFoundException e){
            LOGGER.warn("Envio de correo omitido: no se detectó dependencia de mail en el entorno actual.");
            return;
        }
        if (reserva == null) {
            return;
        }
        if (!correoHabilitado) {
            LOGGER.debug("Notificación de reserva {} omitida: correo deshabilitado.", reserva.getId());
            return;
        }
        MailSender mailSender = mailSenderProvider.getIfAvailable();
        if (mailSender == null) {
            LOGGER.warn("No se envía el correo de la reserva {}.", reserva.getId());
            return;
        }
        String destinatario = obtenerCorreoDestino(reserva);
        if (destinatario == null || destinatario.isBlank()) {
            LOGGER.debug("No se envía correo para la reserva {} porque no hay email registrado.", reserva.getId());
            return;
        }

        try {
            SimpleMailMessage mensaje = new SimpleMailMessage();
            mensaje.setTo(destinatario);
            if (remitente != null && !remitente.isBlank()) {
                mensaje.setFrom(remitente);
            }
            String asunto = construirAsunto(reserva);
            String cuerpo = construirCuerpo(reserva);
            mensaje.setSubject(asunto);
            mensaje.setText(cuerpo);
            LOGGER.info("Enviando confirmación de reserva {} a {}", reserva.getId(), destinatario);
            mailSender.send(mensaje);
            LOGGER.info("Correo de confirmación enviado para la reserva {}.", reserva.getId());
        } catch (Exception ex) {
            LOGGER.warn("Error al enviar el correo de confirmación para la reserva " + reserva.getId(), ex);
        }
    }

    private String obtenerCorreoDestino(Reserva reserva) {
        if (reserva.getUsuario() != null && reserva.getUsuario().getEmail() != null) {
            return reserva.getUsuario().getEmail();
        }
        return reserva.getEmailUsuario();
    }

    private String construirAsunto(Reserva reserva) {
        String hotel = obtenerNombreHotel(reserva);
        if (hotel != null && !hotel.isBlank()) {
            return "Reserva confirmada - " + hotel;
        }
        return "Tu reserva ha sido confirmada";
    }

    private String construirCuerpo(Reserva reserva) {
        StringBuilder cuerpo = new StringBuilder();
        String nombre = reserva.getNombreCompletoUsuario();
        if (nombre != null && !nombre.isBlank()) {
            cuerpo.append("Hola ").append(nombre).append(",\n\n");
        } else {
            cuerpo.append("Hola,\n\n");
        }

        cuerpo.append("Tu reserva ha sido confirmada con los siguientes datos:\n");
        cuerpo.append("- Hotel: ").append(valorSeguro(obtenerNombreHotel(reserva))).append("\n");
        cuerpo.append("- Habitación: ").append(valorSeguro(obtenerNumeroHabitacion(reserva))).append("\n");
        cuerpo.append("- Fechas: ").append(formatearFecha(reserva.getFechaEntrada()))
                .append(" al ").append(formatearFecha(reserva.getFechaSalida())).append("\n");
        cuerpo.append("- Número de personas: ").append(Math.max(reserva.getNumeroPersonas(), 1)).append("\n");
        if (reserva.getPrecioTotal() != null) {
            cuerpo.append("- Total estimado: ").append(formatearPrecio(reserva)).append("\n");
        }
        if (Boolean.TRUE.equals(reserva.gettodoIncluido())) {
            cuerpo.append("- Plan: Todo incluido\n");
        }
        cuerpo.append("\nSi necesitas modificar o cancelar tu reserva puedes hacerlo desde la aplicación en la parte de historial.\n");
        cuerpo.append("¡Ten un buen día!");
        return cuerpo.toString();
    }

    private String obtenerNombreHotel(Reserva reserva) {
        Habitacion habitacion = reserva.getHabitacion();
        if (habitacion != null) {
            Hotel hotel = habitacion.getHotel();
            if (hotel != null) {
                return hotel.getNombre();
            }
        }
        return null;
    }

    private String obtenerNumeroHabitacion(Reserva reserva) {
        Habitacion habitacion = reserva.getHabitacion();
        return habitacion != null ? habitacion.getNumeroHabitacion() : null;
    }

    private String valorSeguro(String valor) {
        return valor != null && !valor.isBlank() ? valor : "--";
    }

    private String formatearFecha(LocalDate fecha) {
        if (fecha == null) {
            return "--";
        }
        return fecha.format(DATE_FORMAT);
    }

    private String formatearPrecio(Reserva reserva) {
        NumberFormat format = NumberFormat.getCurrencyInstance(LOCALE_ES);
        return format.format(reserva.getPrecioTotal());
    }
}

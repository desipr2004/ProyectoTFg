package com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.modelo;

import com.fasterxml.jackson.annotation.JsonBackReference;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
@Table(name = "reservas")
public class Reserva {

    private static final BigDecimal RECARGO_POR_PERSONA = new BigDecimal("60.00");
    private static final BigDecimal SUPLEMENTO_POR_DIA = new BigDecimal("10.00");
    private static final BigDecimal COSTE_TODO_INCLUIDO = new BigDecimal("10.00");
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "fecha_entrada")
    private LocalDate fechaEntrada;

    @Column(name="fecha_Salida")
    private LocalDate fechaSalida;

  
    @Column(name = "Numero_personas")
    private int numPersonas;

   
    @Column(name ="precio_total")
    private BigDecimal precioTotal;

    @Column(name = "todo_incluido")
    private Boolean todoIncluido = false;

    @Size(max = 500, message = "No mas de 500 caracteres")
    @Column(length = 500)
    private String observaciones;

    @Enumerated(EnumType.STRING)
    @Column(name= "estado_reserva")
    private EstadoReserva estadoReserva;


    @Size(max = 200, message = "No mas de 200 caracteres")
    @Column(name = "motivo_cancelacion", length = 200)
    private String motivoCancelacion;

    @JsonBackReference("usuario-reservas")
    @ManyToOne
    @JoinColumn(name ="usuario_id")
    private Usuario usuario;

    @Column(name = "email_usuario")
    private String emailUsuario;

    @ManyToOne
    @JoinColumn(name="habitacion_id")
    private Habitacion habitacion;

    public enum EstadoReserva{
        PENDIENTE, CONFIRMADA, CANCELADA, COMPLETADA
    }

    public Reserva(){
        this.estadoReserva = EstadoReserva.PENDIENTE;
        this.todoIncluido = false;
    }

    public Reserva(LocalDate fechaEntrada, LocalDate fechaSalida, Integer numPersonas,
    BigDecimal precioTotal, Usuario usuario, Habitacion habitacion ){
        this.fechaEntrada = fechaEntrada;
        this.fechaSalida = fechaSalida;
        this.numPersonas = numPersonas;
        this.usuario = usuario;
        this.habitacion = habitacion;
        this.estadoReserva = EstadoReserva.PENDIENTE;
        this.todoIncluido = false;
    }

    public int getId(){
        return id;
    }

    public void setId(int id){
        this.id = id;
    }

    public LocalDate getFechaEntrada(){
        return fechaEntrada;
    }

    public void setFechaEntrada(LocalDate fechaEntrada){
        this.fechaEntrada = fechaEntrada;
    }

    public LocalDate getFechaSalida(){
        return fechaSalida;
    }

    public void setFechaSalida(LocalDate fechaSalida){
        this.fechaSalida = fechaSalida;
    }

    public int getNumeroPersonas(){
        return numPersonas;
    }

    public void setNumeroPersonas(int numPersonas){
        this.numPersonas = numPersonas;
    }

    public BigDecimal getPrecioTotal(){
        return precioTotal;
    }

    public void setPrecioTotal(BigDecimal precioTotal){
        this.precioTotal = precioTotal;
    }

    public Boolean gettodoIncluido(){
        return todoIncluido;
    }

    public void setTodoIncluido(Boolean todoIncluido){
        this.todoIncluido = todoIncluido;
    }

    public String getObservaciones(){
        return observaciones;
    }

    public void setObservaciones(String observaciones){
        this.observaciones = observaciones;
    }

    public EstadoReserva getEstadoReserva(){
    return estadoReserva;
    }

    public void setEstadoReserva(EstadoReserva estadoReserva){
        this.estadoReserva = estadoReserva;
    }


    public String getMotivoCancelacion(){
        return motivoCancelacion;
    }

    public void setMotivoCancelacion(String motivoCancelacion){
        this.motivoCancelacion = motivoCancelacion;
    }

    public Usuario getUsuario(){
        return usuario;
    }

    public void setUsuario(Usuario usuario){
        this.usuario = usuario;
    }

    public Habitacion getHabitacion(){
        return habitacion;
    }

    public void setHabitacion(Habitacion habitacion){
        this.habitacion = habitacion;
    }

    public String getEmailUsuarioLibre(){
        return emailUsuario;
    }

    public void setEmailUsuarioLibre(String email){
        this.emailUsuario = email;
    }

    //Solo lo leemos, no se guarda en la base de datos
    @Transient
    public String getNombreCompletoUsuario(){
        if(usuario == null){
            return null;
        }

        String nombre = usuario.getNombre() != null ? usuario.getNombre() : "";
        String apellido = usuario.getApellido() != null ? usuario.getApellido() : "";
        String completo = (nombre + " " + apellido).trim();
        return completo.isEmpty() ? null : completo;
    }

    // solo lo lee para que el front pueda mostrar el correo cuando sea necesario.
    @Transient
    public String getEmailUsuario(){
        if(usuario != null && usuario.getEmail() != null){
            return usuario.getEmail();
        }
        return emailUsuario;
    }

    @Override
    public String toString() {
    return "Reserva{" +
            "id=" + id +
            ", fechaEntrada=" + fechaEntrada +
            ", fechaSalida=" + fechaSalida +
            ", numPersonas=" + numPersonas +
            ", precioTotal=" + precioTotal +
            ", todoIncluido=" + todoIncluido +
            ", estadoReserva=" + estadoReserva +
            '}';
}


    //Metodo de confirmacion de la reserva 
    public void confirmarReserva (String motivo){
        this.estadoReserva = EstadoReserva.CONFIRMADA;
        this.motivoCancelacion = motivo;
    }

    public void cancelarReserva(String motivo){
        this.estadoReserva = EstadoReserva.CANCELADA;
        this.motivoCancelacion = motivo;
    }

    public void reservaCompleta(){
        this.estadoReserva = EstadoReserva.COMPLETADA;
    }

    //Calculo del total de noches de la reserva
    public int calculoNoches(){
        if(fechaEntrada != null && fechaSalida != null && !fechaSalida.isBefore(fechaEntrada)){
            return (int)(fechaSalida.toEpochDay() - fechaEntrada.toEpochDay());
        }
        return 0;
    }
 // Parecido a un get pero calcula el precio total segun las reglas establecidas
    public BigDecimal precioTotal(){
        int noches = Math.max(calculoNoches(), 1);
        int personas = Math.max(numPersonas, 1);

        BigDecimal precioPorNoche = BigDecimal.ZERO;
        if (habitacion != null && habitacion.getPrecioPorNoche() != null) {
            precioPorNoche = habitacion.getPrecioPorNoche();
        }

        BigDecimal total = precioPorNoche.multiply(BigDecimal.valueOf(noches));
        total = total.add(RECARGO_POR_PERSONA.multiply(BigDecimal.valueOf(personas)));
        total = total.add(SUPLEMENTO_POR_DIA.multiply(BigDecimal.valueOf(noches)));

        if(Boolean.TRUE.equals(todoIncluido)){
            total = total.add(COSTE_TODO_INCLUIDO);
        }
        return total.setScale(2, RoundingMode.HALF_UP);
    }

    //comprobar que hay una habitacion asignada el numero de huespedes no exceda la capacidad
    public boolean comprobarCapacidad(){
        return habitacion != null && numPersonas <= habitacion.getCapacidad();
    }
    



}

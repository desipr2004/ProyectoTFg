package com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.modelo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;


@Entity
@Table(name = "habitaciones")
public class Habitacion {
    
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name ="numero_habitacion", nullable = false, unique = true)
    private String numeroHabitacion;

    @Enumerated(EnumType.STRING) 
    @Column(name="tipo_habitacion", nullable = false)
    private TipoHabitacion tipoHabitacion;

    @Column(nullable = false)
    private Integer capacidad;

    @Column(name = "precio_noche", nullable= false)
    private BigDecimal precioPorNoche;

    @Size(max = 500, message = "No más de 500 caracteres")
    @Column(length = 500)
    private String descripcion;

    @Column(name= "tiene_wifi", nullable= false)
    private Boolean tieneWifi = true;

    @Column(name = "aire_acondicionado", nullable = false)
    private Boolean tieneAireAcondicionado = false;

    @Column(name= "calefaccion", nullable = false )
    private Boolean tieneCalefaccion = true;

    @Column(name= "balcon", nullable = false)
    private Boolean tieneBalcon = false;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EstadoHabitacion estado;

    @Column(nullable = false)
    private Boolean activa = true;

    @ManyToOne
    @JoinColumn(name="hotel_id", nullable = false)
    @JsonIgnoreProperties("habitaciones")
    private Hotel hotel;

    @JsonIgnore
    @OneToMany(mappedBy = "habitacion", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Reserva> reservas;

    
    public enum TipoHabitacion{
        INDIVIDUAL, DOBLE, MATRIMONIAL, FAMILIAR
    }

    public enum EstadoHabitacion {
        DISPONIBLE, OCUPADO, MANTENIMIENTO
    }

    //Cnstructor
    //Vcío, y valores por defecto
    public Habitacion(){
        this.estado = EstadoHabitacion.DISPONIBLE;
        this.activa = true;
        this.tieneWifi = true;
        this.tieneAireAcondicionado = false;
        this.tieneBalcon = false;
        this.tieneCalefaccion = true;
    } 

    //Relleno y valores pasados 
    public Habitacion(String numeroHabitacion, TipoHabitacion tipoHabitacion, Integer capacidad, BigDecimal precioPorNoche, Hotel hotel){
        this();//Explicar en la documentacion el porqué de utilizar this.
        this.numeroHabitacion = numeroHabitacion;
        this.tipoHabitacion = tipoHabitacion;
        this.capacidad = capacidad;
        this.precioPorNoche = precioPorNoche;
        this.hotel = hotel;
    }

    //Disponibilidad de la habitacion
    public boolean estaDisponible(LocalDate fechaEntrada, LocalDate fechaSalida){
         if(!activa || estado != EstadoHabitacion.DISPONIBLE){
            return false;
         }

         //Que las fechas no se solapen
         for (Reserva reserva : reservas) {
            if(reserva.getEstadoReserva() == Reserva.EstadoReserva.CONFIRMADA){
                if(!(fechaSalida.isBefore(reserva.getFechaSalida())||
                fechaSalida.isAfter(reserva.getFechaSalida()))) {
                    return false;
                }
            }
         }
         return true;
    }
    //cambiar el estado de la habitacion 
    public void cambiarEstado (EstadoHabitacion nuevoEstado){
        this.estado = nuevoEstado;
    }


    // calcular el precio 
    public BigDecimal calcularPrecioEstancia(int noches){
        return precioPorNoche.multiply(BigDecimal.valueOf(noches));
    }

    //activar habitacion
    public void activar(){
        this.activa = true;
        if(this.estado == EstadoHabitacion.MANTENIMIENTO){
            this.estado = EstadoHabitacion.DISPONIBLE;
        }
    }
    //desactivar habitacion 
    public void desactivar(){
        this.activa = false;
        this.estado = EstadoHabitacion.MANTENIMIENTO;
    }



    //Gettrs y settrs
    public Integer getId(){
        return id;

    }

    public void setId(Integer id){
        this.id = id;
    }

    public String getNumeroHabitacion(){
        return numeroHabitacion;
    }

    public void setNumeroHabitacion(String numeroHabitacion){
        this.numeroHabitacion = numeroHabitacion;
    }

    public TipoHabitacion getTipoHabitacion(){
        return tipoHabitacion;
    }

    public void setTipoHabitacion(TipoHabitacion tipoHabitacion){
        this.tipoHabitacion = tipoHabitacion;
    }

    public Integer getCapacidad(){
        return capacidad;
    }

    public void setCapacidad (Integer capacidad){
        this.capacidad = capacidad;
    }

    public BigDecimal getPrecioPorNoche(){
        return precioPorNoche;
    }
    public void setPrecioPorNoche(BigDecimal precioPorNoche){
        this.precioPorNoche = precioPorNoche;
    }

    public String getDescripcion(){
        return descripcion;
    }

    public void setDescripcion(String descripcion){
        this.descripcion = descripcion;
    }

    public Boolean getTieneWifi(){
        return tieneWifi;
    }

    public void setTieneWifi(Boolean tieneWifi){
        this.tieneWifi = tieneWifi;
    }

    public Boolean getTieneAireAcondicionado(){
        return tieneAireAcondicionado;
    }

    public void setTieneAireAcondicionado(Boolean tieneAireAcondicionado){
        this.tieneAireAcondicionado = tieneAireAcondicionado;
    }

    public Boolean getTieneCalefaccion(){
        return tieneCalefaccion;
    }

    public void setTieneCalefaccion(Boolean tieneCalefaccion){
        this.tieneCalefaccion = tieneCalefaccion;
    }

    public Boolean getTieneBalcon(){
        return tieneBalcon;
    }

    public void setTieneBalcon(Boolean tieneBalcon){
        this.tieneBalcon = tieneBalcon;
    }

    public EstadoHabitacion getEstado(){
        return estado;
    }

    public void setEstado(EstadoHabitacion estado){
        this.estado = estado;
    }

    public Boolean getActiva(){
        return activa;
    }

    public void setActiva(Boolean activa){
        this.activa = activa;
    }

    public Hotel getHotel(){
        return hotel;
    }

    public void setHotel(Hotel hotel){
        this.hotel = hotel;
    }
     
    public List<Reserva> getReservas(){
        return reservas;
    }

    public void setReservas(List<Reserva> reservas){
        this.reservas = reservas;
    }

@Override
public String toString() {
    return "Habitacion{" +
            "id=" + id +
            ", numeroHabitacion='" + numeroHabitacion + '\'' +
            ", capacidad=" + capacidad +
            ", precioPorNoche=" + precioPorNoche +
            ", estado=" + estado +
            ", activa=" + activa +
            '}';
}


}

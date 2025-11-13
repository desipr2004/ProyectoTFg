package com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.modelo;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "hotel")
public class Hotel {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String nombre;

    @Column(nullable = false)
    private String direccion;

    @Column(nullable= false)
    private String ciudad;

    private String telefono;
    private String email;
    private String descripcion;

    private Integer estrellas;

    @Enumerated(EnumType.STRING)
    @Column(name="tipo_hotel", nullable = false)
    private TipoHotel tipoHotel = TipoHotel.HOTEL_PEQUENO;

 
    @Column(name = "Capacidad_total")
    private Integer capacidadTotal;

    @Column(name= "desayuno", nullable = false)
    private Boolean desayunoIncluido = true;

    @Column(name = "parking", nullable = false)
    private Boolean tieneParking = false;

    @Column(name= "mascotas", nullable = false)
    private Boolean permiteMascotas = false;


    @Column(nullable = false)
    private Boolean activo = true;

    //Relacion con habitaciones, un htel tiene muchas habitaciones
    @JsonManagedReference("hotel-habitaciones")
    @OneToMany(mappedBy = "hotel", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Habitacion> habitaciones ;

    //Enum para tipos de hotel 
    public enum TipoHotel{
        HOTEL_PEQUENO, HOSTAL, PENSION, CASA_RURAL, APARTAMENTOS
    }

    
    public Hotel(){
        this.activo = true;
        this.desayunoIncluido = true;
        this.tieneParking = false;
        this.permiteMascotas = false;
        this.tipoHotel = TipoHotel.HOTEL_PEQUENO;

    }

    public Hotel(String nombre, String direccion, String ciudad){
        this();
        this.nombre = nombre;
        this.direccion = direccion;
        this.ciudad = ciudad;
    }

    public int getId(){
        return id;
    }

    public void setId(int id){
        this.id = id;
    }

    public String getNombre(){
        return nombre;
    }

    public void setNombre(String nombre){
        this.nombre = nombre;
    }

    public String getDireccion(){
        return direccion;
    }

    public void setDireccion(String direccion){
        this.direccion = direccion;
    }

    public String getCiudad(){
        return ciudad;
    }

    public void setCiudad(String ciudad){
        this.ciudad = ciudad;
    }

    public String getTelefono(){
        return telefono;
    }

    public void setTelefono(String telefono){
        this.telefono = telefono;
    }

    public String getEmail(){
        return email;
    }

    public void setEmail(String email){
        this.email = email;
    }

    public String getDescripcion (){
        return descripcion;
    }

    public void setDescripcion(String descripcion){
        this.descripcion = descripcion;
    }

    public Integer getEstrellas(){
        return estrellas;
    }

    public void setEstrellas(Integer estrellas){
        this.estrellas = estrellas;
    }

    public TipoHotel getTipoHotel(){
        return tipoHotel;
    }

    public void setTipoHotel(TipoHotel tipoHotel){
        this.tipoHotel = tipoHotel;
    }

    public Integer getCapacidadTotal(){
        return capacidadTotal;
    }

    public void setCapacidadTotal(Integer capacidadTotal){
        this.capacidadTotal = capacidadTotal;
    }

    public Boolean getDesayunoIncluido(){
        return desayunoIncluido;
    }

    public void setDesayunoIncluido(Boolean desayunoIncluido){
        this.desayunoIncluido = desayunoIncluido;
    }

    public Boolean getTieneParking(){
        return tieneParking;
    }

    public void setTieneParking(Boolean tieneParking){
        this.tieneParking = tieneParking;
    }

    public Boolean getPermiteMascotas(){
        return permiteMascotas;
    }

    public void setPermiteMascotas(Boolean permiteMascotas){
        this.permiteMascotas = permiteMascotas;
    }

   

    public Boolean getActivo (){
        return activo;
    }

    public void setActivo(Boolean activo){
        this.activo = activo;
    }

    public List<Habitacion> getHabitaciones(){
        return habitaciones;
    }

    public void setHabitaciones(List<Habitacion>habitaciones){
        this.habitaciones = habitaciones;
    }



    public void activar(){
        this.activo = true;
    }

    public void desactivar(){
        this.activo = false;
    }

    public boolean disponibilidad(){
        return this.activo && this.habitaciones != null && !this.habitaciones.isEmpty();
    }

    public int getNumeroHabitacion(){
        if(this.habitaciones != null){
            return this.habitaciones.size();
        }else{
            return 0;
        }
    }


}

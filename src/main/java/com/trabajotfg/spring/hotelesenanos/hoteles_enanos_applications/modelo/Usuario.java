package com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.modelo;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "usuarios")
public class Usuario {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

   @Column(nullable = false)
    private String nombre;

   @Column(nullable = false)
    private String apellido ;

 
   @Column(nullable = false, unique= true)
    private String email;

    @Column(nullable = false)
    private String contrasenna;


    private String telefono;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UsuarioTipo tipoUsuario = UsuarioTipo.CLIENT;

    //Enum de tipos de usuarios posibles 
    public enum UsuarioTipo{
      CLIENT, ADMIN
    }

    @Column(nullable = false)
    private Boolean activo = true;


   //Relacion con las reservas(Un usuario puede tener muchas reservas) 
   //cascade.all expande todas las operaciones del Usuario a sus Reservas 
   //FetchType: carga las reservas solo cuando sea necesario
   //jsonmanagedrefernce lo que hace es gestinar la serializacion evitando referencias de manera circular
    @JsonManagedReference("usuario-reservas")
    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Reserva> reservas;


     public Usuario(){}
     
    public Usuario(String nombre, String apellido, String email, String contrasenna){
      this.nombre = nombre;
      this.apellido = apellido;
      this.email = email;
      this.contrasenna = contrasenna;
    }

    public boolean iniciarSesion(String email, String contrasenna){
      return this.email.equals(email) && this.contrasenna.equals(contrasenna) && this.activo;
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



     public String getApellido(){
        return apellido;
     }
     public void setApellido(String apellido){
        this.apellido = apellido;
     }



     public String getEmail (){
        return email;
     }
     public void setEmail(String email){
        this.email = email;
     }


     
     public String getContrasenna (){
        return contrasenna;
     }
     public void setContrasenna(String contrasenna){
        this.contrasenna = contrasenna;
     }

    public String getTelefono (){
        return telefono;
     }
     public void setTelefono(String telefono){
        this.telefono = telefono;
     }

         public UsuarioTipo getTipoUsuario (){
        return tipoUsuario;
     }
     public void setTipoUsuario(UsuarioTipo tipoUsuario){
        this.tipoUsuario = tipoUsuario;
     }

         public Boolean getActivo (){
        return activo;
     }
     public void setActivo(Boolean activo){
        this.activo = activo;
     }

     public List<Reserva> getReservas(){
      return reservas;
     }

     public void setReservas(List<Reserva> reservas){
      this.reservas = reservas;
     }
     public void activar(){
      this.activo = true;
     }

     public void desactivar(){
      this.activo = false;
     }

}

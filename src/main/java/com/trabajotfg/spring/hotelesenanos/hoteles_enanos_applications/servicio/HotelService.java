package com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.servicio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.repositorio.RepoHotel;
import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.modelo.Hotel;
/**
 * Lógica de negocio relacionada con hoteles.
 * Aquí solo se delega en el repositorio, pero centraliza futuras reglas.
 */
@Service
public class HotelService {
    

    @Autowired
    private RepoHotel hotelRepo;

    // Devuelve todo el catálogo de hoteles
    public List<Hotel> listarHoteles(){
        return hotelRepo.findAll();
    }

    // Busca un hotel puntual por ID
    public Optional<Hotel> buscarHotelId(Integer id){
        return hotelRepo.findById(id);
    }

    // Crea o actualiza un hotel (Spring determina la operación)
    public Hotel crearActualizarHotel(Hotel hotel){
        return hotelRepo.save(hotel);
    }

    // Devuelve solo los hoteles activos
    public List<Hotel> hotelesActivos(){
        return hotelRepo.findByActivoTrue();
    }

    // Filtrado por ciudad (lo usa el frontend para búsquedas)
    public List<Hotel> buscarPorCiudad(String ciudad){
        return hotelRepo.findByCiudad(ciudad);
    }

    // Búsqueda por nombre exacto/ignorando mayúsculas
    public List<Hotel> buscarPorNombre(String nombre){
        return hotelRepo.findByNombreIgnoreCase(nombre);
    }

    // Variante que devuelve solo activos
    public List<Hotel> buscarNombreActivoo(String nombre){
        return hotelRepo.findByNombreAndActivoTrue(nombre);
    }

    // List<Hotel> findByEstrellas(Integer estrellas);
    public List<Hotel> buscarPorEstrellas(Integer estrellas){
        return hotelRepo.findByEstrellas(estrellas);
    }

    //    boolean existsByNombreAndCiudad(String nombre, String ciudad);
    public boolean existeHotelNombreCiudad(String nombre, String ciudad){
        return hotelRepo.existsByNombreAndCiudad(nombre, ciudad);
    }

    // Elimina definitivamente un hotel
    public void eliminarHotel(Integer id){
        hotelRepo.deleteById(id);
    }

}

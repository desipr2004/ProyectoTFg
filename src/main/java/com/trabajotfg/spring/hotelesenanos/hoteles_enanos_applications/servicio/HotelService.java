package com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.servicio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.repositorio.RepoHotel;
import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.modelo.Hotel;

@Service
public class HotelService {
    

    @Autowired
    private RepoHotel hotelRepo;

    // Devuelve todos los hoteles
    public List<Hotel> listarHoteles(){
        return hotelRepo.findAll();
    }

    // Busca un hotel  por su id
    public Optional<Hotel> buscarHotelId(Integer id){
        return hotelRepo.findById(id);
    }

    // Crea o actualiza un hotel spring ya se encarga de ello
    public Hotel crearActualizarHotel(Hotel hotel){
        return hotelRepo.save(hotel);
    }

    // Devuelve solo los hoteles activos
    public List<Hotel> hotelesActivos(){
        return hotelRepo.findByActivoTrue();
    }

    // Filtrado por ciudad exacta
    public List<Hotel> buscarPorCiudad(String ciudad){
        return hotelRepo.findByCiudad(ciudad);
    }

    // Búsqueda por nombre exacto/ignorando mayúsculas
    public List<Hotel> buscarPorNombre(String nombre){
        return hotelRepo.findByNombreIgnoreCase(nombre);
    }

    // Variante que devuelve solo los hoteles activos
    public List<Hotel> buscarNombreActivoo(String nombre){
        return hotelRepo.findByNombreAndActivoTrue(nombre);
    }

    // Lista los hoteles por estrellas
    public List<Hotel> buscarPorEstrellas(Integer estrellas){
        return hotelRepo.findByEstrellas(estrellas);
    }

    //  Comprueba si ya existe un hotel con el mismo nombre en la misma ciudad
    public boolean existeHotelNombreCiudad(String nombre, String ciudad){
        return hotelRepo.existsByNombreAndCiudad(nombre, ciudad);
    }

    // Elimina definitivamente un hotel
    public void eliminarHotel(Integer id){
        hotelRepo.deleteById(id);
    }

}

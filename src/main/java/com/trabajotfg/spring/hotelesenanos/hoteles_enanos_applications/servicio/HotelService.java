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

    public List<Hotel> listarHoteles(){
        return hotelRepo.findAll();
    }

    public Optional<Hotel> buscarHotelId(Integer id){
        return hotelRepo.findById(id);
    }

    public Hotel crearActualizarHotel(Hotel hotel){
        return hotelRepo.save(hotel);
    }

    public List<Hotel> hotelesActivos(){
        return hotelRepo.findByActivoTrue();
    }

    public List<Hotel> buscarPorCiudad(String ciudad){
        return hotelRepo.findByCiudad(ciudad);
    }

    public List<Hotel> buscarPorNombre(String nombre){
        return hotelRepo.findByNombreIgnoreCase(nombre);
    }

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

    public void eliminarHotel(Integer id){
        hotelRepo.deleteById(id);
    }

}

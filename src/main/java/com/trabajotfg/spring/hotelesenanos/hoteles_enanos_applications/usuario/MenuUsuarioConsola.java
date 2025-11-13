package com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.usuario;

import java.util.List;
import java.util.Optional;
import java.util.Scanner;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.stereotype.Component;

import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.HotelesEnanosApplicationsApplication;
import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.modelo.Reserva;
import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.modelo.Usuario;
import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.servicio.ReservaService;
import com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.servicio.UsuarioService;

@Component
public class MenuUsuarioConsola {

    private final UsuarioService usuarioService;
    private final ReservaService reservaService;

    @Autowired
    public MenuUsuarioConsola(UsuarioService usuarioService, ReservaService reservaService){
        this.usuarioService = usuarioService;
        this.reservaService = reservaService;
    }

    public void iniciar(){
        Scanner scanner = new Scanner(System.in);
        System.out.println("===== Acceso de usuario =====");
        System.out.print("Correo: ");
        String correo = scanner.nextLine();
        System.out.print("Contrasena: ");
        String contrasenna = scanner.nextLine();

        Usuario usuario = autenticarUsuario(correo, contrasenna);
        if(usuario == null){
            System.out.println("No se pudo iniciar la sesion .");
            return;
        }

        if(usuario.getTipoUsuario() == Usuario.UsuarioTipo.ADMIN){
            menuAdmin(scanner, usuario);
        }else{
            menuCliente(usuario);
        }
    }

    private Usuario autenticarUsuario(String email, String contrasenna){
        try{
            return usuarioService.iniciarSesion(email, contrasenna);
        }catch(Exception e){
            System.out.println("Error al iniciar sesion: " + e.getMessage());
            return null;
        }
    }

    private void menuCliente(Usuario usuario){
        System.out.println("\n===== Reservas del cliente =====");
        List<Reserva> reservas = reservaService.buscarReservasPorUsuarioId(usuario.getId());
        mostrarReservas(reservas);
    }

    private void menuAdmin(Scanner scanner, Usuario usuario){
        boolean continuar = true;
        while(continuar){
            System.out.println("\n===== Menu de administrador =====");
            System.out.println("1. Ver todas las reservas");
            System.out.println("2. Buscar reserva por id");
            System.out.println("3. Buscar reservas por correo");
            System.out.println("4. Ver mis reservas");
            System.out.println("0. Salir");
            System.out.print("Selecciona una opcion: ");
            String opcion = scanner.nextLine();

            if("1".equals(opcion)){
                List<Reserva> reservas = reservaService.listarReservas();
                mostrarReservas(reservas);
            }else if("2".equals(opcion)){
                buscarReservaPorId(scanner);
            }else if("3".equals(opcion)){
                buscarReservasPorCorreo(scanner);
            }else if("4".equals(opcion)){
                menuCliente(usuario);
            }else if("0".equals(opcion)){
                continuar = false;
            }else{
                System.out.println("Opcion no valida.");
            }
        }
    }

    private void buscarReservaPorId(Scanner scanner){
        System.out.print("Introduce el id de la reserva: ");
        String texto = scanner.nextLine();
        try{
            int id = Integer.parseInt(texto);
            Optional<Reserva> reserva = reservaService.buscarPorId(id);
            if(reserva.isPresent()){
                mostrarReservaDetallada(reserva.get());
            }else{
                System.out.println("No existe una reserva con ese id.");
            }
        }catch(NumberFormatException e){
            System.out.println("El id debe ser un numero entero.");
        }
    }

    private void buscarReservasPorCorreo(Scanner scanner){
        System.out.print("Introduce el correo del usuario: ");
        String correo = scanner.nextLine();
        List<Reserva> reservas = reservaService.buscarReservasPorCorreo(correo);
        if(reservas.isEmpty()){
            System.out.println("No hay reservas para ese correo.");
        }else{
            mostrarReservas(reservas);
        }
    }

    private void mostrarReservas(List<Reserva> reservas){
        if(reservas == null || reservas.isEmpty()){
            System.out.println("No hay reservas para mostrar.");
            return;
        }

        for(int i = 0; i < reservas.size(); i++){
            Reserva reserva = reservas.get(i);
            mostrarResumen(reserva);
        }
    }

    private void mostrarResumen(Reserva reserva){
        System.out.println("------------------------------");
        System.out.println("Reserva: " + reserva.getId());
        if(reserva.getUsuario() != null){
            System.out.println("Usuario: " + reserva.getUsuario().getEmail());
        }
        System.out.println("Estado: " + reserva.getEstadoReserva());
        System.out.println("Entrada: " + reserva.getFechaEntrada());
        System.out.println("Salida: " + reserva.getFechaSalida());
    }

    private void mostrarReservaDetallada(Reserva reserva){
        mostrarResumen(reserva);
        System.out.println("Personas: " + reserva.getNumeroPersonas());
        System.out.println("Todo incluido: " + reserva.gettodoIncluido());
        System.out.println("Precio total: " + reserva.getPrecioTotal());
        if(reserva.getObservaciones() != null){
            System.out.println("Observaciones: " + reserva.getObservaciones());
        }
        if(reserva.getMotivoCancelacion() != null){
            System.out.println("Motivo de cancelacion: " + reserva.getMotivoCancelacion());
        }
    }

    //Este metodo main arranca el contexto de Spring y recupera esta clase ya configurada.
    //De esta forma podemos lanzar solo el menu de consola sin escribir configuraciones extra.
    public static void main(String[] args){
        ConfigurableApplicationContext context = SpringApplication.run(HotelesEnanosApplicationsApplication.class, args);
        MenuUsuarioConsola menu = context.getBean(MenuUsuarioConsola.class);
        menu.iniciar();
        context.close();
    }
}

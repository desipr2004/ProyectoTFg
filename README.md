# 📑 Índice

1. [Introducción y Objetivos](#1-introducción-y-objetivos)
2. [Análisis y Diseño](#2-análisis-y-diseño)
   - 2.1. Especificaciones de Requisitos
   - 2.2. Modelo de Datos
   - 2.3. Arquitectura del Sistema
   - 2.4. Diagramas UML
   - 2.5. Infografía del Sistema
   - 2.6. Infografía del Proceso
3. [Tecnologías Utilizadas](#3-tecnologías-utilizadas)
   - 3.1. Backend
   - 3.2. Base de Datos
   - 3.3. Frontend
   - 3.4. Herramientas
4. [Implementación del Código](#4-implementación-del-código)
   - 4.1. Estructura del Proyecto
   - 4.2. Configuración del Sistema
   - 4.3. Explicación de las Clases
   - 4.4. Acceso a Datos
   - 4.5. Servicios
   - 4.6. REST Controllers
   - 4.7. Seguridad
5. [Base de Datos](#5-base-de-datos)
   - 5.1. Diseño de la Base de Datos
   - 5.2. Relaciones entre Entidades
6. [API REST](#6-api-rest)
   - 6.1. Endpoints Disponibles
   - 6.2. Manejo de Errores
7. [Frontend Web](#7-frontend-web)
   - 7.1. Estructura de la Interfaz
   - 7.2. Integración con Backend
   - 7.3. Funcionalidades Principales
8. [Pruebas](#8-pruebas)
   - 8.1. Pruebas Unitarias
   - 8.2. Pruebas de Integración
   - 8.3. Pruebas en el Frontend
   - 8.4. Guía de flujos manuales (Postman + Frontend)
9. [Instalación](#9-instalación)
   - 9.1. Requisitos del Sistema
   - 9.2. Configuración del Entorno
   - 9.3. Instalación Paso a Paso
   - 9.4. Despliegue en Producción

---


# 1. Introducción y Objetivos

## 1.1. Contexto del Proyecto
La gestión hotelera es un sector en constante evolución, donde la digitalización y la automatización de procesos resultan fundamentales para mejorar la experiencia del usuario y la eficiencia operativa. Este proyecto surge como respuesta a la necesidad de contar con una plataforma moderna, accesible y segura para la gestión de hoteles, habitaciones y reservas, orientada tanto a administradores como a clientes.

## 1.2. Objetivos Generales
- Desarrollar una aplicación multiplataforma que permita la gestión integral de hoteles, habitaciones y reservas.
- Facilitar la interacción entre usuarios y el sistema mediante una interfaz intuitiva y accesible.
- Garantizar la seguridad y privacidad de los datos de los usuarios.
- Implementar una arquitectura escalable y mantenible basada en buenas prácticas de desarrollo de software.

## 1.3. Objetivos Específicos
- Permitir el registro y autenticación de usuarios con diferentes roles (administrador, cliente).
- Ofrecer funcionalidades para la consulta, creación, modificación y eliminación de hoteles, habitaciones y reservas.
- Integrar un sistema de notificaciones para informar a los usuarios sobre el estado de sus reservas.
- Proporcionar documentación clara y detallada para facilitar el despliegue y mantenimiento del sistema.

## 1.4. Público Objetivo
El sistema está dirigido a:
- Administradores de hoteles que requieren una herramienta eficiente para gestionar su establecimiento.
- Clientes que desean reservar habitaciones de forma rápida y segura desde cualquier dispositivo.
- Desarrolladores y técnicos que necesiten mantener o ampliar la plataforma.

## 1.5. Justificación
La digitalización de la gestión hotelera permite optimizar recursos, reducir errores humanos y mejorar la satisfacción del cliente. Este proyecto, al estar basado en tecnologías modernas como Spring Boot y un frontend web responsive construido con HTML, CSS y JavaScript, garantiza una solución robusta, escalable y adaptable a diferentes necesidades.

## 1.6. Alcance del Proyecto
El alcance incluye el desarrollo del backend (API REST), el diseño de la base de datos, la implementación de la lógica de negocio, la integración con un frontend móvil y la documentación completa del sistema. No se incluye el desarrollo de la infraestructura de despliegue en la nube, aunque se proporcionan recomendaciones para ello.


# 2. Análisis y Diseño

## 2.1. Especificaciones de Requisitos
El sistema debe cumplir con los siguientes requisitos funcionales y no funcionales:

### Requisitos Funcionales
1. **Gestión de Usuarios:**
    - Registro de nuevos usuarios con validación de datos.
    - Autenticación mediante usuario y contraseña.
    - Asignación de roles (administrador, cliente).
    - Edición y eliminación de cuentas.
2. **Gestión de Hoteles:**
    - Alta, modificación y baja de hoteles (solo administradores).
    - Consulta de hoteles disponibles.
3. **Gestión de Habitaciones:**
    - Alta, modificación y baja de habitaciones asociadas a un hotel.
    - Consulta de habitaciones disponibles por hotel y fecha.
4. **Gestión de Reservas:**
    - Creación de reservas por parte de los usuarios.
    - Consulta, modificación y cancelación de reservas.
    - Notificación de confirmación/cancelación de reserva.
5. **Seguridad:**
    - Acceso restringido a funcionalidades según el rol del usuario.
    - Cifrado de contraseñas y protección de datos sensibles.

### Requisitos No Funcionales
- **Escalabilidad:** El sistema debe poder adaptarse a un aumento en el número de usuarios y operaciones.
- **Mantenibilidad:** El código debe estar bien documentado y estructurado para facilitar futuras modificaciones.
- **Usabilidad:** La interfaz debe ser intuitiva y accesible para usuarios sin conocimientos técnicos.
- **Portabilidad:** El frontend debe funcionar en dispositivos Android, iOS y web.
- **Rendimiento:** Las operaciones deben ejecutarse en tiempos aceptables, incluso con grandes volúmenes de datos.

## 2.2. Modelo de Datos
El modelo de datos está compuesto por las siguientes entidades principales:

- **Usuario**
   - Atributos: id, nombre, email, contraseña (cifrada), rol, fecha de registro.
   - Ejemplo:
      ```java
      public class Usuario {
            private Long id;
            private String nombre;
            private String email;
            private String password;
            private String rol;
            private LocalDate fechaRegistro;
            // getters y setters
      }
      ```
- **Hotel**
   - Atributos: id, nombre, dirección, ciudad, descripción, número de estrellas.
- **Habitación**
   - Atributos: id, número, tipo, precio, estado, hotel (relación).
- **Reserva**
   - Atributos: id, usuario (relación), habitación (relación), fecha entrada, fecha salida, estado.

Estas entidades se relacionan entre sí para reflejar la lógica del negocio. Por ejemplo, un hotel puede tener muchas habitaciones, y una habitación puede estar asociada a varias reservas en diferentes fechas.

## 2.3. Arquitectura del Sistema
El sistema está basado en una arquitectura multicapa, siguiendo el patrón Modelo-Vista-Controlador (MVC) en el backend. Las capas principales son:

- **Capa de Presentación:**
   - Frontend web responsive construido con HTML, CSS y JavaScript, encargado de la interacción con el usuario.
- **Capa de Controladores (API REST):**
   - Recibe las peticiones HTTP y las dirige a los servicios correspondientes.
- **Capa de Servicios:**
   - Contiene la lógica de negocio y las reglas del sistema.
- **Capa de Acceso a Datos:**
   - Gestiona la persistencia y recuperación de datos en la base de datos mediante repositorios.
- **Base de Datos:**
   - Almacena la información estructurada del sistema.

El frontend y el backend se comunican a través de una API REST, utilizando el formato JSON para el intercambio de datos.

## 2.4. Diagramas UML
Para el diseño del sistema se han elaborado los siguientes diagramas (no incluidos aquí para simplificar):
- Diagrama de casos de uso: muestra las interacciones principales entre los actores y el sistema.
- Diagrama de clases: representa la estructura de las entidades y sus relaciones.
- Diagrama de secuencia: ilustra el flujo de mensajes entre objetos durante la ejecución de un caso de uso.

## 2.5. Infografía del Sistema
El sistema se compone de los siguientes elementos:
- **Backend:** API REST desarrollada en Java con Spring Boot.
- **Base de Datos:** MySQL, gestionando la persistencia de la información.
- **Frontend:** Interfaz web moderna creada con HTML, CSS y JavaScript.

## 2.6. Infografía del Proceso
El proceso típico de uso es el siguiente:
1. El usuario accede a la interfaz web responsive y se autentica.
2. Consulta los hoteles y habitaciones disponibles.
3. Realiza una reserva seleccionando fechas y habitación.
4. Recibe confirmación y puede gestionar sus reservas desde la app.
5. El administrador puede gestionar hoteles, habitaciones y ver estadísticas de uso.


# 3. Tecnologías Utilizadas

En este apartado se describen las tecnologías y herramientas empleadas en el desarrollo del sistema, justificando su elección y explicando su papel dentro del proyecto.

## 3.1. Backend
- **Java 17**: Lenguaje de programación robusto, orientado a objetos y ampliamente utilizado en el desarrollo empresarial.
- **Spring Boot**: Framework que simplifica la creación de aplicaciones Java, permitiendo una configuración mínima y facilitando la creación de APIs REST seguras y escalables.
- **Maven**: Herramienta de gestión de proyectos y dependencias, utilizada para compilar, testear y empaquetar la aplicación.

### Ejemplo de configuración de dependencias en `pom.xml`:
```xml
<dependency>
   <groupId>org.springframework.boot</groupId>
   <artifactId>spring-boot-starter-web</artifactId>
</dependency>
<dependency>
   <groupId>org.springframework.boot</groupId>
   <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
<dependency>
   <groupId>mysql</groupId>
   <artifactId>mysql-connector-java</artifactId>
</dependency>
```

## 3.2. Base de Datos
- **MySQL**: Sistema de gestión de bases de datos relacional, elegido por su rendimiento, fiabilidad y compatibilidad con Spring Data JPA.
- La configuración de la conexión se realiza en el archivo `application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/hoteles_enanos
spring.datasource.username=usuario
spring.datasource.password=contraseña
spring.jpa.hibernate.ddl-auto=update
```

## 3.3. Frontend
- **HTML5 y CSS3**: La carpeta `Frontend/` contiene las vistas `index.html`, `habitaciones.html` y `reserva.html`, maquetadas con un estilo glassmorphism y tipografías Urbanist/Aboreto para mantener una identidad visual coherente.
- **JavaScript (ES6)**: Los archivos `habitaciones.js` y `reserva.js` consumen la API REST con `fetch`, calculan importes en tiempo real, gestionan los parámetros de la URL y controlan la navegación entre pantallas.
- **Diseño responsive**: Se ha cuidado que todos los componentes puedan ejecutarse desde escritorio o móvil sin cambios adicionales, lo que permite exponer el proyecto directamente desde un navegador.

## 3.4. Herramientas
- **Git**: Sistema de control de versiones distribuido, esencial para la gestión colaborativa del código fuente.
- **VS Code / IntelliJ IDEA**: Editores de código avanzados, con soporte para Java, desarrollo web y herramientas de depuración.
- **Postman**: Plataforma para pruebas de APIs, utilizada para validar los endpoints del backend.
- **MySQL Workbench**: Herramienta gráfica para la administración y modelado de bases de datos MySQL.

---


# 4. Implementación del Código

En esta sección se detalla la estructura del proyecto, la configuración del sistema y se explican las principales clases y componentes, acompañados de ejemplos y fragmentos de código.

## 4.1. Estructura del Proyecto
El proyecto sigue una estructura modular, organizada en paquetes según la responsabilidad de cada componente:

- `controlador`: Contiene los controladores REST, responsables de recibir y responder a las peticiones HTTP.
- `modelo`: Incluye las entidades que representan las tablas de la base de datos.
- `repositorio`: Interfaces que gestionan el acceso a los datos mediante Spring Data JPA.
- `servicio`: Implementa la lógica de negocio y las reglas del sistema.
- `Utils`: Clases de utilidad, como cifrado de contraseñas.

### Ejemplo de estructura de carpetas:
```
src/main/java/com/trabajotfg/spring/hotelesenanos/hoteles_enanos_applications/
   controlador/
   modelo/
   repositorio/
   servicio/
   Utils/
```

## 4.2. Configuración del Sistema
La configuración principal se encuentra en el archivo `application.properties`, donde se definen:
- Parámetros de conexión a la base de datos.
- Configuración de JPA/Hibernate.
- Propiedades de seguridad y puertos del servidor.

#### Ejemplo:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/hoteles_enanos
spring.datasource.username=usuario
spring.datasource.password=contraseña
server.port=8080
spring.jpa.show-sql=true
spring.jpa.hibernate.ddl-auto=update
```

## 4.3. Explicación de las Clases

### Entidades (`modelo`)
Representan las tablas de la base de datos. Ejemplo simplificado de la entidad `Hotel`:
```java
@Entity
public class Hotel {
   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Long id;
   private String nombre;
   private String direccion;
   private String ciudad;
   private int estrellas;
   // getters y setters
}
```

### Repositorios (`repositorio`)
Interfaces que extienden `JpaRepository` para operaciones CRUD automáticas:
```java
public interface RepoHotel extends JpaRepository<Hotel, Long> {
   List<Hotel> findByCiudad(String ciudad);
}
```

### Servicios (`servicio`)
Contienen la lógica de negocio. Ejemplo de servicio para hoteles:
```java
@Service
public class HotelService {
   @Autowired
   private RepoHotel repoHotel;

   public List<Hotel> listarHoteles() {
      return repoHotel.findAll();
   }
   // Otros métodos de negocio
}
```

### Controladores (`controlador`)
Exponen los endpoints REST. Ejemplo:
```java
@RestController
@RequestMapping("/api/hoteles")
public class HotelControlador {
   @Autowired
   private HotelService hotelService;

   @GetMapping
   public List<Hotel> getHoteles() {
      return hotelService.listarHoteles();
   }
}
```

### Utils
Clases de utilidad, como el cifrado de contraseñas:
```java
public class Cifrado {
   public static String cifrar(String password) {
      // Lógica de cifrado
   }
}
```



## 4.4. Acceso a Datos

El acceso a datos en este proyecto se basa en el uso de **Spring Data JPA** y repositorios específicos para cada entidad. A continuación se explica cómo se estructura y por qué se han tomado ciertas decisiones, usando ejemplos reales del código:

### Repositorios y Métodos Especiales
Cada entidad principal tiene su propio repositorio, que extiende `JpaRepository`. Esto proporciona automáticamente operaciones CRUD básicas, pero además se han definido métodos personalizados para cubrir necesidades concretas del dominio:

#### Ejemplo real: RepoHabitacion
```java
public interface RepoHabitacion extends JpaRepository<Habitacion, Integer> {
   // Buscar habitaciones por hotel
   List<Habitacion> findByHotel(Hotel hotel);

   // Buscar habitaciones activas
   List<Habitacion> findByActivaTrue();

   // Buscar habitaciones por estado
   List<Habitacion> findByEstado(Habitacion.EstadoHabitacion estado);

   // Buscar por tipo de habitación
   List<Habitacion> findByTipoHabitacion(Habitacion.TipoHabitacion tipoHabitacion);

   // Buscar por capacidad
   List<Habitacion> findByCapacidad(Integer capacidad);

   // Buscar por rango de precio
   List<Habitacion> findByPrecioPorNocheBetween(BigDecimal precioMin, BigDecimal precioMax);

   // Buscar por estado y hotel
   List<Habitacion> findByEstadoAndHotel(Habitacion.EstadoHabitacion estado, Hotel hotel);
}
```
**Motivo:** Estos métodos permiten filtrar habitaciones según criterios habituales en la gestión hotelera, como disponibilidad, tipo, precio o estado. Se usa la convención de nombres de Spring Data para generar automáticamente las consultas SQL, lo que mejora la legibilidad y reduce errores.

#### Ejemplo real: RepoReserva
```java
public interface RepoReserva extends JpaRepository<Reserva, Integer> {
   // Buscar reservas por usuario
   List<Reserva> findByUsuario(Usuario usuario);

   // Buscar reservas por habitación
   List<Reserva> findByHabitacion(Habitacion habitacion);

   // Buscar por estado
   List<Reserva> findByEstadoReserva(Reserva.EstadoReserva estadoReserva);

   // Buscar reservas por fecha de entrada
   List<Reserva> findByFechaEntrada(LocalDate fechaEntrada);

   // Buscar reservas entre fechas
   List<Reserva> findByFechaEntradaBetween(LocalDate fechaInicio, LocalDate fechaFin);

   // Buscar reservas que se superponen con un rango dado
   @Query("SELECT r FROM Reserva r WHERE r.habitacion = :habitacion AND r.fechaEntrada < :fechaSalida AND r.fechaSalida > :fechaEntrada")
   List<Reserva> findReservasSuperpuestas(@Param("habitacion") Habitacion habitacion, @Param("fechaEntrada") LocalDate fechaEntrada, @Param("fechaSalida") LocalDate fechaSalida);
}
```
**Motivo:** El método `findReservasSuperpuestas` es clave para evitar solapamientos de reservas en una misma habitación, garantizando la integridad de las reservas. Se utiliza `@Query` porque la lógica de solapamiento no puede resolverse solo con la convención de nombres.

#### Ejemplo real: RepoHotel
```java
public interface RepoHotel extends JpaRepository<Hotel, Integer> {
   List<Hotel> findByNombre(String nombre);
   List<Hotel> findByNombreContaining(String nombre);
   List<Hotel> findByCiudad(String ciudad);
   List<Hotel> findByActivoTrue();
   List<Hotel> findByNombreIgnoreCase(String nombre);
   List<Hotel> findByNombreAndActivoTrue(String nombre);
   List<Hotel> findByEstrellas(Integer estrellas);
   boolean existsByNombreAndCiudad(String nombre, String ciudad);
}
```
**Motivo:** Permite búsquedas flexibles y comprobaciones de unicidad, por ejemplo, para evitar duplicados de hoteles en la misma ciudad.

#### Ejemplo real: RepoUsuario
```java
public interface RepoUsuario extends JpaRepository<Usuario, Integer> {
   List<Usuario> findByNombreContaining(String nombre);
   List<Usuario> findByActivoTrue();
   List<Usuario> findByTipoUsuario(Usuario.UsuarioTipo tipoUsuario);
   Optional<Usuario> findByEmail(String email);
   boolean existsByEmail(String email);
}
```
**Motivo:** Facilita la gestión de usuarios activos, búsquedas por nombre parcial y comprobaciones de email único para el registro.

### Relaciones y Consistencia
Las entidades usan anotaciones como `@ManyToOne`, `@OneToMany` y `@JoinColumn` para definir relaciones. Por ejemplo, en `Habitacion`:
```java
@ManyToOne
@JoinColumn(name="hotel_id", nullable = false)
private Hotel hotel;
```
Esto permite que cada habitación esté asociada a un hotel concreto y que JPA gestione automáticamente las claves foráneas.

### Consultas Avanzadas y Validaciones
El uso de métodos como `findReservasSuperpuestas` en `RepoReserva` permite validar la disponibilidad real de una habitación antes de confirmar una reserva, evitando solapamientos y errores de negocio.

### Buenas Prácticas Aplicadas
- Se separa la lógica de acceso a datos (repositorios) de la lógica de negocio (servicios).
- Se documentan los métodos personalizados para facilitar el mantenimiento.
- Se aprovecha la validación automática de JPA y las anotaciones de las entidades para garantizar la integridad de los datos.

En resumen, el acceso a datos en este proyecto está diseñado para ser robusto, seguro y eficiente, utilizando las capacidades de Spring Data JPA y adaptando los métodos a las necesidades reales del dominio hotelero.


## 4.5. Servicios

La capa de servicios es fundamental en la arquitectura del proyecto, ya que centraliza la lógica de negocio y actúa como intermediaria entre los controladores (API REST) y los repositorios (acceso a datos). Cada entidad principal tiene su propio servicio, que se encarga de validar, transformar y coordinar las operaciones necesarias.

### Características principales de los servicios
- **Centralización de la lógica de negocio:** Todas las reglas y validaciones importantes se implementan aquí, evitando duplicidad en los controladores.
- **Reutilización:** Los servicios pueden ser utilizados por diferentes controladores o incluso por otros servicios.
- **Facilidad de testeo:** Permite realizar pruebas unitarias sobre la lógica de negocio sin depender de la capa web.

### Ejemplo real: HabitacionService
```java
@Service
public class HabitacionService {
   @Autowired
   private RepoHabitacion habitacionRepo;

   public List<Habitacion> listarHabitaciones(){
      return habitacionRepo.findAll();
   }

   public Optional<Habitacion> buscarPorId(Integer id){
      return habitacionRepo.findById(id);
   }

   public Habitacion crearActualizarHabitacion(Habitacion habitacion){
      return habitacionRepo.save(habitacion);
   }

   public void eliminarHabitacion(Integer id){
      habitacionRepo.deleteById(id);
   }

   // Métodos de filtrado y búsqueda avanzada
   public List<Habitacion> habitacionActivo(){
      return habitacionRepo.findByActivaTrue();
   }
   public List<Habitacion> habitacionPorHotel(Hotel hotel){
      return habitacionRepo.findByHotel(hotel);
   }
   public List<Habitacion> buscarPorEstado(Habitacion.EstadoHabitacion estado){
      return habitacionRepo.findByEstado(estado);
   }
   // ...otros métodos específicos
}
```
**Motivo:** Se encapsulan todas las operaciones sobre habitaciones, permitiendo que el controlador solo se preocupe de recibir y devolver datos.

### Ejemplo real: UsuarioService
```java
@Service
public class UsuarioService {
   @Autowired
   private RepoUsuario repoUsuario;

   public Usuario crerUsuario(Usuario usuario) throws Exception{
      String contrasenna = usuario.getContrasenna();
      String contrasennaSegura = Cifrado.cifrarPassword(contrasenna);
      usuario.setContrasenna(contrasennaSegura);
      if(usuario.getActivo()== null){ usuario.setActivo(true); }
      if(usuario.getTipoUsuario() == null){ usuario.setTipoUsuario(Usuario.UsuarioTipo.CLIENT); }
      return repoUsuario.save(usuario);
   }
   // ...otros métodos de registro, login, actualización, activación/desactivación, etc.
}
```
**Motivo:** Aquí se gestiona el cifrado de contraseñas, la activación por defecto y la asignación de roles, asegurando la seguridad y coherencia de los datos.

### Ejemplo real: ReservaService
```java
@Service
public class ReservaService {
   @Autowired
   private RepoReserva reservaRepo ;

   public Reserva crearReserva(Reserva reserva){
      if (reserva.getEstadoReserva() == null){
         reserva.setEstadoReserva(Reserva.EstadoReserva.PENDIETE);
      }
      return reservaRepo.save(reserva);
   }
   // ...otros métodos de gestión de reservas
}
```
**Motivo:** Se asegura que toda reserva creada tenga un estado inicial coherente y se centraliza la lógica de creación y actualización.

### Buenas prácticas aplicadas
- Validar y transformar los datos antes de persistirlos.
- Utilizar inyección de dependencias (`@Autowired`) para desacoplar servicios y repositorios.
- Documentar los métodos clave y su propósito.
- Manejar excepciones y errores de negocio en la capa de servicios.

---


## 4.6. REST Controllers

Los controladores REST son la puerta de entrada a la aplicación, gestionando las peticiones HTTP y delegando la lógica de negocio a los servicios. Cada entidad principal tiene su propio controlador, que expone los endpoints necesarios para la gestión completa de los recursos.

### Características principales de los controladores
- **Separación de responsabilidades:** El controlador solo recibe, valida y responde a las peticiones, delegando la lógica al servicio correspondiente.
- **Uso de anotaciones Spring:** Se emplean `@RestController`, `@RequestMapping`, `@GetMapping`, `@PostMapping`, `@PutMapping`, `@DeleteMapping`, etc., para mapear rutas y métodos HTTP.
- **Gestión de errores:** Se devuelve `null` o mensajes de error claros cuando no se encuentra un recurso o hay problemas en la petición.

### Ejemplo real: HotelControlador
```java
@RestController
@RequestMapping("/api/hotel")
public class HotelControlador {
   @Autowired
   private  HotelService hotelService;

   @GetMapping
   public List<Hotel> listarHoteles() {
      return hotelService.listarHoteles();
   }

   @GetMapping("/{id}")
   public Hotel hotelPorId(@RequestParam Integer id) {
      Optional<Hotel> hotel = hotelService.buscarHotelId(id);
      return hotel.orElse(null);
   }

   @PostMapping
   public Hotel crearHotel(@RequestBody Hotel hotel) {
      return hotelService.crearActualizarHotel(hotel);
   }

   @PutMapping("/{id}")
   public Hotel actualizarHotel(@PathVariable Integer id, @RequestBody Hotel hotel) {
      hotel.setId(id);
      return hotelService.crearActualizarHotel(hotel);
   }

   @DeleteMapping("/{id}")
   public void eliminarHotel(@PathVariable Integer id){
      hotelService.eliminarHotel(id);
   }

   @GetMapping("/buscarPorNombre")
   public List<Hotel> buscarPorNombre(@RequestParam String nombre){
      return hotelService.buscarPorNombre(nombre);
   }

   @GetMapping("/hotelActivo")
   public List<Hotel> hotelesActivos() {
      return hotelService.hotelesActivos();
   }
}
```
**Motivo:** Se expone una API REST clara y coherente, permitiendo operaciones CRUD y búsquedas específicas sobre hoteles.

### Ejemplo real: HabitacionControlador
```java
@RestController
@RequestMapping("/api/habitacion")
public class HabitacionControlador {
   @Autowired
   private HabitacionService habitacionService;

   @GetMapping
   public List<Habitacion> listarTodasLasHabitaciones() {
      return habitacionService.listarHabitaciones();
   }

   @GetMapping("/{id}")
   public Habitacion habitacionPorId(@PathVariable Integer id) {
      Optional<Habitacion> habitacion = habitacionService.buscarPorId(id);
      return habitacion.orElse(null);
   }

   @PostMapping
   public Habitacion crearHabitacion(@RequestBody Habitacion habitacion) {
      return habitacionService.crearActualizarHabitacion(habitacion);
   }

   @PutMapping("/{id}")
   public Habitacion actualizarHabitacion(@PathVariable Integer id, @RequestBody Habitacion habitacion) {
      habitacion.setId(id);
      return habitacionService.crearActualizarHabitacion(habitacion);
   }

   @DeleteMapping("/{id}")
   public void eliminarHabitacion(@PathVariable Integer id){
      habitacionService.eliminarHabitacion(id);
   }

   @GetMapping("/activo")
   public List<Habitacion> listarHabitacionesActivas(){
      return habitacionService.habitacionActivo();
   }
}
```
**Motivo:** Permite gestionar habitaciones y filtrar por estado activo, facilitando la administración desde el frontend.

### Ejemplo real: ReservaControlador
```java
@RestController
@RequestMapping("/api/reservas")
public class ReservaControlador {
   @Autowired
   private ReservaService reservaService;

   @GetMapping
   public List<Reserva> reservasPorId() {
      return reservaService.listarReservas();
   }

   @GetMapping("/{id}")
   public Reserva obtenerReservaId(@PathVariable  Integer id) {
      Optional<Reserva> reserva  = reservaService.buscarPorId(id);
      return reserva.orElse(null);
   }

   @PostMapping
   public Reserva crearReserva(@RequestBody Reserva reserva) {
      return reservaService.crearReserva(reserva);
   }

   @PutMapping("/{id}")
   public Reserva actualizarReserva(@PathVariable Integer id, @RequestBody Reserva reserva) {
      reserva.setId(id);
      return reservaService.actualizarReserva(reserva);
   }

   @DeleteMapping("/{id}")
   public void eliminarReserva(@PathVariable Integer id){
      reservaService.eliminarReserva(id);
   }
}
```
**Motivo:** Expone endpoints para la gestión completa de reservas, permitiendo su integración directa con la lógica de negocio.

### Ejemplo real: UsuarioControlador y AuthControlador
Incluyen endpoints para registro, login, gestión y actualización de usuarios, con validaciones y respuestas claras.

### Buenas prácticas aplicadas
- Utilizar rutas RESTful y verbos HTTP adecuados.
- Delegar la lógica de negocio a los servicios.
- Validar los datos de entrada y gestionar errores de forma controlada.
- Documentar los endpoints y su propósito.

En conjunto, los controladores REST de este proyecto están diseñados para ser claros, coherentes y fácilmente mantenibles, facilitando la integración con el frontend y otros sistemas.


## 4.7. Seguridad

La seguridad es un aspecto clave en el proyecto, especialmente en la gestión de usuarios y el acceso a los datos. A continuación se detallan los mecanismos implementados, centrándose en el código real:

### Cifrado de contraseñas
El sistema utiliza la clase `Cifrado` para proteger las contraseñas de los usuarios mediante el algoritmo AES. Las contraseñas nunca se almacenan en texto plano en la base de datos.

**Fragmento real de código:**
```java
public class Cifrado {
   private static final String CLAVE_SECRETA = "ClaveSecreta1234";
   private static final String ALGORITMO = "AES";

   public static String cifrarPassword(String contrasenna) throws Exception {
      // ...cifrado AES y conversión a Base64
   }

   public static String descifrarContrasenna(String contrasennaCifrada) throws Exception {
      // ...descifrado AES
   }

   public static boolean comprobarContrasenna(String contrasennaNormal, String contrasennaCifrada) {
      // ...comparación tras descifrado
   }
}
```
**Motivo:** Así se garantiza que, aunque la base de datos sea comprometida, las contraseñas no sean legibles.

### Validación y autenticación de usuario
En el servicio de usuario (`UsuarioService`) se gestiona el registro, login y validación de credenciales:
```java
public Usuario iniciarSesion(String email, String contrasenna) throws Exception {
   Optional<Usuario> usuario = repoUsuario.findByEmail(email);
   if(!usuario.isPresent()){
      throw new Exception("No hemos encotrado usuario con el email: "+email);
   }
   Usuario usuarioEncontrado = usuario.get();
   if(!Cifrado.comprobarContrasenna(contrasenna, usuarioEncontrado.getContrasenna())){
      throw new Exception("Contraseña incorrecta");
   }
   return usuarioEncontrado;
}
```
**Motivo:** Se comprueba la contraseña cifrada y se lanza una excepción si no coincide, evitando accesos no autorizados.

### Control de roles y activación de usuarios
Cada usuario tiene un rol (`CLIENT` o `ADMIN`) y un estado de activación. Esto permite restringir funcionalidades según el tipo de usuario y desactivar cuentas si es necesario.
```java
@Enumerated(EnumType.STRING)
@Column(nullable = false)
private UsuarioTipo tipoUsuario = UsuarioTipo.CLIENT;

@Column(nullable = false)
private Boolean activo = true;
```
En el servicio se asigna el rol por defecto y se comprueba el estado activo antes de permitir el acceso.

### Endpoints de autenticación
El controlador `AuthControlador` expone los endpoints `/api/auth/registro` y `/api/auth/login`, gestionando el registro y login de usuarios:
```java
@PostMapping("/login")
public Map<String, Object> login(@RequestBody Map<String, String> login) {
   // ...validación de email, contraseña y estado activo
}
```
**Motivo:** Se centraliza la autenticación y se devuelven mensajes claros en caso de error.

### Configuración de seguridad y acceso
En el archivo `application.properties` se configuran parámetros de conexión y JPA, pero la protección de rutas y control de acceso se realiza principalmente a nivel de lógica de negocio y controladores.

### Buenas prácticas aplicadas
- Nunca almacenar contraseñas en texto plano.
- Validar siempre el estado activo del usuario antes de permitir operaciones sensibles.
- Separar la lógica de autenticación y registro en controladores específicos.
- Utilizar roles para diferenciar permisos y accesos.

En resumen, la seguridad en este proyecto se basa en el cifrado robusto de contraseñas, la validación estricta de credenciales y el control de roles y estados de usuario, todo ello implementado y gestionado desde el propio código fuente.



# 5. Base de Datos

La base de datos es el corazón del sistema, donde se almacena toda la información relevante sobre usuarios, hoteles, habitaciones y reservas. Su diseño está pensado para ser comprensible, eficiente y fácil de mantener. A continuación se explica cada entidad, sus atributos y las relaciones entre ellas, con ejemplos y un esquema textual.

## 5.1. Diseño de la Base de Datos

### Entidades principales

#### 1. Usuario
Almacena la información de los usuarios registrados en la aplicación.
- **Atributos principales:**
   - `id`: Identificador único.
   - `nombre`, `apellido`, `email` (único), `contrasenna` (cifrada), `telefono`.
   - `tipoUsuario`: Rol del usuario (CLIENT o ADMIN).
   - `activo`: Si la cuenta está activa o no.
   - `reservas`: Lista de reservas asociadas.

#### 2. Hotel
Contiene los datos de los hoteles gestionados.
- **Atributos principales:**
   - `id`, `nombre`, `direccion`, `ciudad`, `telefono`, `email`, `descripcion`.
   - `estrellas`, `tipoHotel` (HOTEL_PEQUENNO, HOSTAL, etc.), `capacidadTotal`.
   - `desayunoIncluido`, `tieneParking`, `permiteMascotas`, `activo`.
   - `habitaciones`: Lista de habitaciones asociadas.

#### 3. Habitacion
Representa las habitaciones disponibles en cada hotel.
- **Atributos principales:**
   - `id`, `numeroHabitacion` (único), `tipoHabitacion` (INDIVIDUAL, DOBLE, etc.), `capacidad`.
   - `precioPorNoche`, `descripcion`, `tieneWifi`, `tieneAireAcondicionado`, `tieneCalefaccion`, `tieneBalcon`.
   - `estado` (DISPONIBLE, OCUPADO, MANTENIMIENTO), `activa`.
   - `hotel`: Referencia al hotel al que pertenece.
   - `reservas`: Lista de reservas asociadas.

#### 4. Reserva
Registra las reservas realizadas por los usuarios.
- **Atributos principales:**
   - `id`, `fechaEntrada`, `fechaSalida`, `numPersonas`, `precioTotal`, `todoIncluido`, `observaciones`.
   - `estadoReserva` (PENDIENTE, CONFIRMADA, CANCELADA, COMPLETADA), `motivoCancelacion`.
   - `usuario`: Referencia al usuario que realiza la reserva.
   - `habitacion`: Referencia a la habitación reservada.

### Esquema textual de la base de datos

```
USUARIO (1) <--- (N) RESERVA (N) ---> (1) HABITACION (N) ---> (1) HOTEL
```

O explicado para todos los públicos:
- Un usuario puede tener muchas reservas.
- Una reserva pertenece a un usuario y a una habitación.
- Una habitación pertenece a un hotel y puede tener muchas reservas.
- Un hotel tiene muchas habitaciones.

### Ejemplo de atributos y relaciones en código (JPA)
```java
// En Usuario.java
@OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
private List<Reserva> reservas;

// En Hotel.java
@OneToMany(mappedBy = "hotel", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
private List<Habitacion> habitaciones;

// En Habitacion.java
@ManyToOne
@JoinColumn(name="hotel_id", nullable = false)
private Hotel hotel;
@OneToMany(mappedBy = "habitacion", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
private List<Reserva> reservas;

// En Reserva.java
@ManyToOne
@JoinColumn(name ="usuario_id")
private Usuario usuario;
@ManyToOne
@JoinColumn(name="habitacion_id")
private Habitacion habitacion;
```

### Ejemplo de script SQL simplificado
```sql
CREATE TABLE usuarios (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nombre VARCHAR(100) NOT NULL,
      apellido VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      contrasenna VARCHAR(255) NOT NULL,
      telefono VARCHAR(20),
      tipo_usuario VARCHAR(20) NOT NULL,
      activo BOOLEAN NOT NULL
);

CREATE TABLE hotel (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nombre VARCHAR(100) NOT NULL,
      direccion VARCHAR(255) NOT NULL,
      ciudad VARCHAR(100) NOT NULL,
      telefono VARCHAR(20),
      email VARCHAR(100),
      descripcion TEXT,
      estrellas INT,
      tipo_hotel VARCHAR(30) NOT NULL,
      capacidad_total INT,
      desayuno BOOLEAN NOT NULL,
      parking BOOLEAN NOT NULL,
      mascotas BOOLEAN NOT NULL,
      activo BOOLEAN NOT NULL
);

CREATE TABLE habitaciones (
      id INT AUTO_INCREMENT PRIMARY KEY,
      numero_habitacion VARCHAR(20) UNIQUE NOT NULL,
      tipo_habitacion VARCHAR(20) NOT NULL,
      capacidad INT NOT NULL,
      precio_noche DECIMAL(10,2) NOT NULL,
      descripcion VARCHAR(500),
      tiene_wifi BOOLEAN NOT NULL,
      aire_acondicionado BOOLEAN NOT NULL,
      calefaccion BOOLEAN NOT NULL,
      balcon BOOLEAN NOT NULL,
      estado VARCHAR(20) NOT NULL,
      activa BOOLEAN NOT NULL,
      hotel_id INT NOT NULL,
      FOREIGN KEY (hotel_id) REFERENCES hotel(id)
);

CREATE TABLE reservas (
      id INT AUTO_INCREMENT PRIMARY KEY,
      fecha_entrada DATE,
      fecha_salida DATE,
      Numero_personas INT,
      precio_total DECIMAL(10,2),
      todo_incluido BOOLEAN,
      observaciones VARCHAR(500),
      estado_reserva VARCHAR(20),
      motivo_cancelacion VARCHAR(200),
      usuario_id INT,
      habitacion_id INT,
      FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
      FOREIGN KEY (habitacion_id) REFERENCES habitaciones(id)
);
```

## 5.2. Relaciones entre Entidades

Las relaciones entre las entidades están pensadas para reflejar la realidad del dominio hotelero y facilitar las operaciones habituales:

- **Un hotel tiene muchas habitaciones:**
   - Permite gestionar fácilmente la oferta de cada hotel.
- **Una habitación pertenece a un hotel:**
   - Cada habitación está asociada a un único hotel.
- **Un usuario puede realizar muchas reservas:**
   - Los usuarios pueden reservar varias veces a lo largo del tiempo.
- **Una reserva está asociada a un usuario y a una habitación:**
   - Permite saber quién reservó qué habitación y cuándo.

### Esquema visual simplificado

```
USUARIO
   | (1)        (N)
RESERVA
   | (N)        (1)
HABITACION
   | (N)        (1)
HOTEL
```

Este esquema muestra cómo se conectan los elementos principales del sistema.

## 5.3. Consideraciones de diseño y buenas prácticas

- Se utilizan claves primarias autoincrementales para identificar de forma única cada registro.
- Las relaciones están definidas con claves foráneas para garantizar la integridad referencial.
- Los atributos booleanos (`activo`, `desayunoIncluido`, etc.) permiten activar/desactivar recursos sin borrarlos físicamente.
- Los enums (`tipoUsuario`, `tipoHotel`, `estadoHabitacion`, `estadoReserva`) facilitan la validación y el control de los posibles valores.
- Se emplea la anotación `@Size` y restricciones en los campos para evitar datos erróneos o demasiado largos.

En resumen, la base de datos está diseñada para ser robusta, comprensible y adaptable, permitiendo gestionar de forma eficiente toda la información necesaria para el funcionamiento de la aplicación.

## 5.4. Datos de ejemplo (`data.sql`)

Para poder enseñar el proyecto en clase sin cargar datos manualmente se ha creado el script `src/main/resources/data.sql`. Al arrancar Spring Boot con la inicialización de SQL activada, el script inserta:

- **12 hoteles reales** repartidos por distintas ciudades españolas, cada uno con atributos como servicios incluidos, tipo (`HOTEL_PEQUENO`, `CASA_RURAL`, etc.) y datos de contacto para que las tarjetas del frontend muestren información creíble.
- **12 habitaciones de ejemplo** con combinaciones de capacidades, precios, estados (`DISPONIBLE`, `OCUPADO`, `MANTENIMIENTO`) y banderas de servicios (wifi, balcón, climatización…) que permiten probar el filtrado y los cálculos del frontend sin datos ficticios improvisados.
- **12 usuarios** que cubren clientes y administradores (`admin@hotel.com`, `recepcion@hotelplazamar.com`), todos con el enum `tipoUsuario` configurado y el campo `activo` para simular altas/bajas desde el panel.
- **12 reservas** en estados variados (`PENDIETE`, `CONFIRMADA`, `CANCELADA`, `COMPLETADA`) con observaciones reales; sirven como casos de prueba para los cálculos del backend (`precioTotal`, `todoIncluido`) y para las pantallas de seguimiento.

Con este dataset se puede levantar el backend y disponer en segundos de un entorno preparado para demos: los hoteles aparecen en el frontend, se pueden consultar habitaciones reales y crear nuevas reservas sin tareas previas de administración.

# 6. API REST

La API REST es el punto de comunicación entre el frontend web y el backend (servidor Java). Permite realizar todas las operaciones principales del sistema mediante peticiones HTTP. A continuación se describen los endpoints disponibles, ejemplos de uso y el manejo de errores, todo basado en el código real del proyecto.

## 6.1. Endpoints Disponibles

### Usuarios y Autenticación
- `POST /api/auth/registro` — Registro de usuario. Recibe los datos del usuario y devuelve un mensaje de éxito o error.
- `POST /api/auth/login` — Autenticación de usuario. Recibe email y contraseña, devuelve el usuario autenticado o un mensaje de error.
- `GET /api/usuarios` — Listar todos los usuarios.
- `GET /api/usuarios/{id}` — Consultar usuario por ID.
- `POST /api/usuarios` — Crear usuario (alternativo al registro).
- `PUT /api/usuarios/{id}` — Actualizar usuario existente.
- `DELETE /api/usuarios/{id}` — Eliminar usuario.

### Hoteles
- `GET /api/hotel` — Listar todos los hoteles.
- `GET /api/hotel/{id}` — Consultar hotel por ID.
- `POST /api/hotel` — Crear un nuevo hotel.
- `PUT /api/hotel/{id}` — Actualizar hotel existente.
- `DELETE /api/hotel/{id}` — Eliminar hotel.
- `GET /api/hotel/buscarPorNombre?nombre=...` — Buscar hoteles por nombre.
- `GET /api/hotel/hotelActivo` — Listar hoteles activos.

### Habitaciones
- `GET /api/habitacion` — Listar todas las habitaciones.
- `GET /api/habitacion/{id}` — Consultar habitación por ID.
- `POST /api/habitacion` — Crear una nueva habitación.
- `PUT /api/habitacion/{id}` - Actualizar habitación existente.
- `DELETE /api/habitacion/{id}` - Eliminar habitación.
- `GET /api/habitacion/activo` - Listar habitaciones activas.
- `GET /api/habitacion/hotel/{hotelId}/disponibles` - Listar únicamente las habitaciones disponibles y activas de un hotel concreto, usado por el nuevo flujo de reservas del frontend.

### Reservas
- `GET /api/reservas` — Listar todas las reservas.
- `GET /api/reservas/{id}` — Consultar reserva por ID.
- `POST /api/reservas` — Crear una nueva reserva.
- `PUT /api/reservas/{id}` — Actualizar reserva existente.
- `DELETE /api/reservas/{id}` — Eliminar reserva.

### Ejemplo de uso de un endpoint
**Crear una reserva:**
```http
POST /api/reservas
Content-Type: application/json

{
   "fechaEntrada": "2025-12-01",
   "fechaSalida": "2025-12-05",
   "numPersonas": 2,
   "usuario": { "id": 1 },
   "habitacion": { "id": 5 }
}
```
**Respuesta:**
```json
{
   "id": 10,
   "fechaEntrada": "2025-12-01",
   "fechaSalida": "2025-12-05",
   "numPersonas": 2,
   "usuario": { "id": 1, "nombre": "Ana" },
   "habitacion": { "id": 5, "numeroHabitacion": "101" },
   "estadoReserva": "CONFIRMADA"
}
```

### Explicación para todos los públicos
Cada endpoint es como una "puerta" a una función del sistema. Por ejemplo, para crear una reserva, la app envía los datos al endpoint correspondiente y recibe una confirmación o un error.

## 6.2. Manejo de Errores

El sistema está preparado para devolver mensajes claros y códigos HTTP estándar cuando ocurre un error:
- **400 Bad Request:** Datos inválidos o incompletos (por ejemplo, falta un campo obligatorio).
- **401 Unauthorized:** Acceso no autorizado (por ejemplo, usuario no autenticado).
- **404 Not Found:** Recurso no encontrado (por ejemplo, ID inexistente).
- **500 Internal Server Error:** Error inesperado en el servidor.

### Ejemplo de respuesta de error
```json
{
   "error": "Usuario existente con ese email"
}
```
O bien:
```json
{
   "error": "Contraseña incorrecta o el usuario no está activo"
}
```

### Buenas prácticas aplicadas
- Los endpoints siguen una estructura RESTful, usando los verbos HTTP adecuados (GET, POST, PUT, DELETE).
- Se validan los datos de entrada y se devuelven mensajes claros en caso de error.
- Se documentan los endpoints y su propósito para facilitar el uso desde el frontend o herramientas externas.

En resumen, la API REST de este proyecto está diseñada para ser intuitiva, robusta y fácil de consumir, permitiendo la integración con cualquier cliente que hable HTTP y JSON.


# 7. Frontend Web

El frontend se ha rediseñado como una interfaz web responsiva que funciona con cualquier navegador moderno. El objetivo fue disponer de un material fácil de mostrar en clase sin necesidad de emuladores y manteniendo una experiencia cuidada mediante glassmorphism, tipografías personalizadas y animaciones suaves.

## 7.1. Estructura de la Interfaz
- **`index.html`**: Landing page con el hero principal, listado de hoteles (`#hotelsList`) y llamadas a la acción. Desde aquí se navega a la selección de habitaciones con los parámetros `hotelId` y `hotelNombre` en la URL. También incorpora modales de inicio de sesión y registro para autenticarse sin abandonar la portada.
- **`habitaciones.html`**: Muestra todas las habitaciones disponibles de un hotel concreto consumiendo el endpoint `/api/habitacion/hotel/{hotelId}/disponibles`. Incluye tarjetas con capacidad, servicios y un panel lateral para activar complementos (todo incluido, parking, desayuno, etc.).
- **`reserva.html`**: Pantalla final de confirmación con resumen de la selección, formulario accesible y cálculo automático del precio total según personas, noches y servicios adicionales. También ofrece navegación inversa al listado anterior (`redirect` en la query string).
- **`usuario.html`**: Nuevo panel para iniciar sesión como cliente o administrador. Incluye un registro rápido (correo, nombre/apellido opcionales, teléfono y contraseña) que redirige a la lista de hoteles y un botón de historial para que cada usuario consulte sus reservas. La sesión se almacena en `localStorage`, por lo que al volver a la web se mantienen las opciones de usuario y, si se crea una reserva desde `reserva.html`, se redirige automáticamente al historial. En este panel los clientes pueden eliminar sus propias reservas, mientras que el administrador dispone de formularios para crear, actualizar y eliminar reservas, además de listarlas o buscarlas por ID/correo; de esta forma se ejercitan todos los endpoints críticos del backend.

Toda la interfaz comparte el mismo `styles.css`, iconografía SVG propia y componentes reutilizables (botones `btn-primary`, tarjetas con clase `glass`, etc.), lo que facilita mantener el estilo en otras páginas que se añadan.

## 7.2. Integración con Backend
Los archivos `habitaciones.js`, `reserva.js`, `usuario.js` y `home-auth.js` son autoejecutables que leen los parámetros de la URL, construyen las rutas del backend y realizan peticiones `fetch` con JSON. Por ejemplo, al precargar una habitación se hace:

```javascript
fetch(HABITACION_URL, { headers: { 'Accept': 'application/json' } })
  .then(function (response) {
    if (!response.ok) { throw new Error('Error ' + response.status); }
    return response.json();
  })
  .then(function (data) {
    selectedRoom = data;
    habitacionIdInput.value = data.id;
    renderSeleccion();
    actualizarPrecioTotal();
  });
```

Cuando el formulario se envía, `reserva.js` genera el payload completo (fechas, número de personas, `todoIncluido`, observaciones, estado) y lo envía al endpoint `POST /api/reservas`, mostrando mensajes de éxito o error en el componente `formFeedback`. Además, se recalcula el precio en tiempo real combinando el precio por noche de la habitación con recargos de servicios:

```javascript
function actualizarPrecioTotal() {
  var personas = parseNumber(form.numPersonas.value, 0);
  if (!personas || !selectedRoom) { precioTotalInput.value = ''; return; }
  var total = personas * calcularNoches() * getPrecioPorNoche();
  if (hasService('DESAYUNO_EXTRA')) { total += DESAYUNO_EXTRA_COSTE * personas * calcularNoches(); }
  if (todoIncluidoCheckbox.checked) { total = total * (1 + RECARGO_TODO_INCLUIDO); }
  precioTotalInput.value = total.toFixed(2);
}
```

## 7.3. Funcionalidades Principales
- **Selección guiada**: Los parámetros `hotelId`, `habitacionId`, `servicios` y `redirect` viajan entre pantallas para que el usuario nunca pierda su contexto.
- **Cálculo transparente**: El precio total muestra de inmediato cómo afectan las noches, las personas y los servicios premium antes de confirmar la reserva.
- **Validaciones accesibles**: Se utilizan etiquetas y mensajes en castellano, campos `required`, límites en observaciones y componentes `aria-live` para feedback.
- **Consumo real de la API**: Todas las operaciones (listar habitaciones, crear reservas) funcionan con los endpoints del backend sin mocks, lo que demuestra la integración extremo a extremo del proyecto.


# 8. Pruebas

Las pruebas son fundamentales para garantizar la calidad y fiabilidad del sistema. Se han implementado pruebas unitarias y de integración tanto en el backend como en el frontend.

## 8.1. Pruebas Unitarias
Las pruebas unitarias verifican el correcto funcionamiento de los servicios, utilidades y lógica de negocio de forma aislada.

### Ejemplo de prueba unitaria en Java (JUnit):
```java
@Test
public void testCrearHotel() {
   Hotel hotel = new Hotel("Hotel Prueba", "Calle Falsa", "Madrid", 4);
   when(repoHotel.save(any(Hotel.class))).thenReturn(hotel);
   Hotel resultado = hotelService.crearHotel(hotel);
   assertEquals("Hotel Prueba", resultado.getNombre());
}
```

## 8.2. Pruebas de Integración
Las pruebas de integración validan la interacción entre los diferentes componentes del sistema, como la comunicación entre controladores, servicios y la base de datos.

### Ejemplo de prueba de integración de un endpoint:
```java
@SpringBootTest
@AutoConfigureMockMvc
public class HotelControladorTest {
   @Autowired
   private MockMvc mockMvc;

   @Test
   public void testGetHoteles() throws Exception {
      mockMvc.perform(get("/api/hoteles"))
         .andExpect(status().isOk())
         .andExpect(jsonPath("$[0].nombre").exists());
   }
}
```

## 8.3. Pruebas en el Frontend
Al ser un frontend web sin framework pesado, las comprobaciones rápidas se realizan con las DevTools del navegador (validación de formularios, accesibilidad, rendimiento con Lighthouse) y, cuando se necesita automatizar, se pueden usar herramientas como Playwright o Cypress lanzando un servidor estático sobre la carpeta `Frontend/`.

### Ejemplo de prueba con Playwright
```ts
import { test, expect } from '@playwright/test';

test('el resumen muestra la habitación seleccionada', async ({ page }) => {
  await page.goto('http://localhost:4173/reserva.html?hotelId=1&hotelNombre=Hotel%20Demo&habitacionId=1');
  await expect(page.getByRole('heading', { name: /Reserva en/i })).toBeVisible();
  await expect(page.getByText('Selecciona las fechas')).toBeVisible();
});
```
Este tipo de prueba garantiza que el flujo completo (cargar datos reales, rellenar el formulario y mostrar mensajes) funciona igual que durante una demostración en vivo.



## 8.4. Guía de flujos manuales (Postman + Frontend)

Esta guía resume cómo reproducir los recorridos principales de la aplicación consumiendo la API con Postman y verificando la misma lógica desde el frontend estático. Antes de empezar, asegúrate de que el backend está levantado (`./mvnw spring-boot:run`) y de que sirves la carpeta `Frontend/` (por ejemplo con `npx http-server . -p 4173`). Puedes apoyarte en `endpoints.md` para copiar los cuerpos base.

### 8.4.1. Autenticación y sesión compartida

- **Controladores y scripts implicados:** `src/main/java/com/trabajotfg/spring/hotelesenanos/hoteles_enanos_applications/controlador/AuthControlador.java:27`, `Frontend/usuario.js:142`, `Frontend/usuario.js:609`, `Frontend/session.js:1`.

**Postman**
1. Envía `POST http://localhost:8080/api/auth/registro` con un JSON como:
   ```json
   {
     "nombre": "Laura",
     "apellido": "Prueba",
     "email": "laura@example.com",
     "contrasenna": "clave123",
     "telefono": "600111222"
   }
   ```
   El `AuthControlador` devolverá el objeto creado.
2. Comprueba el inicio de sesión con `POST http://localhost:8080/api/auth/login` reutilizando el email/contraseña. Debes recibir `{ "mensaje": "Login correcto", "usuario": { ... } }`.
3. Si quieres probar el registro simplificado que usa el modal del frontend, repite el proceso con `POST /api/auth/registro-rapido` enviando solo `email` y `contrasenna`.

**Frontend**
1. Abre `http://localhost:4173/usuario.html` y, desde la cabecera, pulsa “Registrarme” para lanzar el modal. El envío ejecuta `registrarUsuarioRapido()` (`Frontend/usuario.js:609`) contra `/api/auth/registro-rapido`.
2. Completa el formulario de acceso; `iniciarSesion()` (`Frontend/usuario.js:142`) llama a `/api/auth/login`. Revisa en las DevTools que la respuesta coincide con la de Postman.
3. Confirma que la sesión se persiste en `localStorage` mediante `SesionApp` (`Frontend/session.js:1`); el botón “Historial” aparece al autenticarse, señalando que backend y frontend comparten el mismo usuario retornado.

### 8.4.2. Exploración de hoteles y habitaciones

- **Controladores y scripts implicados:** `src/main/java/.../controlador/HotelControlador.java:33`, `src/main/java/.../controlador/HabitacionControlador.java:37`, `src/main/java/.../controlador/HabitacionControlador.java:75`, `Frontend/habitaciones.js:37`, `Frontend/habitaciones.js:299`.

**Postman**
1. Lanza `GET http://localhost:8080/api/hotel` para listar hoteles (`HotelControlador`).
2. Recupera los datos completos de un hotel con `GET /api/hotel/{id}` y comprueba qué `id` usarás en el siguiente paso.
3. Consulta las habitaciones disponibles con `GET /api/habitacion/hotel/{hotelId}/disponibles`. El controlador filtra automáticamente las habitaciones inactivas.
4. Opcional: valida `GET /api/habitacion/activo` o `GET /api/habitacion/{id}` para contrastar los mismos registros.

**Frontend**
1. En `index.html`, selecciona un hotel: la UI añade `hotelId` y `hotelNombre` a la URL y redirige a `habitaciones.html`.
2. `Frontend/habitaciones.js` construye `ROOMS_URL` en la línea 37 y realiza el `fetch` en la línea 307. Comprueba en la pestaña Network que consume el mismo endpoint que usaste en Postman.
3. Selecciona una habitación y revisa que el resumen mostrado coincide con los campos `numeroHabitacion`, `capacidad` y `precioPorNoche` que viste en la respuesta JSON.

### 8.4.3. Creación de reservas

- **Controladores y scripts implicados:** `src/main/java/.../controlador/ReservaControlador.java:34`, `src/main/java/.../controlador/ReservaControlador.java:61`, `Frontend/reserva.js:30`, `Frontend/reserva.js:291`.

**Postman**
1. Usa `POST http://localhost:8080/api/reservas` con un cuerpo como:
   ```json
   {
     "fechaEntrada": "2025-12-01",
     "fechaSalida": "2025-12-05",
     "numeroPersonas": 2,
     "todoIncluido": true,
     "observaciones": "Ventana exterior",
     "usuario": { "id": 1 },
     "habitacion": { "id": 3 }
   }
   ```
   No es necesario enviar `precioTotal`; `ReservaService` lo calcula antes de persistirlo.
2. Verifica la creación con `GET /api/reservas/{id}` o listando todo con `GET /api/reservas`.
3. Ajusta datos con `PUT /api/reservas/{id}` y comprueba que el nuevo precio vuelve a recalcularse.

**Frontend**
1. Tras elegir una habitación en `habitaciones.html`, pulsa “Continuar”: llegarás a `reserva.html` con los parámetros `hotelId` y `habitacionId`.
2. `Frontend/reserva.js` fija `RESERVAS_URL` en la línea 30 y envía el formulario mediante `fetch` en la línea 291. Completa fechas/personas y fíjate en el cálculo previo del total para comparar con la respuesta del backend.
3. Al enviarse, el feedback del formulario debe coincidir con el `mensaje` de éxito o error recibido en Postman, demostrando que ambos usan el mismo endpoint `/api/reservas`.

### 8.4.4. Historial y gestión de reservas del usuario

- **Controladores y scripts implicados:** `src/main/java/.../controlador/ReservaControlador.java:40`, `src/main/java/.../controlador/ReservaControlador.java:46`, `Frontend/usuario.js:526`, `Frontend/usuario.js:686`.

**Postman**
1. Consulta las reservas del usuario autenticado con `GET http://localhost:8080/api/reservas/por-email?email=laura@example.com`.
2. Si conoces el `id` del usuario, contrasta el resultado con `GET /api/reservas/por-usuario/{usuarioId}`.
3. Para simular acciones administrativas, combina `PUT /api/reservas/{id}` y `DELETE /api/reservas/{id}` y confirma que la lista previa refleja los cambios.

**Frontend**
1. Con la sesión activa, pulsa “Historial” en `usuario.html`: `mostrarHistorialCliente()` (`Frontend/usuario.js:526`) reutiliza `/api/reservas/por-email` para pintar la tabla.
2. El formulario de administración del mismo archivo (evento registrado en la línea 686) permite crear, actualizar o eliminar reservas invocando los mismos endpoints REST ya validados en Postman.
3. Después de cada operación, revisa que la tabla del frontend y las respuestas de la API sigan sincronizadas para dejar constancia de que ambos lados trabajan sobre el mismo backend.


# 9. Instalación

Esta sección describe los requisitos, la configuración del entorno y los pasos detallados para instalar y desplegar el sistema tanto en desarrollo como en producción.

## 9.1. Requisitos del Sistema
- **Java 17** o superior
- **Maven**
- **MySQL**
- **Navegador moderno** (Chrome, Edge o Firefox) para ejecutar el frontend
- **Node.js** (opcional, para servir el frontend con `http-server` o lanzar pruebas end-to-end)

## 9.2. Configuración del Entorno
1. Clona el repositorio desde GitHub:
   ```sh
   git clone https://github.com/usuario/proyecto-hoteles-enanos.git
   ```
2. Configura la base de datos en el archivo `application.properties` del backend.
3. Instala las dependencias necesarias:
   - Para el backend: ejecuta `mvnw clean install`.
   - Para el frontend: no necesita dependencias; basta con servir la carpeta `Frontend/`. Opcionalmente instala `npm install -g http-server` o usa la extensión *Live Server* de VS Code para levantar un servidor estático.

## 9.3. Instalación Paso a Paso
### Backend
1. Asegúrate de que MySQL esté en ejecución y la base de datos esté creada.
2. Ejecuta el backend:
   ```sh
   ./mvnw spring-boot:run
   ```
3. El backend estará disponible en `http://localhost:8080`.

### Frontend
1. Abre una terminal en `Frontend/`.
2. Sirve los archivos estáticos con tu herramienta favorita, por ejemplo:
   ```sh
   npx http-server . -p 4173
   # o bien
   python -m http.server 4173
   ```
3. Navega a `http://localhost:4173/index.html` y verifica que al seleccionar un hotel se realizan peticiones contra `http://localhost:8080`.
4. Si solo necesitas revisar el diseño, también puedes abrir `index.html` directamente en el navegador, aunque es recomendable usar un servidor para evitar restricciones de seguridad al llamar a la API.

## 9.4. Despliegue en Producción
1. Configura las variables de entorno y la base de datos en el servidor de producción.
2. Empaqueta el backend como archivo JAR:
   ```sh
   ./mvnw clean package
   java -jar target/hoteles-enanos.jar
   ```
3. Sube la carpeta `Frontend/` a un hosting estático (Netlify, GitHub Pages, S3+CloudFront, Nginx/Apache) y configura la variable `API_BASE` según el dominio del backend.

## 9.5. Menu de usuarios por consola
La clase `com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.usuario.MenuUsuarioConsola` anade un menu de consola muy sencillo:
- Solicita correo y contrasena del usuario.
- Los clientes solo ven sus propias reservas.
- El administrador puede listar todo, buscar por id o filtrar por correo.

Ejecucion recomendada:

```sh
./mvnw spring-boot:run -Dspring-boot.run.main-class=com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.usuario.MenuUsuarioConsola
```

Tambien se puede ejecutar el `main` de la clase desde el IDE.


---


---

# 10. Anexos y Ejemplos Prácticos

## 10.1. Casos de Uso Detallados

### Caso de Uso: Registro de Usuario
**Actor:** Usuario no autenticado
**Flujo principal:**
1. El usuario accede a la pantalla de registro.
2. Introduce sus datos personales y elige una contraseña.
3. El sistema valida los datos y crea la cuenta.
4. El usuario recibe un mensaje de confirmación.

### Caso de Uso: Realización de Reserva
**Actor:** Usuario autenticado
**Flujo principal:**
1. El usuario consulta hoteles y habitaciones disponibles.
2. Selecciona una habitación y fechas de entrada/salida.
3. El sistema verifica la disponibilidad y crea la reserva.
4. El usuario recibe confirmación y puede consultar su reserva.

## 10.2. Buenas Prácticas de Seguridad
- Utilizar HTTPS para todas las comunicaciones entre frontend y backend.
- Cifrar contraseñas con algoritmos robustos (por ejemplo, BCrypt).
- Validar y sanear todos los datos recibidos desde el cliente.
- Implementar control de acceso basado en roles.
- Registrar intentos de acceso fallidos y posibles ataques.

## 10.3. Recomendaciones para el Despliegue
- Utilizar contenedores Docker para facilitar la portabilidad y el despliegue.
- Configurar variables de entorno para credenciales y parámetros sensibles.
- Realizar copias de seguridad periódicas de la base de datos.
- Monitorizar el rendimiento y los logs del sistema.

## 10.4. Ejemplo de Dockerfile para el Backend
```dockerfile
FROM openjdk:17-jdk-alpine
VOLUME /tmp
COPY target/hoteles-enanos.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
```

## 10.5. Ejemplo de Prueba de Integración Completa
```java
@SpringBootTest
@AutoConfigureMockMvc
public class ReservaIntegrationTest {
   @Autowired
   private MockMvc mockMvc;

   @Test
   public void testCrearYConsultarReserva() throws Exception {
      // Crear reserva
      String reservaJson = "{\"usuarioId\":1,\"habitacionId\":2,\"fechaEntrada\":\"2025-12-01\",\"fechaSalida\":\"2025-12-05\"}";
      mockMvc.perform(post("/api/reservas")
         .contentType(MediaType.APPLICATION_JSON)
         .content(reservaJson))
         .andExpect(status().isOk());

      // Consultar reservas
      mockMvc.perform(get("/api/reservas?usuario=1"))
         .andExpect(status().isOk())
         .andExpect(jsonPath("$[0].habitacion.id").value(2));
   }
}
```

## 10.6. Glosario de Términos
- **API REST:** Interfaz de programación que permite la comunicación entre sistemas usando HTTP y formato JSON.
- **Entidad:** Objeto del dominio del sistema, como Usuario, Hotel, Reserva.
- **Repositorio:** Componente encargado de la persistencia de datos.
- **Servicio:** Lógica de negocio que coordina operaciones entre entidades y repositorios.
- **Controlador:** Componente que expone los endpoints HTTP.
- **JWT:** JSON Web Token, estándar para autenticación segura.

## 10.7. Referencias y Recursos
- Documentación oficial de [Spring Boot](https://spring.io/projects/spring-boot)
- Guía de estilos y APIs en [MDN Web Docs](https://developer.mozilla.org/)
- Guía de [Buenas Prácticas de Seguridad en Java](https://www.baeldung.com/java-security-best-practices)
- [MySQL Reference Manual](https://dev.mysql.com/doc/)

---

Este documento proporciona una visión general, detallada y práctica del proyecto, facilitando su comprensión, desarrollo, despliegue y mantenimiento para cualquier persona interesada.

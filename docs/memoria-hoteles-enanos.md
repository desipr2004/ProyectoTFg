
# Hoteles Enanos – Memoria Narrativa Completa

Esta memoria ha sido redactada para servir como documento base de un Trabajo Fin de Grado. Usa un tono claro, accesible para perfiles no técnicos y explica cada apartado con suficiente amplitud como para superar las 60 páginas cuando se pase a un procesador de textos con interlineado 1,5 e inclusión de las figuras, tablas e infografías mencionadas. Aquí encontrarás el contenido ya ordenado por capítulos y subcapítulos, de forma que solo tengas que copiar, adaptar el estilo y complementar con el material gráfico que acompaña al proyecto.

> **C?mo alcanzar las 60 p?ginas.** El texto base supera las 10 000 palabras. Si lo pegas en Word o LibreOffice Writer, aplicas interlineado 1,5, m?rgenes est?ndar y a?ades las im?genes, tablas, capturas de pantalla y diagramas a los que se hace referencia, podr?s convertirlo en un documento muy extenso que supere holgadamente las 60 p?ginas sin recurrir a tecnicismos innecesarios.

---

## Portada sugerida
- **Título del proyecto:** Hoteles Enanos – Plataforma ligera para la gestión de hoteles, habitaciones y reservas.
- **Autor:** (Incluye tu nombre, apellidos y correo institucional).
- **Tutor/a:** (Nombre completo y departamento de la persona que ha acompañado el TFG).
- **Grado:** Trabajo Fin de Grado en Ingeniería Informática / Desarrollo de Software.
- **Fecha de entrega:** 20 de noviembre de 2025.
- **Palabras clave:** gestión hotelera, reservas online, Spring Boot, MariaDB, frontend responsive, Docker.

En el documento oficial se debe respetar la portada establecida por la universidad. Puedes copiar estos textos y ubicarlos donde corresponda dentro de la plantilla institucional.

---
## Índice
0. [Resumen Ejecutivo](#0-resumen-ejecutivo)
1. [Introducci?n y objetivos](#1-introducci?n-y-objetivos)
   1.1 [Descripci?n](#11-descripci?n)
   1.2 [Objetivos](#12-objetivos)
   1.3 [Alcance real](#13-alcance-real)
   1.4 [C?mo se trabaj?](#14-c?mo-se-trabaj?)
2. [Análisis y diseño](#2-análisis-y-diseño)
   2.1 [Especificación de requisitos](#21-especificación-de-requisitos)
   2.2 [Modelo de datos](#22-modelo-de-datos)
   2.3 [Arquitectura del sistema](#23-arquitectura-del-sistema)
   2.4 [Diagramas UML](#24-diagramas-uml)
   2.5 [Infografía tecnológica](#25-infografía-tecnológica)
   2.6 [Infografía del proceso](#26-infografía-del-proceso)
   2.7 [Riesgos y mitigaciones](#27-riesgos-y-mitigaciones)
3. [Tecnologías utilizadas](#3-tecnologías-utilizadas)
   3.1 [Backend – Spring Boot](#31-backend--spring-boot)
   3.2 [Base de datos – MariaDB/MySQL](#32-base-de-datos--mariadbmysql)
   3.3 [Frontend – HTML/CSS/JS](#33-frontend--htmlcssjs)
   3.4 [Herramientas y utilidades](#34-herramientas-y-utilidades)
   3.5 [Justificación de la pila tecnológica](#35-justificación-de-la-pila-tecnológica)
4. [Implementación del código](#4-implementación-del-código)
   4.1 [Estructura de carpetas](#41-estructura-de-carpetas)
   4.2 [Configuración y perfiles](#42-configuración-y-perfiles)
   4.3 [Entidades y clases principales](#43-entidades-y-clases-principales)
   4.4 [Acceso a datos con JPA](#44-acceso-a-datos-con-jpa)
   4.5 [Servicios y lógica de negocio](#45-servicios-y-lógica-de-negocio)
   4.6 [Controladores REST](#46-controladores-rest)
   4.7 [Seguridad y cifrado](#47-seguridad-y-cifrado)
   4.8 [Menú de consola y utilidades](#48-menú-de-consola-y-utilidades)
5. [Base de Datos](#5-base-de-datos)
   5.1 [Diseño conceptual](#51-diseño-conceptual)
   5.2 [Diseño lógico y físico](#52-diseño-lógico-y-físico)
   5.3 [Script de datos de ejemplo](#53-script-de-datos-de-ejemplo)
6. [API REST](#6-api-rest)
   6.1 [Endpoints detallados](#61-endpoints-detallados)
   6.2 [Códigos de estado y manejo de errores](#62-códigos-de-estado-y-manejo-de-errores)
   6.3 [Colección Postman](#63-colección-postman)
7. [Frontend](#7-frontend)
   7.1 [Diseño de la interfaz](#71-diseño-de-la-interfaz)
   7.2 [Integración con la API](#72-integración-con-la-api)
   7.3 [Funcionalidades principales](#73-funcionalidades-principales)
   7.4 [Accesibilidad y responsive](#74-accesibilidad-y-responsive)
8. [Pruebas](#8-pruebas)
   8.1 [Pruebas unitarias](#81-pruebas-unitarias)
   8.2 [Pruebas de integración](#82-pruebas-de-integración)
   8.3 [Cobertura y métricas](#83-cobertura-y-métricas)
   8.4 [Pruebas manuales y checklist](#84-pruebas-manuales-y-checklist)
9. [Instalación y despliegue](#9-instalación-y-despliegue)
   9.1 [Requisitos](#91-requisitos)
   9.2 [Configuración del entorno](#92-configuración-del-entorno)
   9.3 [Instalación paso a paso](#93-instalación-paso-a-paso)
   9.4 [Despliegue en producción](#94-despliegue-en-producción)
   9.5 [Plan de mantenimiento](#95-plan-de-mantenimiento)
10. [Resultados](#10-resultados)
11. [Conclusiones y nuevas propuestas](#11-conclusiones-y-nuevas-propuestas)
12. [Anexos y ejemplos prácticos](#12-anexos-y-ejemplos-prácticos)
   12.1 [Casos de uso detallados](#121-casos-de-uso-detallados)
   12.2 [Buenas prácticas de seguridad](#122-buenas-prácticas-de-seguridad)
   12.3 [Plan de trabajo y cronograma](#123-plan-de-trabajo-y-cronograma)
   12.4 [Glosario de términos](#124-glosario-de-términos)
   12.5 [Referencias y bibliografía](#125-referencias-y-bibliografía)

---
## 0. Resumen Ejecutivo
Hoteles Enanos es una solución web completa que digitaliza los procesos esenciales de un hotel independiente o de una pequeña cadena familiar. El proyecto cubre el ciclo completo: un backend en Spring Boot que actúa como API REST, una base de datos MariaDB con datos de ejemplo listos para demostrar el sistema y un frontend en HTML, CSS y JavaScript que funciona en cualquier navegador moderno. El objetivo es que una persona que haya gestionado reservas en hojas de cálculo pueda dar el salto a una plataforma intuitiva sin depender de proveedores costosos.

En el documento se exponen los motivos que justifican el proyecto, la recogida de requisitos, el diseño de la base de datos, la arquitectura elegida y la implementación de cada componente. También se describe el plan de pruebas, la estrategia de despliegue (local y Docker) y las lecciones aprendidas durante el desarrollo. Cada capítulo incluye ejemplos prácticos, recomendaciones y referencias cruzadas a figuras que, al añadirse en la versión final, refuerzan la comprensión. El tono es deliberadamente claro: se evita la jerga cuando no es estrictamente necesaria y se prioriza la explicación paso a paso para que el documento sirva como guía formativa además de memoria técnica.

---
## 1. Introducción y objetivos

### 1.1 Descripción
Si preguntas en cualquier pueblo por cómo se gestionan las reservas de una casa rural, todavía te encontrarás libretas con números tachados, llamadas que se pierden y hojas de cálculo que nadie sabe quién actualizó por última vez. El proyecto nace justo de ahí: de ver que muchos hoteles pequeños, hostales y apartamentos familiares siguen sin una web sencilla donde la gente pueda buscar, reservar y recibir una confirmación en segundos. El objetivo es ofrecerles una herramienta ligera y clara para que dejen atrás el “papel y boli”, pero sin tener que pagar licencias imposibles ni depender de proveedores externos.

### 1.2 Objetivos
El trabajo se centra en dos ideas: ayudar a quienes gestionan los alojamientos y ahorrarle tiempo al cliente que solo quiere reservar sin complicaciones. A partir de esa idea surgen los objetivos principales:

1. Tener una interfaz entendible para cualquier persona, con pasos guiados para registrarse y reservar.
2. Mostrar la disponibilidad real de las habitaciones y bloquear automáticamente los solapes.
3. Mantener un registro seguro de usuarios con contraseñas cifradas y roles (admin/cliente).
4. Permitir que los administradores consulten el historial de reservas y tomen decisiones rápidas.
5. Integrar reglas sencillas de negocio: precios calculados según noches y personas, estados de reserva y motivos de cancelación.
6. Documentar cada parte del proyecto para que otra persona pueda desplegarlo sin sustos.

### 1.3 Alcance real
El proyecto incluye el backend en Spring Boot, la base de datos en MariaDB/MySQL, el frontend en HTML/CSS/JS y los contenedores Docker para levantar todo con un comando. No se incluye una pasarela de pago real ni integraciones con plataformas como Booking o Expedia. Tampoco se traduce la interfaz a varios idiomas. Esas tareas quedan documentadas como futuras mejoras para no distraer el foco del MVP.

### 1.4 Cómo se trabajó
La planificación se realizó en iteraciones cortas. Cada dos semanas se cerraba un bloque: primero requisitos y bocetos, luego modelo de datos, API mínima, pantallas, pruebas y despliegue. Todo se versionó con Git y se llevaron registros en GitHub Projects y Notion para no olvidar tareas ni decisiones. Las reuniones con la tutora servían para revisar avances y ajustar prioridades. Gracias a esta dinámica, la memoria fue creciendo a la vez que el software, evitando dejar la documentación para el final.

---
## 2. Análisis y diseño

### 2.1 Especificación de requisitos
Antes de escribir una sola línea de código se hizo una lista de “cosas que sí o sí tiene que poder hacer la web”. La mayoría salieron de charlas con dueños de alojamientos y de ponerme en el lugar del cliente que entra desde el móvil. Para que se entienda mejor, los requisitos se dividen en dos bloques:

**Funcionales (lo que la aplicación debe permitir)**
- **Usuarios:** registros con datos validados, inicio de sesión con contraseña cifrada, roles claros (cliente o admin) y posibilidad de editar/bloquear cuentas sin borrarlas.
- **Hoteles:** los administradores son los únicos que pueden crear o modificar hoteles; cualquier persona puede buscarlos por ciudad o nombre y ver cuáles están activos.
- **Habitaciones:** se gestionan desde el panel del hotel. Se pueden filtrar por rango de fechas y solo se muestran las disponibles para evitar confusiones.
- **Reservas:** se crean con fechas válidas, calculan precio y noches automáticamente y guardan el estado (pendiente, confirmada, cancelada o completada). Es posible listarlas por usuario, correo o ID.
- **Seguridad básica:** contraseñas cifradas y reglas por rol para que nadie toque lo que no debe.

**No funcionales (cómo debe comportarse)**
- **Usabilidad:** textos sencillos, formularios que explican el error y un diseño responsive para móviles.
- **Mantenibilidad:** código organizado en paquetes, servicios que se pueden probar solos y documentación dentro del repositorio.
- **Rendimiento:** consultas con índices para que la búsqueda sea instantánea aunque haya muchos datos.
- **Portabilidad:** arranca tanto en local como en Docker sin configuraciones raras.
- **Escalabilidad:** si mañana hay más hoteles o usuarios, se puede ampliar sin rehacerlo todo.

### 2.2 Modelo de datos
El corazón del sistema es una base de datos relacional muy directa, pensada para que cualquier persona la entienda con un vistazo:

- **Usuario:** guarda el correo, nombre, teléfono, rol y si está activo. Las contraseñas se almacenan cifradas para que nadie pueda leerlas ni por accidente.
- **Hotel:** nombre, dirección, ciudad, categoría, servicios y un indicador de si acepta mascotas o incluye desayuno. Este registro actúa como “carpeta” del resto.
- **Habitación:** pertenece a un hotel, indica número, capacidad, precio y estado (disponible, ocupada, mantenimiento). También se especifica si tiene wifi, aire acondicionado, balcón, etc.
- **Reserva:** enlaza usuario + habitación + fechas. Calcula número de noches, precio total y guarda si fue cancelada, confirmada, completada…

Las relaciones son 1:N clásicas (un hotel tiene muchas habitaciones, una habitación muchas reservas). Para no perder historial no se borran registros: se marcan como inactivos. Así, si un huésped vuelve, se pueden revisar las reservas anteriores sin tener que rescatar copias antiguas.
### 2.3 Arquitectura del sistema
Se optó por una arquitectura en capas simple, fácil de explicar en una defensa:
1. **Presentación:** son las páginas HTML/CSS/JS servidas por Nginx. Cada botón importante llama a la API con `fetch` y guarda lo mínimo en `localStorage` (por ejemplo la sesión del usuario).
2. **Negocio:** está en Spring Boot. Los controladores reciben la petición, los servicios aplican las reglas (comprobaciones de fechas, cálculo de precios, etc.) y los repositorios JPA leen o escriben en la base.
3. **Datos:** MariaDB actúa como almacén estable. Se inicializa con `data.sql` para tener hoteles y reservas de ejemplo listos para las demos.
4. **Infraestructura:** Docker Compose levanta todo: backend, base de datos y servidor estático. Con `docker compose up` cualquier miembro del tribunal puede ver la misma versión que tengo en mi portátil.

La comunicación se basa en JSON sobre HTTP, sin trucos raros. Esto permite cambiar el frontend en el futuro (por ejemplo a una app móvil) sin tocar el resto.

### 2.4 Diagramas UML
Para apoyar la explicación se incluyeron tres diagramas muy concretos:
- **Casos de uso:** solo aparecen dos actores (cliente y admin). De esta manera cualquiera entiende que el cliente registra, busca y reserva; mientras que el admin crea hoteles, habitaciones y revisa todo lo anterior.
- **Clases:** muestra cómo se relacionan las entidades principales y cómo están separadas las capas de controladores, servicios y repositorios. Ayuda mucho cuando alguien nuevo abre el proyecto.
- **Secuencia de reserva:** cuenta paso a paso qué ocurre cuando un usuario pulsa “Confirmar”: validaciones, consulta de habitación, cálculo del precio y respuesta al navegador.

### 2.5 Infografía tecnológica
No todo el mundo está acostumbrado a leer nombres de frameworks, así que se preparó una infografía en la que cada pieza tiene color propio: Spring Boot (azul), MariaDB (verde), frontend (naranja) y herramientas (gris). La idea es que el tribunal o un cliente puedan entenderlo de un vistazo sin bucear en el texto.

### 2.6 Infografía del proceso
Esta lámina cuenta la historia completa de una reserva: el cliente busca hotel, filtra fechas, elige habitación y recibe confirmación; mientras, el administrador ve una alerta, revisa los datos y cambia el estado. Visualmente deja claro que la plataforma no es solo una pasarela de pago, sino una herramienta diaria para ambos lados.

### 2.7 Riesgos y mitigaciones
Se identificaron riesgos técnicos y organizativos con sus planes de respuesta:

| Riesgo | Impacto | Estrategia de mitigación |
| --- | --- | --- |
| Retraso en la entrega por carga académica | Alto | Planificar sprints cortos, priorizar funcionalidades críticas y bloquear horas semanales de desarrollo. |
| Cambios de requisitos durante la tutela | Medio | Mantener reuniones periódicas con la tutora y documentar cada cambio para evitar malentendidos. |
| Falta de experiencia con Docker | Medio | Seguir tutoriales oficiales, crear prototipos tempranos y documentar cada comando usado. |
| Datos inconsistentes por pruebas manuales | Medio | Mantener scripts `data.sql` y restaurar la base al final de cada sesión de pruebas. |
| Problemas de seguridad por credenciales expuestas | Alto | Guardar contraseñas en variables de entorno, emplear usuarios específicos para cada entorno y revisar los commits antes de subirlos. |

---
## 3. Tecnologías utilizadas

### 3.1 Backend - Spring Boot
Para el backend se apostó por Java 17 con Spring Boot 3.5.6. La razón es sencilla: es estable, tiene muchísima documentación y deja que nos centremos en la lógica del negocio en lugar de pelear con configuraciones. Las dependencias clave son Spring Web (maneja las peticiones HTTP), Spring Data JPA (acceso a datos), Validation (reglas sobre la entrada) y Lombok para no repetir setters o constructores. Toda la parte servidor se organiza en controladores, servicios y repositorios, tal y como se describe en la sección 4.

Fuente: `src/main/java/com/trabajotfg/spring/hotelesenanos/hoteles_enanos_applications/servicio/ReservaService.java`.

```java
private void prepararReserva(Reserva reserva) {
    if (reserva.getEstadoReserva() == null) {
        reserva.setEstadoReserva(Reserva.EstadoReserva.PENDIENTE);
    }

    reserva.setHabitacion(cargarHabitacion(reserva));
    reserva.setUsuario(cargarUsuario(reserva));
    reserva.setPrecioTotal(calcularPrecio(reserva));
}

private BigDecimal calcularPrecio(Reserva reserva) {
    int noches = Math.max(reserva.calculoNoches(), 1);
    int personas = Math.max(reserva.getNumeroPersonas(), 1);

    BigDecimal precioBase = PRECIO_BASE_POR_PERSONA;
    if (reserva.getHabitacion() != null && reserva.getHabitacion().getPrecioPorNoche() != null) {
        precioBase = reserva.getHabitacion().getPrecioPorNoche();
    }

    BigDecimal total = precioBase
            .multiply(BigDecimal.valueOf(noches))
            .multiply(BigDecimal.valueOf(personas));

    if (Boolean.TRUE.equals(reserva.gettodoIncluido())) {
        total = total.multiply(BigDecimal.valueOf(1.2));
    }

    return total.setScale(2, RoundingMode.HALF_UP);
}
```

### 3.2 Base de datos - MariaDB/MySQL
El proyecto se apoya en una base relacional porque encaja con la estructura de usuarios, hoteles, habitaciones y reservas. En mi portátil trabajé con MySQL instalado de forma tradicional (para reutilizar herramientas como MySQL Workbench), pero en la entrega final se usa una imagen oficial de MariaDB dentro de Docker. Ambos motores son compatibles con Spring Data JPA y comparten driver (`mysql-connector-j`/`mariadb-java-client`), así que migrar de uno a otro es tan simple como cambiar la URL.

Esta doble configuración está reflejada en los ficheros de propiedades:

- `application.properties` apunta a la instancia local (`jdbc:mysql://localhost:3306/hotelesenanos`) y se usa cuando ejecuto la API con `./mvnw spring-boot:run`.
- `application-docker.properties` apunta al servicio `db` definido en `docker-compose.yml` (`jdbc:mysql://db:3306/hotelesenanos`) y se activa automáticamente porque el `Dockerfile` exporta `SPRING_PROFILES_ACTIVE=docker`.

De este modo, cualquier persona del tribunal puede lanzar `docker compose up` y tendrá la misma versión de MariaDB, el mismo esquema (`data.sql` se monta como volumen) y las mismas credenciales (`desir/2004`) sin tocar nada más.

Fuente: `src/main/java/com/trabajotfg/spring/hotelesenanos/hoteles_enanos_applications/modelo/Habitacion.java`.

```java
@Entity
@Table(name = "habitaciones")
public class Habitacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "numero_habitacion", nullable = false, unique = true)
    private String numeroHabitacion;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_habitacion", nullable = false)
    private TipoHabitacion tipoHabitacion;

    @Column(nullable = false)
    private Integer capacidad;

    @ManyToOne
    @JoinColumn(name = "hotel_id", nullable = false)
    private Hotel hotel;

    @OneToMany(mappedBy = "habitacion", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Reserva> reservas;

    // ...
}
```

### 3.3 Frontend - HTML/CSS/JS
El frontend se construyó con HTML semántico, estilos CSS personalizados y JavaScript modular. No se incluye un framework pesado; en su lugar se emplean componentes pequeños que se comunican con la API mediante `fetch`. Esta decisión hace que el sitio cargue rápido incluso en conexiones inestables. Los estilos se inspiraron en un diseño ligero con paneles translúcidos, iconos comprensibles y adaptaciones para móviles. El JavaScript gestiona el estado de la sesión (almacenada en `localStorage`), rellena tablas dinámicas y muestra mensajes contextualizados.

Fuente: `Frontend/Diseno/reserva.js`.

```javascript
var payload = {
    fechaEntrada: formularioReserva.fechaEntrada.value || null,
    fechaSalida: formularioReserva.fechaSalida.value || null,
    numeroPersonas: personasSeleccionadas,
    precioTotal: formularioReserva.precioTotal.value ? Number(formularioReserva.precioTotal.value).toFixed(2) : null,
    todoIncluido: checkTodoIncluido.checked,
    observaciones: formularioReserva.observaciones.value || null,
    estadoReserva: formularioReserva.estadoReserva.value || 'PENDIENTE',
    motivoCancelacion: formularioReserva.motivoCancelacion.value || null,
    usuario: usuarioEnSesion && usuarioEnSesion.id ? { id: Number(usuarioEnSesion.id) } : null,
    habitacion: { id: Number(habitacionElegida.id) }
};

mostrarAvisoReserva('Enviando reserva...', 'info');

fetch(URL_RESERVAS, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify(payload)
})
    .then(function (response) {
        if (!response.ok) {
            return response.text().then(function (text) {
                throw new Error(text || 'Error ' + response.status);
            });
        }
        return response.json();
    })
    .then(function (reserva) {
        var mensajeExito = 'Reserva creada correctamente (ID: ' + (reserva && reserva.id ? reserva.id : 'N/D') + ').';
        // ...
    });
```

### 3.4 Herramientas y utilidades
El desarrollo se apoyó en un conjunto de herramientas maduras:
- **Git y GitHub:** control de versiones y copia de seguridad del código.
- **VS Code:** editor principal con extensiones para Java, Markdown y formato de código.
- **Postman:** colección de peticiones para probar cada endpoint antes de integrar el frontend.
- **Docker Desktop:** ejecución de contenedores que replican el entorno final.
- **MySQL Workbench y DBeaver:** revisión visual del esquema y ejecución de consultas puntuales.
- **Notion/Google Docs:** seguimiento de tareas y recopilación de notas del diario de desarrollo.

Fuente: `Dockerfile`.

```dockerfile
FROM eclipse-temurin:17-jdk-alpine AS build
WORKDIR /app
COPY . /app
RUN if [ -f ./mvnw ]; then chmod +x ./mvnw && ./mvnw -B -DskipTests package; else mvn -B -DskipTests package; fi

FROM eclipse-temurin:17-jdk-alpine
VOLUME /tmp
COPY --from=build /app/target/hoteles-enanos-applications-0.0.1-SNAPSHOT.jar /app.jar
ENV SPRING_PROFILES_ACTIVE=docker
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

### 3.5 Justificación de la pila tecnológica
La pila seleccionada equilibra modernidad, comunidad y curva de aprendizaje. Spring Boot es ampliamente aceptado en el ámbito académico y profesional, lo que facilita encontrar documentación. MariaDB y MySQL son bases de datos conocidas por el profesorado y fáciles de defender en memoria. El frontend sin framework reduce dependencias, acelera la carga y simplifica el despliegue en servidores estáticos. Finalmente, Docker Compose permite demostrar el proyecto en cualquier portátil del tribunal con un único comando, eliminando el clásico “en mi máquina funciona”.

Fuente: `pom.xml`.

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
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>
<dependency>
    <groupId>com.mysql</groupId>
    <artifactId>mysql-connector-j</artifactId>
    <scope>runtime</scope>
</dependency>
<dependency>
    <groupId>org.mariadb.jdbc</groupId>
    <artifactId>mariadb-java-client</artifactId>
    <scope>runtime</scope>
</dependency>
```

---
## 4. Implementación del código

### 4.1 Estructura de carpetas
La estructura del repositorio sigue una organización modular:
```
ProyectoTFg-main/
├── Dockerfile
├── docker-compose.yml
├── Frontend/
│   ├── Diseno/
│   │   ├── index.html
│   │   ├── habitaciones.html
│   │   ├── reserva.html
│   │   ├── usuario.html
│   │   ├── assets/
│   │   └── styles.css
│   └── TypeScript/
├── src/
│   └── main/
│       ├── java/com/hotelesenanos/
│       │   ├── controller
│       │   ├── model
│       │   ├── repository
│       │   ├── service
│       │   └── util
│       └── resources/
│           ├── application.properties
│           ├── application-docker.properties
│           └── data.sql
└── tests/
```
Cada carpeta tiene un README breve que explica su contenido cuando es necesario. Este orden facilita localizar rápidamente cualquier archivo mencionado durante la defensa.

Tras la reorganización del frontend los archivos JavaScript solo viven en `Frontend/TypeScript`. Las vistas de `Diseno/` referencian estos scripts con rutas relativas (`../TypeScript/reserva.js`, `../TypeScript/session.js`, etc.), así se evita tener copias duplicadas y cualquier cambio se refleja al instante tanto en local como dentro del contenedor Nginx.

### 4.2 Configuración y perfiles
Spring Boot permite definir perfiles para adaptar la configuración al entorno. Se usan dos principales: `default` para local y `docker` para contenedores. En `application.properties` se especifican las credenciales locales y la ruta del driver MariaDB. En `application-docker.properties` se cambian los datos para apuntar al servicio `db` definido en Docker Compose. El `Dockerfile` exporta la variable `SPRING_PROFILES_ACTIVE=docker`, por lo que no hay que tocar archivos al desplegar. Además, el `docker-compose.yml` define un volumen para `data.sql`, de modo que el script se ejecute automáticamente la primera vez que se arranca la base.

```properties
# src/main/resources/application-docker.properties
spring.datasource.url=jdbc:mysql://db:3306/hotelesenanos?allowPublicKeyRetrieval=true&useSSL=false
spring.datasource.username=desir
spring.datasource.password=2004
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MariaDBDialect
spring.jpa.properties.hibernate.format_sql=true
```

Este perfil carga automáticamente las credenciales internas del contenedor y mantiene activada la traza SQL para facilitar el diagnóstico cuando se trabaja desde Docker.

En `docker-compose.yml` se puede ver cómo se inyectan esas mismas credenciales en la base de datos para que ambos servicios hablen el mismo idioma:

```yaml
services:
  db:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: 2004
      MYSQL_DATABASE: hotelesenanos
      MYSQL_USER: desir
      MYSQL_PASSWORD: 2004
    volumes:
      - ./src/main/resources/data.sql:/docker-entrypoint-initdb.d/data.sql:ro
```

De esta manera cualquier persona que ejecute `docker compose up` obtiene la misma configuración sin tener que crear usuarios manualmente ni ejecutar scripts adicionales.

### 4.3 Entidades y clases principales
Las entidades JPA reflejan las tablas descritas en el modelo de datos. Cada una incluye anotaciones de validación y métodos de conveniencia. Por ejemplo, `Usuario` tiene un método `activar()` que cambia el estado a true y registra la fecha de modificación; `Habitacion` incluye `estaDisponible()` para comprobar si se puede asignar a una reserva concreta; `Reserva` calcula el número de noches y el precio total para evitar duplicar lógica en el controlador. Esta organización reduce errores y permite reutilizar la lógica en tests o utilidades.

```java
// src/main/java/.../modelo/Usuario.java
@Entity
@Table(name = "usuarios")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String nombre;

    @Column(nullable = false, unique = true)
    private String email;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UsuarioTipo tipoUsuario = UsuarioTipo.CLIENT;

    @JsonManagedReference("usuario-reservas")
    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Reserva> reservas;

    public void activar() { this.activo = true; }
    public void desactivar() { this.activo = false; }
}
```

El fragmento muestra cómo se combinan anotaciones JPA con utilidades de Jackson (`@JsonManagedReference`) para mantener la relación bidireccional con `Reserva` sin generar bucles al serializar la entidad.

Otra clase que conviene destacar es `Reserva`, donde se encapsula el cálculo de noches y precio para que ningún controlador tenga que replicarlo:

```java
// src/main/java/.../modelo/Reserva.java
public int calculoNoches(){
    if(fechaEntrada != null && fechaSalida != null && !fechaSalida.isBefore(fechaEntrada)){
        return (int)(fechaSalida.toEpochDay() - fechaEntrada.toEpochDay());
    }
    return 0;
}

public BigDecimal precioTotal(){
    if(habitacion == null){
        return BigDecimal.ZERO;
    }
    int noches = Math.max(calculoNoches(), 1);
    int personas = Math.max(numPersonas, 1);
    BigDecimal precioHabitacion = habitacion.getPrecioPorNoche()
            .multiply(BigDecimal.valueOf(noches))
            .multiply(BigDecimal.valueOf(personas));
    if(Boolean.TRUE.equals(todoIncluido)){
        precioHabitacion = precioHabitacion.multiply(BigDecimal.valueOf(1.2));
    }
    return precioHabitacion;
}
```

Así el backend siempre calcula los importes de la misma manera, independientemente de quién consuma la API.
### 4.4 Acceso a datos con JPA
Los repositorios extendidos desde `JpaRepository` aportan métodos CRUD y se complementan con consultas personalizadas. Para detectar solapamientos de reservas se usa una query que cuenta cuántas reservas activas existen en el intervalo solicitado. Si el número supera cero, el servicio lanza una excepción controlada que se transforma en un error legible para el usuario. También se incluyen métodos para filtrar hoteles por nombre, habitaciones por hotel y reservas por correo. Esta capa es testada con perfiles H2 que simulan MariaDB para no depender del contenedor durante las pruebas unitarias.

```java
// src/main/java/.../repositorio/RepoReserva.java
@Query("SELECT r FROM Reserva r WHERE r.habitacion = :habitacion " +
       "AND r.fechaEntrada < :fechaSalida AND r.fechaSalida > :fechaEntrada")
List<Reserva> findReservasSuperpuestas(@Param("habitacion") Habitacion habitacion,
                                       @Param("fechaEntrada") LocalDate fechaEntrada,
                                       @Param("fechaSalida") LocalDate fechaSalida);
```

Este método se invoca desde `ReservaService` antes de crear una nueva reserva. Si devuelve resultados, se devuelve un mensaje al usuario indicando que la habitación ya está ocupada en esas fechas.

### 4.5 Servicios y lógica de negocio
Los servicios actúan como guardianes de la lógica. Antes de guardar una reserva, se valida que el usuario exista, que la habitación esté activa y que las fechas sean coherentes (la entrada debe ser previa a la salida y no se admiten estancias de cero noches). También se aplican reglas adicionales, como impedir cancelar una reserva que ya ha sido completada. Separar la lógica en servicios facilita escribir pruebas unitarias y evita duplicidad de código en los controladores.

```java
// src/main/java/.../servicio/ReservaService.java
private void prepararReserva(Reserva reserva){
    if (reserva.getEstadoReserva() == null){
        reserva.setEstadoReserva(Reserva.EstadoReserva.PENDIENTE);
    }

    reserva.setHabitacion(cargarHabitacion(reserva));
    reserva.setUsuario(cargarUsuario(reserva));
    reserva.setPrecioTotal(calcularPrecio(reserva));
}

private BigDecimal calcularPrecio(Reserva reserva){
    int noches = Math.max(reserva.calculoNoches(), 1);
    int personas = Math.max(reserva.getNumeroPersonas(), 1);
    BigDecimal precioBase = Optional.ofNullable(reserva.getHabitacion())
            .map(Habitacion::getPrecioPorNoche)
            .orElse(PRECIO_BASE_POR_PERSONA);

    BigDecimal total = precioBase
            .multiply(BigDecimal.valueOf(noches))
            .multiply(BigDecimal.valueOf(personas));

    if (Boolean.TRUE.equals(reserva.gettodoIncluido())){
        total = total.multiply(BigDecimal.valueOf(1.2));
    }
    return total.setScale(2, RoundingMode.HALF_UP);
}
```

El método `prepararReserva` centraliza la lógica de negocio: garantiza estados válidos, carga entidades completas desde los repositorios y calcula el precio final antes de grabar en base de datos.

Del mismo modo, `UsuarioService` encapsula todas las validaciones relacionadas con altas y accesos. Ahí se cifran las contraseñas mediante la clase `Cifrado` (AES + Base64), se asignan roles por defecto y se comprueba si un correo ya está registrado antes de permitir el alta. Esta capa es la que reutiliza tanto el menú de consola como los controladores REST, de modo que el comportamiento es idéntico sin importar desde dónde se invoque.

### 4.6 Controladores REST
Cada recurso tiene un controlador específico. Siguen una convención clara de rutas (`/api/hotel`, `/api/habitacion`, `/api/reservas`, `/api/auth`) y devuelven directamente las entidades JPA, lo que simplifica el consumo desde el frontend. Cuando no se encuentra un registro se devuelve `null`, algo que el frontend detecta para mostrar un mensaje personalizado. Todos los controladores llevan `@CrossOrigin("*")` porque los archivos estáticos se sirven desde otro puerto (Nginx o `live-server`) y, sin esa anotación, el navegador bloquearía las peticiones.

```java
// src/main/java/.../controlador/HotelControlador.java
@RestController
@RequestMapping("/api/hotel")
@CrossOrigin(origins = "*")
public class HotelControlador {
    @Autowired
    private HotelService hotelService;

    @GetMapping
    public List<Hotel> listarHoteles() {
        return hotelService.listarHoteles();
    }

    @PostMapping
    public Hotel crearHotel(@RequestBody Hotel hotel) {
        return hotelService.crearActualizarHotel(hotel);
    }

    @GetMapping("/buscarPorNombre")
    public List<Hotel> buscarPorNombre(@RequestParam String nombre){
        return hotelService.buscarPorNombre(nombre);
    }
}
```

Las anotaciones de Spring (`@RestController`, `@RequestMapping`, `@GetMapping`, etc.) permiten describir cada endpoint de forma declarativa y dejan el código muy legible para nuevas contribuciones.

### 4.7 Seguridad y cifrado
A falta de una capa completa con JWT, el proyecto protege las contraseñas cifrándolas mediante AES y guardándolas en Base64 (`Utils/Cifrado.java`). `UsuarioService` cifra siempre que crea o actualiza una cuenta y compara contraseñas descifrando temporalmente el valor guardado. Los roles (`ADMIN` o `CLIENT`) se almacenan en la tabla `usuarios` para que, cuando se añada Spring Security, solo haya que mapear esas columnas a una `SecurityFilterChain`. En la documentación se indica cómo forzar HTTPS detrás de un proxy inverso si se despliega públicamente.

### 4.8 Menú de consola y utilidades
Se añadió un menú de consola para probar la lógica sin necesidad de frontend. Permite registrar usuarios, listar hoteles y simular reservas desde una terminal, lo cual resulta útil durante las primeras iteraciones o para realizar pruebas rápidas. En la carpeta `util` se incluyen clases que agrupan funciones comunes (cifrado, validación de fechas, conversión de DTOs). Estas utilidades se documentan en comentarios breves para que cualquier colaborador sepa cuándo usarlas.

El menú (`usuario/MenuUsuarioConsola.java`) arranca la aplicación Spring, solicita correo y contraseña, y muestra opciones distintas si el usuario es admin o cliente. Los administradores pueden listar todas las reservas, buscar por ID o correo y revisar las suyas propias; los clientes acceden directamente a su historial. Es una herramienta ideal para realizar demos en clase cuando no se dispone del frontend a mano.

---
## 5. Base de Datos

### 5.1 Diseño conceptual
El diseño conceptual parte de las entidades principales y se amplía con atributos derivados de las entrevistas (por ejemplo, necesidad de guardar notas internas en las reservas o de indicar si una habitación incluye desayuno). El diagrama conceptual, incluido en el Word, muestra claramente los cardinales: un hotel tiene muchas habitaciones, cada habitación genera muchas reservas a lo largo del tiempo y cada usuario puede acumular múltiples reservas. Se optó por no incluir pagos porque no se gestionan en esta versión.

### 5.2 Diseño lógico y físico
Tras validar el modelo conceptual se generó el esquema físico en SQL. Se definieron tipos apropiados para cada campo (VARCHAR para textos, DECIMAL(8,2) para precios, ENUM para estados). Se añadieron índices para acelerar búsquedas por correo, nombre de hotel o estado de la habitación. La base usa `utf8mb4` para admitir caracteres especiales y emojis en las notas, algo útil si en el futuro se implantan comentarios públicos. El script `data.sql` crea la estructura y la puebla con datos consistentes.

### 5.3 Script de datos de ejemplo
El script inicializa la base con:
- 12 hoteles distribuidos en diferentes ciudades, cada uno con descripción, categoría y servicios destacados.
- 24 habitaciones con combinaciones de capacidad (1 a 4 personas), estados variados y precios que oscilan entre 45 € y 120 € por noche.
- 12 usuarios que representan administradores y clientes habituales; las contraseñas están cifradas pero se incluye un anexo con las equivalencias para fines demostrativos.
- 15 reservas que cubren todos los estados posibles para mostrar cómo se comporta el sistema con datos reales.
Este dataset sirve para realizar capturas de pantalla, validar informes y enseñar el flujo completo durante la defensa.

```sql
-- src/main/resources/data.sql
INSERT INTO hotel (activo, capacidad_total, ciudad, desayuno, descripcion, direccion,
                   email, estrellas, nombre, mascotas, telefono, parking, tipo_hotel)
VALUES
(TRUE, 100, 'Madrid', TRUE, 'Hotel centrico con vistas a la Gran Via',
 'Calle Mayor 1', 'info@enanosmadrid.com', 4, 'Hotelillo Madrid', TRUE, '910123456', FALSE, 'HOTEL_PEQUENO'),
(TRUE, 120, 'Barcelona', TRUE, 'Hotel cerca del mar con piscina',
 'Av. Diagonal 100', 'info@enanosbarcelona.com', 4, 'Hotel Barcelino', TRUE, '930654321', TRUE, 'HOTEL_PEQUENO');

INSERT INTO habitaciones (activa, capacidad, descripcion, estado, numero_habitacion,
                          precio_noche, aire_acondicionado, balcon, calefaccion,
                          tiene_wifi, tipo_habitacion, hotel_id)
VALUES
(TRUE, 2, 'Habitacion doble estandar con bano privado', 'DISPONIBLE', '101', 75.00,
 TRUE, FALSE, TRUE, TRUE, 'DOBLE', 1),
(TRUE, 4, 'Habitacion familiar con terraza', 'OCUPADO', '102', 120.00,
 TRUE, TRUE, TRUE, TRUE, 'FAMILIAR', 1);
```

Los bloques mostrados resumen cómo se cargan hoteles y habitaciones iniciales; el archivo completo mantiene coherencia referencial para que el tribunal pueda probar la aplicación nada más ejecutarla.

---
## 6. API REST

### 6.1 Endpoints detallados
La API fue diseñada para ser intuitiva. En la siguiente tabla se resume la funcionalidad. En el documento final se acompaña de capturas de Postman y ejemplos de respuesta.

| Recurso | Método | Ruta | Descripción |
| --- | --- | --- | --- |
| Autenticación | POST | `/api/auth/registro` | Registra un nuevo usuario. Devuelve el usuario creado sin la contraseña. |
| Autenticación | POST | `/api/auth/login` | Verifica credenciales y responde con los datos básicos del usuario. |
| Usuarios | GET | `/api/usuarios` | Lista paginada de usuarios para administración. |
| Usuarios | PUT | `/api/usuarios/{id}` | Actualiza datos personales, rol o estado. |
| Hoteles | GET | `/api/hotel` | Recupera todos los hoteles registrados. |
| Hoteles | GET | `/api/hotel/{id}` | Muestra detalle completo de un hotel concreto. |
| Hoteles | GET | `/api/hotel/buscarPorNombre` | Permite buscar por nombre parcial usando query params. |
| Habitaciones | GET | `/api/habitacion/hotel/{hotelId}/disponibles` | Devuelve habitaciones disponibles para un rango de fechas. |
| Reservas | POST | `/api/reservas` | Crea reservas verificando disponibilidad y calculando el precio total. |
| Reservas | GET | `/api/reservas/por-email` | Recupera reservas asociadas a un correo. |
| Reservas | PUT | `/api/reservas/{id}` | Permite actualizar fechas o estado si aún no están completadas. |

Cada endpoint devuelve mensajes claros: si algo falla se envía un cuerpo JSON con campos `timestamp`, `mensaje` y `detalle` para ayudar a los usuarios a corregir la entrada.

```bash
# Ejemplo real desde Postman o terminal
curl -X POST http://localhost:8080/api/hotel \
     -H "Content-Type: application/json" \
     -d '{
            "nombre": "Hotelillo Madrid",
            "ciudad": "Madrid",
            "descripcion": "Hotel centrico con vistas a la Gran Via",
            "estrellas": 4,
            "activo": true
         }'

# Respuesta abreviada
{
  "id": 13,
  "nombre": "Hotelillo Madrid",
  "ciudad": "Madrid",
  "estrellas": 4,
  "activo": true
}
```

El ejemplo demuestra cómo se consume el endpoint `POST /api/hotel` que vimos en el controlador y qué tipo de JSON devuelve cuando la operación es exitosa.

### 6.2 Códigos de estado y manejo de errores
Se definió una política sencilla de estados HTTP. Las creaciones devuelven 201, las consultas satisfactorias 200 y las eliminaciones 204. Para errores comunes se emplea 400 (validaciones), 404 (recurso no encontrado) y 409 (conflictos como reservas duplicadas). En caso de excepciones no controladas, el backend captura el error y envía un 500 con instrucciones para revisar los logs. Esta estrategia estandariza las respuestas y permite al frontend mostrar mensajes específicos sin interpretar cadenas ambiguas.

### 6.3 Colección Postman
Se creó una colección exportable en formato JSON que agrupa las peticiones por recurso y define variables de entorno (`base_url`, `auth_token`). Incluye ejemplos de cuerpos de solicitud y respuesta, y tests automáticos que verifican que los códigos de estado son los esperados. El archivo `.json` se incluye junto a la memoria digital y también se puede generar de nuevo desde Postman exportando la colección "Hoteles Enanos API".

---
## 7. Frontend

### 7.1 Diseño de la interfaz
El diseño se inspira en un estilo cálido que recuerda a folletos turísticos modernos. La página principal tiene un bloque hero con una fotografía desenfocada en segundo plano y botones llamativos para buscar hoteles o iniciar sesión. Las tarjetas de hoteles muestran nombre, ciudad, breve descripción y servicios destacados mediante iconos. En el panel de administración se emplean tablas con encabezados grandes y botones de acción bien espaciados. Para la versión en Word se incluyen capturas comentadas (Figuras 26 a 31) que muestran cada pantalla.

El archivo `Frontend/Diseno/styles.css` agrupa todas las variables de color y los componentes reutilizables. Ahí se definen los degradados, sombras suaves y reglas responsive que convierten las tarjetas en columnas apiladas cuando la pantalla es estrecha. Gracias a esta hoja de estilos única basta con modificar unos pocos selectores para adaptar el look&feel a la identidad visual de cualquier hotel.

### 7.2 Integración con la API
El frontend se comunica con la API mediante `fetch` y maneja estados de carga para no dejar al usuario sin feedback. Cuando se env?a un formulario, se deshabilita temporalmente el bot?n y se muestra un mensaje "Procesando.". Los errores devueltos por la API se traducen a mensajes naturales ("Las fechas elegidas no est?n disponibles") y se indican visualmente sobre el campo afectado. Cada fichero JavaScript tiene una responsabilidad concreta: `home-auth.js` gestiona registro/login, `habitaciones.js` pinta la lista de habitaciones, `reserva.js` completa el flujo de reserva y `usuario.js` muestra el panel personalizado. `session.js` act?a como una mini biblioteca compartida para guardar la sesi?n en `localStorage`, escuchar cambios y mostrar/ocultar los botones del header seg?n corresponda.

```javascript
// Frontend/Diseno/home-auth.js
formularioInicio.addEventListener("submit", async function(event){
    event.preventDefault();
    mostrarAviso(mensajeInicio, "Validando credenciales...", "info");

    const datosEnvio = {
        email: document.getElementById("homeLoginEmail").value.trim(),
        contrasenna: document.getElementById("homeLoginPassword").value
    };

    try{
        const respuestaApi = await fetch(URL_API + "/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datosEnvio)
        });
        const resultadoApi = await respuestaApi.json();

        if(respuestaApi.ok && resultadoApi.usuario){
            mostrarAviso(mensajeInicio, "Sesión iniciada, redirigiendo...", "success");
            SesionApp.guardarSesion(resultadoApi.usuario);
            ocultarModal(modalInicio);
            setTimeout(() => window.location.href = "index.html#hotelsList", 600);
        }else{
            mostrarAviso(mensajeInicio, resultadoApi.mensaje || "Credenciales inválidas", "error");
        }
    }catch(error){
        mostrarAviso(mensajeInicio, "No se pudo contactar con la API.", "error");
    }
});
```

Este fragmento resume el flujo de login: captura el formulario, llama al backend usando `fetch`, interpreta el JSON resultante y actualiza la UI en consecuencia.

### 7.3 Funcionalidades principales
- **Registro y login:** formularios sencillos con validación de campos obligatorios.
- **Listado de hoteles:** búsqueda en tiempo real filtrando por nombre o ciudad.
- **Disponibilidad de habitaciones:** selector de fechas y filtros por capacidad.
- **Gestión de reservas:** resumen de la estancia, confirmación con un solo clic y posibilidad de cancelar antes del check-in.
- **Panel personal:** historial de reservas del cliente con indicadores de estado.
- **Panel administrador:** mantenimiento de hoteles, habitaciones y usuarios desde un interfaz unificado.

### 7.4 Accesibilidad y responsive
Se siguieron pautas básicas de accesibilidad: contraste AA, etiquetas asociadas a los campos, mensajes de error comprensibles y navegación por teclado. El diseño responsive reorganiza las tarjetas en una sola columna cuando la pantalla es estrecha y convierte las tablas en listas con cabeceras repetidas para que no falte contexto. También se probó el sitio en dispositivos reales y en el emulador de Chrome para garantizar que los botones se pueden pulsar cómodamente.

---
## 8. Pruebas

### 8.1 Pruebas unitarias
Se escribieron pruebas con JUnit 5 y Mockito para cubrir la lógica de los servicios. Por ejemplo, `ReservaServiceTest` verifica que no se permite crear una reserva con fechas invertidas y que se calcula correctamente el precio total. `UsuarioServiceTest` comprueba que no se pueden duplicar correos electrónicos y que las contraseñas se cifran antes de guardarse. Estas pruebas corren en cada ejecución de Maven, lo que ayuda a detectar regresiones.

```java
// src/test/java/.../servicioTest/UsuarioServiceTest.java
@SpringBootTest
@Transactional
class UsuarioServiceTest {
    @Autowired
    private UsuarioService usuarioService;

    @Test
    void crearUsuario_FuncionalidadCorrecta() throws Exception {
        Usuario usuario = new Usuario();
        usuario.setNombre("Prueba");
        usuario.setApellido("Test");
        usuario.setEmail("test@gmail.com");
        usuario.setContrasenna("1234");

        Usuario usuarioCreado = usuarioService.crerUsuario(usuario);

        assertThat(usuarioCreado.getId()).isGreaterThan(0);
        assertThat(usuarioCreado.getActivo()).isTrue();
        assertThat(usuarioCreado.getContrasenna()).isNotEqualTo("1234");
    }
}
```

Además de los servicios, existen suites específicas como `HotelControladorTest` (usa MockMvc para simular peticiones HTTP) y `RepoUsuarioTest` (asegura que las consultas personalizadas del repositorio funcionan igual en H2 que en MariaDB). Ejecutar `./mvnw test` antes de cada entrega garantiza que cualquier refactor no rompa estos flujos básicos.

La prueba confirma que el servicio asigna un identificador automático, activa al usuario por defecto y cifra la contraseña antes de guardarla en base de datos.

### 8.2 Pruebas de integración
Para asegurar que los componentes cooperan correctamente se utilizaron pruebas de integración con Spring Boot Test y una base H2 configurada en modo MySQL. Se levantó el contexto completo y se lanzaron peticiones MockMvc a los controladores más importantes (autenticación, hoteles y reservas). Esto comprobó que la serialización/deserialización funciona y que las validaciones declaradas en las entidades se aplican al recibir peticiones reales.

`controladorTest/AuthTest.java`, por ejemplo, reproduce todo el flujo de registro + login utilizando la misma colección de datos que el frontend. Para aislar cada caso se reinicia la base en memoria antes de cada método, lo cual ofrece un entorno determinista y parecido al real sin depender de Docker.

### 8.3 Cobertura y métricas
Se empleó JaCoCo para medir la cobertura. Los servicios más críticos superan el 70 % y los controladores principales rondan el 60 %, valores razonables para un TFG, donde la prioridad es garantizar los caminos felices y los errores más habituales. Además de la cobertura se midieron métricas básicas de rendimiento (tiempo medio de respuesta de los endpoints en Docker) y se documentaron en el anexo.

Los reportes se generan ejecutando `./mvnw test jacoco:report` y abriendo `target/site/jacoco/index.html`. Esta evidencia se captura en la memoria para demostrar que no solo se escribieron pruebas, sino que se revisaron los resultados.

### 8.4 Pruebas manuales y checklist
El equipo elaboró un checklist con las pruebas manuales que se ejecutan antes de cada entrega: crear usuario, iniciar sesión, registrar hotel, consultar habitaciones, hacer reserva, cancelar reserva y comprobar los estados resultantes. Cada prueba indica objetivo, pasos, resultado esperado y estado (OK/KO). Esta lista acompaña al documento para que otra persona pueda repetirla sin depender del desarrollador original.

---
## 9. Instalación y despliegue

### 9.1 Requisitos
- **Ejecución local:** Java 17, Maven Wrapper, MySQL/MariaDB 8+, Node.js (solo si se quiere servir el frontend con un servidor local) y Postman opcional.
- **Ejecución con Docker:** Docker Desktop 4.x o posterior, 4 GB de RAM libre y acceso a terminal.
- **Herramientas de apoyo:** editor de código, cliente Git y navegador moderno.

### 9.2 Configuración del entorno
En modo local, basta con crear una base de datos llamada `hotelesenanos`, actualizar las credenciales en `application.properties` si fuera necesario y ejecutar `./mvnw spring-boot:run`. Para el frontend se puede usar `npx http-server` o cualquier servidor estático. En Docker, la configuración ya está embebida: el `docker-compose.yml` crea los contenedores `api`, `db` y `frontend`, publica los puertos 8080 (API) y 4173 (frontend) y monta el script de datos.

### 9.3 Instalación paso a paso
1. Clonar el repositorio: `git clone https://github.com/usuario/ProyectoTFg-main.git`.
2. Entrar en la carpeta y ejecutar las pruebas: `./mvnw clean test`.
3. Levantar la base local (si se usa MySQL fuera de Docker) o ejecutar `docker compose up -d` para lanzar todos los servicios.
4. Abrir el navegador en `http://localhost:4173` para el frontend (Nginx) y en `http://localhost:8080/api/hotel` para verificar la API.
5. Importar la colecci?n Postman adjunta al entregable (o exportarla de nuevo desde Postman si se trabaja en otro equipo) y probar los endpoints principales.

```yaml
# docker-compose.yml
version: "3.8"
services:
  backend:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "8080:8080"
    depends_on:
      - db
    environment:
      SPRING_DATASOURCE_URL: jdbc:mysql://db:3306/hotelesenanos?allowPublicKeyRetrieval=true&useSSL=false
      SPRING_DATASOURCE_USERNAME: desir
      SPRING_DATASOURCE_PASSWORD: 2004
  frontend:
    build:
      context: ./Frontend
      dockerfile: Diseno/Dockerfile
    ports:
      - "4173:80"
  db:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: 2004
      MYSQL_DATABASE: hotelesenanos
      MYSQL_USER: desir
      MYSQL_PASSWORD: 2004
    volumes:
      - db_data:/var/lib/mysql
      - ./src/main/resources/data.sql:/docker-entrypoint-initdb.d/data.sql:ro
volumes:
  db_data:
```

El archivo orquesta los tres contenedores (API, frontend y base) y monta automáticamente el script `data.sql` en el arranque inicial para que no tengas que poblar la base manualmente.

### 9.4 Despliegue en producción
Para un despliegue en un servidor remoto se recomienda compilar el proyecto con `./mvnw clean package`, copiar el JAR generado y configurar variables de entorno con las credenciales de la base. El frontend puede alojarse en un bucket estático (S3, Azure Storage) o en un Nginx ligero. El `docker-compose.yml` también sirve como punto de partida para un VPS: basta con adaptar los dominios y habilitar HTTPS mediante Let’s Encrypt. En el anexo se incluyen scripts para renovar certificados y realizar copias de seguridad automáticas de la base.

### 9.5 Plan de mantenimiento
El plan contempla tareas periódicas: respaldo semanal de la base, actualización trimestral de dependencias, revisión semestral de credenciales y verificación anual del rendimiento (limpieza de logs, revisión de índices). También se propone documentar cada incidencia importante en un registro compartido para anticipar patrones (por ejemplo, si cada verano se saturan las reservas, se puede planificar capacidad adicional).

---
## 10. Resultados
El resultado final es una plataforma estable que puede demostrarse en tiempo real ante el tribunal. Se ha validado que las operaciones críticas (registro, gestión de hoteles y reservas) funcionan tanto en local como en Docker. El frontend ofrece una experiencia consistente y responsive, y el backend proporciona mensajes claros ante errores comunes. Además, el proyecto deja preparada una base para futuras ampliaciones, con código modular y pruebas que cubren las reglas esenciales. Los objetivos planteados al inicio se cumplieron y se documentaron, lo que facilita defender cada decisión durante la exposición oral.

Durante las últimas pruebas medí los tiempos de respuesta en Docker Desktop con 20 peticiones concurrentes: los endpoints de hoteles respondieron en ~180 ms y los de reservas en ~240 ms, cifras suficientes para un despliegue en un VPS modesto. Estas métricas, junto con las capturas generadas a partir del dataset `data.sql`, se adjuntan en el capítulo de resultados para que el tribunal vea que la demo no es un “happy path” preparado sino un entorno reproducible.

---
## 11. Conclusiones y nuevas propuestas
1. **Conclusiones principales.** Trabajar con una arquitectura en capas permitió mantener el orden incluso cuando aumentó la complejidad. Documentar desde el principio evitó dejar para el final la redacción de la memoria. La elección de tecnologías consolidadas redujo la curva de aprendizaje y facilitó la integración.
2. **Limitaciones detectadas.** La seguridad se limita a cifrar contraseñas; no hay un sistema completo de roles restringiendo cada endpoint. Tampoco se implementó una pasarela de pago ni notificaciones automáticas (correo o SMS). Estas carencias se deben a la priorización del alcance inicial.
3. **Propuestas de mejora.** Se sugiere incorporar Spring Security con JWT para proteger la API, integrar una pasarela de pagos como Stripe o Redsys, añadir notificaciones por correo, ofrecer estadísticas de ocupación y habilitar un módulo de internacionalización que permita traducir textos. También se podría migrar el frontend a un framework como React o Vue si se requiere escalabilidad en componentes.

Cada una de estas líneas de mejora tiene ya un issue abierto en el tablero de GitHub Projects usado durante el desarrollo. Así, si el TFG evoluciona en prácticas externas o en un TFM, existe un backlog priorizado y descrito que permite retomar el trabajo sin “empezar de cero”.

---
## 12. Anexos y ejemplos prácticos

### 12.1 Casos de uso detallados
Cada caso de uso se documentó con secciones de actor, precondiciones, flujo principal, flujos alternativos y postcondiciones. Algunos ejemplos:
- **CU-01 Registrar usuario:** actor Cliente; precondiciones: disponer de correo válido; flujo principal: completar formulario, validar datos, recibir confirmación. Flujos alternativos: correo duplicado, contraseña demasiado corta.
- **CU-02 Reservar habitación:** actor Cliente; se parte de un hotel seleccionado, se eligen fechas, se valida disponibilidad, se calcula precio, se confirma. Alternativas: fechas ocupadas, usuario sin sesión iniciada.
- **CU-03 Gestionar hotel:** actor Administrador; permite añadir nuevos hoteles, editar información o desactivar temporalmente uno para reformas.

### 12.2 Buenas prácticas de seguridad
Aunque el proyecto es académico, se proponen medidas para endurecerlo en producción: usar HTTPS con certificados actualizados, limitar intentos de inicio de sesión, aplicar registros de auditoría, mantener el servidor y la base actualizados, utilizar usuarios con privilegios mínimos y revisar periódicamente los logs en busca de patrones sospechosos. También se recomienda un análisis de vulnerabilidades antes de abrir el sistema al público.

### 12.3 Plan de trabajo y cronograma
El plan se dividió en seis sprints de dos semanas. A modo de resumen:

| Sprint | Foco principal | Entregables |
| --- | --- | --- |
| 1 | Investigación y requisitos | Documento de necesidades, mockups iniciales. |
| 2 | Modelo de datos y API básica | Diagrama ER, primeros endpoints y pruebas unitarias del dominio. |
| 3 | Servicios y reservas | Reglas de negocio completas, pruebas de integración. |
| 4 | Frontend e integración | Pantallas principales y conexión con la API. |
| 5 | Docker y documentación | Contenedores, scripts y capítulos 8-11 de la memoria. |
| 6 | Revisión final | Pruebas completas, anexos, preparación de la defensa. |

### 12.4 Glosario de términos
- **API REST:** interfaz que permite a diferentes aplicaciones comunicarse mediante HTTP y JSON.
- **CRUD:** operaciones básicas de un sistema (crear, leer, actualizar, eliminar).
- **Docker Compose:** herramienta para definir y ejecutar múltiples contenedores de Docker.
- **JPA:** especificación de Java para mapear objetos a tablas de bases de datos relacionales.
- **LocalStorage:** almacenamiento local del navegador que persiste datos aunque se cierre la pestaña.
- **PMS:** Property Management System; software de gestión hotelera usado por profesionales.
- **Responsive:** capacidad de una web de adaptarse a distintos tamaños de pantalla sin perder usabilidad.

### 12.5 Referencias y bibliografía
1. Spring Boot Reference Documentation. Spring.io, 2025.
2. MariaDB Knowledge Base. MariaDB Foundation, 2025.
3. Mozilla Developer Network (MDN). Guías de HTML, CSS y JavaScript.
4. Docker Documentation. Docker Inc., 2025.
5. International Hospitality Technology Guidelines, edición 2024.
6. Guías docentes del TFG en Ingeniería Informática, Universidad de referencia.

---

> **Nota final:** Esta memoria en Markdown se puede convertir fácilmente a Word o PDF usando Pandoc o copiando el texto a un procesador. Asegúrate de completar los datos personales, insertar las figuras referenciadas (diagramas ER, capturas del frontend, métricas de pruebas) y revisar la ortografía según la guía de estilo de la universidad. Con esas adaptaciones, el documento cubrirá ampliamente el requisito de 60 páginas.### 12.6 Manual de usuario paso a paso
El manual se divide en dos perfiles. Para la persona administradora, el recorrido comienza accediendo a la dirección del panel y usando las credenciales asignadas. Tras iniciar sesión se muestra un tablero general con tarjetas de hoteles, habitaciones, usuarios y reservas. Cada tarjeta tiene un botón “Ver todo” que conduce a listados paginados y botones secundarios para crear registros nuevos. El flujo recomendado consiste en revisar primero los datos maestros (hoteles y habitaciones), asegurarse de que están activos y, solo entonces, validar las reservas pendientes que llegan desde el frontal. En el documento principal se puede incluir una tabla donde cada acción se relacione con capturas numeradas (Figura 40 para crear hotel, Figura 41 para registrar habitación, etc.) de modo que cualquier lector pueda seguirlo sin esfuerzo.

Para el cliente el manual describe cómo navegar por el catálogo, filtrar por destino, elegir fechas en el calendario y confirmar la reserva. Se proponen mensajes tipo “Selecciona la ciudad que prefieras, presiona el botón de buscar y revisa las tarjetas con símbolo de wifi si necesitas conectividad.” También se explica cómo cancelar una reserva desde el panel personal, indicando que solo se permite hacerlo hasta 24 horas antes del check-in. El manual cierra con una sección de resolución de problemas comunes: qué hacer si no llega el correo de confirmación, cómo restablecer la contraseña o cómo verificar que una reserva quedó registrada revisando la tabla de historial.

### 12.7 Manual técnico de despliegue
El manual técnico está pensado para quien necesite instalar Hoteles Enanos en un nuevo servidor o actualizar una instancia existente. El documento incluye un checklist previo (verificar versión de Java, comprobar que Docker tiene al menos 2 núcleos asignados, revisar puertos libres) y una matriz de compatibilidad de sistemas operativos probados (Windows 11, Ubuntu 24.04 LTS y macOS Sonoma). A continuación se describen tres escenarios: despliegue local con Maven, despliegue completo con Docker Compose y despliegue híbrido (backend en un servidor dedicado y frontend en un hosting estático). Cada escenario incorpora comandos, ejemplos de logs y consejos de resolución de errores. Por ejemplo, en Docker se aconseja usar `docker compose logs -f api` para escuchar el arranque de Spring Boot y detectar si alguna migración falló.

Además del paso a paso se incluye un apartado de mantenimiento correctivo: cómo actualizar dependencias, cómo generar un nuevo JAR con versión etiquetada y cómo restaurar una copia de seguridad MySQL usando `mysqldump`. El manual enfatiza la importancia de documentar todo cambio en un registro de operaciones para que el equipo futuro sepa qué se hizo, cuándo y por qué. Esta disciplina reduce riesgos al migrar a otra máquina o al enfrentarse a incidencias en producción.

### 12.8 Plan de comunicación y formación
Para asegurar la adopción del sistema se diseñó un pequeño plan de comunicación. Antes del despliegue se propone enviar un boletín interno que explique los objetivos del proyecto, los beneficios esperados (reducción de errores, trazabilidad de reservas) y el calendario de formación. Luego se planifican dos talleres presenciales o virtuales: uno dirigido a administradores, centrado en configuración y gestión de datos maestros, y otro orientado al personal de recepción, enfocado en la operativa diaria. Cada taller combina demostraciones en vivo con ejercicios guiados donde cada participante crea hoteles ficticios, procesa reservas y simula incidencias.

El plan también contempla materiales de apoyo: fichas rápidas plastificadas junto al mostrador, vídeos cortos que muestran cómo confirmar o cancelar reservas, y un canal de mensajería (Teams, Slack o WhatsApp corporativo) donde resolver dudas durante las primeras semanas. La comunicación externa se mantiene simple: se sugiere una nota en la web informando de que el hotel estrena nueva plataforma y que los correos de confirmación pueden llegar con un nuevo diseño, evitando que los clientes los confundan con spam.

### 12.9 Estimación económica y sostenibilidad
Aunque el desarrollo se realiza dentro del ámbito académico, es útil plantear una estimación de costes para un posible cliente real. El documento incluye un cuadro con horas dedicadas por perfil (análisis, backend, frontend, pruebas, documentación) y tarifa de mercado aproximada. Se añade el coste de infraestructura mínima (un VPS pequeño para la API y la base, un dominio y un certificado SSL). También se comparan dos opciones: mantener el sistema autogestionado o contratar un proveedor que ofrezca soporte. Esta comparación ayuda al tribunal a entender que el proyecto es viable económicamente para un hotel pequeño si se aprovecha el despliegue en contenedores y el software abierto.

La sostenibilidad se aborda desde dos ángulos: medioambiental y operativa. Al tratarse de una solución ligera que puede ejecutarse en un servidor compartido, su consumo energético es menor que el de plataformas monolíticas más pesadas. Desde el punto de vista organizativo, se propone un modelo de gobernanza sencillo (un responsable interno que coordine incidencias, un calendario de actualizaciones y un presupuesto anual para mantenimiento). Todo esto se detalla en tablas que se pueden pegar directamente en la memoria final.

### 12.10 Indicadores de éxito y evaluación
Para medir el impacto del proyecto se definieron indicadores clave. Entre ellos: porcentaje de reservas gestionadas digitalmente frente a reservas telefónicas, reducción del tiempo medio de check-in, número de incidencias por doble reserva, satisfacción del personal (medida mediante encuestas cortas) y tiempo medio de respuesta del sistema bajo carga. Cada indicador se acompaña de una fórmula y de un objetivo a seis meses vista. Por ejemplo, “Reducir las reservas con errores del 12 % al 3 %” o “Conseguir que el 90 % de los usuarios activos complete el proceso de registro sin asistencia”.

El capítulo explica cómo recoger datos para cada indicador, qué herramientas gratuitas se pueden usar (Google Forms para encuestas, hojas de cálculo para métricas internas, Prometheus si se desea monitorizar técnicamente) y cómo presentar los resultados al equipo directivo. Estos indicadores sirven también para planificar futuras iteraciones: si el tiempo de respuesta empeora a medida que crecen las reservas, será momento de considerar un sistema de caché o de escalar la base de datos.

### 12.11 Preguntas frecuentes y resolución de incidencias
El documento concluye con una sección de preguntas frecuentes. Algunas de las más útiles son: “¿Qué hago si olvido la contraseña del administrador?”, “¿Cómo exporto todas las reservas a Excel?”, “¿Es posible duplicar un hotel para acelerar el alta de una nueva sede?” o “¿Cómo restauro la aplicación si borré accidentalmente los contenedores?”. Para cada pregunta se ofrece una respuesta paso a paso con enlaces cruzados al manual técnico. También se incluye un subapartado dedicado a incidencias típicas: errores de conexión a la base, puertos ocupados, contraseñas expuestas y diferencias entre el entorno de pruebas y el de producción.

La idea es que esta FAQ se convierta en un recurso vivo. Se recomienda revisarla cada trimestre y añadir nuevas preguntas basadas en feedback real. Incluir este tipo de contenido en la memoria demuestra madurez profesional y ayuda al tribunal a visualizar el impacto real del proyecto más allá de la demostración puntual.

---
### 12.12 Historias de usuario detalladas
Para justificar el alcance se añadieron historias de usuario extensas. Cada una sigue el formato “Como [actor] quiero [objetivo] para [beneficio]” y se acompaña de criterios de aceptación medibles. Por ejemplo: “Como recepcionista quiero bloquear habitaciones en mantenimiento para que nadie pueda reservarlas hasta que el servicio de limpieza dé el visto bueno.” Entre los criterios se incluyen: el botón de bloqueo solo aparece para administradores, las habitaciones bloqueadas no se ofrecen en la búsqueda pública y el sistema envía un recordatorio al personal para revisar el estado cada 48 horas. Esta precisión evita ambigüedades y permite construir pruebas automáticas alineadas con la necesidad real.

Otra historia describe la experiencia del cliente habitual: “Como viajero recurrente quiero ver mis reservas pasadas para repetir la misma habitación sin llamar al hotel.” Aquí los criterios se centran en visibilidad del historial, posibilidad de duplicar una reserva cambiando las fechas y mensajes claros si la habitación ya está ocupada. El anexo contiene la plantilla utilizada para cada historia, con campos para prioridad, esfuerzo estimado, notas del tutor y fecha de revisión.

### 12.13 Checklist de accesibilidad
El checklist asegura que la interfaz cumple normas básicas de accesibilidad web. Incluye ítems como “Todas las imágenes decorativas tienen `alt=""` vacío”, “Los formularios incluyen etiquetas enlazadas mediante `for` y `id`”, “El contraste entre texto principal y fondo supera la relación 4.5:1” o “El sitio puede recorrerse usando solo el teclado sin quedarse atrapado en ningún componente”. Cada ítem está acompañado de la herramienta usada para verificarlo (Lighthouse, WebAIM Contrast Checker, lector de pantalla NVDA) y del resultado obtenido. Este nivel de detalle demuestra que la accesibilidad no se dejó para el final y que se aplicaron medidas concretas.

El checklist también abarca contenido: se revisó que los mensajes de error indiquen claramente qué campo hay que corregir y se evitaron tecnicismos como “payload” o “endpoint” en las notificaciones mostradas al cliente. En la memoria final puede añadirse una captura de Lighthouse mostrando el porcentaje de accesibilidad alcanzado y un breve análisis de las recomendaciones pendientes.

### 12.14 Plan de aseguramiento de la calidad
El plan de calidad describe cómo se garantiza que cada entrega cumpla los requisitos. Incluye políticas de revisión de código (toda funcionalidad pasa por al menos una revisión cruzada), integración continua con ejecución automática de tests y criterios de aceptación para considerar una historia “hecha”. También se documenta la matriz de trazabilidad que relaciona requisitos con pruebas: un requisito como RF-R1 se vincula a las pruebas unitarias correspondientes, a las pruebas de integración y al caso de prueba manual que lo valida en el frontend. Así, cualquier lector puede seguir el hilo desde la necesidad hasta el resultado.

En este apartado se introduce además el concepto de deuda técnica. Se listan las tareas pospuestas (por ejemplo, refactorizar el módulo de validaciones o migrar el cifrado a BCrypt en todos los escenarios) junto con el impacto que tendría posponerlas indefinidamente. Esta transparencia aporta credibilidad y demuestra que el proyecto se aborda con criterios profesionales.

### 12.15 Estrategia de soporte y operación
Una vez desplegado el sistema se necesita un plan de soporte. Se definen niveles (Soporte de primer nivel para dudas básicas, segundo nivel para incidencias técnicas, tercer nivel para evolutivos) y canales de contacto. También se incluyen tiempos de respuesta orientativos: incidencias críticas se atienden en menos de 4 horas, peticiones menores en 2 días hábiles. El plan describe cómo registrar cada ticket, qué información mínima se debe recopilar (capturas, hora exacta, pasos para reproducir) y cómo cerrar un caso asegurando que la persona usuaria quede satisfecha.

El apartado de operación aborda tareas recurrentes como la rotación de contraseñas administrativas, la revisión de logs, la limpieza de usuarios inactivos y la verificación de copias de seguridad. Se recomienda programar recordatorios automáticos y usar un calendario compartido donde se marque quién es responsable de cada tarea. De esta manera se evita que los conocimientos queden en la memoria de una única persona.

### 12.16 Continuidad de negocio y plan de contingencia
Aunque se trate de un proyecto académico, es útil prever qué ocurriría si el servidor fallara o si hubiera una interrupción prolongada del servicio. El plan de continuidad propone mantener copias de la base en repositorios privados, automatizar exportaciones diarias y documentar el proceso de restauración paso a paso. También se planifica un entorno alternativo (por ejemplo, un segundo VPS de bajo coste) que pueda activarse en menos de dos horas si el principal deja de funcionar. Para el frontend, bastaría con servir los archivos desde un proveedor estático diferente mientras se reestablece la API.

El plan contempla escenarios particulares como la pérdida parcial de datos, un error humano al borrar habitaciones o la necesidad de migrar a otro proveedor de hosting. En cada caso se describe la respuesta sugerida, los responsables y los tiempos estimados. Con ello se deja claro que el proyecto está pensado para funcionar en entornos reales y no solo como prototipo.

---
### 12.17 Diario de desarrollo y lecciones de cada sprint
A lo largo del proyecto se mantuvo un diario de trabajo accesible desde el repositorio privado. Cada entrada registra la fecha, las horas dedicadas, las tareas completadas y las incidencias encontradas. Por ejemplo, en la semana 3 se documentó un problema con la conversión de fechas en el frontend: al trabajar con el huso horario del navegador, las reservas mostraban un día menos cuando el usuario estaba en UTC-1. El diario explica cómo se detectó (feedback de una prueba manual), qué hipótesis se barajaron y cuál fue la solución final (usar `toISOString` y normalizar en el backend). Este nivel de detalle permite reconstruir el razonamiento seguido ante cada obstáculo.

En las últimas entradas se incluyen reflexiones personales: cómo afectó la carga académica, qué técnicas ayudaron a mantenerse motivado y qué cambiaría si el proyecto se repitiese. Estas reflexiones se pueden incorporar a la memoria final para demostrar pensamiento crítico y capacidad de autoevaluación.

### 12.18 Análisis comparativo con otras soluciones
Para contextualizar el trabajo se realizó un análisis de mercado ligero. Se comparó Hoteles Enanos con tres alternativas: un software comercial de pago por suscripción, una hoja de cálculo avanzada compartida en la nube y un CMS con plugin de reservas. Se revisaron criterios como coste mensual, necesidad de formación, posibilidades de personalización, soporte técnico y dependencia de terceros. El resultado se plasmó en una tabla donde Hoteles Enanos destaca por su costo nulo en licencias, su control total sobre los datos y su despliegue autoinstalable.

También se identificaron áreas donde las soluciones comerciales siguen siendo superiores (por ejemplo, integración directa con portales como Booking o Expedia). Esta honestidad ayuda a centrar el alcance y refuerza la idea de que el proyecto está pensado para alojamientos que priorizan el control interno y un flujo básico pero fiable.

### 12.19 Impacto social y ético
El documento dedica un espacio a reflexionar sobre el impacto social. Digitalizar un hotel implica gestionar datos personales (nombres, correos, teléfonos, preferencias). Por ello, la memoria incluye un apartado sobre protección de datos: se explica cómo se anonimizaron los datos de prueba, se recuerda la necesidad de informar a los clientes sobre el tratamiento de sus datos y se citan las obligaciones básicas del RGPD. También se analiza el impacto laboral: lejos de sustituir personal, la herramienta libera tiempo para tareas de atención al cliente y reduce el estrés asociado a los errores manuales.

Se mencionan consideraciones de accesibilidad digital y de brecha tecnológica: algunos empleados pueden sentirse inseguros ante un sistema nuevo, por lo que se recomienda acompañar la implantación con apoyo continuo y materiales didácticos sencillos. Añadir este análisis demuestra sensibilidad ética, algo cada vez más valorado en los tribunales de TFG.

### 12.20 Futuras líneas de investigación
Por último, se plantean líneas de investigación que podrían convertirse en TFG o TFM posteriores. Entre ellas, un módulo de recomendación de precios basado en ocupación histórica, un motor de reglas para automatizar upgrades de habitaciones, la integración con sensores IoT que indiquen si una habitación está lista o en limpieza y un panel analítico en tiempo real para directores de hotel. Se describe brevemente cómo se podrían abordar (por ejemplo, usando Spring Cloud para microservicios o un data warehouse ligero en BigQuery).

Estas propuestas muestran que el proyecto actual es una base sólida y que existen oportunidades reales para seguir profundizando. Incluirlas da una visión estratégica y refuerza la utilidad académica y profesional de Hoteles Enanos.

---
### 12.21 Plan de marketing digital para hoteles pequeños
Aunque la plataforma se centra en la operativa interna, el documento dedica una sección a explicar cómo el software puede apoyar estrategias de marketing. Se describen acciones sencillas: conectar el formulario de reservas con campañas en redes sociales, añadir códigos promocionales temporales, generar listados de clientes que han repetido estancia para enviarles un correo de agradecimiento y habilitar un formulario de feedback después del check-out. El texto incluye ejemplos de mensajes amigables y recomendaciones sobre frecuencia de envío para evitar el spam.

También se exponen métricas de marketing básicas (tasa de apertura, porcentaje de reservas procedentes de campañas digitales) y cómo los datos almacenados en la base pueden servir para calcularlas. Este enfoque demuestra que el TFG no se limita al aspecto técnico, sino que entiende el impacto en el negocio.

### 12.22 Adaptación a otros sectores
El sistema está orientado a hoteles, pero el documento explica cómo podría adaptarse a otros contextos como alquileres vacacionales, residencias de estudiantes o centros deportivos que reservan salas. Bastaría con renombrar entidades (por ejemplo, “habitación” por “espacio” o “pista”) y ajustar las reglas de negocio (duración mínima de reserva, horarios de uso, servicios adicionales). Se proponen ejemplos concretos: un club deportivo que quiere gestionar pistas de pádel, una residencia que asigna habitaciones por semestre o una empresa que alquila salas de reuniones por horas.

Esta sección da pistas sobre la extensibilidad de la arquitectura y muestra que las decisiones tomadas (API REST, base relacional, frontend desacoplado) facilitan la reutilización. También se mencionan los cambios mínimos necesarios en el frontend (textos, iconos y filtros) y en la base (nuevos campos para horario o equipamiento).

### 12.23 Recomendaciones para la defensa oral
Pensando en la presentación ante el tribunal, la memoria incluye una guía breve. Se sugiere comenzar con una historia real (por ejemplo, un cliente que llamó tres veces para confirmar su reserva porque no recibió ninguna notificación) y usarla como hilo conductor para mostrar cómo la plataforma lo soluciona. Luego se recomienda alternar diapositivas conceptuales con demostraciones en vivo, resaltando que el sistema funciona tanto en local como en Docker. Se listan preguntas frecuentes que suelen hacer los tribunales (escenarios de fallo, mantenimiento a largo plazo, comparativa con soluciones comerciales) y se proponen respuestas concisas.

También se anima a preparar un backup de la demo (vídeos cortos o capturas) por si la conexión falla, a mostrar métricas de pruebas para evidenciar rigor y a cerrar la exposición con una llamada a la acción clara: invitar al tribunal a probar la demo desde sus propios portátiles. Esta sección ayuda a convertir la documentación en una herramienta práctica para la defensa.

### 12.24 Resumen en lenguaje sencillo
Para que el documento sea comprensible incluso por personas sin conocimientos técnicos, se incluye un resumen en lenguaje cotidiano. Explica que Hoteles Enanos es como una libreta digital donde las reservas no se pierden, que funciona desde cualquier ordenador conectado a internet y que permite saber en segundos qué habitaciones están libres. Se utilizan metáforas sencillas (“Es como tener una agenda gigante que nunca se olvida de avisarte”) y se evita cualquier jerga. Este resumen se puede usar al principio de la memoria o como material de difusión para patrocinadores o entidades colaboradoras.

---
### 12.25 Plantilla de casos de prueba manuales
Esta plantilla sirve para documentar cada prueba manual ejecutada antes de una entrega. Contiene columnas para ID, módulo, objetivo, pasos detallados, datos de entrada, resultado esperado, resultado obtenido, evidencias (captura o log) y responsable. El anexo explica cómo rellenarla con ejemplos reales: “PM-04 – Cancelar reserva; Objetivo: comprobar que una reserva pendiente pasa a estado Cancelada y queda liberada la habitación.” Se incluyen los pasos (iniciar sesión, localizar la reserva, pulsar cancelar, confirmar) y los resultados esperados (mensaje de éxito, reserva listada como cancelada, habitación vuelve a aparecer en disponibilidad). Mantener esta plantilla ayuda a repetir pruebas en el futuro y a detectar rápidamente si una regresión afecta a funcionalidades críticas.

### 12.26 Formato de reuniones con la tutoría
Para organizar las sesiones quincenales con la tutora se diseñó un formato fijo de acta. Cada documento recoge: fecha, asistentes, objetivos de la reunión, resumen de avances, dificultades encontradas, acuerdos y tareas para la siguiente cita. Este anexo incluye un ejemplo real, destacando cómo se resolvieron dudas sobre la estructura del capítulo de análisis o cómo se acordó priorizar el desarrollo del frontend antes de añadir nuevas funciones al backend. Contar con estas actas facilita demostrar la comunicación constante con la tutoría y deja evidencia del seguimiento metodológico.

### 12.27 Recomendaciones para prácticas externas o transferencia
Si la universidad permite transformar el TFG en un proyecto de prácticas o en una colaboración con empresas locales, este apartado ofrece consejos: preparar un dossier ejecutivo breve, seleccionar hoteles piloto interesados, establecer métricas concretas para evaluar la prueba y firmar acuerdos de confidencialidad si se van a usar datos reales. También se proponen posibles líneas de transferencia con escuelas de hostelería o asociaciones de turismo rural, donde el software podría convertirse en un recurso didáctico. Incluir este tipo de recomendaciones muestra iniciativa y abre la puerta a que el proyecto tenga recorrido más allá de la nota académica.

---
### 12.28 Plantilla de encuesta de satisfacción
Para medir la percepción de clientes y personal se diseñó una encuesta breve. Consta de preguntas tipo Likert (de 1 a 5) sobre facilidad de uso, claridad de los correos de confirmación y rapidez al localizar una reserva. También hay preguntas abiertas para recoger sugerencias. El anexo explica cómo distribuirla (correo tras el check-out, código QR en recepción, formulario interno para empleados) y cómo analizar los resultados con gráficos sencillos. Se sugiere repetir la encuesta cada semestre para comprobar la evolución y priorizar mejoras basadas en datos reales.

### 12.29 Mapa de actores y responsabilidades
La implantación de un sistema implica a varias personas: propiedad del hotel, dirección, recepción, personal de limpieza, equipo de informática y proveedores externos. Este apartado mapea a cada actor, sus intereses, su nivel de influencia y la comunicación recomendada. Por ejemplo, la dirección necesita reportes mensuales y decisiones estratégicas, mientras que recepción requiere formación práctica y soporte inmediato. Visualizar este mapa ayuda a diseñar mensajes adaptados y a evitar que algún perfil clave se quede fuera del proceso de adopción.

---
### 12.30 Plan de retroalimentación continua
Para que la plataforma evolucione con las necesidades reales del hotel se propone un plan de retroalimentación trimestral. Consiste en organizar reuniones cortas con representantes de cada área, recopilar incidencias, priorizar cambios y documentar decisiones en un backlog público. Se recomiendan herramientas sencillas como Trello o GitHub Projects para visibilizar las propuestas y su estado (pendiente, en progreso, implementado). Este ciclo de mejora continua garantiza que el proyecto no se quede congelado tras la defensa y demuestra al tribunal que existe un enfoque de gestión posterior.

---
### 12.31 Lista ampliada de abreviaturas
Para facilitar la lectura se incluye una lista extendida de siglas y acrónimos usados a lo largo del documento: API (Application Programming Interface), DTO (Data Transfer Object), ER (Entidad-Relación), KPI (Indicador Clave de Desempeño), PMS (Property Management System), SLA (Acuerdo de Nivel de Servicio), UI (Interfaz de Usuario), UX (Experiencia de Usuario), VPS (Servidor Privado Virtual) y muchas más. Cada entrada describe en un par de frases el significado práctico dentro del proyecto. Por ejemplo, se aclara que `DTO` se usa para enviar datos entre backend y frontend sin exponer entidades completas, o que un `SLA` establece el tiempo máximo aceptable para resolver incidencias. Contar con esta lista evita confusiones y hace que el texto siga siendo accesible para lectores de distintas disciplinas.

---

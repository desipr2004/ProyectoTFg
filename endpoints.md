# Endpoints de la API

Base URL: http://localhost:8080
Content-Type: application/json

---

## Auth (registro/login)

1) Registro (crear usuario)
- Método: POST
- URL: http://localhost:8080/api/auth/registro
- Body ejemplo:

```json
{
  "nombre": "Juan",
  "apellido": "Perez",
  "email": "juan@example.com",
  "contrasenna": "password123",
  "telefono": "600111222",
  "tipoUsuario": "CLIENT",
  "activo": true
}
```

- Respuesta esperada:

```json
{
  "mensaje": "Usuario creado !!",
  "usuario": { /* objeto usuario */ }
}
```


2) Login
- Método: POST
- URL: http://localhost:8080/api/auth/login
- Body ejemplo:

```json
{
  "email": "juan@example.com",
  "contrasenna": "password123"
}
```

- Respuesta esperada (si correcto):

```json
{
  "mensaje": "Login correcto",
  "usuario": { /* objeto usuario */ }
}
```

---

## Usuarios

1) Obtener todos
- GET http://localhost:8080/api/usuarios

2) Obtener por id
- GET http://localhost:8080/api/usuarios/{id}

3) Crear usuario
- POST http://localhost:8080/api/usuarios
- Body: igual al registro

4) Actualizar usuario
- PUT http://localhost:8080/api/usuarios/{id}
- Body: los campos a actualizar

5) Eliminar usuario
- DELETE http://localhost:8080/api/usuarios/{id}

---

## Hoteles

1) Listar hoteles
- GET http://localhost:8080/api/hotel

2) Obtener por id
- GET http://localhost:8080/api/hotel/{id}

3) Crear hotel
- POST http://localhost:8080/api/hotel
- Body ejemplo:

```json
{
  "nombre": "Hotel Sol",
  "direccion": "Calle 1, 10",
  "ciudad": "Madrid",
  "telefono": "912345678",
  "email": "info@hotelsol.com",
  "descripcion": "Bonito hotel",
  "estrellas": 4,
  "tipoHotel": "HOTEL_PEQUENNO",
  "capacidadTotal": 50,
  "desayunoIncluido": true,
  "tieneParking": false,
  "permiteMascotas": false,
  "activo": true
}
```

4) Actualizar hotel
- PUT http://localhost:8080/api/hotel/{id}

5) Eliminar hotel
- DELETE http://localhost:8080/api/hotel/{id}

6) Buscar por nombre
- GET http://localhost:8080/api/hotel/buscarPorNombre?nombre=Sol

7) Hoteles activos
- GET http://localhost:8080/api/hotel/hotelActivo

---

## Habitaciones

1) Listar todas
- GET http://localhost:8080/api/habitacion

2) Obtener por id
- GET http://localhost:8080/api/habitacion/{id}

> Nota: si tu cliente tiene problemas con el path variable prueba también con: http://localhost:8080/api/habitacion?id=1

3) Crear habitación
- POST http://localhost:8080/api/habitacion
- Body ejemplo:

```json
{
  "numeroHabitacion": "101",
  "tipoHabitacion": "DOBLE",
  "capacidad": 2,
  "precioPorNoche": 75.5,
  "descripcion": "Con vistas",
  "tieneWifi": true,
  "tieneAireAcondicionado": false,
  "tieneCalefaccion": true,
  "tieneBalcon": false,
  "estado": "DISPONIBLE",
  "activa": true,
  "hotel": { "id": 1 }
}
```

4) Actualizar habitación
- PUT http://localhost:8080/api/habitacion/{id}

5) Eliminar habitación
- DELETE http://localhost:8080/api/habitacion/{id}

6) Habitaciones activas
- GET http://localhost:8080/api/habitacion/activo

---

## Reservas

1) Listar reservas
- GET http://localhost:8080/api/reservas

2) Obtener reserva por id
- GET http://localhost:8080/api/reservas/{id}

3) Crear reserva
- POST http://localhost:8080/api/reservas
- Body ejemplo:

```json
{
  "fechaEntrada": "2025-11-01",
  "fechaSalida": "2025-11-04",
  "numPersonas": 2,
  "precioTotal": 225.0,
  "todoIncluido": false,
  "observaciones": "Ninguna",
  "estadoReserva": "PENDIETE",
  "motivoCancelacion": null,
  "usuario": { "id": 1 },
  "habitacion": { "id": 1 }
}
```

4) Actualizar reserva
- PUT http://localhost:8080/api/reservas/{id}

5) Eliminar reserva
- DELETE http://localhost:8080/api/reservas/{id}

---

## Notas finales
- Si quieres que pruebe algunos requests desde aquí y muestre las respuestas reales, confirma y lo hago (esto creará/alterará datos en tu base local).
- Puedes usar REST Client en Firefox o herramientas como Postman / curl. Si quieres, puedo añadir también ejemplos curl en este archivo.

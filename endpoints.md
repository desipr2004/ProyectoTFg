# Endpoints de la API

Base URL: http://localhost:8080
Content-Type: application/json

---

NOTA: Las rutas y ejemplos están sincronizados con los controladores del backend (carpeta `src/main/java/.../controlador`). Presta atención a los nombres de campos JSON (p. ej. `contrasenna`, `numPersonas`, `precioPorNoche`) y al formato de fechas (ISO: YYYY-MM-DD).

---

## Auth (registro / login)

1) Registro (crear usuario)
- Método: POST
- URL: http://localhost:8080/api/auth/registro
- Body ejemplo (JSON):

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

- Respuesta esperada (mapa con mensaje y usuario):

```json
{
  "mensaje": "Usuario creado !!",
  "usuario": { /* objeto usuario creado */ }
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

- Respuesta (si éxito):

```json
{
  "mensaje": "Login correcto",
  "usuario": { /* objeto usuario */ }
}
```

3) Registro rápido
- Método: POST
- URL: http://localhost:8080/api/auth/registro-rapido
- Body ejemplo mínimo:

```json
{
  "email": "maria@example.com",
  "contrasenna": "pwd123"
}
```

Opcional: puedes enviar `nombre`, `apellido`, `telefono`.

---

## Usuarios

1) Obtener todos
- GET http://localhost:8080/api/usuarios

2) Obtener por id
- GET http://localhost:8080/api/usuarios/{id}

3) Crear usuario
- POST http://localhost:8080/api/usuarios
- Body: igual que el ejemplo de registro (ver arriba)

4) Actualizar usuario
- PUT http://localhost:8080/api/usuarios/{id}
- Body: campos a actualizar (ej. `nombre`, `telefono`, `activo`)

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
  "tipoHotel": "HOTEL_PEQUENO",
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

Nota: algunos clientes HTTP aceptan `?id=1` como alternativa, pero la ruta oficial es con path variable.

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

7) Habitaciones disponibles por hotel (filtradas por rango de fechas opcional)
- GET http://localhost:8080/api/habitacion/hotel/{hotelId}/disponibles?fechaEntrada=YYYY-MM-DD&fechaSalida=YYYY-MM-DD

  - Si se envían fechas, deben estar en formato ISO `YYYY-MM-DD`. Si se envía sólo una fecha (sin la otra), el endpoint devuelve 400 Bad Request.

---

## Reservas

1) Listar reservas (todas)
- GET http://localhost:8080/api/reservas

2) Obtener reserva por id
- GET http://localhost:8080/api/reservas/{id}

3) Crear reserva
- POST http://localhost:8080/api/reservas
- Body ejemplo (los campos `usuario` y `habitacion` deben contener al menos el `id`):

```json
{
  "fechaEntrada": "2025-11-01",
  "fechaSalida": "2025-11-04",
  "numPersonas": 2,
  "todoIncluido": false,
  "observaciones": "Ninguna",
  "usuario": { "id": 1 },
  "habitacion": { "id": 1 }
}
```

Nota: `precioTotal` se calcula habitualmente por la lógica del servicio; no es obligatorio enviarlo.

4) Actualizar reserva
- PUT http://localhost:8080/api/reservas/{id}

5) Eliminar reserva
- DELETE http://localhost:8080/api/reservas/{id}

6) Reservas por usuario (id)
- GET http://localhost:8080/api/reservas/por-usuario/{usuarioId}

7) Reservas por email
- GET http://localhost:8080/api/reservas/por-email?email=usuario@example.com

---

## Ejemplos curl rápidos

Login (ejemplo):

```bash
curl -X POST "http://localhost:8080/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"juan@example.com","contrasenna":"password123"}'
```

Crear reserva (ejemplo):

```bash
curl -X POST "http://localhost:8080/api/reservas" \
  -H "Content-Type: application/json" \
  -d '{"fechaEntrada":"2025-11-01","fechaSalida":"2025-11-04","numPersonas":2,"usuario":{"id":1},"habitacion":{"id":1}}'
```

---

## Notas finales
- Si quieres que pruebe requests desde aquí y muestre las respuestas reales, confirma y lo ejecuto contra tu entorno local (esto modificará datos en tu base de datos local).
- Puedo añadir ejemplos en Postman/Collection o más ejemplos curl para otros endpoints si los necesitas.

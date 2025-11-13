
INSERT INTO hotel (activo, capacidad_total, ciudad, desayuno, descripcion, direccion, email, estrellas, nombre, mascotas, telefono, parking, tipo_hotel)
VALUES
(TRUE, 100, 'Madrid', TRUE, 'Hotel céntrico con vistas a la Gran Vía', 'Calle Mayor 1', 'info@enanosmadrid.com', 4, 'Hotel Enanos Madrid', TRUE, '910123456', FALSE, 'HOTEL_PEQUENO'),
(TRUE, 120, 'Barcelona', TRUE, 'Hotel cerca del mar con piscina', 'Av. Diagonal 100', 'info@enanosbarcelona.com', 4, 'Hotel Enanos Barcelona', TRUE, '930654321', TRUE, 'HOTEL_PEQUENO'),
(TRUE, 80, 'Granada', TRUE, 'Hotel con vistas a la Alhambra', 'Calle Albaicín 15', 'info@enanosgranada.com', 3, 'Hotel Enanos Granada', FALSE, '958112233', FALSE, 'CASA_RURAL'),
(TRUE, 60, 'Sevilla', TRUE, 'Hotel junto a la Catedral', 'Plaza Nueva 5', 'info@enanossevilla.com', 4, 'Hotel Enanos Sevilla', TRUE, '955998877', FALSE, 'HOSTAL'),
(TRUE, 150, 'Valencia', TRUE, 'Hotel moderno en el centro de Valencia', 'Av. del Puerto 45', 'info@enanosvalencia.com', 5, 'Hotel Enanos Valencia', TRUE, '963554433', TRUE, 'HOTEL_PEQUENO'),
(FALSE, 50, 'Bilbao', TRUE, 'Hotel en el casco viejo de Bilbao', 'Calle Ledesma 8', 'info@enanosbilbao.com', 3, 'Hotel Enanos Bilbao', FALSE, '944223344', FALSE, 'PENSION'),
(TRUE, 140, 'Málaga', TRUE, 'Hotel con spa y vistas al Mediterráneo', 'Paseo Marítimo 10', 'reservas@plazamar.es', 5, 'Hotel Plaza del Mar Málaga', TRUE, '952123987', TRUE, 'HOTEL_PEQUENO'),
(TRUE, 90, 'Alicante', TRUE, 'Hotel moderno cercano al puerto', 'Calle Puerto 3', 'info@granalicante.com', 4, 'Gran Hotel Alicante', TRUE, '965998877', TRUE, 'HOTEL_PEQUENO'),
(TRUE, 70, 'Córdoba', TRUE, 'Encantador hotel en el casco histórico', 'Calle Judíos 8', 'contacto@patiohistoricocordoba.com', 3, 'Hotel Patio Histórico Córdoba', FALSE, '957771234', FALSE, 'CASA_RURAL'),
(TRUE, 110, 'Salamanca', TRUE, 'Hotel boutique cerca de la Plaza Mayor', 'Plaza Mayor 4', 'info@boutiquesalamanca.com', 4, 'Hotel Boutique Salamanca', TRUE, '923445566', FALSE, 'HOSTAL'),
(TRUE, 200, 'Zaragoza', TRUE, 'Gran hotel para eventos y congresos', 'Av. de la Independencia 22', 'eventos@granzaragoza.es', 5, 'Gran Hotel Zaragoza', TRUE, '976112233', TRUE, 'HOTEL_PEQUENO'),
(TRUE, 55, 'Murcia', TRUE, 'Alojamiento económico en el centro', 'Calle Trapería 11', 'contacto@pensionmurcia.com', 2, 'Pensión Santa Catalina', FALSE, '968334455', FALSE, 'PENSION');

INSERT INTO habitaciones (activa, capacidad, descripcion, estado, numero_habitacion, precio_noche, aire_acondicionado, balcon, calefaccion, tiene_wifi, tipo_habitacion, hotel_id)
VALUES
(TRUE, 2, 'Habitación doble estándar con baño privado', 'DISPONIBLE', '101', 75.00, TRUE, FALSE, TRUE, TRUE, 'DOBLE', 1),
(TRUE, 4, 'Habitación familiar con terraza', 'OCUPADO', '102', 120.00, TRUE, TRUE, TRUE, TRUE, 'FAMILIAR', 1),
(TRUE, 2, 'Habitación doble estándar con baño privado y TV', 'DISPONIBLE', '103', 75.00, TRUE, FALSE, TRUE, TRUE, 'DOBLE', 1),
(TRUE, 3, 'Habitación triple con vistas a la Gran Vía', 'DISPONIBLE', '104', 95.00, TRUE, TRUE, TRUE, TRUE, 'TRIPLE', 1),

(TRUE, 1, 'Habitación individual con escritorio', 'DISPONIBLE', '201', 55.00, TRUE, FALSE, TRUE, TRUE, 'INDIVIDUAL', 2),
(TRUE, 2, 'Habitación doble con balcón y vistas al mar', 'DISPONIBLE', '202', 90.00, TRUE, TRUE, TRUE, TRUE, 'DOBLE', 2),
(TRUE, 2, 'Doble estándar con balcón y aire acondicionado', 'DISPONIBLE', '203', 85.00, TRUE, TRUE, TRUE, TRUE, 'DOBLE', 2),
(TRUE, 4, 'Familia superior: dos camas dobles, cerca de la piscina', 'OCUPADA', '204', 140.00, TRUE, TRUE, TRUE, TRUE, 'FAMILIAR', 2),

(TRUE, 2, 'Habitación matrimonial con cama king size', 'OCUPADO', '301', 110.00, TRUE, TRUE, TRUE, TRUE, 'MATRIMONIAL', 3),
(TRUE, 1, 'Sencilla con baño privado y wifi', 'DISPONIBLE', '302', 55.00, FALSE, FALSE, TRUE, TRUE, 'SENCILLA', 3),
(TRUE, 2, 'Doble con vistas a la Alhambra y calefacción', 'DISPONIBLE', '303', 88.00, FALSE, TRUE, TRUE, TRUE, 'DOBLE', 3),

(TRUE, 3, 'Habitación familiar con baño compartido', 'MANTENIMIENTO', '401', 80.00, FALSE, FALSE, TRUE, TRUE, 'FAMILIAR', 4),
(TRUE, 2, 'Doble superior junto a la Catedral', 'DISPONIBLE', '402', 92.00, TRUE, FALSE, TRUE, TRUE, 'DOBLE', 4),
(TRUE, 1, 'Sencilla cómoda y céntrica', 'MANTENIMIENTO', '403', 60.00, TRUE, FALSE, TRUE, TRUE, 'SENCILLA', 4),

(TRUE, 2, 'Doble moderna con baño amplio', 'DISPONIBLE', '501', 110.00, TRUE, FALSE, TRUE, TRUE, 'DOBLE', 5),
(TRUE, 3, 'Junior suite con sofá cama y vistas al centro', 'DISPONIBLE', '502', 170.00, TRUE, TRUE, TRUE, TRUE, 'SUITE', 5),

(TRUE, 1, 'Sencilla económica en casco viejo', 'DISPONIBLE', '601', 50.00, FALSE, FALSE, TRUE, TRUE, 'SENCILLA', 6),
(TRUE, 2, 'Doble con encanto tradicional', 'DISPONIBLE', '602', 68.00, FALSE, FALSE, TRUE, TRUE, 'DOBLE', 6),

(TRUE, 2, 'Doble superior con vistas al mar', 'DISPONIBLE', '701', 130.00, TRUE, TRUE, TRUE, TRUE, 'DOBLE', 7),
(TRUE, 2, 'Doble con spa privado (acceso al spa incluido)', 'DISPONIBLE', '702', 160.00, TRUE, TRUE, TRUE, TRUE, 'DOBLE', 7),
(TRUE, 4, 'Suite con salón independiente y vistas al mar', 'OCUPADA', '703', 280.00, TRUE, TRUE, TRUE, TRUE, 'SUITE', 7),

(TRUE, 1, 'Individual económica con baño privado', 'DISPONIBLE', '801', 55.00, FALSE, FALSE, TRUE, TRUE, 'INDIVIDUAL', 8),
(TRUE, 2, 'Doble moderna cercana al puerto', 'DISPONIBLE', '802', 95.00, TRUE, TRUE, TRUE, TRUE, 'DOBLE', 8),
(TRUE, 1, 'Sencilla compacta con baño privado', 'DISPONIBLE', '803', 70.00, TRUE, FALSE, TRUE, TRUE, 'SENCILLA', 8),

(TRUE, 3, 'Familiar para 3 personas con balcón', 'DISPONIBLE', '901', 95.00, TRUE, TRUE, TRUE, TRUE, 'FAMILIAR', 9),
(TRUE, 2, 'Doble tranquila en el casco histórico', 'DISPONIBLE', '902', 78.00, FALSE, TRUE, TRUE, TRUE, 'DOBLE', 9),
(TRUE, 3, 'Triple con dos camas y una individual', 'DISPONIBLE', '903', 110.00, FALSE, TRUE, TRUE, TRUE, 'TRIPLE', 9),

(TRUE, 2, 'Doble con cama king y escritorio', 'MANTENIMIENTO', '1001', 120.00, TRUE, FALSE, TRUE, TRUE, 'MATRIMONIAL', 10),
(TRUE, 1, 'Sencilla boutique cerca de la Plaza Mayor', 'DISPONIBLE', '1002', 85.00, TRUE, FALSE, TRUE, TRUE, 'SENCILLA', 10),
(TRUE, 2, 'Doble boutique con detalles exclusivos', 'DISPONIBLE', '1003', 130.00, TRUE, FALSE, TRUE, TRUE, 'DOBLE', 10),

(TRUE, 2, 'Suite ejecutiva con sala pequeña', 'DISPONIBLE', '1101', 160.00, TRUE, TRUE, TRUE, TRUE, 'DOBLE', 11),
(TRUE, 2, 'Doble amplia para congresos y eventos', 'DISPONIBLE', '1102', 120.00, TRUE, FALSE, TRUE, TRUE, 'DOBLE', 11),
(TRUE, 3, 'Suite ejecutiva con mesa de trabajo', 'OCUPADA', '1103', 210.00, TRUE, FALSE, TRUE, TRUE, 'SUITE', 11),

(TRUE, 4, 'Familiar amplia con dos baños', 'OCUPADO', '1201', 110.00, TRUE, TRUE, TRUE, TRUE, 'FAMILIAR', 12),
(TRUE, 1, 'Habitación individual económica', 'DISPONIBLE', '1202', 48.00, FALSE, FALSE, TRUE, TRUE, 'SENCILLA', 12),
(TRUE, 2, 'Doble económica céntrica', 'DISPONIBLE', '1203', 65.00, FALSE, FALSE, TRUE, TRUE, 'DOBLE', 12);


INSERT INTO usuarios (activo, apellido, contrasenna, email, nombre, telefono, tipo_usuario)
VALUES
(TRUE, 'Pérez', '1234', 'admin@hotel.com', 'Administrador', '600123456', 'ADMIN'),
(TRUE, 'López', 'cliente1', 'cliente1@mail.com', 'Carlos', '611223344', 'CLIENT'),
(TRUE, 'Martín', 'cliente2', 'cliente2@mail.com', 'Lucía', '622334455', 'CLIENT'),
(TRUE, 'García', 'cliente3', 'cliente3@mail.com', 'Miguel', '633445566', 'CLIENT'),
(TRUE, 'Fernández', 'cliente4', 'cliente4@mail.com', 'Sara', '644556677', 'CLIENT'),
(FALSE, 'Ruiz', 'cliente5', 'cliente5@mail.com', 'Ana', '655667788', 'CLIENT'),
(TRUE, 'Domínguez', 'pass123', 'sofia.dominguez@mail.com', 'Sofía', '612334455', 'CLIENT'),
(TRUE, 'Sánchez', 'qwerty', 'javier.sanchez@mail.com', 'Javier', '613445566', 'CLIENT'),
(TRUE, 'Ramírez', 'rami2025', 'laura.ramirez@mail.com', 'Laura', '614556677', 'CLIENT'),
(TRUE, 'Torres', 'admin2025', 'recepcion@hotelplazamar.com', 'Recepción', '615667788', 'ADMIN'),
(TRUE, 'Muñoz', 'mru2025', 'miguel.munoz@mail.com', 'Miguel', '616778899', 'CLIENT'),
(TRUE, 'Vega', 'vega2025', 'ana.vega@mail.com', 'Ana', '617889900', 'CLIENT');


INSERT INTO reservas (estado_reserva, fecha_entrada, fecha_salida, motivo_cancelacion, numero_personas, observaciones, precio_total, todo_incluido, habitacion_id, usuario_id)
VALUES
('CONFIRMADA', '2025-11-15', '2025-11-18', NULL, 2, 'Cliente quiere vistas exteriores', 225.00, TRUE, 1, 2),
('COMPLETADA', '2025-10-01', '2025-10-05', NULL, 1, 'Estancia sin incidencias', 220.00, FALSE, 3, 3),
('PENDIETE', '2025-12-20', '2025-12-24', NULL, 2, 'Necesita parking', 360.00, TRUE, 4, 4),
('CANCELADA', '2025-09-10', '2025-09-12', 'Problemas personales', 2, 'Cancelada antes del check-in', 0.00, FALSE, 5, 5),
('CONFIRMADA', '2025-11-25', '2025-11-27', NULL, 3, 'Solicita desayuno incluido', 260.00, TRUE, 2, 2),
('PENDIETE', '2025-12-05', '2025-12-08', NULL, 4, 'Viaje familiar', 320.00, TRUE, 6, 3),
('CONFIRMADA', '2025-12-01', '2025-12-05', NULL, 2, 'Reserva para congreso', 520.00, TRUE, 7, 7),
('PENDIETE', '2025-11-20', '2025-11-22', NULL, 1, 'Llegada tardía', 110.00, FALSE, 8, 8),
('CONFIRMADA', '2025-12-15', '2025-12-18', NULL, 3, 'Cuna solicitada', 285.00, TRUE, 9, 9),
('CANCELADA', '2025-10-10', '2025-10-12', 'Cambio de planes', 2, 'Cancelada por el cliente', 0.00, FALSE, 10, 10),
('COMPLETADA', '2025-09-01', '2025-09-03', NULL, 2, 'Estancia de trabajo', 320.00, FALSE, 11, 11),
('PENDIETE', '2025-12-24', '2025-12-26', NULL, 4, 'Familia - Navidad', 440.00, TRUE, 12, 12);

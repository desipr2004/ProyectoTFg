
INSERT INTO hotel (activo, capacidad_total, ciudad, desayuno, descripcion, direccion, email, estrellas, nombre, mascotas, telefono, parking, tipo_hotel)
VALUES
(TRUE, 100, 'Madrid', TRUE, 'Hotel centrico con vistas a la Gran Via', 'Calle Mayor 1', 'info@enanosmadrid.com', 4, 'Hotelillo Madrid', TRUE, '910123456', FALSE, 'HOTEL_PEQUENO'),
(TRUE, 120, 'Barcelona', TRUE, 'Hotel cerca del mar con piscina', 'Av. Diagonal 100', 'info@enanosbarcelona.com', 4, 'Hotel Barcelino', TRUE, '930654321', TRUE, 'HOTEL_PEQUENO'),
(TRUE, 80, 'Granada', TRUE, 'Hostal/Casa Rural cerca de la Alhambra', 'Calle Albaicin 15', 'info@enanosgranada.com', 3, 'La Fachada', FALSE, '958112233', FALSE, 'CASA_RURAL'),
(TRUE, 60, 'Sevilla', TRUE, 'Hostal junto a la Catedral', 'Plaza Nueva 5', 'info@enanossevilla.com', 4, 'Hostal Sevillano', TRUE, '955998877', FALSE, 'HOSTAL'),
(TRUE, 150, 'Valencia', TRUE, 'Hotel moderno en el centro de Valencia', 'Av. del Puerto 45', 'info@enanosvalencia.com', 5, 'Hotel Valenciano', TRUE, '963554433', TRUE, 'HOTEL_PEQUENO'),
(FALSE, 50, 'Bilbao', TRUE, 'Pension a las afueras de Bilbao', 'Calle Ledesma 8', 'info@enanosbilbao.com', 3, 'Pension Bilbao', FALSE, '944223344', FALSE, 'PENSION'),
(TRUE, 140, 'Malaga', TRUE, 'Mini Hotel con vistas', 'Paseo Maritimo 10', 'reservas@plazamar.es', 5, 'Hotelillo Mar Malaga', TRUE, '952123987', TRUE, 'HOTEL_PEQUENO'),
(TRUE, 90, 'Alicante', TRUE, 'Hotel enano cercano al puerto', 'Calle Puerto 3', 'info@granalicante.com', 4, 'El Puerto', TRUE, '965998877', TRUE, 'HOTEL_PEQUENO'),
(TRUE, 70, 'Cordoba', TRUE, 'Encantador hotel en el casco historico', 'Calle Judios 8', 'contacto@patiohistoricocordoba.com', 3, 'Hotel Patio Historico Cordoba', FALSE, '957771234', FALSE, 'HOTEL_PEQUENO'),
(TRUE, 110, 'Salamanca', TRUE, 'Hostal cerca de la Plaza Mayor', 'Plaza Mayor 4', 'info@boutiquesalamanca.com', 4, 'Hostal Salamanca', TRUE, '923445566', FALSE, 'HOSTAL'),
(TRUE, 200, 'Zaragoza', TRUE, 'Hotel para desconectar en el campo', 'Av. de la Independencia 22', 'eventos@granzaragoza.es', 5, 'Hotelillo de Zaragoza', TRUE, '976112233', TRUE, 'HOTEL_PEQUENO'),
(TRUE, 55, 'Murcia', TRUE, 'Pension rural', 'Calle Traperia 11', 'contacto@pensionmurcia.com', 2, 'Pension Santa Catalina', FALSE, '968334455', FALSE, 'PENSION');

INSERT INTO habitaciones (activa, capacidad, descripcion, estado, numero_habitacion, precio_noche, aire_acondicionado, balcon, calefaccion, tiene_wifi, tipo_habitacion, hotel_id)
VALUES
(TRUE, 2, 'Habitacion doble estandar con bano privado', 'DISPONIBLE', '101', 75.00, TRUE, FALSE, TRUE, TRUE, 'DOBLE', 1),
(TRUE, 4, 'Habitacion familiar con terraza', 'OCUPADO', '102', 120.00, TRUE, TRUE, TRUE, TRUE, 'FAMILIAR', 1),
(TRUE, 2, 'Habitacion doble estandar con bano privado y TV', 'DISPONIBLE', '103', 75.00, TRUE, FALSE, TRUE, TRUE, 'DOBLE', 1),
(TRUE, 3, 'Habitacion triple con vistas a la Gran Via', 'DISPONIBLE', '104', 95.00, TRUE, TRUE, TRUE, TRUE, 'FAMILIAR', 1),

(TRUE, 1, 'Habitacion individual con escritorio', 'DISPONIBLE', '201', 55.00, TRUE, FALSE, TRUE, TRUE, 'INDIVIDUAL', 2),
(TRUE, 2, 'Habitacion doble con balcon y vistas al mar', 'DISPONIBLE', '202', 90.00, TRUE, TRUE, TRUE, TRUE, 'DOBLE', 2),
(TRUE, 2, 'Doble estandar con balcon y aire acondicionado', 'DISPONIBLE', '203', 85.00, TRUE, TRUE, TRUE, TRUE, 'DOBLE', 2),
(TRUE, 4, 'Familia superior: dos camas dobles, cerca de la piscina', 'OCUPADO', '204', 140.00, TRUE, TRUE, TRUE, TRUE, 'FAMILIAR', 2),

(TRUE, 2, 'Habitacion matrimonial con cama king size', 'OCUPADO', '301', 110.00, TRUE, TRUE, TRUE, TRUE, 'MATRIMONIAL', 3),
(TRUE, 1, 'Individual con bano privado y wifi', 'DISPONIBLE', '302', 55.00, FALSE, FALSE, TRUE, TRUE, 'INDIVIDUAL', 3),
(TRUE, 2, 'Doble con vistas a la Alhambra y calefaccion', 'DISPONIBLE', '303', 88.00, FALSE, TRUE, TRUE, TRUE, 'DOBLE', 3),

(TRUE, 3, 'Habitacion familiar con bano compartido', 'MANTENIMIENTO', '401', 80.00, FALSE, FALSE, TRUE, TRUE, 'FAMILIAR', 4),
(TRUE, 2, 'Doble superior junto a la Catedral', 'DISPONIBLE', '402', 92.00, TRUE, FALSE, TRUE, TRUE, 'DOBLE', 4),
(TRUE, 1, 'Individual comoda y centrica', 'MANTENIMIENTO', '403', 60.00, TRUE, FALSE, TRUE, TRUE, 'INDIVIDUAL', 4),

(TRUE, 2, 'Doble moderna con bano amplio', 'DISPONIBLE', '501', 110.00, TRUE, FALSE, TRUE, TRUE, 'DOBLE', 5),
(TRUE, 3, 'Junior suite con sofa cama y vistas al centro', 'DISPONIBLE', '502', 170.00, TRUE, TRUE, TRUE, TRUE, 'MATRIMONIAL', 5),

(TRUE, 1, 'Individual economica en casco viejo', 'DISPONIBLE', '601', 50.00, FALSE, FALSE, TRUE, TRUE, 'INDIVIDUAL', 6),
(TRUE, 2, 'Doble con encanto tradicional', 'DISPONIBLE', '602', 68.00, FALSE, FALSE, TRUE, TRUE, 'DOBLE', 6),

(TRUE, 2, 'Doble superior con vistas al mar', 'DISPONIBLE', '701', 130.00, TRUE, TRUE, TRUE, TRUE, 'DOBLE', 7),
(TRUE, 2, 'Doble con spa privado (acceso al spa incluido)', 'DISPONIBLE', '702', 160.00, TRUE, TRUE, TRUE, TRUE, 'DOBLE', 7),
(TRUE, 4, 'Suite con salon independiente y vistas al mar', 'OCUPADO', '703', 280.00, TRUE, TRUE, TRUE, TRUE, 'MATRIMONIAL', 7),

(TRUE, 1, 'Individual economica con bano privado', 'DISPONIBLE', '801', 55.00, FALSE, FALSE, TRUE, TRUE, 'INDIVIDUAL', 8),
(TRUE, 2, 'Doble moderna cercana al puerto', 'DISPONIBLE', '802', 95.00, TRUE, TRUE, TRUE, TRUE, 'DOBLE', 8),
(TRUE, 1, 'Individual compacta con bano privado', 'DISPONIBLE', '803', 70.00, TRUE, FALSE, TRUE, TRUE, 'INDIVIDUAL', 8),

(TRUE, 3, 'Familiar para 3 personas con balcon', 'DISPONIBLE', '901', 95.00, TRUE, TRUE, TRUE, TRUE, 'FAMILIAR', 9),
(TRUE, 2, 'Doble tranquila en el casco historico', 'DISPONIBLE', '902', 78.00, FALSE, TRUE, TRUE, TRUE, 'DOBLE', 9),
(TRUE, 3, 'Triple con dos camas y una individual', 'DISPONIBLE', '903', 110.00, FALSE, TRUE, TRUE, TRUE, 'FAMILIAR', 9),

(TRUE, 2, 'Doble con cama king y escritorio', 'MANTENIMIENTO', '1001', 120.00, TRUE, FALSE, TRUE, TRUE, 'MATRIMONIAL', 10),
(TRUE, 1, 'Individual boutique cerca de la Plaza Mayor', 'DISPONIBLE', '1002', 85.00, TRUE, FALSE, TRUE, TRUE, 'INDIVIDUAL', 10),
(TRUE, 2, 'Doble boutique con detalles exclusivos', 'DISPONIBLE', '1003', 130.00, TRUE, FALSE, TRUE, TRUE, 'DOBLE', 10),

(TRUE, 2, 'Suite ejecutiva con sala pequena', 'DISPONIBLE', '1101', 160.00, TRUE, TRUE, TRUE, TRUE, 'MATRIMONIAL', 11),
(TRUE, 2, 'Doble amplia para congresos y eventos', 'DISPONIBLE', '1102', 120.00, TRUE, FALSE, TRUE, TRUE, 'DOBLE', 11),
(TRUE, 3, 'Suite ejecutiva con mesa de trabajo', 'OCUPADO', '1103', 210.00, TRUE, FALSE, TRUE, TRUE, 'MATRIMONIAL', 11),

(TRUE, 4, 'Familiar amplia con dos banos', 'OCUPADO', '1201', 110.00, TRUE, TRUE, TRUE, TRUE, 'FAMILIAR', 12),
(TRUE, 1, 'Habitacion individual economica', 'DISPONIBLE', '1202', 48.00, FALSE, FALSE, TRUE, TRUE, 'INDIVIDUAL', 12),
(TRUE, 2, 'Doble economica centrica', 'DISPONIBLE', '1203', 65.00, FALSE, FALSE, TRUE, TRUE, 'DOBLE', 12);


INSERT INTO usuarios (activo, apellido, contrasenna, email, nombre, telefono, tipo_usuario)
VALUES
(TRUE, 'Perez', '1234', 'admin@hotel.com', 'Administrador', '600123456', 'ADMIN'),
(TRUE, 'Lopez', 'cliente1', 'cliente1@mail.com', 'Carlos', '611223344', 'CLIENT'),
(TRUE, 'Martin', 'cliente2', 'cliente2@mail.com', 'Lucia', '622334455', 'CLIENT'),
(TRUE, 'Garcia', 'cliente3', 'cliente3@mail.com', 'Miguel', '633445566', 'CLIENT'),
(TRUE, 'Fernandez', 'cliente4', 'cliente4@mail.com', 'Sara', '644556677', 'CLIENT'),
(FALSE, 'Ruiz', 'cliente5', 'cliente5@mail.com', 'Ana', '655667788', 'CLIENT'),
(TRUE, 'Dominguez', 'pass123', 'sofia.dominguez@mail.com', 'Sofia', '612334455', 'CLIENT'),
(TRUE, 'Sanchez', 'qwerty', 'javier.sanchez@mail.com', 'Javier', '613445566', 'CLIENT'),
(TRUE, 'Ramirez', 'rami2025', 'laura.ramirez@mail.com', 'Laura', '614556677', 'CLIENT'),
(TRUE, 'Torres', 'admin2025', 'recepcion@hotelplazamar.com', 'Recepcion', '615667788', 'ADMIN'),
(TRUE, 'Munoz', 'mru2025', 'miguel.munoz@mail.com', 'Miguel', '616778899', 'CLIENT'),
(TRUE, 'Vega', 'vega2025', 'ana.vega@mail.com', 'Ana', '617889900', 'CLIENT');


INSERT INTO reservas (estado_reserva, fecha_entrada, fecha_salida, motivo_cancelacion, numero_personas, observaciones, precio_total, todo_incluido, habitacion_id, usuario_id)
VALUES
('CONFIRMADA', '2025-11-15', '2025-11-18', NULL, 2, 'Cliente quiere vistas exteriores', 225.00, TRUE, 1, 2),
('COMPLETADA', '2025-10-01', '2025-10-05', NULL, 1, 'Estancia sin incidencias', 220.00, FALSE, 3, 3),
('PENDIENTE', '2025-12-20', '2025-12-24', NULL, 2, 'Necesita parking', 360.00, TRUE, 4, 4),
('CANCELADA', '2025-09-10', '2025-09-12', 'Problemas personales', 2, 'Cancelada antes del check-in', 0.00, FALSE, 5, 5),
('CONFIRMADA', '2025-11-25', '2025-11-27', NULL, 3, 'Solicita desayuno incluido', 260.00, TRUE, 2, 2),
('PENDIENTE', '2025-12-05', '2025-12-08', NULL, 4, 'Viaje familiar', 320.00, TRUE, 6, 3),
('CONFIRMADA', '2025-12-01', '2025-12-05', NULL, 2, 'Reserva para congreso', 520.00, TRUE, 7, 7),
('PENDIENTE', '2025-11-20', '2025-11-22', NULL, 1, 'Llegada tardia', 110.00, FALSE, 8, 8),
('CONFIRMADA', '2025-12-15', '2025-12-18', NULL, 3, 'Cuna solicitada', 285.00, TRUE, 9, 9),
('CANCELADA', '2025-10-10', '2025-10-12', 'Cambio de planes', 2, 'Cancelada por el cliente', 0.00, FALSE, 10, 10),
('COMPLETADA', '2025-09-01', '2025-09-03', NULL, 2, 'Estancia de trabajo', 320.00, FALSE, 11, 11),
('PENDIENTE', '2025-12-24', '2025-12-26', NULL, 4, 'Familia - Navidad', 440.00, TRUE, 12, 12);

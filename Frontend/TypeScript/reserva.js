(function () {
    var parametrosURL = new URLSearchParams(window.location.search);
    var inputNombreHotel = document.getElementById('hotelName');
    var inputIdHotel = document.getElementById('hotelId');
    var inputIdHabitacion = document.getElementById('habitacionId');
    var etiquetaHotelSeleccionado = document.getElementById('selectedHotelLabel');
    var tituloReserva = document.getElementById('reservationTitle');
    var mensajeSeleccion = document.getElementById('selectionMessage');
    var textoHabitacion = document.getElementById('selectionRoom');
    var textoPrecio = document.getElementById('selectionPrice');
    var listaServiciosSeleccionados = document.getElementById('selectionServices');
    var botonCambiarHabitacion = document.getElementById('botonCambiarHabitacion') || document.getElementById('changeRoomButton');
    var urlRetorno = parametrosURL.get('redirect');

    var nombreHotel = parametrosURL.get('hotelNombre') || 'Hotel seleccionado';
    var idHotel = parametrosURL.get('idHotel') || parametrosURL.get('hotelId') || '';
    var idHabitacion = parametrosURL.get('habitacionId');
    var parametroServicios = parametrosURL.get('servicios') || '';
    var preseleccionarTodoIncluido = parametrosURL.get('todoIncluido') === 'true';
    var fechaEntradaParam = parametrosURL.get('fechaEntrada') || '';
    var fechaSalidaParam = parametrosURL.get('fechaSalida') || '';

    var serviciosElegidos = [];
    var habitacionElegida = null;

    // Si faltan parametros esenciales, redirige al paso de seleccion de habitaciones
    if (!idHotel) {
        window.location.href = 'habitaciones.html';
        return;
    }
    if (!idHabitacion) {
        var backToRooms = new URL('habitaciones.html', window.location.href);
        backToRooms.searchParams.set('idHotel', idHotel);
        backToRooms.searchParams.set('hotelNombre', nombreHotel || '');
        backToRooms.searchParams.set('redirect', window.location.href);
        window.location.href = backToRooms.toString();
        return;
    }

    var SesionApp = window.SesionApp || {};

    var esEntornoLocal = window.location.protocol === 'file:' ||
        ['localhost', '127.0.0.1', '0.0.0.0'].indexOf(window.location.hostname) !== -1;
    var URL_API = esEntornoLocal ? 'http://localhost:8080' : window.location.origin;
    var URL_HABITACION = idHabitacion ? URL_API + '/api/habitacion/' + idHabitacion : null;
    var URL_RESERVAS = URL_API + '/api/reservas';
    var usuarioEnSesion = SesionApp && SesionApp.obtenerSesion ? SesionApp.obtenerSesion() : null;

    var formularioReserva = document.getElementById('reservationForm');
    var mensajeFormulario = document.getElementById('formFeedback');
    var inputPrecioTotal = document.getElementById('precioTotal');
    var checkTodoIncluido = document.getElementById('todoIncluido');
    var inputObservaciones = document.getElementById('observaciones');
    var inputFechaEntrada = document.getElementById('fechaEntrada');
    var inputFechaSalida = document.getElementById('fechaSalida');

    var ETIQUETAS_SERVICIO = {
        TODO_INCLUIDO: 'Todo incluido',
        DESAYUNO_EXTRA: 'Desayuno gourmet',
        PARKING_PREMIUM: 'Parking vigilado',
        WIFI: 'WiFi alta velocidad',
        AIRE: 'Aire acondicionado',
        BALCON: 'Balcon o terraza'
    };

    var PRECIO_BASE_PERSONA = 50;
    var RECARGO_TODO_INCLUIDO = 0.2;
    var COSTE_DESAYUNO_EXTRA = 8;
    var COSTE_PARKING_PREMIUM = 10;
    var MS_POR_DIA = 1000 * 60 * 60 * 24;

    inputNombreHotel.value = nombreHotel;
    inputIdHotel.value = idHotel;
    tituloReserva.textContent = nombreHotel ? 'Reserva en ' + nombreHotel : 'Nueva reserva';
    etiquetaHotelSeleccionado.textContent = idHotel
        ? 'Has seleccionado el hotel #' + idHotel + '. Revisa los datos y confirma tu reserva.'
        : 'Selecciona las fechas y completa los datos para confirmar tu estancia.';
    if (inputFechaEntrada && fechaEntradaParam) {
        inputFechaEntrada.value = fechaEntradaParam;
    }
    if (inputFechaSalida && fechaSalidaParam) {
        inputFechaSalida.value = fechaSalidaParam;
    }

    function agregarServicio(id) {
        if (serviciosElegidos.indexOf(id) === -1) {
            serviciosElegidos.push(id);
        }
    }

    function eliminarServicio(id) {
        var index = serviciosElegidos.indexOf(id);
        if (index !== -1) {
            serviciosElegidos.splice(index, 1);
        }
    }

    function tieneServicio(id) {
        return serviciosElegidos.indexOf(id) !== -1;
    }

    function mostrarAvisoReserva(message, type) {
        mensajeFormulario.textContent = message;
        mensajeFormulario.className = 'formularioReserva-mensajeFormulario ' + (type || 'info');
    }

    function convertirNumero(value, fallback) {
        if (value === null || value === undefined || value === '') {
            return fallback;
        }
        var numberValue = Number(value);
        return isNaN(numberValue) ? fallback : numberValue;
    }

    function formatearMoneda(value) {
        var amount = Number(value || 0);
        if (isNaN(amount)) {
            return '';
        }
        return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(amount);
    }

    function mostrarServiciosSeleccionados() {
        listaServiciosSeleccionados.innerHTML = '';
        if (!serviciosElegidos.length) {
            var emptyItem = document.createElement('li');
            emptyItem.textContent = 'Sin servicios adicionales.';
            listaServiciosSeleccionados.appendChild(emptyItem);
            return;
        }

        for (var i = 0; i < serviciosElegidos.length; i++) {
            var item = document.createElement('li');
            var serviceId = serviciosElegidos[i];
            item.textContent = ETIQUETAS_SERVICIO[serviceId] || serviceId;
            listaServiciosSeleccionados.appendChild(item);
        }
    }

    function rellenarObservacionesConServicios() {
        if (!serviciosElegidos.length || inputObservaciones.value) {
            return;
        }
        var texto = '';
        for (var i = 0; i < serviciosElegidos.length; i++) {
            if (i > 0) {
                texto += ', ';
            }
            var clave = serviciosElegidos[i];
            texto += ETIQUETAS_SERVICIO[clave] || clave;
        }
        inputObservaciones.value = 'Servicios seleccionados: ' + texto;
    }

    function mostrarSeleccionActual() {
        if (!habitacionElegida) {
            mensajeSeleccion.textContent = 'Selecciona una habitacion para continuar.';
            textoHabitacion.textContent = '';
            textoPrecio.textContent = '';
            return;
        }

        mensajeSeleccion.textContent = 'Revisa los detalles antes de completar la reserva.';
        textoHabitacion.textContent = 'Habitacion ' + (habitacionElegida.numeroHabitacion || '') +
            '  ' + (habitacionElegida.capacidad || '-') + ' personas';
        textoPrecio.textContent = formatearMoneda(habitacionElegida.precioPorNoche || PRECIO_BASE_PERSONA);
        mostrarServiciosSeleccionados();
    }

    // Devuelve la cantidad de noches considerando las fechas introducidas en el formularioReservaulario
    function calcularTotalNoches() {
        var entrada = formularioReserva.fechaEntrada.value;
        var salida = formularioReserva.fechaSalida.value;
        if (!entrada || !salida) {
            return 1;
        }
        var entradaDate = new Date(entrada);
        var salidaDate = new Date(salida);
        var diff = Math.floor((salidaDate - entradaDate) / MS_POR_DIA);
        return diff > 0 ? diff : 1;
    }

    function obtenerPrecioPorNoche() {
        var precio = habitacionElegida ? habitacionElegida.precioPorNoche : null;
        if (precio === undefined || precio === null) {
            return PRECIO_BASE_PERSONA;
        }

        var normalizado = precio;
        if (typeof normalizado === 'string') {
            normalizado = normalizado.replace(',', '.');
        }

        var parsed = Number(normalizado);
        return isNaN(parsed) ? PRECIO_BASE_PERSONA : parsed;
    }

    // Calcula el importe final y actualiza los textos/resumen antes de enviar la reserva
    function actualizarTotalesReserva() {
        if (!habitacionElegida) {
            inputPrecioTotal.value = '';
            return;
        }

        var personas = Math.max(convertirNumero(formularioReserva.numPersonas.value, 1), 1);
        var noches = Math.max(calcularTotalNoches(), 1);
        var total = noches * obtenerPrecioPorNoche() * personas;

        if (tieneServicio('DESAYUNO_EXTRA')) {
            total += COSTE_DESAYUNO_EXTRA * personas * noches;
        }

        if (tieneServicio('PARKING_PREMIUM')) {
            total += COSTE_PARKING_PREMIUM * noches;
        }

        if (checkTodoIncluido.checked) {
            total = total * (1 + RECARGO_TODO_INCLUIDO);
        }

        inputPrecioTotal.value = total.toFixed(2);
    }

    // Recupera la informularioReservaacion de la habitacion elegida previamente en la pantalla de habitaciones
    function cargarHabitacionSeleccionada() {
        if (!URL_HABITACION) {
            mostrarAvisoReserva('No se ha seleccionado ninguna habitacion. Vuelve al paso anterior.', 'error');
            formularioReserva.querySelector('button[type="submit"]').disabled = true;
            return;
        }

        fetch(URL_HABITACION, { headers: { 'Accept': 'application/json' } })
            .then(function (response) {
                if (!response.ok) {
                    throw new Error('Error ' + response.status);
                }
                return response.json();
            })
            .then(function (data) {
                habitacionElegida = data;
                inputIdHabitacion.value = habitacionElegida && habitacionElegida.id ? habitacionElegida.id : '';

                if (preseleccionarTodoIncluido) {
                    checkTodoIncluido.checked = true;
                    agregarServicio('TODO_INCLUIDO');
                }

                var serviciosLista = parametroServicios.split(',');
                for (var i = 0; i < serviciosLista.length; i++) {
                    var service = serviciosLista[i].trim();
                    if (service) {
                        agregarServicio(service);
                    }
                }

                mostrarSeleccionActual();
                rellenarObservacionesConServicios();
                actualizarTotalesReserva();
            })
            .catch(function () {
                mostrarAvisoReserva('No se pudo cargar la habitacion seleccionada. Vuelve al paso anterior.', 'error');
                formularioReserva.querySelector('button[type="submit"]').disabled = true;
            });
    }

    checkTodoIncluido.addEventListener('change', function () {
        if (checkTodoIncluido.checked) {
            agregarServicio('TODO_INCLUIDO');
        } else {
            eliminarServicio('TODO_INCLUIDO');
        }
        mostrarServiciosSeleccionados();
        actualizarTotalesReserva();
    });

    formularioReserva.numPersonas.addEventListener('input', actualizarTotalesReserva);
    formularioReserva.fechaEntrada.addEventListener('change', actualizarTotalesReserva);
    formularioReserva.fechaSalida.addEventListener('change', actualizarTotalesReserva);

    document.getElementById('backButton').addEventListener('click', function () {
        if (urlRetorno) {
            window.location.href = urlRetorno;
        } else {
            window.location.href = 'index.html';
        }
    });

    if (botonCambiarHabitacion) {
        botonCambiarHabitacion.addEventListener('click', function () {
            var roomsUrl = new URL('habitaciones.html', window.location.href);
            roomsUrl.searchParams.set('idHotel', idHotel);
            roomsUrl.searchParams.set('hotelNombre', nombreHotel);
            roomsUrl.searchParams.set('redirect', urlRetorno || 'index.html');
            if (inputFechaEntrada && inputFechaEntrada.value) {
                roomsUrl.searchParams.set('fechaEntrada', inputFechaEntrada.value);
            }
            if (inputFechaSalida && inputFechaSalida.value) {
                roomsUrl.searchParams.set('fechaSalida', inputFechaSalida.value);
            }
            window.location.href = roomsUrl.toString();
        });
    }

    formularioReserva.addEventListener('submit', function (event) {
        event.preventDefault();

        if (!formularioReserva.reportValidity()) {
            return;
        }

        if (!habitacionElegida) {
            mostrarAvisoReserva('Selecciona una habitacion antes de confirmar la reserva.', 'error');
            return;
        }

        // Permitimos crear reservas sin sesión (usuario anónimo)

        var personasSeleccionadas = convertirNumero(formularioReserva.numPersonas.value, 0);
        if (!personasSeleccionadas) {
            mostrarAvisoReserva('Indica el numero de personas para calcular el total.', 'error');
            return;
        }

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
                if(usuarioEnSesion && usuarioEnSesion.id){
                    mensajeExito += ' Te llevamos a tu historial para que la revises.';
                }
                mostrarAvisoReserva(mensajeExito, 'success');

                if(usuarioEnSesion && usuarioEnSesion.id){
                    if(SesionApp && SesionApp.marcarHistorial){
                        SesionApp.marcarHistorial();
                    }
                    setTimeout(function(){
                        window.location.href = 'usuario.html#historial';
                    }, 1200);
                }

                formularioReserva.reset();
                inputNombreHotel.value = nombreHotel;
                inputIdHotel.value = idHotel;
                if (preseleccionarTodoIncluido) {
                    checkTodoIncluido.checked = true;
                } else {
                    checkTodoIncluido.checked = false;
                    eliminarServicio('TODO_INCLUIDO');
                }
                mostrarServiciosSeleccionados();
                actualizarTotalesReserva();
            })
            .catch(function (error) {
                console.error('Error al crear la reserva:', error);
                mostrarAvisoReserva('No se pudo crear la reserva. Verifica los datos e intentalo de nuevo.', 'error');
            });
    });

    mostrarServiciosSeleccionados();
    cargarHabitacionSeleccionada();

})();

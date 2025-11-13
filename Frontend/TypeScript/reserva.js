(function () {
    var params = new URLSearchParams(window.location.search);
    var hotelNameInput = document.getElementById('hotelName');
    var hotelIdInput = document.getElementById('hotelId');
    var habitacionIdInput = document.getElementById('habitacionId');
    var selectedHotelLabel = document.getElementById('selectedHotelLabel');
    var reservationTitle = document.getElementById('reservationTitle');
    var selectionMessage = document.getElementById('selectionMessage');
    var selectionRoom = document.getElementById('selectionRoom');
    var selectionPrice = document.getElementById('selectionPrice');
    var selectionServicesList = document.getElementById('selectionServices');
    var changeRoomButton = document.getElementById('changeRoomButton');
    var redirectUrl = params.get('redirect');

    var hotelName = params.get('hotelNombre') || 'Hotel seleccionado';
    var hotelId = params.get('hotelId') || '';
    var habitacionId = params.get('habitacionId');
    var serviciosParam = params.get('servicios') || '';
    var preselectTodoIncluido = params.get('todoIncluido') === 'true';

    var selectedServices = [];
    var selectedRoom = null;

    var Sesion = window.SesionApp || {};

    var isLocalEnv = window.location.protocol === 'file:' ||
        ['localhost', '127.0.0.1', '0.0.0.0'].indexOf(window.location.hostname) !== -1;
    var API_BASE = isLocalEnv ? 'http://localhost:8080' : window.location.origin;
    var HABITACION_URL = habitacionId ? API_BASE + '/api/habitacion/' + habitacionId : null;
    var RESERVAS_URL = API_BASE + '/api/reservas';
    var usuarioSesion = Sesion && Sesion.getSesion ? Sesion.getSesion() : null;

    var form = document.getElementById('reservationForm');
    var feedback = document.getElementById('formFeedback');
    var precioTotalInput = document.getElementById('precioTotal');
    var todoIncluidoCheckbox = document.getElementById('todoIncluido');
    var observacionesInput = document.getElementById('observaciones');

    var SERVICIO_LABELS = {
        TODO_INCLUIDO: 'Todo incluido',
        DESAYUNO_EXTRA: 'Desayuno gourmet',
        PARKING_PREMIUM: 'Parking vigilado',
        WIFI: 'WiFi alta velocidad',
        AIRE: 'Aire acondicionado',
        BALCON: 'Balcón o terraza'
    };

    var PRECIO_BASE_POR_PERSONA = 50;
    var RECARGO_TODO_INCLUIDO = 0.2;
    var DESAYUNO_EXTRA_COSTE = 8;
    var PARKING_PREMIUM_COSTE = 10;
    var MS_PER_DAY = 1000 * 60 * 60 * 24;

    hotelNameInput.value = hotelName;
    hotelIdInput.value = hotelId;
    reservationTitle.textContent = hotelName ? 'Reserva en ' + hotelName : 'Nueva reserva';
    selectedHotelLabel.textContent = hotelId
        ? 'Has seleccionado el hotel #' + hotelId + '. Revisa los datos y confirma tu reserva.'
        : 'Selecciona las fechas y completa los datos para confirmar tu estancia.';

    function agregarServicio(id) {
        if (selectedServices.indexOf(id) === -1) {
            selectedServices.push(id);
        }
    }

    function eliminarServicio(id) {
        var index = selectedServices.indexOf(id);
        if (index !== -1) {
            selectedServices.splice(index, 1);
        }
    }

    function tieneServicio(id) {
        return selectedServices.indexOf(id) !== -1;
    }

    function mostrarAvisoReserva(message, type) {
        feedback.textContent = message;
        feedback.className = 'form-feedback ' + (type || 'info');
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
            return '—';
        }
        return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(amount);
    }

    function mostrarServiciosSeleccionados() {
        selectionServicesList.innerHTML = '';
        if (!selectedServices.length) {
            var emptyItem = document.createElement('li');
            emptyItem.textContent = 'Sin servicios adicionales.';
            selectionServicesList.appendChild(emptyItem);
            return;
        }

        for (var i = 0; i < selectedServices.length; i++) {
            var item = document.createElement('li');
            var serviceId = selectedServices[i];
            item.textContent = SERVICIO_LABELS[serviceId] || serviceId;
            selectionServicesList.appendChild(item);
        }
    }

    function rellenarObservacionesConServicios() {
        if (!selectedServices.length || observacionesInput.value) {
            return;
        }
        var texto = '';
        for (var i = 0; i < selectedServices.length; i++) {
            if (i > 0) {
                texto += ', ';
            }
            var clave = selectedServices[i];
            texto += SERVICIO_LABELS[clave] || clave;
        }
        observacionesInput.value = 'Servicios seleccionados: ' + texto;
    }

    function mostrarSeleccionActual() {
        if (!selectedRoom) {
            selectionMessage.textContent = 'Selecciona una habitación para continuar.';
            selectionRoom.textContent = '—';
            selectionPrice.textContent = '—';
            return;
        }

        selectionMessage.textContent = 'Revisa los detalles antes de completar la reserva.';
        selectionRoom.textContent = 'Habitación ' + (selectedRoom.numeroHabitacion || '') +
            ' · ' + (selectedRoom.capacidad || '-') + ' personas';
        selectionPrice.textContent = formatearMoneda(selectedRoom.precioPorNoche || PRECIO_BASE_POR_PERSONA);
        mostrarServiciosSeleccionados();
    }

    // Devuelve la cantidad de noches considerando las fechas introducidas en el formulario
    function calcularTotalNoches() {
        var entrada = form.fechaEntrada.value;
        var salida = form.fechaSalida.value;
        if (!entrada || !salida) {
            return 1;
        }
        var entradaDate = new Date(entrada);
        var salidaDate = new Date(salida);
        var diff = Math.floor((salidaDate - entradaDate) / MS_PER_DAY);
        return diff > 0 ? diff : 1;
    }

    function obtenerPrecioPorNoche() {
        if (selectedRoom && selectedRoom.precioPorNoche !== undefined && selectedRoom.precioPorNoche !== null) {
            var parsed = Number(selectedRoom.precioPorNoche);
            if (!isNaN(parsed)) {
                return parsed;
            }
        }
        return PRECIO_BASE_POR_PERSONA;
    }

    // Calcula el importe final y actualiza los textos/resumen antes de enviar la reserva
    function actualizarTotalesReserva() {
        var personas = convertirNumero(form.numPersonas.value, 0);
        if (!personas || !selectedRoom) {
            precioTotalInput.value = '';
            return;
        }

        var noches = calcularTotalNoches();
        var total = personas * noches * obtenerPrecioPorNoche();

        if (tieneServicio('DESAYUNO_EXTRA')) {
            total += DESAYUNO_EXTRA_COSTE * personas * noches;
        }

        if (tieneServicio('PARKING_PREMIUM')) {
            total += PARKING_PREMIUM_COSTE * noches;
        }

        if (todoIncluidoCheckbox.checked) {
            total = total * (1 + RECARGO_TODO_INCLUIDO);
        }

        precioTotalInput.value = total.toFixed(2);
    }

    // Recupera la información de la habitación elegida previamente en la pantalla de habitaciones
    function cargarHabitacionSeleccionada() {
        if (!HABITACION_URL) {
            mostrarAvisoReserva('No se ha seleccionado ninguna habitación. Vuelve al paso anterior.', 'error');
            form.querySelector('button[type=\"submit\"]').disabled = true;
            return;
        }

        fetch(HABITACION_URL, { headers: { 'Accept': 'application/json' } })
            .then(function (response) {
                if (!response.ok) {
                    throw new Error('Error ' + response.status);
                }
                return response.json();
            })
            .then(function (data) {
                selectedRoom = data;
                habitacionIdInput.value = selectedRoom && selectedRoom.id ? selectedRoom.id : '';

                if (preselectTodoIncluido) {
                    todoIncluidoCheckbox.checked = true;
                    agregarServicio('TODO_INCLUIDO');
                }

                var serviciosLista = serviciosParam.split(',');
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
                mostrarAvisoReserva('No se pudo cargar la habitación seleccionada. Vuelve al paso anterior.', 'error');
                form.querySelector('button[type=\"submit\"]').disabled = true;
            });
    }

    todoIncluidoCheckbox.addEventListener('change', function () {
        if (todoIncluidoCheckbox.checked) {
            agregarServicio('TODO_INCLUIDO');
        } else {
            eliminarServicio('TODO_INCLUIDO');
        }
        mostrarServiciosSeleccionados();
        actualizarTotalesReserva();
    });

    form.numPersonas.addEventListener('input', actualizarPrecioTotal);
    form.fechaEntrada.addEventListener('change', actualizarPrecioTotal);
    form.fechaSalida.addEventListener('change', actualizarPrecioTotal);

    document.getElementById('backButton').addEventListener('click', function () {
        if (redirectUrl) {
            window.location.href = redirectUrl;
        } else {
            window.location.href = 'index.html';
        }
    });

    changeRoomButton.addEventListener('click', function () {
        var roomsUrl = new URL('habitaciones.html', window.location.href);
        roomsUrl.searchParams.set('hotelId', hotelId);
        roomsUrl.searchParams.set('hotelNombre', hotelName);
        roomsUrl.searchParams.set('redirect', redirectUrl || 'index.html');
        window.location.href = roomsUrl.toString();
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        if (!form.reportValidity()) {
            return;
        }

        if (!selectedRoom) {
            mostrarAvisoReserva('Selecciona una habitación antes de confirmar la reserva.', 'error');
            return;
        }

        var payload = {
            fechaEntrada: form.fechaEntrada.value || null,
            fechaSalida: form.fechaSalida.value || null,
            numPersonas: convertirNumero(form.numPersonas.value, null),
            precioTotal: form.precioTotal.value ? Number(form.precioTotal.value).toFixed(2) : null,
            todoIncluido: todoIncluidoCheckbox.checked,
            observaciones: form.observaciones.value || null,
            estadoReserva: form.estadoReserva.value || 'PENDIETE',
            motivoCancelacion: form.motivoCancelacion.value || null,
            usuario: (usuarioSesion && usuarioSesion.id) ? { id: usuarioSesion.id } : null,
            habitacion: { id: selectedRoom.id }
        };

        mostrarAvisoReserva('Enviando reserva...', 'info');

        fetch(RESERVAS_URL, {
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
                if(usuarioSesion && usuarioSesion.id){
                    mensajeExito += ' Te llevamos a tu historial para que la revises.';
                }
                mostrarAvisoReserva(mensajeExito, 'success');

                if(usuarioSesion && usuarioSesion.id){
                    if(Sesion && Sesion.marcarHistorial){
                        Sesion.marcarHistorial();
                    }
                    setTimeout(function(){
                        window.location.href = 'usuario.html#historial';
                    }, 1200);
                }

                form.reset();
                hotelNameInput.value = hotelName;
                hotelIdInput.value = hotelId;
                if (preselectTodoIncluido) {
                    todoIncluidoCheckbox.checked = true;
                } else {
                    todoIncluidoCheckbox.checked = false;
                    eliminarServicio('TODO_INCLUIDO');
                }
                mostrarServiciosSeleccionados();
                actualizarTotalesReserva();
            })
            .catch(function () {
                mostrarAvisoReserva('No se pudo crear la reserva. Verifica los datos e inténtalo de nuevo.', 'error');
            });
    });

    mostrarServiciosSeleccionados();
    cargarHabitacionSeleccionada();

})();

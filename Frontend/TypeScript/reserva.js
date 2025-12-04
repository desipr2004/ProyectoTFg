(function () {
    // Script encargado del paso final: confirmar la reserva y mostrar el resumen
    var parametrosURL = new URLSearchParams(window.location.search);
    // Referencias a los campos del formulario y etiquetas del resumen
    var inputNombreHotel = document.getElementById('hotelName');
    var inputIdHotel = document.getElementById('hotelId');
    var inputIdHabitacion = document.getElementById('habitacionId');
    var etiquetaHotelSeleccionado = document.getElementById('selectedHotelLabel');
    var tituloReserva = document.getElementById('reservationTitle');
    var mensajeSeleccion = document.getElementById('selectionMessage');
    var textoHabitacion = document.getElementById('selectionRoom');
    var textoPrecio = document.getElementById('selectionPrice');
    var listaServiciosSeleccionados = document.getElementById('selectionServices');
    var contenedorSeleccion = document.getElementById('selectionDetails');
    var botonCambiarHabitacion = document.getElementById('botonCambiarHabitacion') || document.getElementById('changeRoomButton');
    var urlRetorno = parametrosURL.get('redirect');

    var nombreHotel = parametrosURL.get('hotelNombre') || 'Hotel seleccionado';
    var idHotel = parametrosURL.get('idHotel') || parametrosURL.get('hotelId') || '';
    var idHabitacion = parametrosURL.get('habitacionId');
    var parametroServicios = parametrosURL.get('servicios') || '';
    var preseleccionarTodoIncluido = parametrosURL.get('todoIncluido') === 'true';
    var fechaEntradaParam = parametrosURL.get('fechaEntrada') || '';
    var fechaSalidaParam = parametrosURL.get('fechaSalida') || '';

    // Estado local con los servicios seleccionados y la habitacion cargada
    var serviciosElegidos = [];
    var habitacionElegida = null;

    // Si la pagina se abre sin pasar por habitaciones, avisamos y ocultamos el resumen
    var faltanParametrosSeleccion = !idHotel || !idHabitacion;
    if (faltanParametrosSeleccion) {
        mensajeSeleccion.textContent = 'Selecciona una habitacion en la pantalla anterior antes de crear la reserva.';
        if (contenedorSeleccion) {
            contenedorSeleccion.style.display = 'none';
        }
    }

    var SesionApp = window.SesionApp || {};

    // Ajustamos la URL de la API para local o despliegue
    var resolvedProtocol = window.location.protocol === 'https:' ? 'https:' : 'http:';
    var resolvedHost = window.location.hostname && window.location.hostname !== '' ? window.location.hostname : 'localhost';
    var API_HOST = resolvedProtocol + '//' + resolvedHost + ':8080';
    var URL_HABITACION_BASE = idHabitacion ? API_HOST + '/api/habitacion/' + idHabitacion : null;
    var URL_RESERVAS = API_HOST + '/api/reservas';
    var usuarioEnSesion = SesionApp && SesionApp.obtenerSesion ? SesionApp.obtenerSesion() : null;

    var formularioReserva = document.getElementById('reservationForm');
    var mensajeFormulario = document.getElementById('formFeedback');
    var inputPrecioTotal = document.getElementById('precioTotal');
    var checkTodoIncluido = document.getElementById('todoIncluido');
    var inputObservaciones = document.getElementById('observaciones');
    var inputFechaEntrada = document.getElementById('fechaEntrada');
    var inputFechaSalida = document.getElementById('fechaSalida');
    var inputNumeroPersonas = document.getElementById('numPersonas');
    var ayudaNumeroPersonas = document.getElementById('numPersonasHelp');

    // Catálogo de servicios para mostrar nombres 
    var ETIQUETAS_SERVICIO = {
        TODO_INCLUIDO: 'Todo incluido',
        DESAYUNO_EXTRA: 'Desayuno gourmet',
        PARKING_PREMIUM: 'Parking vigilado',
        WIFI: 'WiFi alta velocidad',
        AIRE: 'Aire acondicionado',
        BALCON: 'Balcon o terraza'
    };

    var PRECIO_DEFECTO_HABITACION = 0;
    var COSTE_SERVICIO_ADICIONAL = 1;
    var COSTE_TODO_INCLUIDO = 10;
    var COSTE_POR_PERSONA = 60;
    var SUPLEMENTO_POR_DIA = 10;
    var MS_POR_DIA = 1000 * 60 * 60 * 24;

    inputNombreHotel.value = nombreHotel;
    inputIdHotel.value = idHotel;
    tituloReserva.textContent = nombreHotel ? 'Reserva en ' + nombreHotel : 'Nueva reserva';
    etiquetaHotelSeleccionado.textContent = idHotel
        ? ' Revisa los datos y confirma tu reserva.'
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

    // Actualiza la lista visual con los servicios elegidos por el usuario
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
// Rellena el campo de observaciones con los servicios seleccionados si está vacío
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

    // Refresca el resumen lateral con habitación y precio base
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
        var precioMostrar = habitacionElegida.precioPorNoche || PRECIO_DEFECTO_HABITACION;
        textoPrecio.textContent = formatearMoneda(precioMostrar);
        mostrarServiciosSeleccionados();
    }

    // Devuelve el total de las noches a partir de las fechas seleccionadas
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

    // segun el numero de la habitacion obtenemos el precio por noche
    function obtenerPrecioPorNoche() {
        var precio = habitacionElegida ? habitacionElegida.precioPorNoche : null;
        if (precio === undefined || precio === null) {
            return PRECIO_DEFECTO_HABITACION;
        }

        var normalizado = precio;
        if (typeof normalizado === 'string') {
            normalizado = normalizado.replace(',', '.');
        }

        var parsed = Number(normalizado);
        return isNaN(parsed) ? PRECIO_DEFECTO_HABITACION : parsed;
    }

    function obtenerCostoServicio(id) {
        if (id === 'TODO_INCLUIDO') {
            return COSTE_TODO_INCLUIDO;
        }
        return COSTE_SERVICIO_ADICIONAL;
    }

    function calcularRecargoServicios() {
        var total = 0;
        for (var i = 0; i < serviciosElegidos.length; i++) {
            total += obtenerCostoServicio(serviciosElegidos[i]);
        }
        return total;
    }

    function datosReservaCompletos() {
        return Boolean(
            formularioReserva.numPersonas.value &&
            formularioReserva.fechaEntrada.value &&
            formularioReserva.fechaSalida.value
        );
    }

    function calcularImporteBaseSeleccion() {
        var base = obtenerPrecioPorNoche();
        return base + calcularRecargoServicios();
    }

    function limitarPersonasPorCapacidad() {
        if (!inputNumeroPersonas) {
            return;
        }
        var capacidad = habitacionElegida && habitacionElegida.capacidad
            ? convertirNumero(habitacionElegida.capacidad, null)
            : null;
        if (capacidad && capacidad > 0) {
            inputNumeroPersonas.max = capacidad;
            var actual = convertirNumero(inputNumeroPersonas.value, 0);
            var nuevoValor = actual;
            if (!actual || actual < 1) {
                nuevoValor = capacidad;
            } else if (actual > capacidad) {
                nuevoValor = capacidad;
            }
            inputNumeroPersonas.value = nuevoValor;
            inputNumeroPersonas.placeholder = "Capacidad máxima " + capacidad;
            if (ayudaNumeroPersonas) {
                //si es una persona no se le añade la s 
                ayudaNumeroPersonas.textContent = "Capacidad máxima: " + capacidad + " persona" + (capacidad === 1 ? "" : "s");
            }
        } else {
            inputNumeroPersonas.removeAttribute('max');
            if (!convertirNumero(inputNumeroPersonas.value, 0)) {
                inputNumeroPersonas.value = 1;
            }
            inputNumeroPersonas.placeholder = "Indica las personas";
            if (ayudaNumeroPersonas) {
                ayudaNumeroPersonas.textContent = "";
            }
        }
    }
// Maneja los cambios en el número de personas para recalcular totales y validar
    function manejarCambioNumeroPersonas() {
        limitarPersonasPorCapacidad();
        actualizarTotalesReserva();
    }

    // Calcula el coste final y actualiza los textos antes de enviar la reserva
    function actualizarTotalesReserva() {
        if (!habitacionElegida) {
            inputPrecioTotal.value = '';
            return;
        }

        var recargoServicios = calcularRecargoServicios();

        if (!datosReservaCompletos()) {
            inputPrecioTotal.value = calcularImporteBaseSeleccion().toFixed(2);
            return;
        }

        var personas = Math.max(convertirNumero(formularioReserva.numPersonas.value, 1), 1);
        var noches = Math.max(calcularTotalNoches(), 1);
        var precioBase = obtenerPrecioPorNoche();
        var total = noches * precioBase;

        total += personas * COSTE_POR_PERSONA;
        total += noches * SUPLEMENTO_POR_DIA;
        total += recargoServicios;

        if (checkTodoIncluido.checked) {
            total += COSTE_TODO_INCLUIDO;
        }

        inputPrecioTotal.value = total.toFixed(2);
    }

    // Construye la URL para obtener los datos de la habitación desde la API
    function construirUrlHabitacion(forceRefresh) {
        if (!URL_HABITACION_BASE) {
            return null;
        }
        if (!forceRefresh) {
            return URL_HABITACION_BASE;
        }
        var separator = URL_HABITACION_BASE.indexOf('?') === -1 ? '?' : '&';
        return URL_HABITACION_BASE + separator + '_=' + Date.now();
    }

    // Recupera los datos de la habitación seleccionada desde la API REST
    function cargarHabitacionDesdeServidor(options) {
        options = options || {};
        var endpoint = construirUrlHabitacion(options.forceRefresh);
        if (!endpoint) {
            return Promise.reject(new Error('Habitacion no especificada'));
        }

        return fetch(endpoint, {
            headers: { 'Accept': 'application/json' },
            cache: 'no-store'
        })
            .then(function (response) {
                if (!response.ok) {
                    throw new Error('Error ' + response.status);
                }
                return response.json();
            })
            .then(function (data) {
                habitacionElegida = data;
                inputIdHabitacion.value = habitacionElegida && habitacionElegida.id ? habitacionElegida.id : '';
                limitarPersonasPorCapacidad();
                manejarCambioNumeroPersonas();

                if (options.aplicarServicios !== false && preseleccionarTodoIncluido) {
                    checkTodoIncluido.checked = true;
                    agregarServicio('TODO_INCLUIDO');
                }

                if (options.aplicarServicios !== false) {
                    var serviciosLista = parametroServicios.split(',');
                    for (var i = 0; i < serviciosLista.length; i++) {
                        var service = serviciosLista[i].trim();
                        if (service) {
                            agregarServicio(service);
                        }
                    }
                }

                mostrarSeleccionActual();
                rellenarObservacionesConServicios();
                actualizarTotalesReserva();
                return data;
            });
    }

    function cargarHabitacionSeleccionada() {
        cargarHabitacionDesdeServidor({ forceRefresh: true, aplicarServicios: true }).catch(function () {
            mostrarAvisoReserva('No se pudo cargar la habitacion seleccionada.', 'error');
            formularioReserva.querySelector('button[type="submit"]').disabled = true;
        });
    }
// si se marca o desmarca el todo incluido, actualizamos la lista de servicios
    checkTodoIncluido.addEventListener('change', function () {
        if (checkTodoIncluido.checked) {
            agregarServicio('TODO_INCLUIDO');
        } else {
            eliminarServicio('TODO_INCLUIDO');
        }
        mostrarServiciosSeleccionados();
        actualizarTotalesReserva();
    });

// Escuchamos cambios para recalcular precios
    formularioReserva.numPersonas.addEventListener('input', manejarCambioNumeroPersonas);
    formularioReserva.fechaEntrada.addEventListener('change', actualizarTotalesReserva);
    formularioReserva.fechaSalida.addEventListener('change', actualizarTotalesReserva);

    document.getElementById('backButton').addEventListener('click', function () {
        if (urlRetorno) {
            window.location.href = urlRetorno;
        } else {
            window.location.href = 'inicio.html';
        }
    });
// cambia la habitacion seleccionada
    if (botonCambiarHabitacion) {
        botonCambiarHabitacion.addEventListener('click', function () {
            var roomsUrl = new URL('habitaciones.html', window.location.href);
            roomsUrl.searchParams.set('idHotel', idHotel);
            roomsUrl.searchParams.set('hotelNombre', nombreHotel);
            roomsUrl.searchParams.set('redirect', urlRetorno || 'inicio.html');
            if (inputFechaEntrada && inputFechaEntrada.value) {
                roomsUrl.searchParams.set('fechaEntrada', inputFechaEntrada.value);
            }
            if (inputFechaSalida && inputFechaSalida.value) {
                roomsUrl.searchParams.set('fechaSalida', inputFechaSalida.value);
            }
            window.location.href = roomsUrl.toString();
        });
    }

    // Envio del formulario: validaciones y POST a la API
    formularioReserva.addEventListener('submit', function (event) {
        event.preventDefault();

        if (!formularioReserva.reportValidity()) {
            return;
        }

        var botonSubmit = formularioReserva.querySelector('button[type="submit"]');
        if (botonSubmit) {
            botonSubmit.disabled = true;
        }

        cargarHabitacionDesdeServidor({ forceRefresh: true, aplicarServicios: false })
            .then(function () {
                if (!habitacionElegida) {
                    throw new Error('Selecciona una habitacion antes de confirmar la reserva.');
                }

                var personasSeleccionadas = convertirNumero(formularioReserva.numPersonas.value, 0);
                if (!personasSeleccionadas) {
                    throw new Error('Indica el numero de personas para calcular el total.');
                }

                actualizarTotalesReserva();

                var payload = {
                    fechaEntrada: formularioReserva.fechaEntrada.value || null,
                    fechaSalida: formularioReserva.fechaSalida.value || null,
                    numeroPersonas: personasSeleccionadas,
                    precioTotal: formularioReserva.precioTotal.value ? Number(formularioReserva.precioTotal.value).toFixed(2) : null,
                    todoIncluido: checkTodoIncluido.checked,
                    observaciones: formularioReserva.observaciones.value || null,
                    estadoReserva: formularioReserva.estadoReserva.value || 'PENDIENTE',
                    usuario: usuarioEnSesion && usuarioEnSesion.id ? { id: Number(usuarioEnSesion.id) } : null,
                    habitacion: { id: Number(habitacionElegida.id) }
                };

                mostrarAvisoReserva('Enviando reserva...', 'info');

                return fetch(URL_RESERVAS, {
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
                        if (usuarioEnSesion && usuarioEnSesion.id) {
                            mensajeExito += ' Te llevamos a tu historial para que la revises.';
                        }
                        mostrarAvisoReserva(mensajeExito, 'success');

                        if (usuarioEnSesion && usuarioEnSesion.id) {
                            if (SesionApp && SesionApp.marcarHistorial) {
                                SesionApp.marcarHistorial();
                            }
                            setTimeout(function () {
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
                    });
            })
            .catch(function (error) {
                console.error('Error al crear la reserva:', error);
                mostrarAvisoReserva(error.message || 'No se pudo crear la reserva. Comprueba los datos e intentalo de nuevo.', 'error');
            })
            .finally(function () {
                if (botonSubmit) {
                    botonSubmit.disabled = false;
                }
            });
    });

    mostrarServiciosSeleccionados();
    cargarHabitacionSeleccionada();

})();

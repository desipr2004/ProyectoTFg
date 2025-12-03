(function () {
    // Página de catálogo de habitaciones: lista habitaciones del hotel y permite elegir servicios
    // Son datos obtenidos de la URL de la pagina actual
    var params = new URLSearchParams(window.location.search);
    var idHotel = params.get('idHotel');
    var nombreHotel = params.get('hotelNombre') || 'Hotel seleccionado';
    var urlRetorno = params.get('redirect');

    var tituloHabitaciones = document.getElementById('roomsTitle');
    var subtituloHabitaciones = document.getElementById('roomsSubtitle');
    var mensajeHabitaciones = document.getElementById('roomsMessage');
    var listaHabitaciones = document.getElementById('roomsList');
    var inputFechaEntrada = document.getElementById('roomsDateStart');
    var inputFechaSalida = document.getElementById('roomsDateEnd');
    var botonBuscarFechas = document.getElementById('roomsSearchButton');
    var botonLimpiarFechas = document.getElementById('roomsClearDates');
    var avisoHabitaciones = document.getElementById('roomsFeedback');
    var botonVolver = document.getElementById('roomsBackButton');
    var contenedorServicios = document.getElementById('servicesContainer');
    var resumenSeleccion = document.getElementById('selectionSummary');
    var mensajeSeleccionVacia = document.getElementById('selectionEmptyMessage');
    var resumenHabitacion = document.getElementById('summaryRoom');
    var resumenTotal = document.getElementById('summaryTotal');
    var botonContinuar = document.getElementById('continueButton');
    var avisoServiciosToast = null;
    var avisoServiciosTimeout = null;

    if (!idHotel) {
        window.location.href = 'inicio.html#hotelsList';
        return;
    }
    tituloHabitaciones.textContent = 'Habitaciones disponibles - ' + nombreHotel;
    subtituloHabitaciones.textContent = 'Selecciona una habitacion en ' + nombreHotel + ' para configurar tu reserva.';

    botonVolver.addEventListener('click', function () {
        if (urlRetorno) {
            window.location.href = urlRetorno;
        } else {
            window.location.href = 'inicio.html';
        }
    });

    // Comprueba si estamos en entorno local o produccion
    var resolvedProtocol = window.location.protocol === 'https:' ? 'https:' : 'http:';
    var resolvedHost = window.location.hostname && window.location.hostname !== '' ? window.location.hostname : 'localhost';
    var API_HOST = resolvedProtocol + '//' + resolvedHost + ':8080';
    var URL_HABITACIONES_BASE = idHotel ? API_HOST + '/api/habitacion/hotel/' + idHotel + '/disponibles' : null;
    var URL_HOTEL = idHotel ? API_HOST + '/api/hotel/' + idHotel : null;

    // Estado en memoria para las habitaciones y filtros
    var habitacionesDisponibles = [];
    var habitacionElegida = null;
    var serviciosElegidos = [];
    var COSTE_SERVICIO_ADICIONAL = 1;
    var COSTE_TODO_INCLUIDO = 10;
    var datosHotel = null;
    var fechaEntradaSeleccionada = params.get('fechaEntrada') || '';
    var fechaSalidaSeleccionada = params.get('fechaSalida') || '';

    function mostrarAvisoHabitaciones(message, type) {
        avisoHabitaciones.textContent = message;
        avisoHabitaciones.className = 'form-feedback ' + (type || 'info');
    }
    // Informa al usuario que los servicios adicionales son opcionales
    function mostrarAvisoServiciosOpcionales() {
        if (!document.body) {
            return;
        }
        if (!avisoServiciosToast) {
            avisoServiciosToast = document.createElement('div');
            avisoServiciosToast.className = 'rooms-toast';
            avisoServiciosToast.setAttribute('role', 'status');
            document.body.appendChild(avisoServiciosToast);
        }
        avisoServiciosToast.textContent = 'Los servicios adicionales son opcionales. Selecciona solo aquellos que necesites.';
        avisoServiciosToast.classList.add('show');
        window.clearTimeout(avisoServiciosTimeout);
        avisoServiciosTimeout = window.setTimeout(function () {
            avisoServiciosToast.classList.remove('show');
        }, 4200);
    }
    // Escapa caracteres HTML para evitar problemas 
    function escaparHtml(value) {
        if (value === null || value === undefined) {
            return '';
        }
        return value.toString()
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/\"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function formatearMoneda(value) {
        var amount = Number(value || 0);
        if (isNaN(amount)) {
            return '--';
        }
        return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(amount);
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

    // Calcula el total estimado con  la habitacion elegida y extras seleccionados
    function calcularTotalEstimado() {
        if (!habitacionElegida) {
            return 0;
        }

        var total = Number(habitacionElegida.precioPorNoche || 0);
        return total + calcularRecargoServicios();
    }

    function actualizarResumenSeleccion() {
        if (!habitacionElegida) {
            resumenHabitacion.textContent = '--';
            resumenTotal.textContent = '--';
            return;
        }

        resumenHabitacion.textContent = 'Habitacion ' + (habitacionElegida.numeroHabitacion || '') +
            ' - ' + (habitacionElegida.capacidad || '-') + ' personas';
        resumenTotal.textContent = formatearMoneda(calcularTotalEstimado());
    }

    // Construye dinamicamente la lista de servicios adicionales para la habitacion elegida
    function pintarServicios() {
        if (!habitacionElegida) {
            contenedorServicios.hidden = true;
            resumenSeleccion.hidden = true;
            mensajeSeleccionVacia.hidden = false;
            botonContinuar.disabled = true;
            return;
        }

        var services = [
            {
                id: 'TODO_INCLUIDO',
                label: 'Todo incluido',
                description: 'Comidas y bebidas ilimitadas.',
                available: true
            },
            {
                id: 'DESAYUNO_EXTRA',
                label: 'Desayuno especial',
                description: datosHotel && datosHotel.desayunoIncluido
                    ? 'Desayuno especial.'
                    : 'Animate a desayunar como los reyes.',
                available: true
            },
            {
                id: 'PARKING_PREMIUM',
                label: 'Parking vigilado',
                description: datosHotel && datosHotel.tieneParking
                    ? 'Acceso a plaza cubierta con vigilancia 24h.'
                    : 'Parking externo asociado al hotel.',
                available: true
            },
            {
                id: 'WIFI',
                label: 'WiFi mejorado',
                description: habitacionElegida.tieneWifi ? 'Incluida en la habitacion.' : 'Disponible bajo demanda.',
                available: habitacionElegida.tieneWifi
            },
            {
                id: 'AIRE',
                label: 'Aire acondicionado',
                description: 'Manten la habitacion a la temperatura ideal.',
                available: habitacionElegida.tieneAireAcondicionado
            },
            {
                id: 'BALCON',
                label: 'Balcon o terraza',
                description: habitacionElegida.tieneBalcon
                    ? 'Disfruta de vistas privadas.'
                    : 'No disponible en esta habitacion.',
                available: habitacionElegida.tieneBalcon
            }
        ];

        contenedorServicios.innerHTML = '';
        // Genera las opciones del servicio ofrecido
        for (var i = 0; i < services.length; i++) {
            var service = services[i];
            var label = document.createElement('label');
            label.className = 'service-option' + (service.available ? '' : ' disabled');

            var checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.value = service.id;
            checkbox.disabled = !service.available;
            checkbox.checked = tieneServicio(service.id);
            checkbox.addEventListener('change', (function (serviceId) {
                return function (event) {
                    if (event.target.checked) {
                        agregarServicio(serviceId);
                    } else {
                        eliminarServicio(serviceId);
                    }
                    actualizarResumenSeleccion();
                };
            })(service.id));

            var body = document.createElement('div');
            body.className = 'service-body';
            var strong = document.createElement('strong');
            strong.textContent = service.label;
            var span = document.createElement('span');
            span.textContent = service.description;
            body.appendChild(strong);
            body.appendChild(span);

            label.appendChild(checkbox);
            label.appendChild(body);
            contenedorServicios.appendChild(label);
        }

        contenedorServicios.hidden = false;
        resumenSeleccion.hidden = false;
        mensajeSeleccionVacia.hidden = true;
        botonContinuar.disabled = false;
        actualizarResumenSeleccion();
    }

    // Son las habitaciones disponibles y el aceso para seleccionarlas
    function pintarHabitaciones() {
        listaHabitaciones.innerHTML = '';

        if (!habitacionesDisponibles.length) {
            mensajeHabitaciones.textContent = 'No hay habitaciones disponibles ahora mismo.';
            return;
        }

        mensajeHabitaciones.textContent = 'Elige la habitacion que prefieras.';

        for (var i = 0; i < habitacionesDisponibles.length; i++) {
            var room = habitacionesDisponibles[i];
            var isSelected = habitacionElegida && habitacionElegida.id === room.id;
            var card = document.createElement('article');
            card.className = 'room-card' + (isSelected ? ' selected' : '');

            var header = document.createElement('header');
            header.className = 'room-card-header';

            var div = document.createElement('div');
            var h3 = document.createElement('h3');
            h3.textContent = 'Habitacion ' + (room.numeroHabitacion || 'S/N');
            var desc = document.createElement('p');
            desc.className = 'room-description';
            desc.textContent = room.descripcion || 'Sin descripcion';
            div.appendChild(h3);
            div.appendChild(desc);

            var price = document.createElement('span');
            price.className = 'room-price';
            price.textContent = formatearMoneda(room.precioPorNoche);

            header.appendChild(div);
            header.appendChild(price);
            card.appendChild(header);

            var meta = document.createElement('div');
            meta.className = 'room-meta';
            meta.innerHTML =
                '<span>Capacidad: ' + escaparHtml(room.capacidad || '-') + '</span>' +
                '<span>Tipo: ' + escaparHtml(room.tipoHabitacion || '-') + '</span>' +
                '<span>WiFi: ' + (room.tieneWifi ? 'Si' : 'No') + '</span>';
            card.appendChild(meta);

            var button = document.createElement('button');
            button.type = 'button';
            button.className = isSelected ? 'btn-secondary room-action' : 'btn-primary room-action';
            button.textContent = isSelected ? 'Habitacion seleccionada' : 'Elegir esta habitacion';
            button.disabled = isSelected;
            button.addEventListener('click', (function (currentRoom) {
                return function () {
                    habitacionElegida = currentRoom;
                    serviciosElegidos = [];
                    pintarHabitaciones();
                    pintarServicios();
                    mostrarAvisoServiciosOpcionales();
                };
            })(room));

            card.appendChild(button);
            listaHabitaciones.appendChild(card);
        }
    }

    function construirUrlHabitaciones() {
        if (!URL_HABITACIONES_BASE) {
            return null;
        }
        var url = new URL(URL_HABITACIONES_BASE);
        if (fechaEntradaSeleccionada && fechaSalidaSeleccionada) {
            url.searchParams.set('fechaEntrada', fechaEntradaSeleccionada);
            url.searchParams.set('fechaSalida', fechaSalidaSeleccionada);
        }
        return url.toString();
    }

    // Recupera informacion basica del hotel para personalizar la oferta de servicios
    function cargarHotel() {
        if (!URL_HOTEL) {
            return;
        }

        fetch(URL_HOTEL, { headers: { 'Accept': 'application/json' } })
            .then(function (response) {
                if (!response.ok) {
                    throw new Error('Error ' + response.status);
                }
                return response.json();
            })
            .then(function (data) {
                datosHotel = data;
            })
            .catch(function () {
                console.warn('No se pudo obtener la informacion del hotel');
            });
    }

    // Trae desde el backend las habitaciones disponibles y se encarga de mostrarlas
    function cargarHabitaciones() {
        var endpoint = construirUrlHabitaciones();
        if (!endpoint) {
            mensajeHabitaciones.textContent = 'No se indico el hotel. Vuelve a la pantalla anterior.';
            botonContinuar.disabled = true;
            return;
        }

        if (fechaEntradaSeleccionada && fechaSalidaSeleccionada) {
            mensajeHabitaciones.textContent = 'Buscando disponibilidad del ' + fechaEntradaSeleccionada + ' al ' + fechaSalidaSeleccionada + '...';
        } else {
            mensajeHabitaciones.textContent = 'Cargando habitaciones...';
        }
// Realiza la peticion al backend para obtener las habitaciones disponibles
        fetch(endpoint, { headers: { 'Accept': 'application/json' } })
            .then(function (response) {
                if (!response.ok) {
                    throw new Error('Error ' + response.status);
                }
                return response.json();
            })
            .then(function (rooms) {
                habitacionesDisponibles = Array.isArray(rooms) ? rooms : [];
                if (!habitacionesDisponibles.length) {
                    mensajeHabitaciones.textContent = fechaEntradaSeleccionada && fechaSalidaSeleccionada
                        ? 'No hay habitaciones disponibles durante esas fechas.'
                        : 'No hay habitaciones disponibles para este hotel.';
                    habitacionElegida = null;
                    serviciosElegidos = [];
                    pintarServicios();
                    pintarHabitaciones();
                    return;
                }
                pintarHabitaciones();
            })
            .catch(function () {
                mensajeHabitaciones.textContent = 'No se pudieron cargar las habitaciones.';
                mostrarAvisoHabitaciones('Error al cargar las habitaciones.', 'error');
            });
    }
    //evento de continuar a la pagina de reserva
    botonContinuar.addEventListener('click', function () {
        if (!habitacionElegida) {
            mostrarAvisoHabitaciones('Selecciona una habitacion disponible antes de continuar.', 'error');
            return;
        }

        var reservationUrl = new URL('reserva.html', window.location.href);
        reservationUrl.searchParams.set('idHotel', idHotel || '');
        reservationUrl.searchParams.set('hotelNombre', nombreHotel || '');
        reservationUrl.searchParams.set('habitacionId', habitacionElegida.id || '');
        reservationUrl.searchParams.set('habitacionNumero', habitacionElegida.numeroHabitacion || '');
        reservationUrl.searchParams.set('servicios', serviciosElegidos.join(','));
        reservationUrl.searchParams.set('redirect', window.location.href);
        if (fechaEntradaSeleccionada) {
            reservationUrl.searchParams.set('fechaEntrada', fechaEntradaSeleccionada);
        }
        if (fechaSalidaSeleccionada) {
            reservationUrl.searchParams.set('fechaSalida', fechaSalidaSeleccionada);
        }

        if (tieneServicio('TODO_INCLUIDO')) {
            reservationUrl.searchParams.set('todoIncluido', 'true');
        }

        window.location.href = reservationUrl.toString();
    });
// Establece los limites minimos en los inputs de fecha para no permitir fechas anteriores
    function establecerLimitesFechas() {
        if (!inputFechaEntrada || !inputFechaSalida) {
            return;
        }
        var hoy = new Date();
        var yyyy = hoy.getFullYear();
        var mm = String(hoy.getMonth() + 1).padStart(2, '0');
        var dd = String(hoy.getDate()).padStart(2, '0');
        var hoyStr = yyyy + '-' + mm + '-' + dd;
        inputFechaEntrada.min = hoyStr;
        inputFechaSalida.min = hoyStr;
    }

    function sincronizarFechasEnInputs() {
        if (!inputFechaEntrada || !inputFechaSalida) {
            return;
        }
        inputFechaEntrada.value = fechaEntradaSeleccionada;
        inputFechaSalida.value = fechaSalidaSeleccionada;
    }

    function manejarBusquedaFechas() {
        if (!inputFechaEntrada || !inputFechaSalida) {
            return;
        }
        var entrada = inputFechaEntrada.value;
        var salida = inputFechaSalida.value;
        if (!entrada || !salida) {
            mostrarAvisoHabitaciones('Indica fecha de entrada y salida.', 'error');
            return;
        }
        if (salida <= entrada) {
            mostrarAvisoHabitaciones('La fecha de salida debe ser posterior a la de entrada.', 'error');
            return;
        }
        mostrarAvisoHabitaciones('', 'info');
        fechaEntradaSeleccionada = entrada;
        fechaSalidaSeleccionada = salida;
        cargarHabitaciones();
    }

    function limpiarFechas() {
        if (inputFechaEntrada) {
            inputFechaEntrada.value = '';
        }
        if (inputFechaSalida) {
            inputFechaSalida.value = '';
        }
        fechaEntradaSeleccionada = '';
        fechaSalidaSeleccionada = '';
        mostrarAvisoHabitaciones('', 'info');
        cargarHabitaciones();
    }

    if (botonBuscarFechas) {
        botonBuscarFechas.addEventListener('click', manejarBusquedaFechas);
    }
    if (botonLimpiarFechas) {
        botonLimpiarFechas.addEventListener('click', limpiarFechas);
    }

    cargarHotel();
    establecerLimitesFechas();
    sincronizarFechasEnInputs();
    cargarHabitaciones();
})();

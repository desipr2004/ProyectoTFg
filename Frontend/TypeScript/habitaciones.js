(function () {
    var params = new URLSearchParams(window.location.search);
    var hotelId = params.get('hotelId');
    var hotelName = params.get('hotelNombre') || 'Hotel seleccionado';
    var redirectUrl = params.get('redirect');

    var roomsTitle = document.getElementById('roomsTitle');
    var roomsSubtitle = document.getElementById('roomsSubtitle');
    var roomsMessage = document.getElementById('roomsMessage');
    var roomsList = document.getElementById('roomsList');
    var roomsFeedback = document.getElementById('roomsFeedback');
    var roomsBackButton = document.getElementById('roomsBackButton');
    var servicesContainer = document.getElementById('servicesContainer');
    var selectionSummary = document.getElementById('selectionSummary');
    var selectionEmptyMessage = document.getElementById('selectionEmptyMessage');
    var summaryRoom = document.getElementById('summaryRoom');
    var summaryTotal = document.getElementById('summaryTotal');
    var continueButton = document.getElementById('continueButton');

    roomsTitle.textContent = 'Habitaciones disponibles - ' + hotelName;
    roomsSubtitle.textContent = hotelId
        ? 'Selecciona una habitación del hotel #' + hotelId + ' para configurar tu reserva.'
        : 'Selecciona el hotel desde la pantalla anterior.';

    roomsBackButton.addEventListener('click', function () {
        if (redirectUrl) {
            window.location.href = redirectUrl;
        } else {
            window.location.href = 'index.html';
        }
    });

    var isLocalEnv = window.location.protocol === 'file:' ||
        ['localhost', '127.0.0.1', '0.0.0.0'].indexOf(window.location.hostname) !== -1;

    var API_BASE = isLocalEnv ? 'http://localhost:8080' : window.location.origin;
    var ROOMS_URL = hotelId ? API_BASE + '/api/habitacion/hotel/' + hotelId + '/disponibles' : null;
    var HOTEL_URL = hotelId ? API_BASE + '/api/hotel/' + hotelId : null;

    var availableRooms = [];
    var selectedRoom = null;
    var selectedServices = [];
    var hotelData = null;

    function mostrarAvisoHabitaciones(message, type) {
        roomsFeedback.textContent = message;
        roomsFeedback.className = 'form-feedback ' + (type || 'info');
    }

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
            return '—';
        }
        return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(amount);
    }

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

    // Calcula el total estimado con base en la habitación elegida y extras marcados
    function calcularTotalEstimado() {
        if (!selectedRoom) {
            return 0;
        }

        var total = Number(selectedRoom.precioPorNoche || 0);
        if (tieneServicio('TODO_INCLUIDO')) {
            total = total * 1.2;
        }
        if (tieneServicio('PARKING_PREMIUM')) {
            total += 10;
        }
        if (tieneServicio('DESAYUNO_EXTRA')) {
            total += 8;
        }
        return total;
    }

    function actualizarResumenSeleccion() {
        if (!selectedRoom) {
            summaryRoom.textContent = '—';
            summaryTotal.textContent = '—';
            return;
        }

        summaryRoom.textContent = 'Habitación ' + (selectedRoom.numeroHabitacion || '') +
            ' · ' + (selectedRoom.capacidad || '-') + ' personas';
        summaryTotal.textContent = formatearMoneda(calcularTotalEstimado());
    }

    // Construye dinámicamente la lista de servicios adicionales para la habitación elegida
    function pintarServicios() {
        if (!selectedRoom) {
            servicesContainer.hidden = true;
            selectionSummary.hidden = true;
            selectionEmptyMessage.hidden = false;
            continueButton.disabled = true;
            return;
        }

        var services = [
            {
                id: 'TODO_INCLUIDO',
                label: 'Todo incluido',
                description: 'Comidas y bebidas ilimitadas durante la estancia.',
                available: true
            },
            {
                id: 'DESAYUNO_EXTRA',
                label: 'Desayuno gourmet',
                description: hotelData && hotelData.desayunoIncluido
                    ? 'Desayuno especial con platos calientes y repostería.'
                    : 'Añade desayuno completo a tu estancia.',
                available: true
            },
            {
                id: 'PARKING_PREMIUM',
                label: 'Parking vigilado',
                description: hotelData && hotelData.tieneParking
                    ? 'Acceso a plaza cubierta con vigilancia 24h.'
                    : 'Parking externo asociado al hotel.',
                available: true
            },
            {
                id: 'WIFI',
                label: 'WiFi alta velocidad',
                description: selectedRoom.tieneWifi ? 'Incluida en la habitación.' : 'Disponible bajo demanda.',
                available: selectedRoom.tieneWifi
            },
            {
                id: 'AIRE',
                label: 'Aire acondicionado',
                description: 'Mantén la habitación a la temperatura ideal.',
                available: selectedRoom.tieneAireAcondicionado
            },
            {
                id: 'BALCON',
                label: 'Balcón o terraza',
                description: selectedRoom.tieneBalcon
                    ? 'Disfruta de vistas privadas.'
                    : 'No disponible en esta habitación.',
                available: selectedRoom.tieneBalcon
            }
        ];

        servicesContainer.innerHTML = '';

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
            servicesContainer.appendChild(label);
        }

        servicesContainer.hidden = false;
        selectionSummary.hidden = false;
        selectionEmptyMessage.hidden = true;
        continueButton.disabled = false;
        actualizarResumenSeleccion();
    }

    // Pinta las tarjetas con las habitaciones disponibles y permite seleccionarlas
    function pintarHabitaciones() {
        roomsList.innerHTML = '';

        if (!availableRooms.length) {
            roomsMessage.textContent = 'No hay habitaciones disponibles ahora mismo.';
            return;
        }

        roomsMessage.textContent = 'Elige la habitación que prefieras.';

        for (var i = 0; i < availableRooms.length; i++) {
            var room = availableRooms[i];
            var isSelected = selectedRoom && selectedRoom.id === room.id;
            var card = document.createElement('article');
            card.className = 'room-card' + (isSelected ? ' selected' : '');

            var header = document.createElement('header');
            header.className = 'room-card-header';

            var div = document.createElement('div');
            var h3 = document.createElement('h3');
            h3.textContent = 'Habitación ' + (room.numeroHabitacion || 'S/N');
            var desc = document.createElement('p');
            desc.className = 'room-description';
            desc.textContent = room.descripcion || 'Sin descripción';
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
                '<span>WiFi: ' + (room.tieneWifi ? 'Sí' : 'No') + '</span>';
            card.appendChild(meta);

            var button = document.createElement('button');
            button.type = 'button';
            button.className = isSelected ? 'btn-secondary room-action' : 'btn-primary room-action';
            button.textContent = isSelected ? 'Habitación seleccionada' : 'Elegir esta habitación';
            button.disabled = isSelected;
            button.addEventListener('click', (function (currentRoom) {
                return function () {
                    selectedRoom = currentRoom;
                    selectedServices = [];
                    pintarHabitaciones();
                    pintarServicios();
                };
            })(room));

            card.appendChild(button);
            roomsList.appendChild(card);
        }
    }

    // Recupera información básica del hotel para personalizar la oferta de servicios
    function cargarHotel() {
        if (!HOTEL_URL) {
            return;
        }

        fetch(HOTEL_URL, { headers: { 'Accept': 'application/json' } })
            .then(function (response) {
                if (!response.ok) {
                    throw new Error('Error ' + response.status);
                }
                return response.json();
            })
            .then(function (data) {
                hotelData = data;
            })
            .catch(function () {
                console.warn('No se pudo obtener la información del hotel');
            });
    }

    // Trae desde el backend las habitaciones disponibles y refresca la vista
    function cargarHabitaciones() {
        if (!ROOMS_URL) {
            roomsMessage.textContent = 'No se indicó el hotel. Vuelve a la pantalla anterior.';
            continueButton.disabled = true;
            return;
        }

        roomsMessage.textContent = 'Cargando habitaciones...';

        fetch(ROOMS_URL, { headers: { 'Accept': 'application/json' } })
            .then(function (response) {
                if (!response.ok) {
                    throw new Error('Error ' + response.status);
                }
                return response.json();
            })
            .then(function (rooms) {
                availableRooms = Array.isArray(rooms) ? rooms : [];
                if (!availableRooms.length) {
                    roomsMessage.textContent = 'No hay habitaciones disponibles para este hotel.';
                    selectedRoom = null;
                    selectedServices = [];
                    pintarServicios();
                    pintarHabitaciones();
                    return;
                }
                pintarHabitaciones();
            })
            .catch(function () {
                roomsMessage.textContent = 'No se pudieron cargar las habitaciones. Inténtalo más tarde.';
                mostrarAvisoHabitaciones('Error al cargar las habitaciones.', 'error');
            });
    }

    continueButton.addEventListener('click', function () {
        if (!selectedRoom) {
            mostrarAvisoHabitaciones('Selecciona una habitación disponible antes de continuar.', 'error');
            return;
        }

        var reservationUrl = new URL('reserva.html', window.location.href);
        reservationUrl.searchParams.set('hotelId', hotelId || '');
        reservationUrl.searchParams.set('hotelNombre', hotelName || '');
        reservationUrl.searchParams.set('habitacionId', selectedRoom.id || '');
        reservationUrl.searchParams.set('habitacionNumero', selectedRoom.numeroHabitacion || '');
        reservationUrl.searchParams.set('servicios', selectedServices.join(','));
        reservationUrl.searchParams.set('redirect', window.location.href);

        if (tieneServicio('TODO_INCLUIDO')) {
            reservationUrl.searchParams.set('todoIncluido', 'true');
        }

        window.location.href = reservationUrl.toString();
    });

    cargarHotel();
    cargarHabitaciones();
})();

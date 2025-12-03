// Panel de usuarios: maneja historial, admin y formularios de registro/login
const resolvedProtocol = window.location.protocol === "https:" ? "https:" : "http:";
const resolvedHost = window.location.hostname && window.location.hostname !== "" ? window.location.hostname : "localhost";
const URL_API = resolvedProtocol + "//" + resolvedHost + ":8080/api";
const SesionApp = window.SesionApp || {};

var usuarioActual = null;
var reservaPendienteDeCancelar = null;
var modalCancelacion = null;
var campoMotivoCancelacion = null;
var botonConfirmarCancelacion = null;
var botonCerrarCancelacion = null;
var botonMantenerReserva = null;
var mensajeModalCancelacion = null;
var hotelesAdminCache = [];
var hotelesAdminMap = {};

// Punto de entrada: configura todos los eventos del panel de usuarios/admin
document.addEventListener("DOMContentLoaded", function(){
    // Botones y formularios principales visibles en la vista de usuarios
    var botonVerTodas = document.getElementById("btnTodasReservas");
    var formularioBuscarId = document.getElementById("buscarIdForm");
    var formularioBuscarCorreo = document.getElementById("buscarCorreoForm");
    var botonBuscarCorreo = document.getElementById("btnBuscarCorreo");
    var botonCabeceraLogin = document.getElementById("headerLoginBtn");
    var botonCabeceraRegistro = document.getElementById("headerRegisterBtn");
    var botonCabeceraHistorial = document.getElementById("headerHistorialBtn");
    var modalRegistro = document.getElementById("registerModal");
    var formularioRegistro = document.getElementById("registerForm");
    var botonCerrarRegistro = document.getElementById("closeRegisterModal");
    var botonHistorial = document.getElementById("historialBtn");
    var botonUsuarios = document.getElementById("btnUsuarios");
    var botonHabitaciones = document.getElementById("btnHabitaciones");
    var formularioHabitacion = document.getElementById("habitacionForm");
    var botonHabitacionReset = document.getElementById("habitacionReset");
    var selectHotelHabitacion = document.getElementById("habitacionHotelId");
    modalCancelacion = document.getElementById("cancelModal");
    campoMotivoCancelacion = document.getElementById("cancelModalTextarea");
    botonConfirmarCancelacion = document.getElementById("cancelModalConfirm");
    botonCerrarCancelacion = document.getElementById("cancelModalClose");
    botonMantenerReserva = document.getElementById("cancelModalCancel");
    mensajeModalCancelacion = document.getElementById("cancelModalFeedback");


    if(botonVerTodas){
        botonVerTodas.addEventListener("click", function(){
            cargarReservasAdministracion();
        });
    }

    if(formularioBuscarId){
        formularioBuscarId.addEventListener("submit", function(event){
            event.preventDefault();
            buscarReservaPorId();
        });
    }

    if(formularioBuscarCorreo){
        formularioBuscarCorreo.addEventListener("submit", function(event){
            event.preventDefault();
            buscarReservasPorCorreo();
        });
    }

    if(botonBuscarCorreo){
        botonBuscarCorreo.addEventListener("click", function(){
            buscarReservasPorCorreo();
        });
    }

    if(botonCabeceraLogin){
        botonCabeceraLogin.addEventListener("click", function(){
        });
    }

    if(botonCabeceraRegistro){
        botonCabeceraRegistro.addEventListener("click", function(){
            abrirModalRegistro();
        });
    }

    if(botonCabeceraHistorial){
        botonCabeceraHistorial.addEventListener("click", function(){
            mostrarHistorialDelCliente();
        });
    }

    if(formularioRegistro){
        formularioRegistro.addEventListener("submit", function(event){
            event.preventDefault();
            registrarUsuarioDesdeModal();
        });
    }

    if(botonCerrarRegistro){
        botonCerrarRegistro.addEventListener("click", function(){
            cerrarModalRegistro();
        });
    }

    if(modalRegistro){
        modalRegistro.addEventListener("click", function(event){
            if(event.target === modalRegistro){
                cerrarModalRegistro();
            }
        });
    }

    if(botonHistorial){
        botonHistorial.addEventListener("click", function(){
            mostrarHistorialDelCliente();
        });
    }

    // Botones del panel de admin
    if(botonUsuarios){
        botonUsuarios.addEventListener("click", function(){
            cargarUsuariosRegistrados();
        });
    }

    if(botonHabitaciones){
        botonHabitaciones.addEventListener("click", function(){
            cargarHotelesAdmin();
            cargarHabitacionesAdmin();
        });
    }

    if(formularioHabitacion){
        formularioHabitacion.addEventListener("submit", function(event){
            event.preventDefault();
            guardarHabitacionAdmin();
        });
    }

    if(botonHabitacionReset){
        botonHabitacionReset.addEventListener("click", function(){
            limpiarFormularioHabitacion();
        });
    }

    if(botonConfirmarCancelacion){
        botonConfirmarCancelacion.addEventListener("click", function(){
            confirmarCancelacionDesdeModal();
        });
    }

    if(botonCerrarCancelacion){
        botonCerrarCancelacion.addEventListener("click", function(){
            cerrarModalCancelacion();
        });
    }

    if(botonMantenerReserva){
        botonMantenerReserva.addEventListener("click", function(){
            cerrarModalCancelacion();
        });
    }

    if(modalCancelacion){
        modalCancelacion.addEventListener("click", function(event){
            if(event.target === modalCancelacion){
                cerrarModalCancelacion();
            }
        });
    }

    // Al finalizar la configuracion restauramos la sesion almacenada y abrimos historial si corresponde
    restaurarSesionAppPersistida();
    abrirHistorialSiCorresponde();
});

// Muestra un aviso flotante en el panel de habitaciones del admin
function mostrarPopupHabitacion(mensaje){
    if(!document || !document.body){
        window.alert(mensaje);
        return;
    }
    var popup = document.createElement("div");
    popup.className = "habitacion-popup";
    popup.textContent = mensaje;
    document.body.appendChild(popup);
    requestAnimationFrame(function(){
        popup.classList.add("show");
    });
    setTimeout(function(){
        popup.classList.remove("show");
        setTimeout(function(){
            popup.remove();
        }, 300);
    }, 2300);
}


/**Async, es modificador de funciones en JS que trabajara la funcion de form asíncrona , gracias a esto, Js te deja 
 * usar la palabra await que pausa la ejecucion hasta que la promesa se resuelva, como por ejemplo una llamada fetch a una API.
 */
// Inicia sesión desde el panel lateral reutilizando la API pública
async function iniciarSesionAppUsuario(){
    var emailInput = document.getElementById("loginEmail");
    var passwordInput = document.getElementById("loginPassword");
    var feedback = document.getElementById("loginFeedback");

    feedback.textContent = "";

    var datos = {
        email: emailInput.value.trim(),
        contrasenna: passwordInput.value
    };

    try{
        // fetch permite hacer peticiones HTTP desde JS, aquí lo usamos para llamar al backend
        var respuesta = await fetch(URL_API + "/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datos)
        });

        var resultado = await respuesta.json();

        if(respuesta.ok && resultado.usuario){
            usuarioActual = resultado.usuario;
            persistirSesionApp(usuarioActual);
            feedback.textContent = "Sesión iniciada como " + usuarioActual.email;
            feedback.classList.remove("error");
            mostrarPanelesSegunRol();
            abrirHistorialSiCorresponde();
        }else{
            feedback.textContent = resultado.error || "No se pudo iniciar sesión";
            feedback.classList.add("error");
        }
    }catch(error){
        feedback.textContent = "Error de conexión con el servidor";
        feedback.classList.add("error");
    }
}

// Muestra los paneles que corresponden según si el usuario es admin o cliente
// Activa u oculta secciones según si la sesión es cliente o admin
function mostrarPanelesSegunRol(){
    var panelCliente = document.getElementById("clientePanel");
    var panelAdmin = document.getElementById("adminPanel");
    var resultadosPanel = document.getElementById("resultadosPanel");
    var panelUsuarios = document.getElementById("usuariosPanel");
    var panelHabitaciones = document.getElementById("habitacionesPanel");

    if(!panelCliente || !panelAdmin || !resultadosPanel){
        return;
    }
// Si no hay usuario autenticado, ocultamos todo
    if(!usuarioActual){
        panelCliente.style.display = "none";
        panelAdmin.style.display = "none";
        resultadosPanel.style.display = "none";
        if(panelUsuarios){
            panelUsuarios.style.display = "none";
        }
        if(panelHabitaciones){
            panelHabitaciones.style.display = "none";
        }
        return;
    }

    var esAdmin = usuarioActual.tipoUsuario === "ADMIN";
    panelCliente.style.display = esAdmin ? "none" : "block";
    resultadosPanel.style.display = esAdmin ? "block" : "none";
    var clienteMensaje = document.getElementById("clienteMensaje");
    if(!esAdmin && clienteMensaje){
        clienteMensaje.textContent = "Pulsa en \"Ver historial\" para mostrar tus reservas.";
    }
    var cuerpoCliente = document.getElementById("clienteReservasBody");
    if(!esAdmin && cuerpoCliente){
        cuerpoCliente.innerHTML = "";
    }
    refrescarHeaderSesionApp();
// Mostramos el panel de admin si lo es
    if(esAdmin){
        panelAdmin.style.display = "block";
        cargarReservasAdministracion();
        if(panelUsuarios){
            panelUsuarios.style.display = "block";
            cargarUsuariosRegistrados();
        }
        if(panelHabitaciones){
            panelHabitaciones.style.display = "block";
            cargarHotelesAdmin();
            cargarHabitacionesAdmin();
        }
    }else{
        panelAdmin.style.display = "none";
        if(panelUsuarios){
            panelUsuarios.style.display = "none";
        }
        if(panelHabitaciones){
            panelHabitaciones.style.display = "none";
        }
    }
}

// Recupera las reservas del usuario autenticado y las pone en la tabla del cliente
// Obtiene el historial del cliente autenticado y lo pinta en la tabla
async function cargarReservasDelCliente(){
    var mensaje = document.getElementById("clienteMensaje");
    var cuerpo = document.getElementById("clienteReservasBody");
    cuerpo.innerHTML = "";

    if(!usuarioActual){
        mensaje.textContent = "Inicia sesión para ver tus reservas.";
        return;
    }

    try{
        var respuesta = await fetch(URL_API + "/reservas/por-usuario/" + usuarioActual.id);
        if(!respuesta.ok){
            mensaje.textContent = "No se pudieron cargar las reservas.";
            return;
        }
        var reservas = await respuesta.json();
        var reservasVisibles = reservas.filter(function(reserva){
            return (reserva.estadoReserva || "").toUpperCase() !== "CANCELADA";
        });

        if(reservasVisibles.length === 0){
            mensaje.textContent = "No tienes reservas activas actualmente.";
            return;
        }

        mensaje.textContent = "Reservas encontradas:";
        for(var i = 0; i < reservasVisibles.length; i++){
            var reserva = reservasVisibles[i];
            var fila = document.createElement("tr");

            fila.appendChild(crearCeldaSimple(reserva.id));
            fila.appendChild(crearCeldaSimple(reserva.fechaEntrada || "-"));
            fila.appendChild(crearCeldaSimple(reserva.fechaSalida || "-"));
            fila.appendChild(crearCeldaSimple(reserva.estadoReserva || "-"));

            var acciones = document.createElement("td");
            var btnEliminar = document.createElement("button");
            btnEliminar.type = "button";
            btnEliminar.textContent = "Cancelar";
            btnEliminar.className = "btn-secondary table-action-btn";
            btnEliminar.addEventListener("click", (function(id){
                return function(){
                    cancelarReservaCliente(id);
                };
            })(reserva.id));
            acciones.appendChild(btnEliminar);
            fila.appendChild(acciones);

            cuerpo.appendChild(fila);
        }
    }catch(error){
        mensaje.textContent = "Error al obtener datos del servidor.";
    }
}

// Carga todas las reservas disponibles para administradores
// Lista todas las reservas para el panel administrativo
async function cargarReservasAdministracion(){
    var feedback = document.getElementById("adminFeedback");
    feedback.textContent = "";

    try{
        var respuesta = await fetch(URL_API + "/reservas");
        if(!respuesta.ok){
            feedback.textContent = "No han podido cargar las reservas.";
            return;
        }
        var reservas = await respuesta.json();
        pintarTablaReservas(reservas, "Listado completo (" + reservas.length + ")");
    }catch(error){
        feedback.textContent = "Error al conectar con el servidor.";
    }
}

// Lista todos los usuarios para administradores
// Descarga todos los usuarios para mostrarlos en la tabla de admin
async function cargarUsuariosRegistrados(){
    var mensaje = document.getElementById("usuariosMensaje");
    var cuerpo = document.getElementById("tablaUsuariosBody");
    if(mensaje){
        mensaje.textContent = "Cargando usuarios...";
    }
    if(cuerpo){
        cuerpo.innerHTML = "";
    }
    try{
        var respuesta = await fetch(URL_API + "/usuarios");
        if(!respuesta.ok){
            if(mensaje){
                mensaje.textContent = "No se pudieron cargar los usuarios.";
            }
            return;
        }
        var usuarios = await respuesta.json();
        pintarTablaUsuarios(usuarios || []);
        if(mensaje){
            mensaje.textContent = usuarios.length ? "Usuarios cargados: " + usuarios.length : "No hay usuarios.";
        }
    }catch(error){
        if(mensaje){
            mensaje.textContent = "Error al conectar con el servidor.";
        }
    }
}

// CRUD de habitaciones para administradores
// Carga el catálogo de habitaciones para la sección CRUD del admin
async function cargarHabitacionesAdmin(){
    var mensaje = document.getElementById("habitacionesMensaje");
    var cuerpo = document.getElementById("tablaHabitacionesBody");
    if(mensaje){
        mensaje.textContent = "Cargando habitaciones...";
    }
    if(cuerpo){
        cuerpo.innerHTML = "";
    }
    try{
        var respuesta = await fetch(URL_API + "/habitacion");
        if(!respuesta.ok){
            if(mensaje){
                mensaje.textContent = "No se pudieron cargar las habitaciones.";
            }
            return;
        }
        var habitaciones = await respuesta.json();
        pintarTablaHabitaciones(habitaciones || []);
        if(mensaje){
            mensaje.textContent = habitaciones.length ? "Habitaciones cargadas: " + habitaciones.length : "No hay habitaciones.";
        }
    }catch(error){
        if(mensaje){
            mensaje.textContent = "Error al conectar con el servidor.";
        }
    }
}

// Alimenta el combo de hoteles disponible en el formulario de habitaciones
async function cargarHotelesAdmin(){
    var selectHotel = document.getElementById("habitacionHotelId");
    if(!selectHotel){
        return;
    }
    selectHotel.innerHTML = '<option value="">Selecciona un hotel</option>';
    hotelesAdminCache = [];
    hotelesAdminMap = {};
    try{
        // Preferimos hoteles activos si el endpoint está disponible
        var respuesta = await fetch(URL_API + "/hotel/activos");
        if(!respuesta.ok){
            respuesta = await fetch(URL_API + "/hotel");
        }
        if(!respuesta.ok){
            return;
        }
        var hoteles = await respuesta.json();
        hotelesAdminCache = Array.isArray(hoteles) ? hoteles : [];
        for(var i = 0; i < hotelesAdminCache.length; i++){
            var h = hotelesAdminCache[i];
            if(!h || h.id === null || typeof h.id === "undefined"){
                continue;
            }
            var valorId = String(h.id);
            hotelesAdminMap[valorId] = h;
            var opt = document.createElement("option");
            opt.value = valorId;
            opt.textContent = h.nombre || h.ciudad || ("Hotel " + valorId);
            selectHotel.appendChild(opt);
        }
        var seleccionado = selectHotel.dataset.selectedHotelId || "";
        if(seleccionado){
            var existe = Array.prototype.some.call(selectHotel.options, function(option){
                return option.value === seleccionado;
            });
            if(!existe){
                var optPendiente = document.createElement("option");
                optPendiente.value = seleccionado;
                var hotelPendiente = hotelesAdminMap[seleccionado];
                optPendiente.textContent = hotelPendiente && hotelPendiente.nombre ? hotelPendiente.nombre : ("Hotel " + seleccionado);
                selectHotel.appendChild(optPendiente);
            }
            selectHotel.value = seleccionado;
        }
    }catch(error){
        // Silenciamos el error para no romper el flujo de admin
    }
}

function pintarTablaHabitaciones(habitaciones){
    var cuerpo = document.getElementById("tablaHabitacionesBody");
    if(!cuerpo){
        return;
    }
    cuerpo.innerHTML = "";
    if(!habitaciones || habitaciones.length === 0){
        var filaVacia = document.createElement("tr");
        var celda = document.createElement("td");
        celda.colSpan = 7;
        celda.textContent = "Sin datos";
        filaVacia.appendChild(celda);
        cuerpo.appendChild(filaVacia);
        return;
    }

    for(var i = 0; i < habitaciones.length; i++){
        var h = habitaciones[i];
        var fila = document.createElement("tr");
        var hotelNombre = "-";
        if(h.hotel && h.hotel.nombre){
            hotelNombre = h.hotel.nombre;
        }else if(h.hotel && h.hotel.id){
            hotelNombre = "Hotel " + h.hotel.id;
        }else if(h.hotelNombre){
            hotelNombre = h.hotelNombre;
        }

        fila.innerHTML =
            "<td>" + (h.id || "-") + "</td>" +
            "<td>" + (h.numeroHabitacion || "") + "</td>" +
            "<td>" + hotelNombre + "</td>" +
            "<td>" + (h.precioPorNoche || "-") + "</td>" +
            "<td>" + (h.estado || "-") + "</td>" +
            "<td>" + (h.activa ? "Si" : "No") + "</td>";

        var acciones = document.createElement("td");
        var btnEditar = document.createElement("button");
        btnEditar.type = "button";
        btnEditar.textContent = "Editar";
        btnEditar.className = "btn-secondary table-action-btn";
        btnEditar.addEventListener("click", (function(habitacion){
            return function(){
                rellenarFormularioHabitacion(habitacion);
            };
        })(h));

        var btnEliminar = document.createElement("button");
        btnEliminar.type = "button";
        btnEliminar.textContent = "Eliminar";
        btnEliminar.className = "btn-secondary table-action-btn";
        btnEliminar.addEventListener("click", (function(id){
            return function(){
                eliminarHabitacionAdmin(id);
            };
        })(h.id));

        acciones.appendChild(btnEditar);
        acciones.appendChild(btnEliminar);
        fila.appendChild(acciones);
        cuerpo.appendChild(fila);
    }
}

function rellenarFormularioHabitacion(h){
    if(!h){
        return;
    }
    var idInput = document.getElementById("habitacionId");
    var numeroInput = document.getElementById("habitacionNumero");
    var hotelInput = document.getElementById("habitacionHotelId");
    var precioInput = document.getElementById("habitacionPrecio");
    var capacidadInput = document.getElementById("habitacionCapacidad");
    var tipoSelect = document.getElementById("habitacionTipo");
    var estadoSelect = document.getElementById("habitacionEstado");
    var descInput = document.getElementById("habitacionDescripcion");
    var wifiChk = document.getElementById("habitacionWifi");
    var aireChk = document.getElementById("habitacionAire");
    var calChk = document.getElementById("habitacionCalefaccion");
    var balconChk = document.getElementById("habitacionBalcon");
    var activaChk = document.getElementById("habitacionActiva");

    idInput.value = h.id || "";
    numeroInput.value = h.numeroHabitacion || "";
    if(hotelInput){
        var hotelSeleccionado = "";
        if(h.hotel && typeof h.hotel.id !== "undefined" && h.hotel.id !== null){
            hotelSeleccionado = String(h.hotel.id);
        }else if(typeof h.hotelId !== "undefined" && h.hotelId !== null){
            hotelSeleccionado = String(h.hotelId);
        }
        hotelInput.dataset.selectedHotelId = hotelSeleccionado;
        if(hotelSeleccionado){
            var existeOpcion = Array.prototype.some.call(hotelInput.options, function(option){
                return option.value === hotelSeleccionado;
            });
            if(!existeOpcion){
                var nuevaOpcion = document.createElement("option");
                nuevaOpcion.value = hotelSeleccionado;
                var hotelInfo = hotelesAdminMap[hotelSeleccionado];
                nuevaOpcion.textContent = hotelInfo && hotelInfo.nombre ? hotelInfo.nombre : ("Hotel " + hotelSeleccionado);
                hotelInput.appendChild(nuevaOpcion);
            }
            hotelInput.value = hotelSeleccionado;
        }else{
            hotelInput.value = "";
        }
    }
    precioInput.value = h.precioPorNoche || "";
    capacidadInput.value = h.capacidad || "";
    tipoSelect.value = h.tipoHabitacion || "INDIVIDUAL";
    estadoSelect.value = h.estado || "DISPONIBLE";
    descInput.value = h.descripcion || "";
    wifiChk.checked = Boolean(h.tieneWifi);
    aireChk.checked = Boolean(h.tieneAireAcondicionado);
    calChk.checked = Boolean(h.tieneCalefaccion);
    balconChk.checked = Boolean(h.tieneBalcon);
    activaChk.checked = Boolean(h.activa);
}

function limpiarFormularioHabitacion(){
    var idInput = document.getElementById("habitacionId");
    var numeroInput = document.getElementById("habitacionNumero");
    var hotelInput = document.getElementById("habitacionHotelId");
    var precioInput = document.getElementById("habitacionPrecio");
    var capacidadInput = document.getElementById("habitacionCapacidad");
    var tipoSelect = document.getElementById("habitacionTipo");
    var estadoSelect = document.getElementById("habitacionEstado");
    var descInput = document.getElementById("habitacionDescripcion");
    var wifiChk = document.getElementById("habitacionWifi");
    var aireChk = document.getElementById("habitacionAire");
    var calChk = document.getElementById("habitacionCalefaccion");
    var balconChk = document.getElementById("habitacionBalcon");
    var activaChk = document.getElementById("habitacionActiva");
    var feedback = document.getElementById("habitacionFeedback");

    idInput.value = "";
    numeroInput.value = "";
    hotelInput.value = "";
    if(hotelInput.dataset){
        delete hotelInput.dataset.selectedHotelId;
    }
    precioInput.value = "";
    capacidadInput.value = "";
    tipoSelect.value = "INDIVIDUAL";
    estadoSelect.value = "DISPONIBLE";
    descInput.value = "";
    wifiChk.checked = true;
    aireChk.checked = false;
    calChk.checked = true;
    balconChk.checked = false;
    activaChk.checked = true;
    if(feedback){
        feedback.textContent = "";
        feedback.className = "form-feedback";
    }
}
// Guarda o actualiza una habitacion según si tiene id o no
async function guardarHabitacionAdmin(){
    var feedback = document.getElementById("habitacionFeedback");
    if(feedback){
        feedback.textContent = "";
        feedback.className = "form-feedback";
    }

    var id = document.getElementById("habitacionId").value;
    var esActualizacion = Boolean(id);
    var hotelSelect = document.getElementById("habitacionHotelId");
    var valorHotel = hotelSelect ? (hotelSelect.value || hotelSelect.dataset.selectedHotelId || "") : "";
    var hotelId = parseInt(valorHotel, 10);
    if(!hotelSelect || isNaN(hotelId) || hotelId <= 0){
        if(feedback){
            feedback.textContent = "Selecciona un hotel válido antes de guardar.";
            feedback.classList.add("error");
        }
        return;
    }

    var payload = {
        numeroHabitacion: document.getElementById("habitacionNumero").value,
        capacidad: parseInt(document.getElementById("habitacionCapacidad").value, 10) || 0,
        precioPorNoche: parseFloat(document.getElementById("habitacionPrecio").value) || 0,
        descripcion: document.getElementById("habitacionDescripcion").value || null,
        tipoHabitacion: document.getElementById("habitacionTipo").value,
        estado: document.getElementById("habitacionEstado").value,
        tieneWifi: document.getElementById("habitacionWifi").checked,
        tieneAireAcondicionado: document.getElementById("habitacionAire").checked,
        tieneCalefaccion: document.getElementById("habitacionCalefaccion").checked,
        tieneBalcon: document.getElementById("habitacionBalcon").checked,
        activa: document.getElementById("habitacionActiva").checked,
        hotel: { id: hotelId }
    };

    var url = URL_API + "/habitacion";
    var method = "POST";
    if(id){
        url += "/" + id;
        method = "PUT";
    }

    try{
        var resp = await fetch(url, {
            method: method,
            headers: { "Content-Type": "application/json", "Accept": "application/json" },
            body: JSON.stringify(payload)
        });
        var respuestaTexto = await resp.text();
        if(!resp.ok){
            if(feedback){
                var mensajeError = "";
                try{
                    var respuestaJson = JSON.parse(respuestaTexto);
                    mensajeError = respuestaJson && (respuestaJson.message || respuestaJson.error) ? (respuestaJson.message || respuestaJson.error) : "";
                }catch(parseError){
                    mensajeError = respuestaTexto;
                }
                feedback.textContent = (mensajeError || "No se pudo guardar la habitacion.").trim();
                feedback.classList.add("error");
            }
            console.error("Error guardando habitacion", resp.status, respuestaTexto);
            return;
        }
        if(respuestaTexto){
            try{
                JSON.parse(respuestaTexto);
            }catch(parseOk){
                // Ignoramos si no es JSON válído, la respuesta ya se consumió
            }
        }
        if(feedback){
            feedback.textContent = "Habitacion guardada correctamente.";
            feedback.classList.add("success");
        }
        mostrarPopupHabitacion(esActualizacion ? "Cambios guardados correctamente" : "Habitacion creada.");
        limpiarFormularioHabitacion();
        cargarHabitacionesAdmin();
    }catch(error){
        if(feedback){
            feedback.textContent = "Error al guardar la habitacion.";
            feedback.classList.add("error");
        }
    }
}

// Elimina una habitación tras confirmar la acción
async function eliminarHabitacionAdmin(id){
    var feedback = document.getElementById("habitacionFeedback");
    if(!id){
        return;
    }
    try{
        var resp = await fetch(URL_API + "/habitacion/" + id, { method: "DELETE" });
        if(!resp.ok){
            if(feedback){
                feedback.textContent = "No se ha podido eliminar la habitacion.";
                feedback.classList.add("error");
            }
            return;
        }
        if(feedback){
            feedback.textContent = "Habitacion eliminada.";
            feedback.classList.add("success");
        }
        cargarHabitacionesAdmin();
    }catch(error){
        if(feedback){
            feedback.textContent = "Error al eliminar la habitacion.";
            feedback.classList.add("error");
        }
    }
}

// Busca una reserva específica introduciendo el ID en el panel admin
async function buscarReservaPorId(){
    var feedback = document.getElementById("adminFeedback");
    var idInput = document.getElementById("busquedaId");
    feedback.textContent = "";

    var id = parseInt(idInput.value, 10);
    if(isNaN(id)){
        feedback.textContent = "Introduce un número válido.";
        return;
    }

    try{
        var respuesta = await fetch(URL_API + "/reservas/" + id);
        if(!respuesta.ok){
            feedback.textContent = "No existe la reserva indicada.";
            pintarTablaReservas([], "Sin resultados");
            return;
        }
        var reserva = await respuesta.json();
        if(reserva && reserva.id){
            pintarTablaReservas([reserva], "Resultado para ID " + id);
        }else{
            pintarTablaReservas([], "Sin resultados");
        }
    }catch(error){
        feedback.textContent = "Error al realizar la búsqueda.";
    }
}

// Busca reservas filtrando por correo electrónico
async function buscarReservasPorCorreo(){
    var feedback = document.getElementById("adminFeedback");
    var correoInput = document.getElementById("busquedaCorreo");
    feedback.textContent = "";

    var correo = correoInput && correoInput.value ? correoInput.value.trim() : "";
    if(correo === ""){
        feedback.textContent = "Introduce un correo válido.";
        return;
    }

    try{
        var respuesta = await fetch(URL_API + "/reservas/por-email?email=" + encodeURIComponent(correo));
        if(!respuesta.ok){
            feedback.textContent = "No se encontraron reservas para " + correo + ".";
            pintarTablaReservas([], "Sin resultados");
            return;
        }

        var reservas = await respuesta.json();
        if(reservas && reservas.length){
            feedback.textContent = "";
            pintarTablaReservas(reservas, "Reservas para " + correo);
        }else{
            feedback.textContent = "No se encontraron reservas para " + correo + ".";
            pintarTablaReservas([], "Sin resultados");
        }
    }catch(error){
        feedback.textContent = "Error al realizar la búsqueda.";
    }
}
// Pinta la tabla de reservas en el panel de administración
function pintarTablaReservas(reservas, mensaje){
    var cuerpo = document.getElementById("tablaReservasBody");
    var texto = document.getElementById("resultadoMensaje");

    cuerpo.innerHTML = "";
    texto.textContent = mensaje || "Resultados:";

    if(!reservas || reservas.length === 0){
        var fila = document.createElement("tr");
        var celda = document.createElement("td");
        celda.colSpan = 7;
        celda.textContent = "No hay datos que mostrar.";
        fila.appendChild(celda);
        cuerpo.appendChild(fila);
        return;
    }

    for(var i = 0; i < reservas.length; i++){
        var reserva = reservas[i];
        var fila = document.createElement("tr");
        var nombre = "-";
        if(reserva.nombreCompletoUsuario){
            nombre = reserva.nombreCompletoUsuario;
        }else if(reserva.usuario && reserva.usuario.nombre){
            nombre = reserva.usuario.nombre;
        }else if(reserva.usuarioEmail){
            nombre = reserva.usuarioEmail;
        }else if(reserva.usuario && reserva.usuario.email){
            nombre = reserva.usuario.email;
        }

        var correo = "-";
        if(reserva.usuarioEmail){
            correo = reserva.usuarioEmail;
        }else if(reserva.emailUsuario){
            correo = reserva.emailUsuario;
        }else if(reserva.usuario && reserva.usuario.email){
            correo = reserva.usuario.email;
        }
        var habitacion = reserva.habitacion && reserva.habitacion.numeroHabitacion ? reserva.habitacion.numeroHabitacion : "-";

        fila.innerHTML = "<td>" + reserva.id + "</td>" +
                         "<td>" + nombre + "</td>" +
                         "<td>" + habitacion + "</td>" +
                         "<td>" + (reserva.fechaEntrada || "-") + "</td>" +
                         "<td>" + (reserva.fechaSalida || "-") + "</td>" +
                         "<td>" + (reserva.estadoReserva || "-") + "</td>" +
                         "<td>" + (reserva.motivoCancelacion || "-") + "</td>";

        var acciones = document.createElement("td");
        var btnEliminar = document.createElement("button");
        btnEliminar.type = "button";
        btnEliminar.textContent = "Eliminar";
        btnEliminar.className = "btn-secondary table-action-btn";
        btnEliminar.addEventListener("click", (function(reservaId){
            return function(){
                eliminarReservaAdmin(reservaId);
            };
        })(reserva.id));
        acciones.appendChild(btnEliminar);
        fila.appendChild(acciones);
        cuerpo.appendChild(fila);
    }
}
// Pinta la tabla de usuarios en el panel de administración
function pintarTablaUsuarios(usuarios){
    var cuerpo = document.getElementById("tablaUsuariosBody");
    if(!cuerpo){
        return;
    }
    cuerpo.innerHTML = "";
    if(!usuarios || usuarios.length === 0){
        var filaVacia = document.createElement("tr");
        var celda = document.createElement("td");
        celda.colSpan = 6;
        celda.textContent = "No hay usuarios que mostrar.";
        filaVacia.appendChild(celda);
        cuerpo.appendChild(filaVacia);
        return;
    }

    for(var i = 0; i < usuarios.length; i++){
        var usuario = usuarios[i];
        var fila = document.createElement("tr");
        fila.innerHTML = "<td>" + (usuario.id || "-") + "</td>" +
                         "<td>" + (usuario.nombre || "-") + "</td>" +
                         "<td>" + (usuario.apellido || "-") + "</td>" +
                         "<td>" + (usuario.email || "-") + "</td>" +
                         "<td>" + (usuario.tipoUsuario || "-") + "</td>" +
                         "<td>" + (usuario.activo ? "Sí" : "No") + "</td>";
        cuerpo.appendChild(fila);
    }
}

function crearCeldaSimple(texto){
    var celda = document.createElement("td");
    celda.textContent = texto;
    return celda;
}

// Inicia el flujo de cancelación desde el panel cliente
function cancelarReservaCliente(id){
    if(modalCancelacion){
        abrirModalCancelacion(id);
        return;
    }
    var motivo = solicitarMotivoCancelacion();
    if(motivo === null){
        return;
    }
    ejecutarCancelacionReserva(id, motivo);
}
// Solicita al usuario el motivo de la cancelación mediante un prompt (flujo antiguo sin modal)
function solicitarMotivoCancelacion(){
    var mensaje = "Indica el motivo de la cancelacion:";
    var motivo = window.prompt(mensaje);
    if(motivo === null){
        return null;
    }
    motivo = motivo.trim();
    if(!motivo){
        window.alert("Debes indicar un motivo para cancelar la reserva.");
        return null;
    }
    if(motivo.length > 200){
        window.alert("El motivo no puede superar los 200 caracteres.");
        return null;
    }
    return motivo;
}

// Ventana simple para anotar el motivo antes de enviar la cancelación
function abrirModalCancelacion(reservaId){
    reservaPendienteDeCancelar = reservaId;
    if(campoMotivoCancelacion){
        campoMotivoCancelacion.value = "";
    }
    mostrarMensajeModalCancelacion("", false);
    if(modalCancelacion){
        modalCancelacion.classList.add("open");
    }
}

function cerrarModalCancelacion(){
    reservaPendienteDeCancelar = null;
    if(modalCancelacion){
        modalCancelacion.classList.remove("open");
    }
}

// Este botón valida el texto y dispara la llamada real
function confirmarCancelacionDesdeModal(){
    if(reservaPendienteDeCancelar === null){
        return;
    }
    var motivo = campoMotivoCancelacion ? campoMotivoCancelacion.value.trim() : "";
    if(motivo.length === 0){
        mostrarMensajeModalCancelacion("Escribe un motivo corto.", true);
        return;
    }
    if(motivo.length > 200){
        mostrarMensajeModalCancelacion("El motivo no puede superar los 200 caracteres.", true);
        return;
    }
    mostrarMensajeModalCancelacion("Enviando cancelacion...", false);
    ejecutarCancelacionReserva(reservaPendienteDeCancelar, motivo);
}

function mostrarMensajeModalCancelacion(texto, esError){
    if(!mensajeModalCancelacion){
        return;
    }
    mensajeModalCancelacion.textContent = texto || "";
    mensajeModalCancelacion.className = "form-feedback";
    if(esError){
        mensajeModalCancelacion.classList.add("error");
    }else if(texto){
        mensajeModalCancelacion.classList.add("success");
    }
}

// Realiza la petición HTTP para cancelar la reserva y refresca tablas
async function ejecutarCancelacionReserva(id, motivo){
    var mensaje = document.getElementById("clienteMensaje");
    try{
        var respuesta = await fetch(URL_API + "/reservas/" + id + "/cancelar", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({ motivo: motivo })
        });
        if(respuesta.ok){
            if(mensaje){
                mensaje.textContent = "Reserva cancelada correctamente.";
            }
            mostrarMensajeModalCancelacion("Reserva cancelada.", false);
            cerrarModalCancelacion();
            cargarReservasDelCliente();
        }else{
            if(mensaje){
                mensaje.textContent = "No se pudo cancelar la reserva.";
            }
            mostrarMensajeModalCancelacion("No se pudo cancelar la reserva.", true);
        }
    }catch(error){
        if(mensaje){
            mensaje.textContent = "Error al cancelar la reserva.";
        }
        mostrarMensajeModalCancelacion("Error al cancelar la reserva.", true);
    }
}

// Elimina reservas desde el panel de admin mostrando confirmación previa
async function eliminarReservaAdmin(id){
    var feedback = document.getElementById("adminFeedback");
    if(!window.confirm("¿Eliminar definitivamente la reserva " + id + "?")){
        return;
    }

    if(feedback){
        feedback.textContent = "Eliminando la reserva...";
        feedback.classList.remove("error", "success");
        feedback.classList.add("info");
    }

    try{
        var respuesta = await fetch(URL_API + "/reservas/" + id, { method: "DELETE" });
        if(respuesta.ok){
            if(feedback){
                feedback.textContent = "Reserva eliminada correctamente.";
                feedback.classList.remove("error", "info");
                feedback.classList.add("success");
            }
            cargarReservasAdministracion();
        }else{
            if(feedback){
                feedback.textContent = "No se pudo eliminar la reserva.";
                feedback.classList.remove("success", "info");
                feedback.classList.add("error");
            }
        }
    }catch(error){
        if(feedback){
            feedback.textContent = "Error al eliminar la reserva.";
            feedback.classList.remove("success", "info");
            feedback.classList.add("error");
        }
    }
}
// Muestra el panel de cliente y carga el historial de reservas del usuario 
function mostrarHistorialDelCliente(){
    if(!usuarioActual){
        var feedback = document.getElementById("loginFeedback");
        if(feedback){
            feedback.textContent = "Inicia sesión para consultar tu historial.";
            feedback.classList.add("error");
        }
        if(SesionApp && SesionApp.marcarHistorial){
            SesionApp.marcarHistorial();
        }
        return;
    }

    var panelCliente = document.getElementById("clientePanel");
    if(panelCliente){
        panelCliente.style.display = "block";
    }
    cargarReservasDelCliente();
    setTimeout(function(){
        if(panelCliente){
            panelCliente.scrollIntoView({ behavior: "smooth" });
        }
    }, 100);
}

function abrirModalRegistro(){
    var modal = document.getElementById("registerModal");
    if(modal){
        // classList nos permite añadir o quitar clases CSS para mostrar u ocultar el modal.
        modal.classList.add("open");
    }
}

function cerrarModalRegistro(){
    var modal = document.getElementById("registerModal");
    if(modal){
        modal.classList.remove("open");
    }
    var form = document.getElementById("registerForm");
    if(form){
        form.reset();
    }
    var feedback = document.getElementById("registerFeedback");
    if(feedback){
        feedback.textContent = "";
        feedback.classList.remove("error", "success", "info");
    }
}

// Maneja el registro simplificado que aparece en el modal del landing
async function registrarUsuarioDesdeModal(){
    var emailInput = document.getElementById("registerEmail");
    var nombreInput = document.getElementById("registerNombre");
    var apellidoInput = document.getElementById("registerApellido");
    var passwordInput = document.getElementById("registerPassword");
    var telefonoInput = document.getElementById("registerTelefono");
    var feedback = document.getElementById("registerFeedback");

    if(!emailInput || !passwordInput || !feedback){
        return;
    }

    var email = emailInput.value.trim();
    var nombre = nombreInput ? nombreInput.value.trim() : "";
    var apellido = apellidoInput ? apellidoInput.value.trim() : "";
    var contrasenna = passwordInput.value;
    var telefono = telefonoInput ? telefonoInput.value.trim() : "";

    if(email === "" || contrasenna === ""){
        feedback.textContent = "Introduce un correo y una contraseña.";
        feedback.classList.remove("info", "success");
        feedback.classList.add("error");
        return;
    }

    feedback.textContent = "Creando usuario...";
    feedback.classList.remove("error", "success");
    feedback.classList.add("info");

    try{
        var respuesta = await fetch(URL_API + "/auth/registro", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                contrasenna: contrasenna,
                nombre: nombre,
                apellido: apellido,
                telefono: telefono
            })
        });

        var resultado = await respuesta.json();

        if(respuesta.ok && resultado.usuario){
            feedback.textContent = "Cuenta creada. Redirigiendo a los hoteles...";
            feedback.classList.remove("error", "info");
            feedback.classList.add("success");

            var loginEmail = document.getElementById("loginEmail");
            if(loginEmail){
                loginEmail.value = email;
            }

            usuarioActual = resultado.usuario;
            persistirSesionApp(usuarioActual);
            refrescarHeaderSesionApp();

            setTimeout(function(){
                cerrarModalRegistro();
                window.location.href = "inicio.html#hotelsList";
            }, 800);
        }else{
            feedback.textContent = resultado.error || "No se pudo registrar el usuario.";
            feedback.classList.remove("success", "info");
            feedback.classList.add("error");
        }
    }catch(error){
        feedback.textContent = "Error al registrar el usuario.";
        feedback.classList.remove("success", "info");
        feedback.classList.add("error");
    }
}

function persistirSesionApp(usuario){
    if(SesionApp && SesionApp.guardarSesion){
        SesionApp.guardarSesion(usuario);
    }
}

function obtenerSesionPersistida(){
    if(SesionApp && SesionApp.obtenerSesion){
        return SesionApp.obtenerSesion();
    }
    return null;
}

function restaurarSesionAppPersistida(){
    var guardada = obtenerSesionPersistida();
    if(guardada){
        usuarioActual = guardada;
        mostrarPanelesSegunRol();
    }else{
        refrescarHeaderSesionApp();
    }
}

function refrescarHeaderSesionApp(){
    if(SesionApp && SesionApp.actualizarCabecera){
        SesionApp.actualizarCabecera(usuarioActual);
    }
}

// Revisa si el landing pidió abrir el historial automáticamente
function abrirHistorialSiCorresponde(){
    if(SesionApp && SesionApp.consumirHistorial && SesionApp.consumirHistorial()){
        mostrarHistorialDelCliente();
    }
}

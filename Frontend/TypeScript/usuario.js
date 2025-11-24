const URL_API = (window.location.protocol === "file:" || ["localhost", "127.0.0.1", "0.0.0.0"].indexOf(window.location.hostname) !== -1) ? "http://localhost:8080/api" : window.location.origin + "/api";
const SesionApp = window.SesionApp || {};

var usuarioActual = null;

document.addEventListener("DOMContentLoaded", function(){
    var botonVerTodas = document.getElementById("btnTodasReservas");
    var formularioBuscarId = document.getElementById("buscarIdForm");
    var formularioBuscarCorreo = document.getElementById("buscarCorreoForm");
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


    restaurarSesionAppPersistida();
    abrirHistorialSiCorresponde();
});

// Controla el flujo de autenticación contra el backend usando async/await
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
        // fetch permite hacer peticiones HTTP desde JS; aquí lo usamos para llamar al backend
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
function mostrarPanelesSegunRol(){
    var panelCliente = document.getElementById("clientePanel");
    var panelAdmin = document.getElementById("adminPanel");
    var resultadosPanel = document.getElementById("resultadosPanel");
    var panelUsuarios = document.getElementById("usuariosPanel");
    var panelHabitaciones = document.getElementById("habitacionesPanel");

    if(!usuarioActual){
        return;
    }

    panelCliente.style.display = "block";
    resultadosPanel.style.display = "block";
    var clienteMensaje = document.getElementById("clienteMensaje");
    if(clienteMensaje){
        clienteMensaje.textContent = "Pulsa en \"Ver historial\" para mostrar tus reservas.";
    }
    var cuerpoCliente = document.getElementById("clienteReservasBody");
    if(cuerpoCliente){
        cuerpoCliente.innerHTML = "";
    }
    refrescarHeaderSesionApp();

    if(usuarioActual.tipoUsuario === "ADMIN"){
        panelAdmin.style.display = "block";
        // Los administradores ven todas las reservas desde el primer momento
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

// Recupera las reservas del usuario autenticado y las pinta en la tabla del cliente
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
        if(reservas.length === 0){
            mensaje.textContent = "Aún no tienes reservas registradas.";
            return;
        }

        mensaje.textContent = "Reservas encontradas:";
        for(var i = 0; i < reservas.length; i++){
            var reserva = reservas[i];
            var fila = document.createElement("tr");

            fila.appendChild(crearCeldaSimple(reserva.id));
            fila.appendChild(crearCeldaSimple(reserva.fechaEntrada || "-"));
            fila.appendChild(crearCeldaSimple(reserva.fechaSalida || "-"));
            fila.appendChild(crearCeldaSimple(reserva.estadoReserva || "-"));
            fila.appendChild(crearCeldaSimple(reserva.numeroPersonas || reserva.numPersonas || "-"));

            var acciones = document.createElement("td");
            var btnEliminar = document.createElement("button");
            btnEliminar.type = "button";
            btnEliminar.textContent = "Eliminar";
            btnEliminar.className = "btn-secondary table-action-btn";
            btnEliminar.addEventListener("click", (function(id){
                return function(){
                    eliminarReservaCliente(id);
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
async function cargarReservasAdministracion(){
    var feedback = document.getElementById("adminFeedback");
    feedback.textContent = "";

    try{
        var respuesta = await fetch(URL_API + "/reservas");
        if(!respuesta.ok){
            feedback.textContent = "No se pudieron cargar las reservas.";
            return;
        }
        var reservas = await respuesta.json();
        pintarTablaReservas(reservas, "Listado completo (" + reservas.length + ")");
    }catch(error){
        feedback.textContent = "Error al conectar con el servidor.";
    }
}

// Lista todos los usuarios para administradores
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

async function cargarHotelesAdmin(){
    var selectHotel = document.getElementById("habitacionHotelId");
    if(!selectHotel){
        return;
    }
    selectHotel.innerHTML = '<option value="">Selecciona un hotel</option>';
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
        for(var i = 0; i < hoteles.length; i++){
            var h = hoteles[i];
            var opt = document.createElement("option");
            opt.value = h.id;
            opt.textContent = h.nombre || h.ciudad || "Hotel " + (h.id || "");
            selectHotel.appendChild(opt);
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
        fila.innerHTML =
            "<td>" + (h.id || "-") + "</td>" +
            "<td>" + (h.numeroHabitacion || "") + "</td>" +
            "<td>" + (h.hotel && h.hotel.id ? h.hotel.id : "-") + "</td>" +
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
    hotelInput.value = h.hotel && h.hotel.id ? h.hotel.id : "";
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

async function guardarHabitacionAdmin(){
    var feedback = document.getElementById("habitacionFeedback");
    if(feedback){
        feedback.textContent = "";
        feedback.className = "form-feedback";
    }

    var id = document.getElementById("habitacionId").value;
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
        hotel: { id: parseInt(document.getElementById("habitacionHotelId").value, 10) || 0 }
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
        if(!resp.ok){
            if(feedback){
                feedback.textContent = "No se pudo guardar la habitacion.";
                feedback.classList.add("error");
            }
            return;
        }
        await resp.json();
        if(feedback){
            feedback.textContent = "Habitacion guardada correctamente.";
            feedback.classList.add("success");
        }
        limpiarFormularioHabitacion();
        cargarHabitacionesAdmin();
    }catch(error){
        if(feedback){
            feedback.textContent = "Error al guardar la habitacion.";
            feedback.classList.add("error");
        }
    }
}

async function eliminarHabitacionAdmin(id){
    var feedback = document.getElementById("habitacionFeedback");
    if(!id){
        return;
    }
    try{
        var resp = await fetch(URL_API + "/habitacion/" + id, { method: "DELETE" });
        if(!resp.ok){
            if(feedback){
                feedback.textContent = "No se pudo eliminar la habitacion.";
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

async function buscarReservasPorCorreo(){
    var feedback = document.getElementById("adminFeedback");
    var correoInput = document.getElementById("busquedaCorreo");
    feedback.textContent = "";

    var correo = correoInput.value.trim();
    if(correo === ""){
        feedback.textContent = "Introduce un correo.";
        return;
    }

    try{
        var respuesta = await fetch(URL_API + "/reservas/por-email?email=" + encodeURIComponent(correo));
        if(!respuesta.ok){
            feedback.textContent = "No se pudieron obtener datos para ese correo.";
            pintarTablaReservas([], "Sin resultados");
            return;
        }
        var reservas = await respuesta.json();
        if(reservas.length === 0){
            feedback.textContent = "No hay reservas asociadas a ese correo.";
        }else{
            feedback.textContent = "";
        }
        pintarTablaReservas(reservas, "Búsqueda por correo");
    }catch(error){
        feedback.textContent = "Se produjo un error durante la búsqueda.";
    }
}

function pintarTablaReservas(reservas, mensaje){
    var cuerpo = document.getElementById("tablaReservasBody");
    var texto = document.getElementById("resultadoMensaje");

    cuerpo.innerHTML = "";
    texto.textContent = mensaje || "Resultados:";

    if(!reservas || reservas.length === 0){
        var fila = document.createElement("tr");
        var celda = document.createElement("td");
        celda.colSpan = 6;
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
                         "<td>" + (reserva.estadoReserva || "-") + "</td>";
        cuerpo.appendChild(fila);
    }
}

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

async function eliminarReservaCliente(id){
    var mensaje = document.getElementById("clienteMensaje");
    if(!window.confirm("¿Eliminar la reserva " + id + "?")){
        return;
    }

    try{
        var respuesta = await fetch(URL_API + "/reservas/" + id, { method: "DELETE" });
        if(respuesta.ok){
            mensaje.textContent = "Reserva eliminada correctamente.";
            cargarReservasDelCliente();
        }else{
            mensaje.textContent = "No se pudo eliminar la reserva.";
        }
    }catch(error){
        mensaje.textContent = "Error al eliminar la reserva.";
    }
}

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
        var respuesta = await fetch(URL_API + "/auth/registro-rapido", {
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
                window.location.href = "index.html#hotelsList";
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

function abrirHistorialSiCorresponde(){
    if(SesionApp && SesionApp.consumirHistorial && SesionApp.consumirHistorial()){
        mostrarHistorialDelCliente();
    }
}

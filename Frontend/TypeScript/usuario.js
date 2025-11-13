const API_BASE = (window.location.protocol === "file:" || ["localhost", "127.0.0.1", "0.0.0.0"].indexOf(window.location.hostname) !== -1) ? "http://localhost:8080/api" : window.location.origin + "/api";
const Sesion = window.SesionApp || {};

var usuarioActual = null;

document.addEventListener("DOMContentLoaded", function(){
    var loginForm = document.getElementById("loginForm");
    var btnTodas = document.getElementById("btnTodasReservas");
    var formBuscarId = document.getElementById("buscarIdForm");
    var formBuscarCorreo = document.getElementById("buscarCorreoForm");
    var headerLoginBtn = document.getElementById("headerLoginBtn");
    var headerRegisterBtn = document.getElementById("headerRegisterBtn");
    var headerHistorialBtn = document.getElementById("headerHistorialBtn");
    var registerModal = document.getElementById("registerModal");
    var registerForm = document.getElementById("registerForm");
    var closeRegisterBtn = document.getElementById("closeRegisterModal");
    var historialBtn = document.getElementById("historialBtn");
    var gestionarReservaForm = document.getElementById("gestionarReservaForm");
    var eliminarReservaForm = document.getElementById("eliminarReservaForm");
    var btnCrearReserva = document.getElementById("btnCrearReserva");
    var btnActualizarReserva = document.getElementById("btnActualizarReserva");

    if(loginForm){
        loginForm.addEventListener("submit", function(event){
            event.preventDefault();
            iniciarSesionUsuario();
        });
    }

    if(btnTodas){
        btnTodas.addEventListener("click", function(){
            cargarReservasAdministracion();
        });
    }

    if(formBuscarId){
        formBuscarId.addEventListener("submit", function(event){
            event.preventDefault();
            buscarReservaPorId();
        });
    }

    if(formBuscarCorreo){
        formBuscarCorreo.addEventListener("submit", function(event){
            event.preventDefault();
            buscarReservasPorCorreo();
        });
    }

    if(headerLoginBtn){
        headerLoginBtn.addEventListener("click", function(){
            var formulario = document.getElementById("loginForm");
            if(formulario){
                formulario.scrollIntoView({ behavior: "smooth" });
            }
        });
    }

    if(headerRegisterBtn){
        headerRegisterBtn.addEventListener("click", function(){
            abrirModalRegistro();
        });
    }

    if(headerHistorialBtn){
        headerHistorialBtn.addEventListener("click", function(){
            mostrarHistorialDelCliente();
        });
    }

    if(registerForm){
        registerForm.addEventListener("submit", function(event){
            event.preventDefault();
            registrarUsuarioDesdeModal();
        });
    }

    if(closeRegisterBtn){
        closeRegisterBtn.addEventListener("click", function(){
            cerrarModalRegistro();
        });
    }

    if(registerModal){
        registerModal.addEventListener("click", function(event){
            if(event.target === registerModal){
                cerrarModalRegistro();
            }
        });
    }

    if(historialBtn){
        historialBtn.addEventListener("click", function(){
            mostrarHistorialDelCliente();
        });
    }

    if(gestionarReservaForm){
        gestionarReservaForm.addEventListener("submit", function(event){
            event.preventDefault();
        });
    }

    if(btnCrearReserva){
        btnCrearReserva.addEventListener("click", function(){
            gestionarReservaDesdePanel("crear");
        });
    }

    if(btnActualizarReserva){
        btnActualizarReserva.addEventListener("click", function(){
            gestionarReservaDesdePanel("actualizar");
        });
    }

    if(eliminarReservaForm){
        eliminarReservaForm.addEventListener("submit", function(event){
            event.preventDefault();
            eliminarReservaDesdePanel();
        });
    }

    restaurarSesionPersistida();
    abrirHistorialSiCorresponde();
});

// Controla el flujo de autenticación contra el backend usando async/await
async function iniciarSesionUsuario(){
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
        var respuesta = await fetch(API_BASE + "/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datos)
        });

        var resultado = await respuesta.json();

        if(respuesta.ok && resultado.usuario){
            usuarioActual = resultado.usuario;
            persistirSesion(usuarioActual);
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
    refrescarHeaderSesion();

    if(usuarioActual.tipoUsuario === "ADMIN"){
        panelAdmin.style.display = "block";
        // Los administradores ven todas las reservas desde el primer momento
        cargarReservasAdministracion();
    }else{
        panelAdmin.style.display = "none";
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
        var respuesta = await fetch(API_BASE + "/reservas/por-usuario/" + usuarioActual.id);
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
        var respuesta = await fetch(API_BASE + "/reservas");
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
        var respuesta = await fetch(API_BASE + "/reservas/" + id);
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
        var respuesta = await fetch(API_BASE + "/reservas/por-email?email=" + encodeURIComponent(correo));
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
        var respuesta = await fetch(API_BASE + "/reservas/" + id, { method: "DELETE" });
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

function obtenerDatosReservaAdmin(){
    var reservaId = parseInt(document.getElementById("adminReservaId").value, 10);
    var usuarioId = parseInt(document.getElementById("adminUsuarioId").value, 10);
    var habitacionId = parseInt(document.getElementById("adminHabitacionId").value, 10);
    var fechaEntrada = document.getElementById("adminFechaEntrada").value;
    var fechaSalida = document.getElementById("adminFechaSalida").value;
    var numPersonas = parseInt(document.getElementById("adminNumPersonas").value, 10);
    var estado = document.getElementById("adminEstado").value;
    var todoIncluido = document.getElementById("adminTodoIncluido").checked;
    var observaciones = document.getElementById("adminObservaciones").value;

    if(!usuarioId || !habitacionId || !fechaEntrada || !fechaSalida || !numPersonas){
        return null;
    }

    return {
        id: reservaId,
        usuarioId: usuarioId,
        habitacionId: habitacionId,
        fechaEntrada: fechaEntrada,
        fechaSalida: fechaSalida,
        numPersonas: numPersonas,
        estado: estado,
        todoIncluido: todoIncluido,
        observaciones: observaciones
    };
}

// Centraliza la creación/actualización de reservas desde el panel de administración
async function gestionarReservaDesdePanel(accion){
    var feedback = document.getElementById("adminGestionFeedback");
    feedback.textContent = "";

    var datos = obtenerDatosReservaAdmin();
    if(!datos){
        feedback.textContent = "Completa todos los campos obligatorios.";
        feedback.classList.add("error");
        return;
    }

    var url = API_BASE + "/reservas";
    var method = "POST";
    if(accion === "actualizar"){
        if(!datos.id){
            feedback.textContent = "Debes indicar el ID para actualizar.";
            feedback.classList.add("error");
            return;
        }
        url += "/" + datos.id;
        method = "PUT";
    }

    var payload = {
        fechaEntrada: datos.fechaEntrada,
        fechaSalida: datos.fechaSalida,
        numPersonas: datos.numPersonas,
        estadoReserva: datos.estado,
        todoIncluido: datos.todoIncluido,
        observaciones: datos.observaciones,
        usuario: { id: datos.usuarioId },
        habitacion: { id: datos.habitacionId }
    };

    try{
        var respuesta = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if(!respuesta.ok){
            var texto = await respuesta.text();
            throw new Error(texto || "Error " + respuesta.status);
        }

        var reserva = await respuesta.json();
        feedback.textContent = (accion === "crear"
            ? "Reserva creada con ID " + reserva.id
            : "Reserva actualizada correctamente.");
        feedback.classList.remove("error");
        feedback.classList.add("success");
        cargarReservasAdministracion();
    }catch(error){
        feedback.textContent = "No se pudo completar la operación: " + error.message;
        feedback.classList.remove("success");
        feedback.classList.add("error");
    }
}

async function eliminarReservaDesdePanel(){
    var feedback = document.getElementById("adminGestionFeedback");
    feedback.textContent = "";
    var id = parseInt(document.getElementById("adminEliminarId").value, 10);

    if(isNaN(id)){
        feedback.textContent = "Introduce un ID válido.";
        feedback.classList.add("error");
        return;
    }

    if(!window.confirm("¿Eliminar la reserva " + id + "?")){
        return;
    }

    try{
        var respuesta = await fetch(API_BASE + "/reservas/" + id, { method: "DELETE" });
        if(respuesta.ok){
            feedback.textContent = "Reserva eliminada.";
            feedback.classList.remove("error");
            feedback.classList.add("success");
            cargarReservasAdministracion();
        }else{
            feedback.textContent = "No se pudo eliminar la reserva.";
            feedback.classList.remove("success");
            feedback.classList.add("error");
        }
    }catch(error){
        feedback.textContent = "Error en la eliminación.";
        feedback.classList.remove("success");
        feedback.classList.add("error");
    }
}

function mostrarHistorialDelCliente(){
    if(!usuarioActual){
        var feedback = document.getElementById("loginFeedback");
        if(feedback){
            feedback.textContent = "Inicia sesión para consultar tu historial.";
            feedback.classList.add("error");
        }
        var form = document.getElementById("loginForm");
        if(form){
            form.scrollIntoView({ behavior: "smooth" });
        }
        if(Sesion && Sesion.marcarHistorial){
            Sesion.marcarHistorial();
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
        var respuesta = await fetch(API_BASE + "/auth/registro-rapido", {
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
            persistirSesion(usuarioActual);
            refrescarHeaderSesion();

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

function persistirSesion(usuario){
    if(Sesion && Sesion.setSesion){
        Sesion.setSesion(usuario);
    }
}

function obtenerSesionPersistida(){
    if(Sesion && Sesion.getSesion){
        return Sesion.getSesion();
    }
    return null;
}

function restaurarSesionPersistida(){
    var guardada = obtenerSesionPersistida();
    if(guardada){
        usuarioActual = guardada;
        mostrarPanelesSegunRol();
    }else{
        refrescarHeaderSesion();
    }
}

function refrescarHeaderSesion(){
    if(Sesion && Sesion.actualizarHeader){
        Sesion.actualizarHeader(usuarioActual);
    }
}

function abrirHistorialSiCorresponde(){
    if(Sesion && Sesion.consumirHistorial && Sesion.consumirHistorial()){
        mostrarHistorialDelCliente();
    }
}

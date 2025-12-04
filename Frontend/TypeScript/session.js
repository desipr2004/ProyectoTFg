(function(){
    // Guarda la clave utilizada en localStorage(en el navegador) 
    var CLAVE_SESION = "usuarioSesion";
    // Marcador usado para recordar que el historial debe abrirse al volver a usuario.html
    var CLAVE_HISTORIAL = "abrirHistorial";

    // Ejecuta el callback cuando el DOM esté listo
    function ejecutarCuandoListo(callback){
        if(document.readyState === "loading"){
            document.addEventListener("DOMContentLoaded", callback);
        }else{
            callback();
        }
    }

    // Recupera la sesión que quedó guardada en localStorage
    function obtenerSesionGuardada(){
        try{
            var data = localStorage.getItem(CLAVE_SESION);
            if(!data){
                return null;
            }
            return JSON.parse(data);
        }catch(error){
            return null;
        }
    }

    // Continua la sesión en localStorage y notifica el cambio al resto de la app
    function guardarSesion(usuario){
        if(!usuario){
            return;
        }
        try{
            localStorage.setItem(CLAVE_SESION, JSON.stringify(usuario));
        }catch(error){
            console.warn("No se pudo guardar la sesion", error);
        }
        notificarCambioSesion(usuario);
    }

    //Limpia la sesion y muestra el estado sin sesion 
    function limpiarSesion(){
        try{
            localStorage.removeItem(CLAVE_SESION);
        }catch(error){
            //ignore
        }
        notificarCambioSesion(null);
    }

    function notificarCambioSesion(usuario){
        var evento = new CustomEvent("sesion-cambiada", { detail: usuario });
        document.dispatchEvent(evento);
        actualizarCabeceraSesion(usuario);
    }

    // Ajusta los botones del header según si hay sesión activa
    function actualizarCabeceraSesion(usuario){
        var sesion = usuario || obtenerSesionGuardada();
        var loginBtn = document.getElementById("headerLoginBtn");
        var registerBtn = document.getElementById("headerRegisterBtn");
        var logoutBtn = document.getElementById("headerLogoutBtn");

        var haySesion = !!sesion;

        if(loginBtn){
            loginBtn.style.display = haySesion ? "none" : "inline-flex";
        }
        if(registerBtn){
            registerBtn.style.display = haySesion ? "none" : "inline-flex";
        }
        if(logoutBtn){
            logoutBtn.style.display = haySesion ? "inline-flex" : "none";
        }
    }

    // Marca que al volver a usuario.html se debe abrir el historial de reservas
    function marcarHistorialPendiente(){
        try{
            localStorage.setItem(CLAVE_HISTORIAL, "1");
        }catch(error){
            //ignore
        }
    }

    function consumirHistorial(){
        try{
            var tiene = localStorage.getItem(CLAVE_HISTORIAL) === "1";
            if(tiene){
                localStorage.removeItem(CLAVE_HISTORIAL);
            }
            return tiene;
        }catch(error){
            return false;
        }
    }

    // Al cargar la pagina se sincroniza el header y se engancha el boton de salir
    ejecutarCuandoListo(function(){
        actualizarCabeceraSesion();
        var logoutBtn = document.getElementById("headerLogoutBtn");
        if(logoutBtn){
            logoutBtn.addEventListener("click", function(){
                limpiarSesion();
                window.location.href = "index.html";
            });
        }
    });

    // Mostramos la API publica para que otros scripts puedan usarla
    window.SesionApp = window.SesionApp || {};
    window.SesionApp.obtenerSesion = obtenerSesionGuardada;
    window.SesionApp.guardarSesion = guardarSesion;
    window.SesionApp.limpiarSesion = limpiarSesion;
    window.SesionApp.actualizarCabecera = actualizarCabeceraSesion;
    window.SesionApp.marcarHistorial = marcarHistorialPendiente;
    window.SesionApp.consumirHistorial = consumirHistorial;
    window.SesionApp.claveHistorial = CLAVE_HISTORIAL;
})();

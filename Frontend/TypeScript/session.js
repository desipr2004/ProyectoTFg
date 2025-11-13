(function(){
    var SESSION_KEY = "usuarioSesion";
    var HISTORIAL_FLAG_KEY = "abrirHistorial";

    function ready(callback){
        if(document.readyState === "loading"){
            document.addEventListener("DOMContentLoaded", callback);
        }else{
            callback();
        }
    }

    // Recupera la sesión que quedó guardada en localStorage
    function obtenerSesion(){
        try{
            var data = localStorage.getItem(SESSION_KEY);
            if(!data){
                return null;
            }
            return JSON.parse(data);
        }catch(error){
            return null;
        }
    }

    // Persiste la sesión en localStorage y notifica el cambio al resto de la app
    function almacenarSesion(usuario){
        if(!usuario){
            return;
        }
        try{
            localStorage.setItem(SESSION_KEY, JSON.stringify(usuario));
        }catch(error){
            console.warn("No se pudo guardar la sesion", error);
        }
        emitirCambioSesion(usuario);
    }

    function eliminarSesion(){
        try{
            localStorage.removeItem(SESSION_KEY);
        }catch(error){
            //ignore
        }
        emitirCambioSesion(null);
    }

    function emitirCambioSesion(usuario){
        var evento = new CustomEvent("sesion-cambiada", { detail: usuario });
        document.dispatchEvent(evento);
        actualizarBarraSesion(usuario);
    }

    // Ajusta los botones del header según si hay sesión activa
    function actualizarBarraSesion(usuario){
        var sesion = usuario || obtenerSesion();
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

    function marcarHistorialPendiente(){
        try{
            localStorage.setItem(HISTORIAL_FLAG_KEY, "1");
        }catch(error){
            //ignore
        }
    }

    function consumirHistorialPendiente(){
        try{
            var tiene = localStorage.getItem(HISTORIAL_FLAG_KEY) === "1";
            if(tiene){
                localStorage.removeItem(HISTORIAL_FLAG_KEY);
            }
            return tiene;
        }catch(error){
            return false;
        }
    }

    ready(function(){
        actualizarBarraSesion();
        var logoutBtn = document.getElementById("headerLogoutBtn");
        if(logoutBtn){
            logoutBtn.addEventListener("click", function(){
                eliminarSesion();
                window.location.href = "index.html";
            });
        }
    });

    window.SesionApp = window.SesionApp || {};
    window.SesionApp.getSesion = obtenerSesion;
    window.SesionApp.setSesion = almacenarSesion;
    window.SesionApp.clearSesion = eliminarSesion;
    window.SesionApp.actualizarHeader = actualizarBarraSesion;
    window.SesionApp.marcarHistorial = marcarHistorialPendiente;
    window.SesionApp.consumirHistorial = consumirHistorialPendiente;
    window.SesionApp.historialKey = HISTORIAL_FLAG_KEY;
})();

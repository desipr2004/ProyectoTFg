(function(){
    var URL_API = (window.location.protocol === "file:" ||
        ["localhost", "127.0.0.1", "0.0.0.0"].indexOf(window.location.hostname) !== -1)
        ? "http://localhost:8080/api"
        : window.location.origin + "/api";

    var SesionApp = window.SesionApp || {};

    function alCargar(callback){
        if(document.readyState === "loading"){
            document.addEventListener("DOMContentLoaded", callback);
        }else{
            callback();
        }
    }

    // Dibuja el mensaje informativo debajo de los formularios del modal
    function mostrarAviso(elemento, mensaje, tipo){
        if(!elemento){
            return;
        }
        elemento.textContent = mensaje || "";
        elemento.classList.remove("error", "success", "info");
        if(tipo){
            elemento.classList.add(tipo);
        }
    }

    function mostrarModal(modal){
        if(modal){
            modal.classList.add("open");
        }
    }

    function ocultarModal(modal){
        if(modal){
            modal.classList.remove("open");
        }
    }

    alCargar(function(){
        var modalInicio = document.getElementById("homeLoginModal");
        var modalRegistro = document.getElementById("homeRegisterModal");
        var botonInicio = document.getElementById("headerLoginBtn");
        var botonRegistro = document.getElementById("headerRegisterBtn");
        var botonCerrarInicio = document.querySelector("[data-close-login]");
        var botonCerrarRegistro = document.querySelector("[data-close-register]");
        var formularioInicio = document.getElementById("homeLoginForm");
        var formularioRegistro = document.getElementById("homeRegisterForm");
        var mensajeInicio = document.getElementById("homeLoginFeedback");
        var mensajeRegistro = document.getElementById("homeRegisterFeedback");

        if(botonInicio && modalInicio){
            botonInicio.addEventListener("click", function(){
                mostrarModal(modalInicio);
            });
        }

        if(botonRegistro && modalRegistro){
            botonRegistro.addEventListener("click", function(){
                mostrarModal(modalRegistro);
            });
        }

        if(botonCerrarInicio){
            botonCerrarInicio.addEventListener("click", function(){
                ocultarModal(modalInicio);
            });
        }

        if(botonCerrarRegistro){
            botonCerrarRegistro.addEventListener("click", function(){
                ocultarModal(modalRegistro);
            });
        }

        if(modalInicio){
            modalInicio.addEventListener("click", function(event){
                if(event.target === modalInicio){
                    ocultarModal(modalInicio);
                }
            });
        }

        if(modalRegistro){
            modalRegistro.addEventListener("click", function(event){
                if(event.target === modalRegistro){
                    ocultarModal(modalRegistro);
                }
            });
        }

        if(formularioInicio){
            formularioInicio.addEventListener("submit", async function(event){
                event.preventDefault();
                mostrarAviso(mensajeInicio, "Validando credenciales...", "info");

                var datosEnvio = {
                    email: document.getElementById("homeLoginEmail").value.trim(),
                    contrasenna: document.getElementById("homeLoginPassword").value
                };

                try{
                    var respuestaApi = await fetch(URL_API + "/auth/login", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(datosEnvio)
                    });
                    var resultadoApi = await respuestaApi.json();

                    if(respuestaApi.ok && resultadoApi.usuario){
                        mostrarAviso(mensajeInicio, "Sesión iniciada, redirigiendo...", "success");
                        if(SesionApp.guardarSesion){
                            SesionApp.guardarSesion(resultadoApi.usuario);
                        }
                        ocultarModal(modalInicio);
                        setTimeout(function(){
                            window.location.href = "index.html#hotelsList";
                        }, 600);
                    }else{
                        mostrarAviso(mensajeInicio, resultadoApi.error || "No se pudo iniciar sesión", "error");
                    }
                }catch(error){
                    mostrarAviso(mensajeInicio, "Error al conectar con el servidor", "error");
                }
            });
        }

        if(formularioRegistro){
            formularioRegistro.addEventListener("submit", async function(event){
                event.preventDefault();
                mostrarAviso(mensajeRegistro, "Creando usuario...", "info");

                var datosEnvio = {
                    nombre: document.getElementById("homeRegisterNombre").value.trim(),
                    apellido: document.getElementById("homeRegisterApellido").value.trim(),
                    email: document.getElementById("homeRegisterEmail").value.trim(),
                    telefono: document.getElementById("homeRegisterTelefono").value.trim(),
                    contrasenna: document.getElementById("homeRegisterPassword").value
                };

                if(!datosEnvio.email || !datosEnvio.contrasenna){
                    mostrarAviso(mensajeRegistro, "Correo y contraseña son obligatorios.", "error");
                    return;
                }

                try{
                    var respuestaApi = await fetch(URL_API + "/auth/registro-rapido", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(datosEnvio)
                    });
                    var resultadoApi = await respuestaApi.json();

                    if(respuestaApi.ok && resultadoApi.usuario){
                        mostrarAviso(mensajeRegistro, "Usuario creado. Redirigiendo...", "success");
                        if(SesionApp.guardarSesion){
                            SesionApp.guardarSesion(resultadoApi.usuario);
                        }
                        ocultarModal(modalRegistro);
                        setTimeout(function(){
                            window.location.href = "index.html#hotelsList";
                        }, 600);
                    }else{
                        mostrarAviso(mensajeRegistro, resultadoApi.error || "No se pudo registrar el usuario", "error");
                    }
                }catch(error){
                    mostrarAviso(mensajeRegistro, "Error al registrar el usuario.", "error");
                }
            });
        }
    });
})();

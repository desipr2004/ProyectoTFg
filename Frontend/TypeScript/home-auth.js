(function(){
    var API_BASE = (window.location.protocol === "file:" ||
        ["localhost", "127.0.0.1", "0.0.0.0"].indexOf(window.location.hostname) !== -1)
        ? "http://localhost:8080/api"
        : window.location.origin + "/api";

    var Sesion = window.SesionApp || {};

    function onReady(callback){
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

    onReady(function(){
        var loginModal = document.getElementById("homeLoginModal");
        var registerModal = document.getElementById("homeRegisterModal");
        var loginBtn = document.getElementById("headerLoginBtn");
        var registerBtn = document.getElementById("headerRegisterBtn");
        var closeLoginBtn = document.querySelector("[data-close-login]");
        var closeRegisterBtn = document.querySelector("[data-close-register]");
        var loginForm = document.getElementById("homeLoginForm");
        var registerForm = document.getElementById("homeRegisterForm");
        var loginFeedback = document.getElementById("homeLoginFeedback");
        var registerFeedback = document.getElementById("homeRegisterFeedback");

        if(loginBtn && loginModal){
            loginBtn.addEventListener("click", function(){
                mostrarModal(loginModal);
            });
        }

        if(registerBtn && registerModal){
            registerBtn.addEventListener("click", function(){
                mostrarModal(registerModal);
            });
        }

        if(closeLoginBtn){
            closeLoginBtn.addEventListener("click", function(){
                ocultarModal(loginModal);
            });
        }

        if(closeRegisterBtn){
            closeRegisterBtn.addEventListener("click", function(){
                ocultarModal(registerModal);
            });
        }

        if(loginModal){
            loginModal.addEventListener("click", function(event){
                if(event.target === loginModal){
                    ocultarModal(loginModal);
                }
            });
        }

        if(registerModal){
            registerModal.addEventListener("click", function(event){
                if(event.target === registerModal){
                    ocultarModal(registerModal);
                }
            });
        }

        if(loginForm){
            loginForm.addEventListener("submit", async function(event){
                event.preventDefault();
                mostrarAviso(loginFeedback, "Validando credenciales...", "info");

                var payload = {
                    email: document.getElementById("homeLoginEmail").value.trim(),
                    contrasenna: document.getElementById("homeLoginPassword").value
                };

                try{
                    var respuesta = await fetch(API_BASE + "/auth/login", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(payload)
                    });
                    var resultado = await respuesta.json();

                    if(respuesta.ok && resultado.usuario){
                        mostrarAviso(loginFeedback, "Sesión iniciada, redirigiendo...", "success");
                        if(Sesion.setSesion){
                            Sesion.setSesion(resultado.usuario);
                        }
                        ocultarModal(loginModal);
                        setTimeout(function(){
                            window.location.href = "index.html#hotelsList";
                        }, 600);
                    }else{
                        mostrarAviso(loginFeedback, resultado.error || "No se pudo iniciar sesión", "error");
                    }
                }catch(error){
                    mostrarAviso(loginFeedback, "Error al conectar con el servidor", "error");
                }
            });
        }

        if(registerForm){
            registerForm.addEventListener("submit", async function(event){
                event.preventDefault();
                mostrarAviso(registerFeedback, "Creando usuario...", "info");

                var payload = {
                    nombre: document.getElementById("homeRegisterNombre").value.trim(),
                    apellido: document.getElementById("homeRegisterApellido").value.trim(),
                    email: document.getElementById("homeRegisterEmail").value.trim(),
                    telefono: document.getElementById("homeRegisterTelefono").value.trim(),
                    contrasenna: document.getElementById("homeRegisterPassword").value
                };

                if(!payload.email || !payload.contrasenna){
                    mostrarAviso(registerFeedback, "Correo y contraseña son obligatorios.", "error");
                    return;
                }

                try{
                    var respuesta = await fetch(API_BASE + "/auth/registro-rapido", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(payload)
                    });
                    var resultado = await respuesta.json();

                    if(respuesta.ok && resultado.usuario){
                        mostrarAviso(registerFeedback, "Usuario creado. Redirigiendo...", "success");
                        if(Sesion.setSesion){
                            Sesion.setSesion(resultado.usuario);
                        }
                        ocultarModal(registerModal);
                        setTimeout(function(){
                            window.location.href = "index.html#hotelsList";
                        }, 600);
                    }else{
                        mostrarAviso(registerFeedback, resultado.error || "No se pudo registrar el usuario", "error");
                    }
                }catch(error){
                    mostrarAviso(registerFeedback, "Error al registrar el usuario.", "error");
                }
            });
        }
    });
})();

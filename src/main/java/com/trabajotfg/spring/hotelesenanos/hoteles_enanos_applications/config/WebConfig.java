package com.trabajotfg.spring.hotelesenanos.hoteles_enanos_applications.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
    // Protección de rutas desactivada temporalmente (sin registros de interceptor)
    // Si se desea volver a activar, registrar aquí el AuthInterceptor con los patrones
    }
}

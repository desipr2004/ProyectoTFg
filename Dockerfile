# Multi-stage Dockerfile para el backend (Spring Boot)
# paso 1: compilar la aplicación con Maven
FROM eclipse-temurin:17-jdk-alpine AS build
WORKDIR /app
# Copiar todo el proyecto (incluye mvnw y .mvn)
COPY . /app
# Si el wrapper mvnw está presente, usarlo; si no, el contenedor debe tener mvn instalado.
RUN if [ -f ./mvnw ]; then chmod +x ./mvnw && ./mvnw -B -DskipTests package; else mvn -B -DskipTests package; fi

# Paso 2: runtime para ejecutar la aplicacion
FROM eclipse-temurin:17-jdk-alpine
VOLUME /tmp
# Copiar el JAR generado en el paso de build
COPY --from=build /app/target/hoteles-enanos-applications-0.0.1-SNAPSHOT.jar /app.jar
ENV SPRING_PROFILES_ACTIVE=docker
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]

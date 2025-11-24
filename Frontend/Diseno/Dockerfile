# Dockerfile para el frontend (Nginx)
FROM nginx:alpine
# El build context será la carpeta `Frontend`.
# Copiar la carpeta `Diseno` al root servido por nginx (index.html estará en /usr/share/nginx/html/index.html)
COPY Diseno/ /usr/share/nginx/html/
# Copiar los scripts (fuente única) que viven en `TypeScript/`
COPY TypeScript/ /usr/share/nginx/html/TypeScript/
# Copiar configuración personalizada de nginx para servir portada.html por defecto
COPY Diseno/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

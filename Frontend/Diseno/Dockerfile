# Dockerfile para el frontend (Nginx)
FROM nginx:alpine
# El build context será la carpeta `Frontend`.
# Copiar la carpeta `Diseno` al root servido por nginx (index.html estará en /usr/share/nginx/html/index.html)
COPY Diseno/ /usr/share/nginx/html/
# Copiar los JS compilados que estén en TypeScript/ (si existen) al mismo root
COPY TypeScript/ /usr/share/nginx/html/TypeScript/
# Asegurarnos de que exista la carpeta /TypeScript en la imagen y que contenga los .js
# Algunos archivos Javascript viven en Diseno/ (copiados en el root). Para que las
# referencias a /TypeScript/... funcionen, duplicamos los .js del root dentro de
# /usr/share/nginx/html/TypeScript cuando no se hayan copiado desde la carpeta
# TypeScript del contexto.
RUN mkdir -p /usr/share/nginx/html/TypeScript \
	&& cp -n /usr/share/nginx/html/*.js /usr/share/nginx/html/TypeScript/ || true
# Copiar configuración personalizada de nginx para servir portada.html por defecto
COPY Diseno/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

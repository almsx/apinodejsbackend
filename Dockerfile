#####################
#DockerFile para configurar servidor
########

FROM node:alpine

LABEL maintainer="alberto@ideashappy.com"
LABEL version="0.0.1"

#Creamos directorio de trabajo
RUN mkdir -p /app

#Establecemos directorio de trabajo
WORKDIR /app

#Instalamos paquetes dependientes de package.json
COPY package.json /app
RUN npm install --no-optional --quiet

#Instalamos Nodemon de manera global para reinicio automatico
#de la aplicación
RUN npm install nodemon -g --quiet

#Copiamos la aplicación
COPY . /app

#Exponemos la aplicación en el puerto 8080
EXPOSE 8082

#Inicia la aplicación al iniciar el contenedor
CMD nodemon -L --watch . index.js
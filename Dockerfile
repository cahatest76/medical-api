FROM cahatest76/loopback:smart

# Create App Directory
RUN mkdir /app/medicalapi

#Copiar el proyecto a deployar en la imagen
COPY . /app/medicalapi/
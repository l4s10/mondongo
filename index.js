require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;
const uri = process.env.URI;

// Conectarse a MongoDB con Mongoose
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Conectado a la base de datos de MongoDB');

        // Define las rutas de tu aplicación
        app.get('/', (req, res) => {
            res.send('Hola Mundo');
        });
        // Definimos una ruta que espera un parámetro 'nombre'
        app.get('/saludar/:nombre?', (req, res) => {
            // Obtenemos el nombre de los parámetros de la URL
            const nombre = req.params.nombre;
            // Comprobamos si se ha proporcionado un nombre
            if (!nombre) {
                // Si no se ha proporcionado un nombre, respondemos con un mensaje de error
                return respuestaError(res, 400, { mensaje: 'Debes proporcionar un nombre' });
            }
            // Creamos el mensaje de saludo
            const saludo = `Hola ${nombre}, ¡bienvenido a mi aplicación con MongoDB!`;
            // Respondemos con un mensaje exitoso y el saludo
            return respuestaExistosa(res, 200, { mensaje: saludo }).send();
        });
        // Función para estandarizar la respuesta del servidor
        function respuestaExistosa(res, status, data) {
            return res.status(status).json({
                status: status,
                data: data
            });
        }

        // Función para estandarizar la respuesta del servidor cuando ocurre un error
        function respuestaError(res, status, error) {
            return res.status(status).json({
                status: status,
                error: error
            });
        }

        // Inicia el servidor web
        app.listen(port, () => {
            console.log(`Servidor corriendo en el puerto ${port}`);
        });
    })
    .catch((error) => {
        console.error('Error al conectarse a MongoDB:', error);
    });

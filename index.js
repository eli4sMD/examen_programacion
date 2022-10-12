
const path = require('path');
const express = require('express'); // Importando librería express
const cors = require('cors');
const morgan = require('morgan');

require('dotenv').config();
// Inicializaciones
const app = express(); // Inicializando la librería express



// Configuraciones
const port = process.env.PORT || 3000;


// MIDDLEWARES
app.use(cors());
app.use(morgan('dev'));
app.use(express.json()); // Para que el servidor comprenda archivos con formato json


// Configurando puerto
app.listen(port, () => console.log(`Servidor corriendo en http://localhost:${port}`));

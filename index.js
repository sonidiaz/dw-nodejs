
// Importar el módulo HTTP de Node.js
const http = require('http');
const fetch = require("node-fetch");
require("dotenv").config();

// Definir la función que manejará las solicitudes entrantes
const requestHandler = async (request, response) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (request.url === '/') {

    const fetchdata = await fetch('https://api.datawrapper.de/v3/charts/LL6QK', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + process.env.TOKEN
      }
    });
    const responseData = await fetchdata.json();
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.write(JSON.stringify(responseData));
    response.end();
  } else {
    // Si la URL solicitada no es el root, responder con un 404
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.write('404 - Página no encontrada');
    response.end();
  }
};

// Crear un servidor HTTP pasando la función de manejo de solicitudes
const server = http.createServer(requestHandler);

// Especificar el puerto en el que el servidor escuchará las solicitudes
const PORT = 3000;

// Iniciar el servidor y hacer que escuche en el puerto especificado
server.listen(PORT, () => {
  console.log(`Servidor HTTP funcionando en http://localhost:${PORT}`);
});
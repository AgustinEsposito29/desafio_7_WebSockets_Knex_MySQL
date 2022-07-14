const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const path = require('path');
const PORT = 8080 || process.env.PORT;

// Importamos controlador de rutas
const routerProductos = require('./routes/routeProductos.js');

//Importamos Configuracion de la base de datos de mensajes
const options = require(path.join(__dirname, 'dataBase', 'options', 'optionsMySQL'));;

//Importamos controlador para Base de datos de mensajes
const {insertarMensaje, mostrarMensajes} = require(path.join(__dirname, 'dataBase', 'controladores', 'controladorMensajes'));

//Importamos scripts para crear Tablas
const { createTableProductos } = require(path.join(__dirname, 'dataBase', 'scripts_create_table', 'createTableProductos'));
const  { createTableMensajes } = require(path.join(__dirname, 'dataBase', 'scripts_create_table', 'createTableMensajes'));


//Instanciamos servidores
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

//MiddleWares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api/productos', routerProductos);

//Servicio de Archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));

// Manejo de errors
app.use((err, req, res, next) =>{
    res.status(500).send({
        message: err.message
    })
    next(err);
})

//Creamos bases de datos
try{
    createTableMensajes()
    createTableProductos()
}catch(e){
    console.log(`Error: ${e.message}`)
}

//Levantamos Servidor
httpServer.listen(PORT, ()=>{
    console.log(`Servidor Escuchando en el puerto: ${PORT}`);
})

httpServer.on('error', (e)=>{
    console.log('Error en el servidor!');
})


// WebSockets
const messages = []

//Evento que recibe cualquier coenexion al servidor socket
io.on('connection', function(socket) {
    console.log('Un cliente se ha conectado');

    //Eviamos todos los mensajes 
    mostrarMensajes(options, io);
    socket.emit('mensajes', messages);

    //Recibimos nuevo mensaje
    socket.on('nuevoMensaje', (data)=>{
        //Enviamos mensajes al arreglo
        insertarMensaje(data, options);
        

        // Enviamos todos los datos de nuevo
        mostrarMensajes(options, io);
        socket.emit('mensajes', messages);
    })
});
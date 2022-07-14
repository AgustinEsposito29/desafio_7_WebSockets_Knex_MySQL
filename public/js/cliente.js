// Lado del Cliente
const socket = io.connect();


const tableBody = document.getElementById('productosBody');
const tableBodyMensajes = document.getElementById('mensajesBody')
const btnEnviarMjs = document.getElementById('btnEnviarMensaje');

function renderProductos(data){
    const html = data.map( producto => {
        return `
        <tr>
            <th scope="row">${producto.id}</th>
            <td>${producto.nombre}</td>
            <td> $ ${producto.precio}</td>
            <td><img src="${producto.fotoURL}" alt="Imagen Producto" style="width: 20px; height: 20px;"> </td>
        </tr>`
    }).join(" ");
    tableBody.innerHTML = html;
}

function renderMensaje(data){
    const html = data.map( mensaje => {
        return `
        <tr>
            <td>${mensaje.autor}</td>
            <td> ${mensaje.mensaje}</td>
        </tr>`
    }).join(" ");
    tableBodyMensajes.innerHTML = html;
}

function addMensajes(e){
    const mensaje = {
        autor: document.getElementById('email').value,
        mensaje: document.getElementById('mensaje').value
    };
    
    // Enviamos nuevo mensaje al servidor
    socket.emit('nuevoMensaje', mensaje);
    return false; //Es como un preventDefault() para que no se recarue el formulario
}

fetch('http://localhost:8080/api/productos')
.then(dataPromise => dataPromise.json())
.then(data => {
    renderProductos(data);
})
.catch(e =>{
    console.log(e);
})


socket.on('mensajes', function(data) {
    console.log(data);
    renderMensaje(data);
});


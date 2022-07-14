const insertarMensaje = (mensaje, options)=>{
    const knex = require("knex")(options);
    knex('mensajes')
        .insert(mensaje)
        .then(()=>{
            console.log('Mensaje enviado de forma exitosa!');
        })
        .catch(e => {
            console.log(`Error: ${e.message}`);
        })
        .finally(()=>{
            knex.destroy()
        });
}

const mostrarMensajes = (options, io)=>{
    const knex = require("knex")(options)
    knex
        .from('mensajes')
        .select('*')
        .then((rows)=>{
            if(rows.length == 0){
                console.log('No hay mensajes disponibles!')
            }else{
                io.sockets.emit('mensajes', rows);
                console.log('Mensajes devueltos de forma exitosa!');
            }
        })
        .catch(e => {
            console.log(`Error: ${e.message}`);
        })
        .finally(()=>{
            knex.destroy()
        })
}

module.exports = {
    mostrarMensajes,
    insertarMensaje

}
const options = require( "../options/optionsMySQL");
const knex = require("knex")(options);

    const createTableMensajes = async () => {
        try {
            if(await knex.schema.hasTable('mensajes')){
                await knex.schema.dropTable('mensajes');
            }
            await knex.schema.createTable('mensajes', table => {
                table.increments('id');
                table.string('autor');
                table.string('mensaje');
            });
            console.log('Table articulos created');
        } catch (err) {
            console.log(err);
        } finally {
            knex.destroy();
        }
    };
    
    
    module.exports = {
        createTableMensajes
    }; 

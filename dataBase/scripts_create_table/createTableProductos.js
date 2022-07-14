const options = require('../options/optionsMySQL');
const knex = require("knex")(options);


const createTableProductos = async () => {
    try {
        if(await knex.schema.hasTable('productos')){
            await knex.schema.dropTable('productos');
        }
        await knex.schema.createTable('productos', table => {
            table.increments('id');
            table.string('nombre', 15);
            table.integer('precio');
            table.string('fotoUrl');
        });
        console.log('Table productos created');
    } catch (err) {
        console.log(err);
    } finally {
        knex.destroy();
    }
};


module.exports = {
    createTableProductos
}; 
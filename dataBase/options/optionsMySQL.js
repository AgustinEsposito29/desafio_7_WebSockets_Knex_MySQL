// Objeto options para realizar la conexion a la tabla
// database --> es el schema 
const options = {
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'clase_16'
    }
}
module.exports = options;
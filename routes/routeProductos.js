const express = require('express');
const path = require('path')
const {Router} = express;
const options = require(path.join('..', 'dataBase', 'options', 'optionsMySQL'));

const router = Router();


//Insertamos producto enviado desde el formulario
router.route('/')
    .post((req, res)=>{
        const producto = req.body;
        const knex = require('knex')(options); 
        // insert articulos to BD
        knex('productos').insert(producto)
        .then(() => {
            console.log('Producto insertado');
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            knex.destroy();
        });

        res.redirect('/');
    })

    // Para utilizar el fetch desde el front y que devuelve todos los productos
    .get((req, res)=>{
        const knex = require("knex")(options)
        knex
        .from('productos')
        .select('*')
        .then((rows)=>{
            if(rows.length == 0){
                console.log('No hay productos disponibles!')
            }else{
                res.send(rows).status(200);
                console.log('Productos devueltos con exito')
            }
        })
        .catch(e => {
            console.log(`Error: ${e.message}`);
        })
        .finally(()=>{
            console.log('Conexion destruida');
            knex.destroy()
        })
    });


module.exports =  router;









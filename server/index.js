const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Pool } = require('pg');
const dotenv = require('dotenv');
const config = require('./config');
const ErrorHandler = require('./utils/ErrorHandler');

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

const connectionString = 'postgresql://admin:admin1234@db:5432/cakes_by_naty';

const pool = new Pool({
  connectionString: connectionString,
});

app.use(bodyParser.json());

app.post('/register', async (req, res) => {
  const { usuario, rol, correo, password } = req.body;

  try {
    const client = await pool.connect();

    const result = await client.query('SELECT * FROM register($1, $2, $3, $4)', [
      usuario,
      rol,
      correo,
      password,
    ]);

    client.release();

    if (result.rows.length > 0) {
      res.status(201).json(result.rows[0]);
    } else {
      throw { type: 'database', message: 'Error registering user' };
    }
  } catch (err) {
    ErrorHandler.handleError(err, res);
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const client = await pool.connect();

    const result = await client.query('SELECT * FROM login($1, $2)', [username, password]);

    client.release();

    if (result.rows.length > 0) {
      res.status(201).json(result.rows[0]);
    } else {
      throw { type: 'database', message: 'Error logging in user' };
    }
  } catch (error) {
    ErrorHandler.handleError(error, res);
  }
});

//GET USUARIO BY ID
app.get('/usuarios/:u_id', async (req, res) => {
  const { u_id } = req.params;
  try {
    const client = await pool.connect();

    const getUserByID = 'SELECT * FROM obtener_usuario_por_id($1);';
    const result = await client.query(getUserByID, [u_id]);
    const usuario = result.rows[0];

    client.release();

    if (usuario) {
      res.status(200).json({ message: 'Usuario obtenido con éxito', usuario: usuario });
    } else {
      throw { type: 'not_found', message: 'Usuario no encontrado' };
    }
  } catch (error) {
    ErrorHandler.handleError(error, res);
  }
});

//POST

app.post('/productos', async (req, res) => {
  try {
    const { nombre, descripcion, categoria_id, ocasion_id, precio, imagen1, imagen2, imagen3, detalles } = req.body;

    // Validar campos obligatorios
    if (!nombre || !precio || !categoria_id) {
      return res.status(400).json({ error: 'Bad Request: Faltan Datos o formato incorrecto' });
    }

    // Insertar el producto
    const insertProductQuery = `
          INSERT INTO Productos (Nombre, Descripcion, CategoriaID, OcasionID, Precio, Imagen1, Imagen2, Imagen3)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
          RETURNING ProductoID;
        `;
    const result = await pool.query(insertProductQuery, [
      nombre,
      descripcion,
      categoria_id,
      ocasion_id,
      precio,
      imagen1 || null,
      imagen2 || null,
      imagen3 || null,
    ]);

    const productoId = result.rows[0].productoid;
    // Insertar detalles del producto
    if (detalles) {
      const insertDetailsQuery = `
            INSERT INTO Detalles_Producto (ProductoID, RellenoID, MasaID, Sabor_GalletaID, CoberturaID, Tipo_ChocolateID)
            VALUES ($1, $2, $3, $4, $5, $6);
          `;
      await pool.query(insertDetailsQuery, [
        productoId,
        detalles.relleno_id || null,
        detalles.masa_id || null,
        detalles.sabor_galleta_id || null,
        detalles.cobertura_id || null,
        detalles.tipo_chocolate_id || null,
      ]);
    }

    res.status(201).json({ message: 'Producto creado con éxito', ProductoID: productoId });
  } catch (error) {
    ErrorHandler.handleError(error, res);
  }
});

//GET


app.get('/usuarios', async (req, res) => {
  try {
    const client = await pool.connect();

    const result = await client.query('SELECT * FROM Usuarios;');
    const usuarios = result.rows;

    client.release();

    res.status(200).json({ message: 'Productos obtenidos con éxito', usuarios: usuarios });
  } catch (error) {
    ErrorHandler.handleError(error, res);
  }
});


/*
PRODUCTOS
*/
app.get('/productos/:limit?', async (req, res) => {
  const { limit } = req.params;
  try {
    const client = await pool.connect();

    const getProductByCatQuery = 'SELECT * FROM obtener_productos($1);';
    const result = await client.query(getProductByCatQuery, [limit || null]);
    const productos = result.rows;

    client.release();

    if (productos.length > 0) {
      res.status(200).json({ message: 'Productos obtenidos con éxito', productos: productos });
    } else {
      throw { type: 'not_found', message: 'No hay productos disponibles' };
    }
  } catch (error) {
    ErrorHandler.handleError(error, res);
  }
});



app.get('/producto/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const client = await pool.connect();

    const getProductByIdQuery = 'SELECT * FROM obtener_producto_por_id($1);';
    const result = await client.query(getProductByIdQuery, [id]);
    const producto = result.rows[0];

    client.release();

    if (producto) {
      res.status(200).json({ message: 'Producto obtenido con éxito', producto: producto });
    } else {
      throw { type: 'not_found', message: 'Producto no encontrado' };
    }
  } catch (error) {
    ErrorHandler.handleError(error, res);
  }
});

app.get('/productos/categoria/:categoria_id/:limit?', async (req, res) => {
  const { categoria_id, limit } = req.params;
  try {
    const client = await pool.connect();

    const getProductByCatQuery = 'SELECT * FROM obtener_producto_por_categoria($1, $2);';
    const result = await client.query(getProductByCatQuery, [categoria_id, limit || null]);
    const productos = result.rows;

    client.release();

    if (productos.length > 0) {
      res.status(200).json({ message: 'Productos obtenidos con éxito', productos: productos });
    } else {
      throw { type: 'not_found', message: 'Productos no encontrados, intente otra categoría' };
    }
  } catch (error) {
    ErrorHandler.handleError(error, res);
  }
});

app.get('/productos/ocasion/:ocasion_id/:limit?', async (req, res) => {
  const { ocasion_id, limit } = req.params;
  try {
    const client = await pool.connect();

    const getProductByOccQuery = 'SELECT * FROM obtener_producto_por_ocasion($1, $2);';
    const result = await client.query(getProductByOccQuery, [ocasion_id, limit || null]);
    const productos = result.rows;

    client.release();

    if (productos.length > 0) {
      res.status(200).json({ message: 'Productos obtenidos con éxito', productos: productos });
    } else {
      throw { type: 'not_found', message: 'Productos no encontrados, intente otra categoría' };
    }
  } catch (error) {
    ErrorHandler.handleError(error, res);
  }
});

/*
PEDIDOS
*/
app.get('/pedidos', async (req, res) => {
  try {
    const { mes } = req.query;
    const client = await pool.connect();

    let getPedidosQuery = 'SELECT * FROM obtener_pedidos()';
    
    if (mes) {
      getPedidosQuery = `SELECT * FROM obtener_pedidos_por_mes(${mes});`;
    }

    const result = await client.query(getPedidosQuery);
    const Pedidos = result.rows;
    client.release();
    res.status(200).json({ message: 'Pedidos obtenidos con éxito', Pedidos: Pedidos });
  } catch (error) {
    ErrorHandler.handleError(error, res);
  }
});


app.get('/pedidos/estado=:estado', async (req, res) => {
  const { estado } = req.params;
  try {
    const client = await pool.connect();
    const getPedidosQuery = 'SELECT * FROM obtener_pedidos_por_estado($1);';
    const result = await client.query(getPedidosQuery, [estado]);
    const Pedidos = result.rows;
    client.release();
    res.status(200).json({ message: 'Pedidos obtenidos con éxito', Pedidos: Pedidos });
  } catch (error) {
    ErrorHandler.handleError(error, res);
  }
});

//UPDATES
//Productos
app.put('/productos/:producto_id', async (req, res) => {
  try {
    const producto_id = parseInt(req.params.producto_id);
    const {
      nombre,
      descripcion,
      categoriaid,
      ocasionid,
      precio,
      imagen1,
      imagen2,
      imagen3,
      rellenoid,
      masaid,
      saborgalletaid,
      coberturatipo,
      tipochocolate,
    } = req.body;

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: 'No hay datos para actualizar o formato incorrecto' });
    }

    const client = await pool.connect();
    await client.query(
      'SELECT * FROM updateProducto($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)',
      [
        producto_id,
        nombre,
        descripcion,
        categoriaid,
        ocasionid,
        precio,
        imagen1,
        imagen2,
        imagen3,
        rellenoid,
        masaid,
        saborgalletaid,
        coberturatipo,
        tipochocolate,
      ]
    );

    client.release();

    res.status(200).json({ message: 'Producto actualizado con éxito' });
  } catch (error) {
    ErrorHandler.handleError(error, res);
  }
});

app.put('/usuarios/:usuario_id', async (req, res) => {
  try {
    const usuario_id = parseInt(req.params.usuario_id);
    const { authorization } = req.headers;

    console.log('token: ', authorization.substring(7).trim());

    const {
      rol,
      nickname,
      primer_nombre,
      segundo_nombre,
      correo,
      telefono,
      password,
      direccion1,
      direccion2,
      direccion3,
    } = req.body;

    const client = await pool.connect();
    await client.query('SELECT * FROM update_user($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)', [
      usuario_id,
      rol,
      nickname,
      primer_nombre,
      segundo_nombre,
      correo,
      telefono,
      password,
      direccion1,
      direccion2,
      direccion3,
    ]);

    client.release();

    res.status(200).json({ message: 'Usuario actualizado con éxito' });
  } catch (error) {
    ErrorHandler.handleError(error, res);
  }
});


module.exports = app;

app.delete('/pedidos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const client = await pool.connect();

    const deleteOrderQuery = 'SELECT * FROM eliminar_pedido($1);';
    const result = await client.query(deleteOrderQuery, [id]);
    const pedido = result.rows[0];

    client.release();

    if (pedido) {
      res.status(200).json({ message: 'Pedido eliminado con éxito'});
    } else {
      throw { type: 'not_found', message: 'Peido no encontrado' };
    }
  } catch (error) {
    ErrorHandler.handleError(error, res);
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

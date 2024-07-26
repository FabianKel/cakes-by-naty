const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Pool } = require('pg');
const dotenv = require('dotenv');
const config = require('./config');

dotenv.config();

const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  // user: process.env.DB_USER,
  // host: process.env.DB_HOST,
  // database: process.env.DB_NAME,
  // password: process.env.DB_PASSWORD,
  // port: process.env.DB_PORT,
  user: 'admin',
  host: 'db',
  database: 'cakes_by_naty',
  password: 'admin1234',
  port: 5432,
});

app.use(bodyParser.json());

app.post('/register', async (req, res) => {
  const { nombre_usuario, rol, correo, password } = req.body;
  console.log(nombre_usuario, rol, correo, password);

  try {
    const client = await pool.connect();

    const result = await client.query('SELECT * FROM register($1, $2, $3, $4)', [
      nombre_usuario,
      rol,
      correo,
      password,
    ]);

    client.release();

    if (result.rows.length > 0) {
      res.status(201).json(result.rows[0]);
    } else {
      res.status(500).json({ error: 'Error registering user' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
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
      res.status(500).json({ error: 'Error login user' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


//POST

app.post('/productos', async (req, res) => {
  // const { authorization } = req.headers;
  // const access_token = authorization.substring(7);
  // if (validateToken(access_token)) {
    try {
        const { nombre, categoria_id, ocasion, precio, imagen1, imagen2, imagen3, detalles } = req.body;

        // Validar campos obligatorios
        if (!nombre || !precio || !categoria_id) {
          return res.status(400).json({ error: 'Bad Request: Faltan Datos o formato incorrecto' });
        }

        // Insertar el producto
        const insertProductQuery = `
          INSERT INTO Productos (Nombre, CategoriaID, Ocasion, Precio, Imagen1, Imagen2, Imagen3)
          VALUES ($1, $2, $3, $4, $5, $6, $7)
          RETURNING ProductoID;
        `;
        const result = await pool.query(insertProductQuery, [
          nombre,
          categoria_id,
          ocasion || null,
          precio,
          imagen1 || null,
          imagen2 || null,
          imagen3 || null
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
            detalles.tipo_chocolate_id || null
          ]);
        }

        res.status(201).json({ message: 'Producto creado con éxito', ProductoID: productoId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el producto', details: error.message });
    }
  // } else {
  //   res.status(401).json({ error: 'Token de acceso inválido' });
  // }
});


//GET

app.get('/productos', async (req, res) => {
  try {
    const client = await pool.connect();
    
    const getProductsQuery = 'SELECT * FROM obtener_productos();';

    const result = await client.query(getProductsQuery);
    const productos = result.rows;

    client.release();

    res.status(200).json({ message: 'Productos obtenidos con éxito', productos: productos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

app.get('/productos/:id', async (req, res) => {
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
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
});



app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

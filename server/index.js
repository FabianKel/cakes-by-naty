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

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

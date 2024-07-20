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
  database: 'cakes-by-naty',
  password: 'admin1234',
  port: 5432,
});

app.use(bodyParser.json());

app.post('/register', async (req, res) => {
  const { email, password, first_name, last_name } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const client = await pool.connect();

    const result = await client.query(
      'INSERT INTO users (first_name, last_name, email, password) VALUES ($1 ,$2, $3, $4) RETURNING *',
      [first_name, last_name, email, hashedPassword]
    );

    client.release();
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);

    client.release();

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    const user = result.rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { id: user.id, first_name: user.first_name, last_name: user.last_name },
      config.jwtsecret,
      { expiresIn: config.jwtExpiry }
    );
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

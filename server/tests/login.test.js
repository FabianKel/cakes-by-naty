process.env.PORT = 501;

const { Pool } = require('pg');
const request = require('supertest');
const app = require('../index');

const connectionString = 'postgresql://admin:admin1234@db:5432/cakes_by_naty';

const pool = new Pool({
  connectionString: connectionString,
});

afterAll(async () => {
  await pool.end(); // Cierra la conexión con la base de datos después de las pruebas
});

describe('Recrear el proceso de login', () => {
  test('La prueba debe retornar un objeto token con valores', async () => {
    const client = await pool.connect();
    client.release();

    const response = await request(app)
      .post('/user/login')
      .send({ username: 'Aleee26', password: 'miab2024' })

      .set('Accept', 'application/json');

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('token');
    expect(response.body.token).not.toBeNull();
  });
});

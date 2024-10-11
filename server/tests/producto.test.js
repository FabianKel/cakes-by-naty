process.env.PORT = 503;

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

describe('GET /productos/:id', () => {
  test('La prueba debe retornar un producto en especifico', async () => {
    const client = await pool.connect();
    client.release();

    const response = await request(app).get('/producto/1');

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('producto');
    expect(response.body.producto).not.toBeNull();
  });
});

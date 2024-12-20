process.env.PORT = 502;

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

describe('Productos', () => {
  test('Retornamos toda la lista de productos', async () => {
    const client = await pool.connect();
    client.release();

    const response = await request(app).get('/products');

    expect(response.statusCode).toBe(200);
  });
});

process.env.PORT = 500;

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

describe('GET /users', () => {
  test('should return all users', async () => {
    const client = await pool.connect();
    client.release();

    const response = await request(app).get('/users');

    expect(response.statusCode).toBe(200);
  });
});

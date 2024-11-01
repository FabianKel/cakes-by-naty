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

describe('GET /product/:id', () => {
  test('La prueba debe retornar un producto en especifico', async () => {
    const client = await pool.connect();
    client.release();

    const response = await request(app).get('/product/1');


    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('producto');
    expect(response.body.producto).not.toBeNull();
  });
});

describe('POST /product/new', () => {
  let productId;

  beforeAll(async () => {
    // Insertar un producto de prueba antes de la prueba
    const response = await request(app)
      .post('/product/new')
      .send({
        nombre: 'Producto de prueba',
        descripcion: 'Descripción del producto de prueba',
        categoria_id: 1,
        ocasion_id: 1,
        precio: 666.0,
        imagen1: 'http://example.com/imagen1.jpg',
        imagen2: 'http://example.com/imagen2.jpg',
        imagen3: 'http://example.com/imagen3.jpg',
        detalles: {
          relleno_id: 1,
          masa_id: 1,
          sabor_galleta_id: 1,
          cobertura_id: 1,
          tipo_chocolate_id: 1,
        },
      });

    // Verificar que el producto fue creado exitosamente
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('ProductoID');
    productId = response.body.ProductoID;
  });

  test('La prueba debe retornar un producto en específico', async () => {
    const response = await request(app).get(`/product/${productId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('producto');
    expect(response.body.producto).not.toBeNull();
    expect(response.body.producto.productonombre).toBe('Producto de prueba');
  });

  afterAll(async () => {
    // Limpiar el producto de prueba después de la prueba
    const deleteResponse = await request(app).delete(`/product/${productId}`);
    expect(deleteResponse.statusCode).toBe(200);
    expect(deleteResponse.body.message).toBe('Producto eliminado con éxito');

  });
});


describe('DELETE /product/:producto_id', () => {
  let producto_id;

  beforeAll(async () => {
    // Crear un producto de prueba antes de la prueba
    const response = await request(app)
      .post('/product/new')
      .send({
        nombre: 'Producto para eliminar',
        descripcion: 'Descripción de producto para prueba de eliminación',
        categoria_id: 1,
        ocasion_id: 1,
        precio: 50.0,
        imagen1: 'ruta/de/imagen/imagen.png',
        detalles: {
          relleno_id: 1,
          masa_id: 1,
          sabor_galleta_id: 1,
          cobertura_id: 1,
          tipo_chocolate_id: 1,
        },
      });
    
      producto_id = response.body.ProductoID;
  });

  test('La prueba debe eliminar el producto correctamente', async () => {
    const deleteResponse = await request(app).delete(`/product/${producto_id}`);

    expect(deleteResponse.statusCode).toBe(200);
    expect(deleteResponse.body.message).toBe('Producto eliminado con éxito');

    const getResponse = await request(app).get(`/product/${producto_id}`);
    expect(getResponse.statusCode).toBe(404);
  });
});

const pool = require('../db');

const getProducts = async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM Products');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query('SELECT * FROM Products WHERE id = $1', [id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const putProduct = async (req, res) => {
  const { id } = req.params;
  const { nombre, imagen, descripcion, precio, stock, categoria } = req.body;
  try {
    const { rowCount } = await pool.query(
      'UPDATE Products SET name = $1, image = $2, description = $3, price = $4, stock = $5, category = $6 WHERE id = $7',
      [nombre, imagen, descripcion, precio, stock, categoria, id]
    );
    if (rowCount === 0) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json({ message: 'Product has been updated' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const { rowCount } = await pool.query('DELETE FROM Products WHERE id = $1', [id]);
    if (rowCount === 0) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getProducts, getProductById, putProduct, deleteProduct };

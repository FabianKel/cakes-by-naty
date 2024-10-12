const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const connectionString = process.env.DATABASE_URL || 'postgresql://admin:admin1234@db:5432/cakes_by_naty';

const pool = new Pool({
  connectionString: connectionString,
});

module.exports = pool;

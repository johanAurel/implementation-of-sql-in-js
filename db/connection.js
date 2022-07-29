const { Pool } = require('pg');

if (!process.env.PGDATABASE) {
  throw new Error('PGDATABASE not set!');
}

const pool = new Pool();

module.exports = pool;

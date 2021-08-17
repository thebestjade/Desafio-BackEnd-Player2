const { Pool } = require('pg');

const pool = new Pool ({
  user: 'postgres',
  host: 'localhost',
  database: 'player2_empresas',
  password: 'carol2009',
  port: 5432
});

const query = (text, param) => {
  return pool.query(text, param);
};

module.exports = {
  query
}
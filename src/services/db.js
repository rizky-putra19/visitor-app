const { Pool } = require("pg");

const pool = new Pool({
  user: "neondb_owner",
  host: "ep-withered-meadow-a1dyw945-pooler.ap-southeast-1.aws.neon.tech",
  database: "neondb",
  password: "npg_3BUmN0IMcnGz",
  port: 5432,
  ssl: {
    rejectUnauthorized: false, // penting biar connect ke Neon (karena sslmode=require)
  },
});

module.exports = pool;

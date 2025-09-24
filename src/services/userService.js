const pool = require("./db");

async function loginUser(username, password) {
  const res = await pool.query(
    "SELECT * FROM users WHERE username = $1 AND password = $2 LIMIT 1",
    [username, password]
  );
  return res.rows[0] || null;
}

module.exports = { loginUser };

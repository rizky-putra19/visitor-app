const pool = require("./db");

async function checkinVisitor(visitor) {
  const res = await pool.query(
    "INSERT INTO visitors (name, photo, nik) VALUES (LOWER($1), $2, $3) RETURNING *",
    [visitor.name, visitor.photo, visitor.nik]
  );
  return res.rows[0];
}

async function searchVisitor(name) {
  const res = await pool.query(
    "SELECT * FROM visitors WHERE name = LOWER($1) AND checkout_time IS NULL LIMIT 1",
    [name]
  );
  return res.rows[0] || null;
}

async function checkoutVisitor(id) {
  const res = await pool.query("UPDATE visitors SET checkout_time = NOW() WHERE id = $1 RETURNING *", [id]);
  return res.rows[0];
}

module.exports = { checkinVisitor, searchVisitor, checkoutVisitor };

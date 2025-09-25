const pool = require("./db");

async function checkinVisitor(visitor) {
  const res = await pool.query(
    `INSERT INTO visitors (name, photo, nik, checkin_time) 
   VALUES (LOWER($1), $2, $3, (CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Jakarta')) 
   RETURNING *`,
    [visitor.name, visitor.photo, visitor.nik]
  );
  return res.rows[0];
};

async function searchVisitor(name) {
  const res = await pool.query(
    "SELECT * FROM visitors WHERE name = LOWER($1) AND checkout_time IS NULL LIMIT 1",
    [name]
  );
  return res.rows[0] || null;
};

async function checkoutVisitor(id) {
  const res = await pool.query("UPDATE visitors SET checkout_time = (CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Jakarta') WHERE id = $1 RETURNING *", [id]);
  return res.rows[0];
};

async function visitorList(start, end) {
  try {
    const query = `
      SELECT id, name, nik, photo,
             checkin_time AT TIME ZONE 'Asia/Jakarta' AS checkin_time,
             checkout_time AT TIME ZONE 'Asia/Jakarta' AS checkout_time
      FROM visitors
      WHERE DATE(checkin_time AT TIME ZONE 'Asia/Jakarta') 
      BETWEEN $1::date AND $2::date
      ORDER BY checkin_time ASC
    `;
    const result = await pool.query(query, [start, end]);
    return result.rows;
  } catch (err) {
    console.error("Gagal ambil data visitorList:", err);
    return [];
  };
};

module.exports = { checkinVisitor, searchVisitor, checkoutVisitor, visitorList};

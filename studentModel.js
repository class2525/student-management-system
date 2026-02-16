const db = require("../config/db");

exports.create = async (data) => {
  const [result] = await db.execute(
    "INSERT INTO students (first_name, last_name, email, date_of_birth) VALUES (?, ?, ?, ?)",
    [data.first_name, data.last_name, data.email, data.date_of_birth]
  );
  return result;
};

exports.findAll = async (search, sort, order, limit, offset) => {
  const allowedSort = ["id", "first_name", "email", "created_at"];
  if (!allowedSort.includes(sort)) sort = "id";
  order = order === "DESC" ? "DESC" : "ASC";

  const query = `
    SELECT * FROM students
    WHERE first_name LIKE ? OR last_name LIKE ? OR email LIKE ?
    ORDER BY ${sort} ${order}
    LIMIT ? OFFSET ?
  `;

  const [rows] = await db.execute(query, [
    `%${search}%`,
    `%${search}%`,
    `%${search}%`,
    parseInt(limit),
    parseInt(offset),
  ]);

  return rows;
};

exports.findById = async (id) => {
  const [rows] = await db.execute("SELECT * FROM students WHERE id=?", [id]);
  return rows[0];
};

exports.update = async (id, data) => {
  await db.execute(
    "UPDATE students SET first_name=?, last_name=?, email=?, date_of_birth=? WHERE id=?",
    [data.first_name, data.last_name, data.email, data.date_of_birth, id]
  );
};

exports.delete = async (id) => {
  await db.execute("DELETE FROM students WHERE id=?", [id]);
};

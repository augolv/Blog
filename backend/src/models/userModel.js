import database from "../db.js";

export async function createUser(user) {
  const { name, email, hashPassword } = user;
  const queryString = "INSERT INTO users (name, email, hash_password) VALUES ($1, $2, $3) RETURNING *";
  const { rows } = await database.query(queryString, [name, email, hashPassword]);
  return rows[0];
}

export async function findUserByEmail(email) {
  const queryString = "SELECT * FROM users WHERE email = $1";
  const { rows } = await database.query(queryString, [email]);
  return rows[0];
}

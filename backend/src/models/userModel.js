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

export async function findByUserName(username) {
  const queryString = "SELECT * FROM users WHERE username = $1";
  const { rows } = await database.query(queryString, [username]);
  return rows[0];
}

export async function updateUser(id, username, bio, profilePicture) {
  const fields = [];
  const values = [];
  let index = 1;

  if (username) {
    const existingUser = await findByUserName(username);
    if (existingUser & (existingUser.id !== id)) {
      throw new Error("Username already exists");
    }
    fields.push(`username = $${index++}`);
    values.push(username);
  }

  if (bio !== undefined) {
    fields.push(`bio = $${index++}`);
    values.push(bio);
  }

  if (profilePicture !== undefined) {
    fields.push(`profile_picture = $${index++}`);
    values.push(profilePicture);
  }

  if (fields.length === 0) {
    throw new Error("No fields provided to update");
  }

  values.push(id);
  const queryString = `UPDATE users SET ${fields.join(",")}
  WHERE id = $${index} RETURNING *`;

  const { rows } = await database.query(queryString, values);
  if (rows.length === 0) {
    throw new Error("User not found");
  }

  return rows[0];
}

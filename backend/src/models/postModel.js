import database from "../db.js";

export async function getAllPosts() {
  const queryString = "SELECT * FROM posts;";
  const { rows } = await database.query(queryString);
  return rows;
}

export async function getPostById(id) {
  const queryString = "SELECT * FROM posts WHERE id = $1";
  const { rows } = await database.query(queryString, [id]);
  return rows[0];
}

export async function createPost(title, content, authorId) {
  const queryString = "INSERT INTO posts (title, content, author_id) VALUES ($1, $2, $3) RETURNING *;";
  const { rows } = await database.query(queryString, [title, content, authorId]);
  return rows[0];
}

export async function updatePost(id, title, content) {
  const queryString = "UPDATE posts SET title = $1, content = $2 WHERE id = $3;";
  const { rows } = await database.query(queryString, [title, content, id]);
  return rows[0];
}

export async function deletePost(id) {
  const queryString = "DELETE FROM posts WHERE id = $1";
  const { rows } = await database.query(queryString, [id]);
  return rows[0];
}

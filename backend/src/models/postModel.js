import database from "../db.js";

export async function getAllPosts(page, limit) {
  page = parseInt(page, 10);
  limit = parseInt(limit, 10);

  if (isNaN(page) || page < 1) {
    page = 1;
  }

  if (isNaN(limit) || limit < 1) {
    limit = 10;
  }

  const offset = (page - 1) * limit;

  const queryString = "SELECT * FROM posts ORDER BY created_at LIMIT $1 OFFSET $2;";
  const { rows: posts } = await database.query(queryString, [limit, offset]);

  const countQuery = "SELECT COUNT(*) FROM posts;";
  const { rows: countRows } = await database.query(countQuery);
  const totalPosts = parseInt(countRows[0].count, 10);

  return { posts, total: totalPosts, page, limit };
}

export async function getPostById(id) {
  const queryString = "SELECT * FROM posts WHERE id = $1;";
  const { rows } = await database.query(queryString, [id]);
  return rows[0];
}

export async function createPost(title, content, status, authorId) {
  const validStatuses = ["draft", "published"];
  const finalStatus = validStatuses.includes(status) ? status : "draft";

  const queryString = "INSERT INTO posts (title, content, status, author_id) VALUES ($1, $2, $3, $4) RETURNING *;";
  const { rows } = await database.query(queryString, [title, content, finalStatus, authorId]);
  return rows[0];
}

export async function updatePost(id, title, content, status) {
  const validStatuses = ["draft", "published"];
  const finalStatus = status && validStatuses.includes(status) ? status : undefined;

  const fields = [];
  const values = [];
  let index = 1;

  if (title) {
    fields.push(`title = $${index++}`);
    values.push(title);
  }

  if (content) {
    fields.push(`content = $${index++}`);
    values.push(content);
  }

  if (finalStatus) {
    fields.push(`status = $${index++}`);
    values.push(finalStatus);
  }

  if (fields.length === 0) {
    return null; // Nenhum campo para atualizar
  }

  values.push(id);
  const queryString = `UPDATE posts SET ${fields.join(", ")}, updated_at = CURRENT_TIMESTAMP WHERE id = $${index} RETURNING *;`;
  const { rows } = await database.query(queryString, values);
  return rows[0];
}

export async function deletePost(id) {
  const queryString = "DELETE FROM posts WHERE id = $1";
  const { rows } = await database.query(queryString, [id]);
  return rows[0];
}

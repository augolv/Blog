import database from "../db.js";

export async function getAllPosts(page, limit, authorUsername, status = "published") {
  page = parseInt(page, 10);
  limit = parseInt(limit, 10);

  if (isNaN(page) || page < 1) page = 1;
  if (isNaN(limit) || limit < 1) limit = 10;

  const offset = (page - 1) * limit;

  let queryParams = [];
  let paramIndex = 1;

  let baseQuery = `
    SELECT p.*, u.username as author_username 
    FROM posts p
    JOIN users u ON p.author_id = u.id
  `;
  let countBaseQuery = "SELECT COUNT(p.id) FROM posts p JOIN users u ON p.author_id = u.id";

  let conditions = [];

  if (status && status !== "all") {
    conditions.push(`p.status = $${paramIndex++}`);
    queryParams.push(status);
  }

  if (authorUsername) {
    conditions.push(`u.username = $${paramIndex++}`);
    queryParams.push(authorUsername);
  }

  if (conditions.length > 0) {
    const whereClause = " WHERE " + conditions.join(" AND ");
    baseQuery += whereClause;
    countBaseQuery += whereClause;
  }

  const finalQueryParamsForSelect = [...queryParams, limit, offset];
  baseQuery += ` ORDER BY p.created_at DESC LIMIT $${paramIndex++}::integer OFFSET $${paramIndex++}::integer;`;

  const { rows: posts } = await database.query(baseQuery, finalQueryParamsForSelect);

  const { rows: countRows } = await database.query(countBaseQuery, queryParams);
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
  const finalStatus = status && validStatuses.includes(status) ? status : "draft";

  const queryString = "INSERT INTO posts (title, content, status, author_id) VALUES ($1, $2, $3, $4) RETURNING *;";
  const { rows } = await database.query(queryString, [title, content, finalStatus, authorId]);
  return rows[0];
}

export async function updatePost(id, title, content, status) {
  const validStatuses = ["draft", "published"];
  const finalStatus = status && validStatuses.includes(status) ? status : "draft";

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
    return null;
  }

  values.push(id);
  const queryString = `UPDATE posts SET ${fields.join(", ")}, updated_at = CURRENT_TIMESTAMP WHERE id = $${index} RETURNING *;`;
  const { rows } = await database.query(queryString, values);
  return rows[0];
}

export async function deletePost(id) {
  const queryString = "DELETE FROM posts WHERE id = $1 RETURNING *;";
  const { rows } = await database.query(queryString, [id]);
  return rows[0];
}

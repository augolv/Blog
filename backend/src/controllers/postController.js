import { createPost, deletePost, getAllPosts, getPostById, updatePost } from "../models/postModel.js";

export async function listPosts(req, res) {
  const { page, limit, author, status } = req.query;
  const pageNumber = parseInt(page, 10) || 1;
  const limitNumber = parseInt(limit, 10) || 10;
  const statusFilter = status || "published";

  try {
    const result = await getAllPosts(pageNumber, limitNumber, author, statusFilter);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function fetchPost(req, res) {
  const { id } = req.params;

  try {
    const post = await getPostById(id);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function addPost(req, res) {
  const authorId = req.user.id;
  const { title, content, status } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: "Missing title or content" });
  }

  try {
    await createPost(title, content, status, authorId);
    res.status(201).json({ message: "Post created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function editPost(req, res) {
  const { id } = req.params;
  const { title, content, status } = req.body;
  const authorId = req.user.id;

  if (!title && !content && !status) {
    return res.status(400).json({ error: "No fields provided for update." });
  }

  try {
    const post = await getPostById(id);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (post.author_id !== authorId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    if (post.status === "published") {
      return res.status(403).json({ error: "Published posts cannot be edited." });
    }

    const updatedPost = await updatePost(id, title, content, status);

    if (!updatedPost && (title || content || status)) {
      return res.status(400).json({ error: "Update failed, no valid fields provided or post not found." });
    } else if (!updatedPost) {
      return res.status(200).json({ message: "No changes detected or applied.", post });
    }

    res.status(200).json({ message: "Post updated successfully", post: updatedPost });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function removePost(req, res) {
  const { id } = req.params;
  const authorId = req.user.id;

  try {
    const post = await getPostById(id);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (post.author_id !== authorId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    await deletePost(id);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

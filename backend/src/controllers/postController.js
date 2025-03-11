import { createPost, deletePost, getAllPosts, getPostById, updatePost } from "../models/postModel.js";

export async function listPosts(req, res) {
  try {
    const posts = await getAllPosts();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function fetchPost(req, res) {
  const { id } = req.params;
  console.log(req.params);

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
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: "Missing title or content" });
  }

  try {
    await createPost(title, content, authorId);
    res.status(201).json({ message: "Post created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function editPost(req, res) {
  const { id } = req.params;
  const { title, content } = req.body;
  const authorId = req.user.id;

  if (!title || !content) {
    return res.status(400).json({ error: "Missing title or content" });
  }

  try {
    const post = await getPostById(id);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (post.author_id !== authorId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    await updatePost(id, title, content);
    res.status(200).json({ message: "Post updated successfully" });
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

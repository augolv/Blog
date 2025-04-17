import { Link } from "react-router";

function PostCard({ post }) {
  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content.substring(0, 400)}...</p>
      <Link to={`/posts/${post.id}`}>
        <button>Read More</button>
      </Link>
    </div>
  );
}

export default PostCard;

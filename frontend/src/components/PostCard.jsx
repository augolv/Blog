function PostCard({ post }) {
  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content.substring(0, 400)}...</p>
    </div>
  );
}

export default PostCard;

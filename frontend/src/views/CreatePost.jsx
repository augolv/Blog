export default function CreatePost() {
  return (
    <div>
      <h1>CreatePost</h1>
      <form>
        <div>
          <label>Title:</label>
          <input type="text" placeholder="Enter post title" />
        </div>
        <div>
          <label>Content:</label>
          <textarea placeholder="Enter post content"></textarea>
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}

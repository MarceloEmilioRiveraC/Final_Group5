import { usePosts } from "../hooks/usePosts";

export const Home = () => {
  const { posts } = usePosts();

  return (
    <div>
      <h1>Fashion Posts</h1>
      {posts.map((post) => (
        <div key={post._id}>
          <h2>{post.title}</h2>
          <p>{post.description}</p>
        </div>
      ))}
    </div>
  );
};
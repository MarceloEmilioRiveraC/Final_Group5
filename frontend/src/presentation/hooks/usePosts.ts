// import { useEffect, useState } from "react";
// import { Post } from "../../domain/entities/Post";
// import { getPosts } from "../../application/posts/getPosts";
// import { PostRepository } from "../../infrastructure/repositories/PostRepository";

// export const usePosts = () => {
//   const [posts, setPosts] = useState<Post[]>([]);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       const repo = new PostRepository();
//       const data = await getPosts(repo);
//       setPosts(data);
//     };

//     fetchPosts();
//   }, []);

//   return { posts };
// };
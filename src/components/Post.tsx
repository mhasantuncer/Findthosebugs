import { useEffect, useState } from 'react';

interface PostData {
  id: number;
  userId: number;
  title: string;
  body: string;
}

interface PostProps {
  id: number;
}

export default function Post({ id }: PostProps) {
  const [post, setPost] = useState<PostData | null>(null);

  useEffect(() => {
    async function fetchPost() {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
      );
      const data = await response.json();
      setPost(data);
    }

    fetchPost();
  }, [id]);

  if (!post) {
    return <p>Laddar inlägg...</p>;
  }

  return (
    <article className="post">
      <h3>{post.title}</h3>
      <p>{post.body}</p>
    </article>
  );
}

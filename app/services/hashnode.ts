import type { Post, PostWrapper } from "../interface/Post";

export async function fetchPost(postId: string): Promise<Post> {
  const query = `
      query Post {
        post(id: "${postId}") {
          title
          slug
          content {
            markdown
          }
        }
      }
    `;

  const response = await fetch("https://gql.hashnode.com", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  const { data } = await response.json();

  const post: Post = {
    title: data.post.title,
    slug: data.post.slug,
    content: {
      markdown: data.post.content.markdown,
    },
    id: data.post.id,
    url: data.post.url,
  };

  return post;
}

export async function fetchPosts(blogName: string): Promise<Post[]> {
  const query = `
      query Publication {
        publication(host: "${blogName}.hashnode.dev") {
          posts(first: 20) {
            edges {
              node {
                  id
                  title
                  url
                }
              }
            }
          }
        }
      `;

  const response = await fetch("https://gql.hashnode.com", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  const { data } = await response.json();

  const postsData: Post[] = data.publication.posts.edges.map(
    (item: PostWrapper) => ({
      id: item.node.id,
      title: item.node.title,
      url: item.node.url,
    })
  );

  return postsData;
}

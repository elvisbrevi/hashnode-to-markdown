#! /usr/bin/env bun

import type { Post, PostWrapper } from "./interface/Post";

async function fetchData(): Promise<Post[]> {
  const query = `
      query Publication {
        publication(host: "elvisbrevi.hashnode.dev") {
          posts(first: 20) {
            edges {
              node {
                title
                slug
                publishedAt
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
      title: item.node.title,
      slug: item.node.slug,
      publishedAt: item.node.publishedAt,
    })
  );

  return postsData;
}

fetchData()
  .then((posts) => {
    console.log(posts);
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

#! /usr/bin/env bun

import type { Post, PostWrapper } from "./interface/Post";
import type { Choice } from "./types/choice";
import select from "@inquirer/select";
import input from "@inquirer/input";

async function fetchPost(postId: string): Promise<Post> {
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

async function fetchPosts(blogName: string): Promise<Post[]> {
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

const blogName = await input({
  message: "Enter the name of the blog in hashnode (without .hashnode.dev):",
  required: true,
});

async function main() {
  const posts = await fetchPosts(blogName);
  const choices: Choice<Post>[] = [];
  for (const post of posts) {
    choices.push({
      name: post.title,
      value: post,
      description: post.url,
    });
  }

  const selectedPost = await select({
    message: "Select the post to convert to markdown",
    choices: choices,
  });

  let post = await fetchPost(selectedPost.id);

  // add title to the content
  post.content.markdown = `# ${post.title}\n\n${post.content.markdown}`;

  await Bun.write(`${post.slug}.md`, post.content.markdown);

  console.log(`${post.slug}.md written`);
}

main();

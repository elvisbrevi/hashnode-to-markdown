#! /usr/bin/env bun

import type { Choice } from "./types/choice";
import select from "@inquirer/select";
import input from "@inquirer/input";
import { fetchPost, fetchPosts } from "./services/hashnode";
import type { Post } from "./interface/Post";

/**
 * Main function
 */
async function main() {
  // get blog name
  const blogName = await input({
    message: "Enter the name of the blog in hashnode (without .hashnode.dev):",
    required: true,
  });

  // get posts
  const posts = await fetchPosts(blogName);
  const choices: Choice<Post>[] = [];
  for (const post of posts) {
    choices.push({
      name: post.title,
      value: post,
      description: post.url,
    });
  }

  // select post
  const selectedPost = await select({
    message: "Select the post to convert to markdown",
    choices: choices,
  });

  // fetch post
  let post = await fetchPost(selectedPost.id);

  // add title to the content
  post.content.markdown = `# ${post.title}\n\n${post.content.markdown}`;

  // write to file
  await Bun.write(`output/${post.slug}.md`, post.content.markdown);

  // log
  console.log(`${post.slug}.md written`);
}

main();

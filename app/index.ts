#! /usr/bin/env bun

import type { Choice } from "./types/choice";
import select from "@inquirer/select";
import input from "@inquirer/input";
import { fetchPost, fetchPosts } from "./services/hashnode";
import type { Post } from "./interface/Post";

// Console colors
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  green: "\x1b[32m",
  cyan: "\x1b[36m",
  yellow: "\x1b[33m",
};

/**
 * Main function
 */
async function main() {
  console.log(
    `\n${colors.bright}${colors.cyan}📝 hashnode-md${colors.reset} - Hashnode to Markdown converter\n`
  );

  // get blog name
  const blogName = await input({
    message: "Enter the name of the blog in hashnode (without .hashnode.dev):",
    required: true,
  });

  // get posts
  console.log(
    `\n${colors.yellow}⏳ Fetching posts from ${blogName}.hashnode.dev...${colors.reset}`
  );
  const posts = await fetchPosts(blogName);

  if (posts.length === 0) {
    console.log(
      `\n${colors.bright}❌ No posts found for ${blogName}.hashnode.dev${colors.reset}`
    );
    return;
  }

  console.log(`${colors.green}✅ Found ${posts.length} posts${colors.reset}\n`);

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
  console.log(`\n${colors.yellow}⏳ Fetching post content...${colors.reset}`);
  let post = await fetchPost(selectedPost.id);

  // add title to the content
  post.content.markdown = `# ${post.title}\n\n${post.content.markdown}`;

  // write to file
  const outputFile = `output/${post.slug}.md`;
  await Bun.write(outputFile, post.content.markdown);

  // log
  console.log(
    `\n${colors.green}${colors.bright}✨ ${post.slug}.md created successfully${colors.reset}`
  );
  console.log(`${colors.cyan}📂 File saved to: ${outputFile}${colors.reset}\n`);
}

main().catch((error) => {
  console.error(
    `\n${colors.bright}\x1b[31m❌ Error: ${error.message}${colors.reset}\n`
  );
  process.exit(1);
});

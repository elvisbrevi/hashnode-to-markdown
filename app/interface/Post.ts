export interface Post {
  title: string;
  slug: string;
  publishedAt: string;
}

export interface PostWrapper {
  node: Post;
}

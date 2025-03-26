export interface Post {
  id: string;
  title: string;
  url: string;
  content: {
    markdown: string;
  };
  slug: string;
}

export interface PostWrapper {
  node: Post;
}

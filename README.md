# hashnode-md 📝

<div align="center">
  
  ![Hashnode](https://img.shields.io/badge/Hashnode-2962FF?style=for-the-badge&logo=hashnode&logoColor=white)
  ![Markdown](https://img.shields.io/badge/Markdown-000000?style=for-the-badge&logo=markdown&logoColor=white)
  ![CLI](https://img.shields.io/badge/CLI-121011?style=for-the-badge&logo=gnu-bash&logoColor=white)
  
  [![npm version](https://img.shields.io/npm/v/hashnode-md.svg)](https://www.npmjs.com/package/hashnode-md)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

  **A sleek, modern CLI tool to export your Hashnode blog posts to Markdown format in seconds.**

</div>

## ✨ Features

- **🔍 Effortless Search**: Quickly find and list your Hashnode blog posts by blog name
- **⬇️ One-Click Export**: Convert selected posts to clean Markdown format with a single command
- **🎨 Formatting Preservation**: Maintains all your original article formatting from Hashnode
- **📂 Organized Output**: Automatically saves exported files in the `output` directory
- **💻 Interactive CLI**: User-friendly command-line interface with intuitive prompts

## 🚀 Installation

### Using npm

```bash
npm install -g hashnode-md
```

### Using Bun

```bash
bun install -g hashnode-md
```

## 🎮 Usage

Run the CLI tool with a simple command:

```bash
hashnode-md
```

### Interactive Workflow

The tool will guide you through a simple process:

1. **Enter your blog name** - Just the name without `.hashnode.dev`
2. **Select a post** - Choose from a list of your recent articles
3. **Export complete** - Your Markdown file is ready in the `output` directory!

## 📋 Example

```bash
$ hashnode-md

? Enter the name of the blog in hashnode (without .hashnode.dev): techblog
? Select the post to convert to markdown: How I Built a Serverless API in 10 Minutes
✨ how-i-built-a-serverless-api-in-10-minutes.md created successfully
```

<div align="center">
  <img src="https://via.placeholder.com/600x400/0a0a0a/FFFFFF?text=hashnode-md+CLI+demo" alt="CLI Demo" width="600"/>
</div>

## 📦 What You Get

The exported Markdown file includes:

- The original post title as a heading
- All content with proper Markdown formatting
- Code blocks with language highlighting
- Images with proper formatting

## 🛠️ Development

Want to contribute or run locally?

### Clone the repository

```bash
git clone https://github.com/elvisbrevi/hashnode-to-markdown.git
cd hashnode-to-markdown
```

### Install dependencies

```bash
bun install
```

### Run locally

```bash
bun start
```

### Build for production

```bash
bun run build
```

## 🔧 Technical Details

- Built with TypeScript and Bun for modern JavaScript development
- Uses Hashnode's GraphQL API to fetch blog posts
- Interactive CLI powered by Inquirer.js

## 📝 License

[MIT](LICENSE) © Elvis Brevi

---

<div align="center">
  <p>If you find this tool helpful, consider giving it a ⭐ on <a href="https://github.com/elvisbrevi/hashnode-to-markdown">GitHub</a>!</p>
  <p>Made with ❤️ for the Hashnode community</p>
</div>

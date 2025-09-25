# MCP Instructions

## Usage

### Web / Cloud

We are hosting the latest version of this MCP server instructions generator on our website for free:

> https://hyprmcp.com/mcp-install-instructions-generator/

### CLI

This package comes with a CLI tool you can simply call using `npx`:

```shell
npx @hyprmcp/mcp-install-instructions-generator@latest https://mcp.example.com --target vscode --output md
npx @hyprmcp/mcp-install-instructions-generator@latest --help
```

### MCP Server

Use the MCP server to generate instructions for your own MCP server!

#### Remote MCP Server

This MCP server is hosted on [hyprmcp.com](https://hyprmcp.com/).

You can find all installation instructions by opening the remote MCP Server Url in your browser:

> ```
> https://demo.hyprmcp.cloud/mcp-install-instructions-generator/mcp
> ```

#### Local MCP Server

```shell
npx -p @hyprmcp/mcp-install-instructions-generator@latest mcp
```

### Web Component

You can use the web component by importing it into your HTML file:

<!-- x-release-please-start-version -->

```html
<script src="https://cdn.jsdelivr.net/npm/@hyprmcp/mcp-install-instructions-generator@0.2.0/dist/component/index.js"></script>
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@hyprmcp/mcp-install-instructions-generator@0.2.0/dist/component/index.css"
/>

<mcp-install-instructions
  url="https://mcp.example.com"
></mcp-install-instructions>
```

<!-- x-release-please-end -->

### JavaScript

This package is distributed as an npm package.
Simply install `@hyprmcp/mcp-install-instructions-generator` with your package manager of choice and you're ready to get started.

```ts
import { generateMCPInstructions } from '@hyprmcp/mcp-install-instructions';

const instructions = generateMCPInstructions({
  url: 'https://mcp.example.com',
  target: 'vscode',
  output: 'md',
});

console.log(instructions);
```

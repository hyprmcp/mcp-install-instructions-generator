# MCP Instructions

## Usage

### CLI

This package comes with a CLI tool you can simply call using `npx`:

```shell
npx @hyprmcp/mcp-install-instructions-generator https://mcp.example.com --target vscode --output md
npx @hyprmcp/mcp-install-instructions-generator --help
```

### MCP Server

Use the MCP server to generate instructions for your own MCP server!

```shell
npx -p @hyprmcp/mcp-install-instructions-generator mcp
npx @hyprmcp/mcp-install-instructions-generator --help
```

### Web Component

You can use the web component by importing it into your HTML file:

<!-- x-release-please-start-version -->

```html
<script src="https://cdn.jsdelivr.net/npm/@hyprmcp/mcp-install-instructions-generator@0.1.0/dist/component/index.js"></script>
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@hyprmcp/mcp-install-instructions-generator@0.1.0/dist/component/index.css"
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

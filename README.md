# MCP Instructions

## Usage

### CLI

This package comes with a CLI tool you can simply call using `npx`:

```shell
npx @hyprmcp/mcp-instructions https://mcp.example.com --target vscode --output md
npx @hyprmcp/mcp-instructions --help
```

### Web Component

You can use the web component by importing it into your HTML file:

```html
<script src="https://cdn.jsdelivr.net/npm/@hyprmcp/mcp-instructions@0.1.0/dist/component/index.js"></script>
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@hyprmcp/mcp-instructions@0.1.0/dist/component/index.css"
/>

<mcp-instructions url="https://mcp.example.com"></mcp-instructions>
```

### JavaScript

This package is distributed as an npm package.
Simply install `@hyprmcp/mcp-instructions` with your package manager of choice and you're ready to get started.

```ts
import { generateMCPInstructions } from '@hyprmcp/mcp-instructions';

const instructions = generateMCPInstructions({
  url: 'https://mcp.example.com',
  target: 'vscode',
});

console.log(instructions.getMarkdown());
```

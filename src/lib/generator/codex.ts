import { GeneratorOptions, Instructions } from '../types';

export class CodexInstructions implements Instructions {
  constructor(private readonly options: GeneratorOptions) {}

  getJSON(): unknown {
    return undefined;
  }

  getLink(): string | undefined {
    return undefined;
  }

  getMarkdown(): string {
    return `
#### Manual installation

Requirements:
- Docker

Add the following to your codex config file (\`~/.codex/config.toml\`):

\`\`\`
[mcp_servers.${this.options.name}]
command = "docker"
args = ["run", "--rm", "-t", "ghcr.io/sparfenyuk/mcp-proxy:v0.3.2-alpine", "${this.options.url}", "--transport=streamablehttp"]
\`\`\`

**Note:** Codex does not support MCP servers with OAuth2 authentication.`;
  }
}

import type { GeneratorOptions, Instructions } from '../types';

export class ClaudeCodeInstruction implements Instructions {
  constructor(private readonly options: GeneratorOptions) {}

  getLink(): undefined {
    return undefined;
  }

  getJSON(): unknown {
    return {
      mcpServers: {
        [this.options.name]: {
          type: 'http',
          url: this.options.url,
        },
      },
    };
  }

  getMarkdown(): string {
    return `
Open a terminal and run the following command:
\`\`\`
claude mcp add --transport http ${this.options.name} ${this.options.url}
\`\`\`
From within Claude Code, you can use the \`/mcp\` command to get more information about the server.
`;
  }
}

import { GeneratorOptions, Instructions } from '../types';

export class WindsurfInstructions implements Instructions {
  constructor(private readonly options: GeneratorOptions) {}
  getJSON(): unknown {
    return {
      mcpServers: {
        [this.options.name]: {
          serverUrl: this.options.url,
        },
      },
    };
  }

  getLink(): string | undefined {
    return undefined;
  }

  getMarkdown(): string {
    return `
Copy the following JSON to your Windsurf MCP config file:
\`\`\`json
${JSON.stringify(this.getJSON(), null, 2)}
\`\`\`
`;
  }
}

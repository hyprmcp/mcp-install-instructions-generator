import { GeneratorOptions, Instructions } from '../types';

export class ClaudeDesktopInstructions implements Instructions {
  constructor(private readonly options: GeneratorOptions) {}

  getJSON(): unknown {
    return undefined;
  }

  getLink(): string | undefined {
    return undefined;
  }

  getMarkdown(): string {
    return `
Open Claude Desktop and navigate to Settings > Connectors > Add Custom Connector.

Enter the name as \`${this.options.name}\` and the remote MCP server URL as \`${this.options.url}\`.`;
  }
}

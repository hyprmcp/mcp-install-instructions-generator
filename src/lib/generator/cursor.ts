import type { GeneratorOptions, Instructions } from '../types';
import { badgeMarkdown } from '../util/markdown';

export class CursorInstruction implements Instructions {
  constructor(private readonly options: GeneratorOptions) {}

  getBadge(): string | undefined {
    return badgeMarkdown(
      'Add to Cursor',
      'https://cursor.com/deeplink/mcp-install-dark.svg',
      `cursor://anysphere.cursor-deeplink/mcp/install?name=${this.options.name}&config=${btoa(JSON.stringify({ url: this.options.url }))}`,
    );
  }

  getJSON(): unknown {
    return { mcpServers: { [this.options.name]: { url: this.options.url } } };
  }

  getMarkdown(): string {
    return `
Add the following to your \`mcp.json\` file:

\`\`\`json
${JSON.stringify(this.getJSON(), null, 2)}
\`\`\`
`;
  }
}

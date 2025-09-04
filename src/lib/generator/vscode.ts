import { GeneratorOptions, Instructions } from '../types';
import { badgeMarkdown } from '../util/markdown';

export class VscodeInstructions implements Instructions {
  constructor(private readonly options: GeneratorOptions) {}
  getBadge(): string | undefined {
    return badgeMarkdown(
      'Install in VS Code',
      'https://img.shields.io/badge/VS_Code-Install_Server-0098FF?style=for-the-badge&logo=visual-studio-code&logoColor=white',
      `https://insiders.vscode.dev/redirect?url=vscode:mcp/install?${encodeURIComponent(JSON.stringify(this.getJSON()))}`,
    );
  }

  getJSON(): unknown {
    return {
      type: 'http',
      name: this.options.name,
      url: this.options.url,
    };
  }

  getMarkdown(): string {
    return `
Open a terminal and run the following command:

\`\`\`
code --add-mcp '${JSON.stringify(this.getJSON())}'
\`\`\`

Then, from inside VS Code, open the .vscode/mcp.json file and click "Start server".
`;
  }
}

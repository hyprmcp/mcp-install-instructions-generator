import { GeneratorOptions, Instructions } from '../types';

export class GeminiCLIInstructions implements Instructions {
  constructor(private readonly options: GeneratorOptions) {}
  getJSON(): unknown {
    return {
      mcpServers: {
        [this.options.name]: {
          httpUrl: this.options.url,
          headers: {
            Accept: 'application/json, text/event-stream',
          },
        },
      },
    };
  }

  getLink(): string | undefined {
    return undefined;
  }

  getMarkdown(): string {
    return `
Add the following JSON to your Gemini CLI configuration file (\`~/.gemini/settings.json\`):
\`\`\`json
${JSON.stringify(this.getJSON(), null, 2)}
\`\`\`
`;
  }
}

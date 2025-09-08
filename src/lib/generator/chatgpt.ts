import { GeneratorOptions, Instructions } from '../types';

export class ChatGPTInstructions implements Instructions {
  constructor(private readonly options: GeneratorOptions) {}

  getLink(): undefined {
    return undefined;
  }

  getJSON(): unknown {
    return undefined;
  }

  getMarkdown(): string {
    return `
*Note: In Team, Enterprise, and Edu workspaces, only workspace owners and admins have permission*

- Navigate to **Settings > Connectors**
- Add a custom connector with the server URL: \`${this.options.url}\`
- It should then be visible in the Composer > Deep research tool
- You may need to add the server as a source

*Connectors can only be used with **Deep Research***
`;
  }
}

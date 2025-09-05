import { GeneratorOptions, Instructions } from '../types';

export class ChatGPTInstructions implements Instructions {
  constructor(_: GeneratorOptions) {}

  getBadge(): string | undefined {
    return undefined;
  }

  getLink(): undefined {
    return undefined;
  }

  getJSON(): unknown {
    return undefined;
  }

  getMarkdown(): string {
    return '## TODO';
  }
}

import { GeneratorOptions, Instructions } from '../types';

export class ChatGPTInstructions implements Instructions {
  constructor(_: GeneratorOptions) {}

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
